const MEASUREMENTS = [
  {
    label: 'Temperature',
    unit: '°C',
    subMeasurements: [
      {
        label: 'Temperature',
        name: 'Temperature',
      }
    ],
  },
  {
    label: 'Humidity',
    unit: '%',
    subMeasurements: [
      {
        label: 'Humidity',
        name: 'Humidity',
      }
    ],
  },
  {
    label: 'Noise',
    unit: 'dB',
    subMeasurements: [
      {
        label: 'Noise',
        name: 'Noise',
      }
    ],
  },
  {
    label: 'Air Particulate Matter',
    unit: 'µg/m³',
    subMeasurements: [
      {
        label: 'PM1',
        name: 'PM1',
      },
      {
        label: 'PM2.5',
        name: 'PM2.5',
      },
      {
        label: 'PM10',
        name: 'PM10',
      },
    ],
  },
  {
    label: 'Mood',
    unit: '',
    subMeasurements: [
      {
        label: 'Mood',
        name: 'Mood',
      },
    ],
  }
]

const DATA_URL = 'ASD';

export default {
  MEASUREMENTS,
  DATA_URL,
};