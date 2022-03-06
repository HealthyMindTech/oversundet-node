const MEASUREMENTS = [
  {
    label: 'Temperature',
    unit: '°C',
    subMeasurements: [
      {
        label: 'Temperature',
        name: 'Temperature',
        formatter: (value) => value.toFixed(2),
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
        formatter: (value) => value.toFixed(2),
      }
    ],
  },
  {
   label: 'Pressure',
    unit: 'hPa',
    subMeasurements: [
      {
        label: 'Pressure',
        name: 'Pressure',
        formatter: (value) => value.toFixed(0),
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
        formatter: (value) => value.toFixed(0),
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
        formatter: (value) => value.toFixed(2),
      },
      {
        label: 'PM2.5',
        name: 'PM2.5',
        formatter: (value) => value.toFixed(2),
      },
      {
        label: 'PM10',
        name: 'PM10',
        formatter: (value) => value.toFixed(2),
      },
    ],
  },
  {
    label: 'Mood',
    unit: 'Mood Points',
    subMeasurements: [
      {
        label: 'Mood',
        name: 'Mood',
      },
    ],
  }
];

const GRANULARITY = [
  {
    label: '1 minute',
    value: 'PT1M',
  },
  {
    label: '5 minutes',
    value: 'PT5M',
  },
  {
    label: '1 hour',
    value: 'PT1H',
  },
  {
    label: '12 hours',
    value: 'PT12H',
  },
  {
    label: '1 day',
    value: 'P1D',
  }
];

const ONESENSOR_DATA_URL = 'https://extendedsenses-api.azure-api.net/oversundet-functions/GetOneSensor';
const constants = {
  MEASUREMENTS,
  ONESENSOR_DATA_URL,
  GRANULARITY,
};

export default constants;
