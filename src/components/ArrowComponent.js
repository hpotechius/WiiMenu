
import "./ArrowComponent.css";

function ArrowComponent(props) {
    return (
        <>
            {props.direction === 'right' && (
                <svg className="svg_triangle_right" viewBox="0 0 100 100" preserveAspectRatio="xMidYmid meet">
                    <path id='triangle_path' d="M 0 -50 Q 60 50 60 50 Q 0 150 0 150 Z"
                        fill='#adf7ff'
                        stroke='#193285'
                        strokeWidth="10"/>
                </svg>
            )}
            {props.direction === 'left' && (
                <svg className="svg_triangle_left" viewBox="0 0 100 100" preserveAspectRatio="xMidYmid meet">
                    <path id='triangle_path' d="M 100 -50 Q 100 150 100 150  Q 40 50 40 50 Z"
                        fill='#adf7ff'
                        stroke='#193285'
                        strokeWidth="10"/>
                </svg>
            )}
        </>
    );
}

export default ArrowComponent;