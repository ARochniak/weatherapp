import React from 'react';

const Hours = () => {
  const hoursCells = [];
  for (let i = 0; i < 8; i++) {
    hoursCells.push(<div key={i}>{2 + i*3}</div>)
  }
  return <>{hoursCells}</>;
}

export default Hours;