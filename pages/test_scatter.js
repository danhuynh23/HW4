import React from 'react';
import * as d3 from "d3";
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container } from 'react-bootstrap';
import ScatterPlot from './components/scatterPlot';

const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv';

function useData(csvPath) {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = React.useState('4');
    const dataAll = useData(csvUrl);
    if (!dataAll) {
        return <pre>Loading...</pre>;
    }

    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35 };
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter(d => d.month === MONTH[month]);

    // Scatter plot scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice();
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeight, 0])
        .nice();

    const changeHandler = (event) => {
        setMonth(event.target.value);
    };

    return (
        <Container>
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler} />
                    <input key="monthText" type="text" value={MONTH[month]} readOnly />
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot 
                            offsetX={margin.left} 
                            offsetY={margin.top} 
                            data={data} 
                            xScale={xScale} 
                            yScale={yScale}
                            height={innerHeight} 
                            width={innerWidth}
                        />
                    </svg>
                </Col>
            </Row>
        </Container>
    );
}

export default Charts;
