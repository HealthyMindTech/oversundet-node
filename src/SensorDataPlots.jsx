import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Grid, Paper, FormControl, FormLabel, Select, TextField, MenuItem, Button } from '@mui/material';
// import recharts from 'recharts';
import SensorDataPlot from './SensorDataPlot';
import constants from './constants';



export default function SensorDataPlots(props) {
  const { urlDeviceId } = props;
  const [deviceId, setDeviceId] = useState(urlDeviceId);
  const [granularity, setGranularity] = useState(constants.GRANULARITY[0].value);
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <Grid container sx={{ mb: 3 }}>
          <Grid item>
            {/* Form to enter the sensor ID (free text) and the granularity of the data (dropdown) */}
            <FormControl component="fieldset">
              <FormLabel component="legend" id="sensor-id-label">Sensor ID</FormLabel>
              <TextField 
                size="small"
                id="sensor-id" 
                label="Sensor ID" 
                value={deviceId}
                onChange={(event) => setDeviceId(event.target.value)}
              />
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend" id="granularity-select-label">Granularity</FormLabel>
              <Select
                size='small'
                labelId="granularity-select-label"
                id="granularity-select"
                value={granularity}
                onChange={(event) => setGranularity(event.target.value)}
              >
                {constants.GRANULARITY.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {/* Refresh button */}
            <Button variant="contained" color="primary" onClick={() => setRefresh(refresh + 1)}>
              Refresh
            </Button>
          </Grid>
        </Grid>
    <Grid container spacing={3}>
      {/* Chart */}
      {constants.MEASUREMENTS.map((measurements, index) => {
        return(
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
            }}
          >
            <SensorDataPlot
              measurements={measurements}
              granularity={granularity}
              deviceId={deviceId}
              refresh={refresh}
            />
          </Paper>
        </Grid>
        )
      })}
      
      
      
    </Grid>
  </>)
}


// class LineChart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.client = new Tsiclient();
//     this.measurements = [
//       'Temperature',
//       'Humidity',
//       'Noise',
//       'PM1',
//       'PM2.5',
//       'PM10',
//       'Mood',
//     ];

//     this.chart = null;
//     this.state = {
//       data: this.measurements.map(_ => {return {} }),
//       linesElement: null
//     };
//     this.measurements.forEach((measurement) => {
//       this.queryData(measurement);
//     });
//   }

//   queryData(measurement) {
//     const parameters = {
//       // device: '',
//       measure: measurement,
//       interval: 'PT1H',
//       fromTime: '2022-02-16T00:00:00Z',
//       toTime: '2022-02-17T00:00:00Z'
//     };
//     const url = new URL('https://oversundet-functions-apim.azure-api.net/oversundet-functions/GetOneSensor');
//     url.search = new URLSearchParams(parameters).toString();

//     fetch(url)
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         const formattedData = {};
//         data.timestamps.forEach((timestamp, index) => {
//           formattedData[timestamp] = {'avg': data.values[index]};
//         });
//         const prevData = this.state.data;
//         const measurementIndex = this.measurements.indexOf(measurement);
//         prevData[measurementIndex][`Factory${measurementIndex}`] = {'': formattedData};
//         this.setState({
//           data: prevData
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }


//   createFakeData() {
//     let numberOfBuckets = 120;
//     let data = [];
//     let from = new Date(Math.floor((new Date()).valueOf() / (1000 * 60 * 60)) * (1000 * 60 * 60));
//     let to;

//     for (let i = 0; i < 4; i++) {
//       let lines = {};
//       data.push({ [`Factory${i}`]: lines });
//       let values = {};
//       lines[``] = values;

//       for (let k = 0; k < numberOfBuckets; k++) {
//         to = new Date(from.valueOf() + 1000 * 60 * k);
//         let val = Math.random() * Math.pow(10, i);
//         values[to.toISOString()] = { avg: val };
//       }
//     }

