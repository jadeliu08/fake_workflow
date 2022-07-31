import {useEffect, useRef, useState} from "react";
import "./index.css"

function VirtualList(props) {
    const [dataSource, setDataSource] = useState([]); //数据源
    const [position, setPosition] = useState([0, 0]); //缓冲区，视图区索引
    const scrollElRef = useRef(null); //获取scroll元素
    const listBoxRef = useRef(null); //容器元素
    const contentRef = useRef(null);
    //height:容器高度, itemHeight: 每一个项目高度, bufferCount: 缓冲区个数, renderCount: 视图区个数
    const scrollInfo = useRef({height: 500, itemHeight: 60, bufferCount: 8, renderCount: 0});
    useEffect(function () {
        const height = listBoxRef.current.offsetHeight;
        const renderCount = Math.ceil(height / scrollInfo.current.itemHeight) + scrollInfo.current.bufferCount;
        scrollInfo.current.renderCount = renderCount;
        scrollInfo.current.height = height;
        const dataSource = new Array(1000).fill(1).map((item, index) => index + 1);
        setDataSource(dataSource);
        setPosition([0, renderCount]);
    }, []);

    const handleScroll = () => {
        const {scrollTop} = scrollElRef.current
        const {itemHeight, renderCount} = scrollInfo.current;
        const currentOffset = scrollTop - (scrollTop % itemHeight);
        const start = Math.floor(scrollTop / itemHeight);
        contentRef.current.style.transform = `translateY(${currentOffset}px)`; /* 偏移，造成下滑效果 */
        const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
        if (end !== position[1] || start !== position[0]) {
            setPosition([start, end]);
        }
    };
    const [start, end] = position;
    const renderDataSource = dataSource.slice(start, end); //视图区数据源
    console.log('渲染区间', position);
    return <div className="list-box" ref={listBoxRef}>
        <div className="scroll-box" ref={scrollElRef} style={{height: `${scrollInfo.current.height}px`}} onScroll={handleScroll}>
            <div className="scroll-hold" style={{height: `${dataSource.length * scrollInfo.current.itemHeight}px`}}/>
            <div className="content" ref={contentRef}>
                {
                    renderDataSource.map((item, index) => (<div className="list-item" key={index}>{item + ''} Item</div>))
                }
            </div>
        </div>
    </div>


}

export default VirtualList;