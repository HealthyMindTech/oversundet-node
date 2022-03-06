import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';


export default function Chart(props) {
  const { measurements, data, measurementConfig } = props;
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
              {measurementConfig.config}
            </Label>
          </YAxis>
          <Tooltip formatter={measurementConfig.formatter} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
