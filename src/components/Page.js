import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import "./Page.css";

function Page(props) {
    const [hoveredId, setHoveredId] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const [gridConfig, setGridConfig] = useState({ columns: 4, rows: 3 });
    const audioMenuRef = useRef(null);
    const pageRef = useRef(null);


    const imageUrls = props.idat.imageUrls;
    const webUrls = props.idat.urls;

    const svgData = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        x: (index % gridConfig.columns) * (100 / gridConfig.columns), // Dynamic columns
        y: Math.floor(index / gridConfig.columns) * (100 / gridConfig.rows), // Dynamic rows
        }));

    const handlePathClick = (id) => {
        setClickedId(id);
        const audioFile = process.env.PUBLIC_URL + "/" + props.idat.audioFiles[id];
        audioMenuRef.current = new Audio(audioFile);
        audioMenuRef.current.play();
    };


    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;

            if (innerWidth * 0.8 <= innerHeight && innerHeight <= innerWidth * 1.4) {
                setGridConfig({ columns: 3, rows: 4 });

            } else if (innerWidth * 1.4 <= innerHeight) {
                setGridConfig({ columns: 2, rows: 6 });

            } else {
                setGridConfig({ columns: 4, rows: 3 });

            }
        };
        pageRef.current.style.left = (props.position * 100) + 'vw';

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check



    }, []);

    return (
        <div id={props.id} className="page" ref={pageRef}>
            {svgData.map((data) => (
                <svg key={data.id} 
                    className={`svg_button ${clickedId === data.id ? 'maximized' : ''}`}
                    viewBox="-2 -2 104 54" 
                    // preserveAspectRatio="noxMidYmid meetne"
                    style={{
                        left: `${clickedId === data.id ? 0 : data.x}%`,
                        top: `${clickedId === data.id ? 0 : data.y}%`,
                        width: `${clickedId === data.id ? 100 : 100 / gridConfig.columns}%`,
                        height: `${clickedId === data.id ? 100 : 100 / gridConfig.rows}%`
                    }}>
                    <defs>
                        <pattern id={`gifPattern${data.id + 12 * props.position}`} patternUnits="userSpaceOnUse" width="100" height="100">
                            <image href={process.env.PUBLIC_URL + "/" + imageUrls[data.id]} x="0" y="-25" width="100" height="100" />
                        </pattern>
                        <clipPath id="clipPath">
                        <rect x="-2" y="35" width="104" height="20" /> 
                        </clipPath>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'grey', stopOpacity: 1 }} />
                        </radialGradient>
                    </defs>
                    <path id="menu_bar" d="M 10 0 Q 90 0 90 0 C 100 0 100 0 100 10
                                                Q 100 40 100 40 C 100 50 100 50 90 50 
                                                Q 10 50 10 50 C 0 50 0 50 0 40
                                                Q 0 10 0 10 C 0 0 0 0 10 0Z"
                                                stroke={hoveredId === data.id && clickedId !== data.id ? '#34beed' : clickedId === data.id ? '#000000' : '#b4b4b4'} 
                                                strokeWidth="1" 
                                                fill={`url(#gifPattern${data.id + 12 * props.position})`}
                                                opacity={imageUrls[data.id] === "gif/XyWT.gif" ? 0.5 : 1}
                                                onMouseEnter={() => setHoveredId(data.id)}
                                                onMouseLeave={() => setHoveredId(null)}
                                                onClick={() => {
                                                    setClickedId(data.id);
                                                    handlePathClick(data.id);
                                                    // pauseAudio();
                                                }}/>
                    <path d="M 10 0 Q 90 0 90 0 C 100 0 100 0 100 10
                                                Q 100 40 100 40 C 100 50 100 50 90 50 
                                                Q 10 50 10 50 C 0 50 0 50 0 40
                                                Q 0 10 0 10 C 0 0 0 0 10 0Z" 
                                                stroke='#000000'
                                                strokeWidth="1" 
                                                visibility={clickedId === data.id ? 'visible' : 'hidden'}
                                                fill="url(#grad1)"
                                                opacity={0.6}
                                                clipPath="url(#clipPath)"/>

                    
                    <g transform="translate(20, 38) scale(0.8)" opacity="0.5" onClick={() => {setClickedId(null);  audioMenuRef.current.pause();
                       }} visibility={clickedId === data.id ? 'visible' : 'hidden'}>
                        <path d="M 0 0 H 25 V 10 H 0 Z" fill="lightgrey" stroke="#34beed" strokeWidth="1"/>
                        <circle cx="0" cy="5" r="5" fill="lightgrey" stroke="#34beed" strokeWidth="1"/>
                        <circle cx="25" cy="5" r="5" fill="lightgrey" stroke="#34beed" strokeWidth="1"/>
                        <path d="M 0 0 H 25 V 10 H 0 Z" fill="lightgrey"/>
                        <circle cx="0" cy="5" r="5" fill="lightgrey"/>
                        <circle cx="25" cy="5" r="5" fill="lightgrey"/>
                        <text x="12" y="5" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="4" fontWeight="bold">Menu</text> 
                    </g>

                    <g transform="translate(60, 38) scale(0.8)" opacity="0.5" visibility={clickedId === data.id ? 'visible' : 'hidden'} onClick={() => window.location.href = webUrls[data.id]}>
                        <path d="M 0 0 H 25 V 10 H 0 Z" fill="lightgrey" stroke="#34beed" strokeWidth="1"/>
                        <circle cx="0" cy="5" r="5" fill="lightgrey" stroke="#34beed" strokeWidth="1"/>
                        <circle cx="25" cy="5" r="5" fill="lightgrey" stroke="#34beed" strokeWidth="1"/>
                        <path d="M 0 0 H 25 V 10 H 0 Z" fill="lightgrey"/>
                        <circle cx="0" cy="5" r="5" fill="lightgrey"/>
                        <circle cx="25" cy="5" r="5" fill="lightgrey"/>
                        <text x="12" y="5" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="4" fontWeight="bold">Start</text>
                    </g>

                    <text x="50" y="25" textAnchor="middle" dominantBaseline="middle" fill="#999999" fontSize="12" fontWeight="bold" opacity={0.3}></text>
                </svg>
            ))}


        </div>
    )
}

export default Page;