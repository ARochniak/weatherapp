import React from 'react';

const weakDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesdey', 'Thursday', 'Friday', 'Saturday'];

const Days = (props) => {
	const days = [<div key={0}>Today</div>];
	let today = new Date (props.today);
	const daysCount = today.getHours !== 2 ? 5 : 4;
	for (let i = 0; i < daysCount; i++) {
	 	days.push(<div key={i+1}>{weakDays[today++ % 7]}</div>)
	 } 
	return <>{days}</>;
}

export default Days;