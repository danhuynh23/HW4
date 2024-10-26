import React from 'react';
import Bars from './bars';       // Import Bars component
import YAxis from './yAxis';     // Import YAxis component
import XAxis from './xAxis';     // Import XAxis component
import * as d3 from "d3";


function BarChart(props){
    const {offsetX,xScale,yScale, offsetY, data, height, width,selectedStation, onStationHover, onStationLeave} = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return  <g transform={`translate(${offsetX}, ${offsetY})`}>
    
    {/* Render the Bars */}
    <Bars data={data} xScale={xScale} yScale={yScale} height={height} selectedStation={selectedStation}
                onStationHover={onStationHover}
                onStationLeave={onStationLeave}  />
    
    {/* Render Y-Axis with a label */}
    <YAxis yScale={yScale} height={height} axisLabel={"Bikers start from"} />
    
    {/* Render X-Axis */}
    <XAxis xScale={xScale} height={height} width={width} />
</g>
}

export default BarChart