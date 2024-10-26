import React from 'react';
import Points from './points';
import YAxis from './yAxis';
import XAxis from './xAxis';

function ScatterPlot(props){
    const { offsetX, offsetY, data, xScale, yScale, height, width, selectedStation, onStationHover, onStationLeave } = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    console.log("ScatterPlot offsets:", offsetX, offsetY);

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
           <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width} selectedStation={selectedStation}
                onStationHover={onStationHover}
                onStationLeave={onStationLeave} />
           <YAxis yScale={yScale} height={height} axisLabel="Trip duration end in"/>
           <XAxis xScale={xScale} height={height} width={width} axisLabel="Trip duration start from"/>
        </g>
}

export default ScatterPlot