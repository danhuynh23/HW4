import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function YAxis(props) {
    const { yScale, height, axisLabel } = props;
    const ref = useRef();

    useEffect(() => {
        if (yScale) {
            const isLinearScale = typeof yScale.domain()[0] === 'number';
            const axis = isLinearScale ? d3.axisLeft(yScale) : d3.axisLeft(yScale).tickValues(yScale.domain());
            d3.select(ref.current).call(axis);
        }
    }, [yScale]);

    return (
        <g ref={ref}>
            {/* Adjusted position for label, using x and y explicitly */}
            <text 
                x={0} 
                y={height / 16}
                style={{ textAnchor: 'end', fontSize: '15px', fill: 'black' , fontFamily:  '"Times New Roman", Georgia, serif'}} 
                transform="rotate(-90)"
                
            >
                {axisLabel}
            </text>
        </g>
    );
}

export default YAxis;
