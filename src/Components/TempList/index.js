import React from 'react';

const TempList = (props) => {
  const tempList = list => {
    const cells = [];
    const startHour = new Date (list[0].dt * 1000).getHours();
    const emptyCellsCount = (startHour - 2) / 3;
    for (let i = 0; i < emptyCellsCount; i++) {
      cells.push(<div key={i}></div>);
    }
      
    list.forEach( (weather, key) => {
      const imgSrc = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
      const temp = weather.main.temp;
      cells.push(
        <div key={key + emptyCellsCount}>
          <span>{Math.round(temp - 273.15, 2)}</span>
          <img src={imgSrc} alt={weather.weather[0].description}/>
        </div>  
      )
    })
    for (let i = 0; i < 8-emptyCellsCount; i++) {
      cells.push(<div key={emptyCellsCount+40+i}></div>);
    }
    return cells;
  }
	return <>{tempList(props.list)}</>;
}

export default TempList;