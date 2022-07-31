import React, {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import "./index.css";

function NavBar() {
    const [dataSource, setDataSource] = useState({data: {}});
    const pagination = useRef({page_now: 0, page_size: 20, page_total: 1});
    const navRef = useRef(null);
    const oldScrollTop = useRef(0);
    const threshold = useRef(100);//距离底部阈值
    const pendingPageQueue = useRef([]);//缓存待请求的页

    const fetchDataSource = useMemo(function () {
        return function () {
            if (pagination.current.page_now >= pagination.current.page_total) {//已获取完所有数据
                pendingPageQueue.current = null;
                return;
            }
            var page = pagination.current.page_now + 1;
            if (pendingPageQueue.current.includes(page)) {//避免滚动过程中多次请求同一页数据
                return;
            }
            pendingPageQueue.current.push(page);

            const url = `/prod/mock/meeting-c/list?page_size=${pagination.current.page_size}&page_now=${page}`;
            axios.get(url, {responseType: "json"}).then(function (resp) {
                Object.assign(pagination.current, resp.data.data.page);
                resp.data.data.list.forEach(function (item) {
                    var create_time = new Date(item.create_time);
                    var end_time = new Date(item.create_time + item.duration * 3600);
                    var startHour = create_time.getHours();
                    var endHour = end_time.getHours();
                    var periodStart = startHour > 12 ? (`${startHour - 12}:${create_time.getMinutes()} pm`) : `${startHour}:${create_time.getMinutes()} am`;
                    var periodEnd = endHour > 12 ? (`${endHour - 12}:${end_time.getMinutes()} pm`) : `${endHour}:${end_time.getMinutes()} am`;
                    item.period = `${periodStart} - ${periodEnd}`;
                    item.date = create_time.toDateString();
                    (dataSource.data.hasOwnProperty(item.date) ? dataSource.data[item.date] : dataSource.data[item.date] = []).push(item);
                });
                setDataSource({...dataSource});
            });
        }
    }, []);

    useEffect(function () {
        fetchDataSource();
    }, []);

    function handleScroll() {
        const scrollTop = navRef.current.scrollTop;
        var direction = (scrollTop - oldScrollTop.current) > 0;
        oldScrollTop.current = scrollTop;
        const toThreshold = (navRef.current.scrollHeight - navRef.current.clientHeight - scrollTop) < threshold.current;
        if (direction && toThreshold) {//向下滚动且达到临界点提前请求api
            fetchDataSource();
        }
    }

    return <ul onScroll={handleScroll} className="nav" ref={navRef}>
        {
            Object.keys(dataSource.data).map(function (key) {
                return <NavGroup key={key} text={key} items={dataSource.data[key]}></NavGroup>;
            })
        }
    </ul>
}

function NavGroup(props) {
    const [expand, toggleExpand] = useState(false);

    function handleClick() {
        toggleExpand(!expand);
    }

    return <li className="nav-group">
        <span onClick={handleClick} className="text">
            <span className={expand ? "icon-collapse" : "icon-expand"}></span>
            <span>{props.text}</span>
        </span>
        <ul style={{display: expand ? "block" : "none", paddingLeft: 0}}>
            {
                props.items && props.items.map((item) => (<NavItem dataItem={item} key={item.id}></NavItem>))
            }
        </ul>
    </li>;
}

function NavItem(props) {
    return <div className="nav-item">
        <span className="title">{props.dataItem.title}</span>
        <div className="period">{props.dataItem.period}</div>
    </div>
}

export default NavBar;