import React, { useEffect, useState, useRef } from 'react';
import "./FrameComponent.css";

function FrameComponent(props) {
    const [isPlaying, setIsPlaying] = useState(false); // State to track audio play/pause

    const audioRef = useRef(null);
  
    const playAudio = () => {
      console.log('play');
      audioRef.current.play();
    };
  
    const pauseAudio = () => {
      audioRef.current.pause();
    };
  
    const toggleAudio = () => {
      console.log('toggle');
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    return (
        <div className="frame">
            <div id="background_stripes"></div>
            <audio ref={audioRef}>
                <source src={process.env.PUBLIC_URL + "/audio/WiiMenu.mp3"} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <svg id="svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <filter id="shadow" x="0%" y="-20%" width="100%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="0" floodColor="rgba(0,0,0,0.1)" />
                    </filter>
                </defs>
                <path className="menu_bar" d="M 0 0 Q 20 0 20 0 C 30 0 30 50 40 50 Q 60 50 60 50 C 70 50 70 0 80 0 Q 80 0 80 0 Q 100 0 100 0 Q 100 100 100 100 Q 0 100 0 100 Z" 
                fill="#d2d5db" />
                <path className="menu_bar" d="M 0 0 Q 20 0 20 0 C 30 0 30 50 40 50 Q 60 50 60 50 C 70 50 70 0 80 0 Q 80 0 80 0 Q 100 0 100 0 
                                    Q 100 3 100 3 Q 80 3 80 3 C 70 3 70 53 60 53 Q 40 53 40 53 C 30 53 30 3 20 3 Q 0 3 0 3 Z" 
                fill="#34beed" 
                filter="url(#shadow)"/>
            </svg>

            <svg id="svg_buttons" viewBox="0 0 100 100" preserveAspectRatio="xMidYmid meet">
                <circle cx="50" cy="50" r="40" fill="#d6d7dc" stroke="#b3b5bc" strokeWidth="2"/>
                <path   d="M -100 10 Q 50 10 50 10 Q 50 90 50 90 Q -100 90 -100 90 Z"  fill="#d6d7dc" stroke="#b3b5bc" strokeWidth="2"/>
                <circle cx="50" cy="50" r="39" fill="#d6d7dc"/>
                <circle cx="48" cy="49" r="35" fill="#bdbec3"/>
                <circle cx="45" cy="46" r="35" fill="#d6d7dc" stroke="#34beed" strokeWidth="2"/>
                <text x="45" y="46" textAnchor="middle" dominantBaseline="middle" fill="#999999" fontSize="22" fontWeight="bold">Wii</text>
            </svg>
            
            <svg id="svg_buttons2" viewBox="0 0 100 100" preserveAspectRatio="xMidYmid meet">
                <circle cx="50" cy="50" r="40" fill="#d6d7dc" stroke="#b3b5bc" strokeWidth="2"/>
                <path   d="M 500 10 Q 50 10 50 10 Q 50 90 50 90 Q 500 90 500 90 Z"  fill="#d6d7dc" stroke="#b3b5bc" strokeWidth="2"/>
                <circle cx="50" cy="50" r="39" fill="#d6d7dc"/>
                <circle cx="48" cy="49" r="35" fill="#bdbec3"/>
                <circle cx="45" cy="46" r="35" fill="#d6d7dc" stroke="#34beed" strokeWidth="2"/>
                <text x="45" y="46" textAnchor="middle" dominantBaseline="middle" fill="#999999" fontSize="22" fontWeight="bold">Test</text>
            </svg>


            <svg id="svg_buttons3" viewBox="0 0 100 100" preserveAspectRatio="xMidYmid meet" onClick={toggleAudio}>
                <circle cx="50" cy="50" r="25" fill="#d6d7dc" stroke="#34beed" strokeWidth="2"/>
                <image href={process.env.PUBLIC_URL + "/images/audio.png"} x="25" y="25" width="50" height="50" clipPath="circle(25px at 50% 50%)"/>
            </svg>
        </div>
    );
}

export default FrameComponent;