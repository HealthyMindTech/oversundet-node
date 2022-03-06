const MEASUREMENTS = [
  {
    label: 'Temperature',
    unit: '°C',
    formatter: (value) => value.toFixed(2),
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
    formatter: (value) => value.toFixed(2),
    subMeasurements: [
      {
        label: 'Humidity',
        name: 'Humidity',
      }
    ],
  },
  {
   label: 'Pressure',
    unit: 'hPa',
    formatter: (value) => value.toFixed(0),
    subMeasurements: [
      {
        label: 'Pressure',
        name: 'Pressure',
      }
    ],
  },
  {
    label: 'Noise',
    unit: 'dB',
    formatter: (value) => value.toFixed(0),
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
    formatter: (value) => value.toFixed(2),
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
