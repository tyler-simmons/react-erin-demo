import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="main-container">
			<Map />
		</div>
	);
}

const Map = () => {
	const [pinClicked, setPinClicked] = useState({
		pins: [],
		stories: [],
	});
	const [showDrawer, setShowDrawer] = useState(false);
	const [lastPinClicked, setLastPinClicked] = useState(null);

	useEffect(() => {
		if (!showDrawer && pinClicked !== null) {
			setLastPinClicked(pinClicked);
			setPinClicked(null);
		}
	}, [showDrawer]);

	// useEffect(() => {
	// 	return () => {
	// 		setLastPinClicked(pinClicked);
	// 		setPinClicked(null);
	// 	};
	// }, [showDrawer]); this wont work either

	const handlePinClick = (pinName) => {
		setPinClicked(pinName);
		if (!showDrawer) {
			setShowDrawer(true);
		}
	};

	return (
		<>
			{showDrawer && <Drawer currentPin={pinClicked} drawerHook={setShowDrawer} />}
			<MapContent pinClickHandler={handlePinClick} />
			{/* {pins.map((pin, idx) => {
        <Pin key={idx} clickHandler={() => setPinClicked(`pin ${idx} clicked`)}></Pin>
      })}  DISCLAIMER - this won't work */}
		</>
	);
};

const Drawer = ({ currentPin, drawerHook }) => {
	return (
		<div className="drawer-container">
			<button
				onClick={() => {
					drawerHook(false);
				}}
			>
				Close Drawer
			</button>
			{currentPin && <p>Current pin is {currentPin}</p>}
		</div>
	);
};

const MapContent = ({ pinClickHandler }) => {
	return (
		<div className="map-container">
			<Pin
				clickHandler={(e) => {
					pinClickHandler('pin 1');
				}}
			>
				Pin 1
			</Pin>
			{/* <button
				onClick={(e) => {
					pinClickHandler('pin 1');
				}}
			>
				Fake pin 1
			</button> */}
			<button
				onClick={(e) => {
					pinClickHandler('pin 2');
				}}
			>
				Fake pin 2
			</button>
		</div>
	);
};

const Pin = ({ clickHandler, children }) => {
	return <button onClick={clickHandler}>{children}</button>;
};

export default App;
