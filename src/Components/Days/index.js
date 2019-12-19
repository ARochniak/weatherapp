import React from 'react';

const weakDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesdey', 'Thursday', 'Friday', 'Saturday'];

const Days = (props) => {
	const days = [<div key={0}><span>Today</span></div>];
	let today = new Date (props.today);
	const daysCount = today.getHours() !== 2 ? 5 : 4;
  today = today.getDay();
	for (let i = 0; i < daysCount; i++) {
	 	days.push(<div key={i+1}><span>{weakDays[++today % 7]}</span></div>)
	 } 
	return <>{days}</>;
}

export default Days;