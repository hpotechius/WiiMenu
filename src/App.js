import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import Page from './components/Page';
import Clock from './components/Clock';
import DateComponent from './components/DateComponent';
import FrameComponent from './components/FrameComponent';
import idata from './data/data.json';
import ArrowComponent from './components/ArrowComponent';
import { useSwipeable } from 'react-swipeable';


function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const containerRef = useRef(null);
    const wheelTimeout = useRef(null);
    const isScrolling = useRef(false);
    const [itemdata, setItemdata] = useState(idata);
    const [itemdata2, setItemdata2] = useState(idata);
    const [itemdata3, setItemdata3] = useState(idata);
    const [itemdata4, setItemdata4] = useState(idata);


    const handleSwipedLeft = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, 3)); // Assuming there are 2 pages
    };

    const handleSwipedRight = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleSwipedLeft,
        onSwipedRight: handleSwipedRight,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true, // Enable mouse tracking for swipe gestures
        

    });

    useEffect(() => {        // Fetch data.json
        fetch(process.env.PUBLIC_URL + "/data/data.json")
            .then(response => response.json())
            .then(data => setItemdata(data))
            .catch(error => console.error('Error fetching data.json:', error));


        fetch(process.env.PUBLIC_URL + "/data/data2.json")
            .then(response => response.json())
            .then(data => setItemdata2(data))
            .catch(error => console.error('Error fetching data2.json:', error));

        fetch(process.env.PUBLIC_URL + "/data/data3.json")
            .then(response => response.json())
            .then(data => setItemdata3(data))
            .catch(error => console.error('Error fetching data3.json:', error));

        fetch(process.env.PUBLIC_URL + "/data/data4.json")
            .then(response => response.json())
            .then(data => setItemdata4(data))
            .catch(error => console.error('Error fetching data4.json:', error));

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);


    const handleWheel = (event) => {
        //event.preventDefault(); // Prevent default scrolling behavior

        if (isScrolling.current) {
            return; // Ignore wheel events if a page change is in progress
        }

        isScrolling.current = true;

        if (event.deltaY > 0) {
            setCurrentPage(prevPage => Math.min(prevPage + 1, 3)); // Increment page index, max 3
        } else {
            setCurrentPage(prevPage => Math.max(prevPage - 1, 0)); // Decrement page index, min 0
        }

        wheelTimeout.current = setTimeout(() => {
            isScrolling.current = false; // Reset the scrolling flag
        }, 500); // Adjust the debounce delay as needed
    };
    
    // const handleMouseDown = (e) => {
    //     setDragging(true);
    //     setStartX(e.clientX);
    // };

    // const handleMouseMove = (e) => {
    //     if (!dragging) return;
    //     const deltaX = e.clientX - startX;
    //     setOffsetX(deltaX);
    // };

    // const handleMouseUp = () => {
    //     setDragging(false);
    //     if (offsetX > 50) {
    //         setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    //     } else if (offsetX < -50) {
    //         setCurrentPage(prevPage => Math.min(prevPage + 1, 3));
    //     }
    //     setOffsetX(0);
    // };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className="App">

            {/* <div id="background"/> */}

            <Clock/>
            <DateComponent/>
            <FrameComponent/>

            <div {...handlers} className="pages-container" style={{ display: 'flex', transform: `translateX(-${currentPage * 100}vw)`, transition: 'transform 0.5s ease', zIndex:1000}}
                            // onMouseDown={handleMouseDown}
                            // onMouseMove={handleMouseMove}
                            // onMouseUp={handleMouseUp}
                            // onMouseLeave={handleMouseUp}
                            >
                <Page id="page1" position={0} idat={itemdata} />
                <Page id="page2" position={1} idat={itemdata2} />
                <Page id="page3" position={2} idat={itemdata3} />
                <Page id="page4" position={3} idat={itemdata4} />
            </div>


        </div>
    );
}

export default App;
