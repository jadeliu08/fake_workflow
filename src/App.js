import React, { useEffect, useRef, useLayoutEffect } from 'react';
// import {Route} from "react-router-dom";
// import "@progress/kendo-theme-default/dist/all.css"

// import Login from "./login";
// import Logout from "./logout";
// import Page from "./page";

// function App() {
//     return <>
//         <Route path="/" component={Page}/>
//         <Route path="/login" component={Login}/>
//         <Route path="/logout" component={Logout}/>
//     </>;
// }

function Child() {
	const divRef = useRef(null);
	useLayoutEffect(() => {
		divRef.current.addEventListener('click', () => {
			console.log('Child div原生事件捕获');
		}, { capture: true });
		divRef.current.addEventListener('click', () => {
			console.log('Child div原生事件冒泡');
		});
	}, []);
	const handleClick = () => {
		console.log('Child合成事件冒泡');
	};
	const handleClickCapture = () => {
		console.log('Child合成事件捕获');
	}
	return <div onClick={handleClick} onClickCapture={handleClickCapture} ref={divRef} style={{ backgroundColor: 'red' }}>
		I'm Child component.
	</div>
}

function App() {
	const divRef = useRef(null);
	useLayoutEffect(() => {
		divRef.current.addEventListener('click', () => {
			console.log('App div原生事件捕获');
		}, { capture: true });
		divRef.current.addEventListener('click', () => {
			console.log('App div原生事件冒泡');
		});
	}, []);
	const handleClick = () => {
		console.log('App 合成事件冒泡');
	};
	const handleClickChild = () => {
		console.log('handleClickChild');
	};
	const handleClickCapture = () => {
		console.log('App 合成事件捕获');
	}
	return <div onClick={handleClick} onClickCapture={handleClickCapture} ref={divRef}>
		<Child onClick={handleClickChild}/>
	</div>
}


export default App;