import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function XAxis(props) {
    const { xScale, height, width, axisLabel } = props;
    const ref = useRef();

    // Determine if xScale is linear (for scatter plots) or discrete (for bar charts)
    const isLinearScale = xScale && typeof xScale.domain()[0] === 'number';

    useEffect(() => {
        // Only render the axis if xScale is defined
        if (xScale) {
            const axis = isLinearScale 
                ? d3.axisBottom(xScale) 
                : d3.axisBottom(xScale).tickSize(0);

            // Render the axis
            d3.select(ref.current).call(axis);

            // Additional styling for discrete scales (e.g., rotating text for readability)
            if (!isLinearScale) {
                d3.select(ref.current).selectAll("text")
                    .attr("transform", "rotate(75)") // Rotate for discrete labels
                    .style("text-anchor", "start")   // Align text for readability
                    .attr("x", 5)                    // Adjust horizontal position after rotation
                    .attr("y", 0)                    // Adjust vertical position
                    .attr("dy", "0.35em");           // Fine-tune vertical alignment
            }
        }
    }, [xScale, isLinearScale]);

    if (!xScale) {
        return <g></g>; // Render an empty group if xScale is undefined
    }

    return (
        <g transform={`translate(0, ${height})`} ref={ref}>
            {/* Render the axis label with fixed position */}
            <text
                x={470}               // Fixed x-position for the label
                y={height - 370}      // Fixed y-position, above the x-axis line
                textAnchor="middle"
                fill="black"
                style={{
                    fontSize: '15px',
                    fontFamily: '"Times New Roman", Georgia, serif'
                }}
            >
                {axisLabel}
            </text>
        </g>
    );
}

export default XAxis;
