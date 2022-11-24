import './test.css'
import React, { useState } from 'react';
import Calendar from 'react-calendar';

function Test() {
    const [value, onChange] = useState(new Date());

    return (
        <div className='Calendar'>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
}
export default Test;