import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const lineColors = ['#3498db', '#1abc9c', '#2ecc71']

export default function Chart(props) {
  const { measurements, data, measurementConfig, dateFormat } = props;
  const theme = useTheme();

  return (
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
          {measurements.map((item, index) => {
            return (
              <Line
                type="monotone"
                dataKey={item.name}
                // stroke={theme.palette.primary.main}
                key={item.name}
                stroke={lineColors[index]}
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
            width={30}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body2,
                // fontSize: '0.9rem',
              }}
            >
              {/* {`${measurementConfig.label}: ${measurementConfig.unit}`} */}
              {measurementConfig.label}
            </Label>
          </YAxis>
          <Tooltip formatter={
                     (value) => `${measurementConfig.formatter(value)} ${measurementConfig.unit}` } labelFormatter={(value) => moment(value).format('MM/DD HH:mm')}
          />
          {measurements.length > 1 &&
              <Legend />
          }
        </LineChart>
      </ResponsiveContainer>
  );
}
