import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./index.css";

function fetchNavDataSource(page, page_size) {
    const url = `/prod/mock/meeting-c/list?page_size=${page_size}&page_now=${page}`;
    return axios.get(url, {responseType: "json"}).then(function (resp) {
        resp.data.data.list = resp.data.data.list.map(function (item) {
            var create_time = new Date(item.create_time);
            var startHour = create_time.getHours();
            var period = startHour > 12 ? (`${startHour - 12}pm`) : `${startHour}am`;
            return {...item, period: period, date: create_time.toDateString()};
        });
        return resp;
    });
}

function MenuList() {
    const [dataSource, setDataSource] = useState({data: {}});
    const pagination = useRef({page_now: 0, page_size: 20});
    const navRef = useRef(null);
    const oldScrollTop = useRef(0);
    const threshold = useRef(100);

    useEffect(function () {
        fetchNavDataSource(pagination.current.page_now + 1, pagination.current.page_size).then(function (resp) {
            Object.assign(pagination.current, resp.data.data.page);
            resp.data.data.list.forEach(function (item) {
                (dataSource.data.hasOwnProperty(item.date) ? dataSource.data[item.date] : dataSource.data[item.date] = []).push(item);
            });
            setDataSource({...dataSource});
        });
    }, []);

    function handleScroll() {
        const scrollTop = navRef.current.scrollTop;
        var direction = (scrollTop - oldScrollTop.current) > 0;
        oldScrollTop.current = scrollTop;
        const toThreshold = (navRef.current.scrollHeight - navRef.current.clientHeight - scrollTop) < threshold.current;
        if (direction && toThreshold) {//请求api

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
        <div>{props.dataItem.period}</div>
    </div>
}

export default MenuList;