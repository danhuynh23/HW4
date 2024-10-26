
import React, { useState } from 'react';

function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, onStationHover, onStationLeave} = props;

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;

    // Helper function to get the color based on selection
    const getColor = (station) => (station === selectedStation ? 'red' : 'steelblue');


    if(data){
        return <g>
            {/* {task:
                    1. remove this comments and put your code here
                    2. pay attention to the height of the bars, it should be height-yScale(d.start)} */}
            {data.map((d, index) => (
                    <rect
                        key={index}
                        x={xScale(d.station)}          // Positioning each bar's x using xScale based on category or other x value
                        y={yScale(d.start)}              // Positioning each bar's y based on yScale, which determines the top of the bar
                        width={xScale.bandwidth()}       // Width of each bar based on the xScale's bandwidth (for a band scale)
                        height={height - yScale(d.start)} // Calculating the bar height by subtracting yScale(d.start) from the total height
                        stroke="black"               // Border color
                        strokeWidth={1}              // Border thickness
                        fill={getColor(d.station)}             // Adjust color based on selection
                        onMouseEnter={() => onStationHover(d, event)}
                        onMouseOut={onStationLeave}
                    />
                ))}
            </g>
    } else {
        return <g></g>
    }
}

export default Bars