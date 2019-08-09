import React, { useState } from 'react';
import './Counter.css';

import { Button } from './Button';

export function Counter({ initialValue, minValue = 0, maxValue = 12, onChange, children }) {
  const [ value, setValue ] = useState(initialValue);
  return (
    <div className="Counter">
      {children}
      <span className="Counter-label">{value === 0 ? '-' : value}</span>

      <Button className="Counter-button Counter-button-minus" onClick={() => {
        const newValue = Math.max(value - 1, minValue);
        setValue(newValue);
        onChange(newValue);
      }}>-</Button>

      <Button className="Counter-button" onClick={() => {
        const newValue = Math.min(value + 1, maxValue);
        setValue(newValue);
        onChange(newValue);
      }}>+</Button>

      {/* <Button className="Counter-button" onClick={() => {
        const newValue = Math.max(0, minValue);
        setValue(newValue);
        onChange(newValue);
      }}>x</Button> */}
    </div>
  );
}