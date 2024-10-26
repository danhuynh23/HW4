//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function XAxis(props){
    const { xScale, height, width, axisLabel} = props;
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    const ref = useRef();
    const isLinearScale = typeof xScale.domain()[0] === 'number';

    useEffect(() => {
        if (xScale) {
            const axis = isLinearScale 
            ? d3.axisBottom(xScale) 
            : d3.axisBottom(xScale).tickSize(0);
    
            d3.select(ref.current).call(axis); // Draws the axis based on the current xScale
        }
        if (!isLinearScale) {
            d3.select(ref.current).selectAll("text")
            .attr("transform", "rotate(75)")       // Rotate by -45 degrees for readability
            .style("text-anchor", "start")         // Center the text over the tick
            .attr("x", 5)                          // Adjust horizontal position after rotation
            .attr("y", 0)                          // Adjust vertical position
            .attr("dy", "0.35em");                  // Fine-tune vertical alignment

        }
    }, [xScale]);
    
    if(xScale) {
        return <g transform={`translate(0, ${height})`} ref={ref}>
        {/* //the if(xScale){...} means when xScale is not null, the component will return the x-axis; otherwise, it returns <g></g>
        //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
        //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete. */
        }{/* Render the axis label */}

            {/* Axis label with updated position and styling */}
            <text
                x={470}
                y={height - 370}  // Adjusted to ensure it's above the x-axis line
                textAnchor="middle"
                fill="black"
                style={{ textAnchor: 'middle', fontSize: '15px', fill: 'black' , fontFamily:  '"Times New Roman", Georgia, serif' }}
            >
                {axisLabel}
            </text>



        </g>
    }else {
    return <g></g>
}
}

export default XAxis