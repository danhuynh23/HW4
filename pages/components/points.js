function Points({ data, xScale, yScale, selectedStation, onStationHover, onStationLeave }) {
    const getColor = (station) => (station === selectedStation ? 'red' : 'steelblue');
    const getRadius = (station) => (station === selectedStation ? 10 : 5);
    const getStrokewidth = (station) => (station === selectedStation ? 3 : 1);

    return (
        <g>
            {/* Render a yellow rectangle if a station is selected */}
            {selectedStation && (
                <rect
                    x={0}
                    y={0}
                    width={xScale.range()[1]}
                    height={yScale.range()[0]}
                    fill="yellow"
                    opacity={0.3}
                />
            )}

            {/* Render all points except the selected one */}
            {data.map((d, index) => 
                d.station !== selectedStation && (
                    <circle
                        key={index}
                        cx={xScale(d.tripdurationS)}
                        cy={yScale(d.tripdurationE)}
                        r={getRadius(d.station)}
                        fill={getColor(d.station)}
                        stroke="black"
                        strokeWidth={getStrokewidth(d.station)}
                        onMouseEnter={() => onStationHover(d, event)}
                        onMouseOut={onStationLeave}
                    />
                )
            )}

            {/* Render the selected point on top */}
            {selectedStation && data.map((d, index) => 
                d.station === selectedStation && (
                    <circle
                        key={`selected-${index}`}
                        cx={xScale(d.tripdurationS)}
                        cy={yScale(d.tripdurationE)}
                        r={getRadius(d.station)}
                        fill={getColor(d.station)}
                        stroke="black"
                        strokeWidth={getStrokewidth(d.station)}
                    />
                )
            )}
        </g>
    );
}

export default Points;
