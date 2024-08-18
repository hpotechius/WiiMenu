import React, { useEffect, useState } from 'react';
import "./DateComponent.css";


function DateComponent(props) {
    const [date, setDate] = useState("Sat 23/02");

    useEffect(() => {
        function updateDate() {
            const now = new Date();
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = days[now.getDay()];
            const date = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            setDate(`${day} ${date}/${month}`);
            // document.getElementById('date').textContent = `${day} ${date}/${month}`;
        }
        updateDate();
      }, []);

    return (
        <div className="date">{date}</div>
    );
}

export default DateComponent;