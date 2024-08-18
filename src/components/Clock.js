import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import "./Clock.css";

function Clock(props) {
    const [time, setTime] = useState("00:00");


    useEffect(() => {
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = now.getSeconds();
            const colon = seconds % 2 === 0 ? ':' : ' '; // Toggle colon visibility
            // document.getElementById('clock').textContent = `${hours}${colon}${minutes}`;
            setTime(`${hours}${colon}${minutes}`);
        }
        setInterval(updateClock, 1000); // Update the clock every second
        updateClock();
    }, []);

    return (
        <div className="clock">{time}</div>
    )
}

export default Clock