//     return data;
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({
//         linesElement: document.getElementById("linechart")
//       });
//       this.queryData();
//     }, 1000);
//   }

//   render() {
//     if (this.state.linesElement !== null && this.state.data !== null) {
//       this.chart = !this.chart ? new this.client.ux.LineChart(this.state.linesElement) : this.chart;
//       this.chart.render(this.state.data, { theme: 'light', legend: 'compact', tooltip: 'true', swimLaneOptions: this.props.swimLaneOptions }, this.props.chartDataOptions)
//     }
//     return null;
//   }
// }

// const LabelChanger = props => {
//   return (
//     <div style={{ marginBottom: '10px' }}>
//       <label style={{ marginRight: '20px' }}>{`Swimlane ${props.lane} label`}</label>
//       <input type='text' placeholder={'Enter a label name'} value={props.label} onChange={(e) => props.handleLabelChange(e, props.lane)} />
//     </div>
//   )
// }

// const LaneChanger = props => {
//   return (
//     <div style={{ marginBottom: '10px' }}>
//       <label style={{ marginRight: '20px' }}>{`Factory ${props.idx} lane`}</label>
//       <select value={props.lane} onChange={(e) => props.handleLaneChange(e, props.idx)}>
//         <option value="0">Lane 0</option>
//         <option value="1">Lane 1</option>
//         <option value="2">Lane 2</option>
//         <option value="3">Lane 3</option>
//       </select>
//     </div>
//   )
// }

// const AxisChanger = props => {
//   return (
//     <div style={{ marginBottom: '10px' }}>
//       <label style={{ marginRight: '20px' }}>{`Swimlane ${props.lane} y-axis type`}</label>
//       <select value={props.yAxisType} onChange={(e) => props.handleAxisChange(e, props.lane)}>
//         <option value="shared">shared</option>
//         <option value="overlap">overlap</option>
//       </select>
//     </div>
//   )
// }

// const ControlPanel = props => {

//   const handleLabelChange = (e, lane) => {
//     let newLaneOptions = Object.assign({}, props.swimLaneOptions);
//     newLaneOptions[lane].label = e.target.value;
//     newLaneOptions[lane].onClick = () => alert(`'${e.target.value}' label/axis clicked`)
//     props.setSwimlaneOptions(newLaneOptions)
//   }

//   const handleLaneChange = (e, idx) => {
//     let newDataOptions = props.chartDataOptions.slice(0);
//     newDataOptions[idx].swimLane = Number(e.target.value);
//     props.setChartDataOptions(newDataOptions)
//   }

//   const handleAxisChange = (e, lane) => {
//     let newLaneOptions = Object.assign({}, props.swimLaneOptions);
//     newLaneOptions[lane].yAxisType = e.target.value;
//     props.setSwimlaneOptions(newLaneOptions)
//   }

//   return (
//     <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
//       <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
//         <div style={{ minWidth: '330px', marginRight: '20px' }}>
//           <h2>Change labels</h2>
//           {
//             Object.keys(props.swimLaneOptions).map(lane => {
//               return <LabelChanger key={lane} lane={lane} label={props.swimLaneOptions[lane]?.label} handleLabelChange={handleLabelChange} />
//             })
//           }
//         </div>
//         <div style={{ minWidth: '208px', marginRight: '20px' }}>
//           <h2>Select lanes</h2>
//           {
//             props.chartDataOptions.map((q, idx) => {
//               return <LaneChanger key={idx} idx={idx} lane={q.swimLane} handleLaneChange={handleLaneChange} />
//             })
//           }
//         </div>
//         <div style={{ minWidth: '248px', marginRight: '20px' }}>
//           <h2>Change lane y-axis</h2>
//           {
//             Object.keys(props.swimLaneOptions).map(lane => {
//               return <AxisChanger key={lane} lane={lane} yAxisType={props.swimLaneOptions[lane]?.yAxisType} handleAxisChange={handleAxisChange} />
//             })
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// const FancyButton = React.forwardRef((props, ref) => (
//   <div ref={ref} className="FancyButton">
//     {props.children}
//   </div>
// ));


// export default function SensorDataPlots (props) {
//   const [swimLaneOptions, setSwimlaneOptions] = useState({
//       0: {yAxisType: 'shared', label: 'Lane 0', onClick: () => alert("'Lane 0' label/axis clicked")},
//       1: {yAxisType: 'shared', label: 'Lane 1', onClick: () => alert("'Lane 1' label/axis clicked")},
//       2: {yAxisType: 'shared', label: 'Lane 2', onClick: () => alert("'Lane 2' label/axis clicked")},
//       3: {yAxisType: 'shared', label: 'Lane 3', onClick: () => alert("'Lane 3' label/axis clicked")},
//       4: {yAxisType: 'shared', label: 'Lane 4', onClick: () => alert("'Lane 4' label/axis clicked")},
//       5: {yAxisType: 'shared', label: 'Lane 5', onClick: () => alert("'Lane 5' label/axis clicked")},
//       6: {yAxisType: 'shared', label: 'Lane 6', onClick: () => alert("'Lane 6' label/axis clicked")},
//       7: {yAxisType: 'shared', label: 'Lane 7', onClick: () => alert("'Lane 7' label/axis clicked")},
//     })

//   const [chartDataOptions, setChartDataOptions] = useState([
//       {dataType: 'numeric', swimLane: 0}, 
//       {dataType: 'numeric', swimLane: 1}, 
//       {dataType: 'numeric', swimLane: 2},
//       {dataType: 'numeric', swimLane: 3},
//       {dataType: 'numeric', swimLane: 4},
//       {dataType: 'numeric', swimLane: 5},
//       {dataType: 'numeric', swimLane: 6},
//       {dataType: 'numeric', swimLane: 7},
//   ])

//   return(
//       <>
//           <div id="linechart"></div>
//           <LineChart swimLaneOptions={swimLaneOptions} chartDataOptions={chartDataOptions}/>
//           <ControlPanel swimLaneOptions={swimLaneOptions} setSwimlaneOptions={setSwimlaneOptions} chartDataOptions={chartDataOptions} setChartDataOptions={setChartDataOptions}/>
//       </>
//   )
// }