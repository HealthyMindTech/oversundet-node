import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';


export default function Chart(props) {
  const { measurements, data, measurementConfig, dateFormat } = props;
  const theme = useTheme();

  return (
    <React.Fragment>
      
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          >
          {measurements.map(item => {
            return (
              <Line
                type="monotone"
                dataKey={item.name}
                stroke={theme.palette.primary.main}
                key={item.name}
              />
            )
          }
          )}
          <XAxis
            dataKey="timestamp"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            //Format to date and time
            tickFormatter={(value) => moment(value).format(dateFormat)} // Depends on granularity
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {measurementConfig.unit}
            </Label>
          </YAxis>
          <Tooltip formatter={(value) => `${measurementConfig.formatter(value)} ${measurementConfig.unit}` } labelFormatter={(value) => moment(value).format('MM/DD HH:mm')}/>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
