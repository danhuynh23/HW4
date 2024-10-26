function Tooltip(props) {
    const { d, x, y } = props;
    if (x === null || y === null || !d) {
        return null;
    }

    const divStyle = {
        position: "absolute",
        textAlign: "left",
        width: "150px",
        padding: "8px",
        font: "12px sans-serif",
        backgroundColor: "lightgreen",
        border: "1px solid gray",
        borderRadius: "8px",
        pointerEvents: "none",
        left: `${x + 10}px`,
        top: `${y + 10}px`,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
    };

    return (
        <div style={divStyle}>
            <p><strong>{d.station}</strong></p>
            <p>Trip durations:</p>
            <ul style={{ margin: 0, paddingLeft: "16px" }}>
                <li>End in: {d.tripdurationE}</li>
                <li>Start from: {d.tripdurationS}</li>
            </ul>
        </div>
    );
}

export default Tooltip;
