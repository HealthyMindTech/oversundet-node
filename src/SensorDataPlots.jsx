import React, { useState, useRef } from 'react';
import TsiClient from "tsiclient";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.client = new TsiClient();
    this.chart = null;

    this.state = {
      data: this.createFakeData(),
      linesElement: null
    }
  }

  queryData() {
    const token = ;
    const environmentFqdn;
    const tsxObject = {};
    const resp = tsiClient.server.getEvents(token, environmentFqdn, tsxObject)
    .then(function(result){
        console.log(result)
    })

  createFakeData() {
    let numberOfBuckets = 120;
    let data = [];
    let from = new Date(Math.floor((new Date()).valueOf() / (1000 * 60 * 60)) * (1000 * 60 * 60));
    let to;

    for (let i = 0; i < 4; i++) {
      let lines = {};
      data.push({ [`Factory${i}`]: lines });
      let values = {};
      lines[``] = values;

      for (let k = 0; k < numberOfBuckets; k++) {
        to = new Date(from.valueOf() + 1000 * 60 * k);
        let val = Math.random() * Math.pow(10, i);
        values[to.toISOString()] = { avg: val };
      }
    }

    return data;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        linesElement: document.getElementById("linechart")
      })
    }, 1000);
  }

  render() {
    if (this.state.linesElement !== null) {
      this.chart = !this.chart ? new this.client.ux.LineChart(this.state.linesElement) : this.chart;
      this.chart.render(this.state.data, { theme: 'light', legend: 'compact', tooltip: 'true', swimLaneOptions: this.props.swimLaneOptions }, this.props.chartDataOptions)
    }
    return null;
  }
}

const LabelChanger = props => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ marginRight: '20px' }}>{`Swimlane ${props.lane} label`}</label>
      <input type='text' placeholder={'Enter a label name'} value={props.label} onChange={(e) => props.handleLabelChange(e, props.lane)} />
    </div>
  )
}

const LaneChanger = props => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ marginRight: '20px' }}>{`Factory ${props.idx} lane`}</label>
      <select value={props.lane} onChange={(e) => props.handleLaneChange(e, props.idx)}>
        <option value="0">Lane 0</option>
        <option value="1">Lane 1</option>
        <option value="2">Lane 2</option>
        <option value="3">Lane 3</option>
      </select>
    </div>
  )
}

const AxisChanger = props => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ marginRight: '20px' }}>{`Swimlane ${props.lane} y-axis type`}</label>
      <select value={props.yAxisType} onChange={(e) => props.handleAxisChange(e, props.lane)}>
        <option value="shared">shared</option>
        <option value="overlap">overlap</option>
      </select>
    </div>
  )
}

const ControlPanel = props => {

  const handleLabelChange = (e, lane) => {
    let newLaneOptions = Object.assign({}, props.swimLaneOptions);
    newLaneOptions[lane].label = e.target.value;
    newLaneOptions[lane].onClick = () => alert(`'${e.target.value}' label/axis clicked`)
    props.setSwimlaneOptions(newLaneOptions)
  }

  const handleLaneChange = (e, idx) => {
    let newDataOptions = props.chartDataOptions.slice(0);
    newDataOptions[idx].swimLane = Number(e.target.value);
    props.setChartDataOptions(newDataOptions)
  }

  const handleAxisChange = (e, lane) => {
    let newLaneOptions = Object.assign({}, props.swimLaneOptions);
    newLaneOptions[lane].yAxisType = e.target.value;
    props.setSwimlaneOptions(newLaneOptions)
  }

  return (
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '330px', marginRight: '20px' }}>
          <h2>Change labels</h2>
          {
            Object.keys(props.swimLaneOptions).map(lane => {
              return <LabelChanger key={lane} lane={lane} label={props.swimLaneOptions[lane]?.label} handleLabelChange={handleLabelChange} />
            })
          }
        </div>
        <div style={{ minWidth: '208px', marginRight: '20px' }}>
          <h2>Select lanes</h2>
          {
            props.chartDataOptions.map((q, idx) => {
              return <LaneChanger key={idx} idx={idx} lane={q.swimLane} handleLaneChange={handleLaneChange} />
            })
          }
        </div>
        <div style={{ minWidth: '248px', marginRight: '20px' }}>
          <h2>Change lane y-axis</h2>
          {
            Object.keys(props.swimLaneOptions).map(lane => {
              return <AxisChanger key={lane} lane={lane} yAxisType={props.swimLaneOptions[lane]?.yAxisType} handleAxisChange={handleAxisChange} />
            })
          }
        </div>
      </div>
    </div>
  )
}

const FancyButton = React.forwardRef((props, ref) => (
  <div ref={ref} className="FancyButton">
    {props.children}
  </div>
));


export default function SensorDataPlots (props) {
  const [swimLaneOptions, setSwimlaneOptions] = useState({
      0: {yAxisType: 'shared', label: 'Lane 0', onClick: () => alert("'Lane 0' label/axis clicked")},
      1: {yAxisType: 'shared', label: 'Lane 1', onClick: () => alert("'Lane 1' label/axis clicked")},
      2: {yAxisType: 'shared', label: 'Lane 2', onClick: () => alert("'Lane 2' label/axis clicked")},
      3: {yAxisType: 'shared', label: 'Lane 3', onClick: () => alert("'Lane 3' label/axis clicked")}
  })

  const [chartDataOptions, setChartDataOptions] = useState([
      {dataType: 'numeric', swimLane: 0}, 
      {dataType: 'numeric', swimLane: 1}, 
      {dataType: 'numeric', swimLane: 2},
      {dataType: 'numeric', swimLane: 3},
  ])

  return(
      <>
          <div id="linechart"></div>
          <LineChart swimLaneOptions={swimLaneOptions} chartDataOptions={chartDataOptions}/>
          <ControlPanel swimLaneOptions={swimLaneOptions} setSwimlaneOptions={setSwimlaneOptions} chartDataOptions={chartDataOptions} setChartDataOptions={setChartDataOptions}/>
      </>
  )
}