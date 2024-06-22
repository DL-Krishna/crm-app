export function getData() {
  const data = [
    {
      date: new Date(2019, 0, 7),
      petrol: 120.27,
      diesel: 130.33,
      lowerPetrol: 119.8,
      upperPetrol: 120.7,
      lowerDiesel: 130.0,
      upperDiesel: 131.5,
    },
    {
      date: new Date(2019, 0, 14),
      petrol: 119.53,
      diesel: 129.47,
      lowerPetrol: 119.0,
      upperPetrol: 120.0,
      lowerDiesel: 128.5,
      upperDiesel: 130.5,
    },
    {
      date: new Date(2019, 0, 21),
      petrol: 119.12,
      diesel: 128.92,
      lowerPetrol: 118.5,
      upperPetrol: 119.8,
      lowerDiesel: 128.0,
      upperDiesel: 129.5,
    },
    {
      date: new Date(2019, 0, 28),
      petrol: 119.29,
      diesel: 129.1,
      lowerPetrol: 118.0,
      upperPetrol: 120,
      lowerDiesel: 128.7,
      upperDiesel: 130.5,
    },
    {
      date: new Date(2019, 1, 4),
      petrol: 119.13,
      diesel: 129.13,
      lowerPetrol: 118.5,
      upperPetrol: 119.9,
      lowerDiesel: 129.0,
      upperDiesel: 131.0,
    },
    {
      date: new Date(2019, 1, 11),
      petrol: 118.97,
      diesel: 129.17,
      lowerPetrol: 118.5,
      upperPetrol: 119.6,
      lowerDiesel: 129.0,
      upperDiesel: 131.5,
    },
    {
      date: new Date(2019, 1, 18),
      petrol: 119.05,
      diesel: 129.23,
      lowerPetrol: 118.5,
      upperPetrol: 119.6,
      lowerDiesel: 129.0,
      upperDiesel: 131.0,
    },
    {
      date: new Date(2019, 1, 25),
      petrol: 119.22,
      diesel: 129.66,
      lowerPetrol: 118.9,
      upperPetrol: 119.7,
      lowerDiesel: 129.0,
      upperDiesel: 131.0,
    },
    {
      date: new Date(2019, 2, 4),
      petrol: 119.72,
      diesel: 130.25,
      lowerPetrol: 119.4,
      upperPetrol: 120.2,
      lowerDiesel: 129.0,
      upperDiesel: 131.5,
    },
    {
      date: new Date(2019, 2, 11),
      petrol: 120.1,
      diesel: 130.59,
      lowerPetrol: 119.9,
      upperPetrol: 120.6,
      lowerDiesel: 130.3,
      upperDiesel: 131.3,
    },
    {
      date: new Date(2019, 2, 18),
      petrol: 120.48,
      diesel: 130.85,
      lowerPetrol: 119.2,
      upperPetrol: 120.9,
      lowerDiesel: 130.5,
      upperDiesel: 131.5,
    },
    {
      date: new Date(2019, 2, 25),
      petrol: 120.83,
      diesel: 131.15,
      lowerPetrol: 119.5,
      upperPetrol: 121.1,
      lowerDiesel: 130.5,
      upperDiesel: 131.7,
    },
    {
      date: new Date(2019, 3, 1),
      petrol: 121.7,
      diesel: 131.48,
      lowerPetrol: 120.4,
      upperPetrol: 123.0,
      lowerDiesel: 131.0,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 3, 8),
      petrol: 122.75,
      diesel: 132.08,
      lowerPetrol: 121.5,
      upperPetrol: 123.2,
      lowerDiesel: 131.5,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 3, 15),
      petrol: 124.06,
      diesel: 132.96,
      lowerPetrol: 122.8,
      upperPetrol: 125.5,
      lowerDiesel: 132.0,
      upperDiesel: 133.5,
    },
    {
      date: new Date(2019, 3, 22),
      petrol: 125.43,
      diesel: 133.99,
      lowerPetrol: 124.1,
      upperPetrol: 126.7,
      lowerDiesel: 133.0,
      upperDiesel: 134.0,
    },
    {
      date: new Date(2019, 3, 29),
      petrol: 126.36,
      diesel: 134.6,
      lowerPetrol: 126.0,
      upperPetrol: 127.5,
      lowerDiesel: 134.0,
      upperDiesel: 135.0,
    },
    {
      date: new Date(2019, 4, 6),
      petrol: 127.5,
      diesel: 135.41,
      lowerPetrol: 127.1,
      upperPetrol: 128.8,
      lowerDiesel: 135.0,
      upperDiesel: 136.0,
    },
    {
      date: new Date(2019, 4, 13),
      petrol: 127.97,
      diesel: 135.36,
      lowerPetrol: 126.7,
      upperPetrol: 129.2,
      lowerDiesel: 135.0,
      upperDiesel: 136.0,
    },
    {
      date: new Date(2019, 4, 20),
      petrol: 128.51,
      diesel: 135.82,
      lowerPetrol: 128.0,
      upperPetrol: 129.8,
      lowerDiesel: 135.0,
      upperDiesel: 136.0,
    },
    {
      date: new Date(2019, 4, 27),
      petrol: 129.14,
      diesel: 136.45,
      lowerPetrol: 128.9,
      upperPetrol: 129.4,
      lowerDiesel: 136.0,
      upperDiesel: 137.0,
    },
    {
      date: new Date(2019, 5, 3),
      petrol: 129.41,
      diesel: 136.39,
      lowerPetrol: 129.1,
      upperPetrol: 129.7,
      lowerDiesel: 136.0,
      upperDiesel: 137.0,
    },
    {
      date: new Date(2019, 5, 10),
      petrol: 128.89,
      diesel: 135.4,
      lowerPetrol: 128.6,
      upperPetrol: 129.1,
      lowerDiesel: 135.0,
      upperDiesel: 136.0,
    },
    {
      date: new Date(2019, 5, 17),
      petrol: 127.66,
      diesel: 133.76,
      lowerPetrol: 127.3,
      upperPetrol: 128.0,
      lowerDiesel: 133.0,
      upperDiesel: 134.0,
    },
    {
      date: new Date(2019, 5, 24),
      petrol: 126.66,
      diesel: 131.81,
      lowerPetrol: 126.3,
      upperPetrol: 127.0,
      lowerDiesel: 130.5,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 6, 1),
      petrol: 126.49,
      diesel: 131.55,
      lowerPetrol: 126.2,
      upperPetrol: 126.8,
      lowerDiesel: 131.0,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 6, 8),
      petrol: 126.86,
      diesel: 131.68,
      lowerPetrol: 126.6,
      upperPetrol: 127.1,
      lowerDiesel: 131.5,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 6, 15),
      petrol: 127.13,
      diesel: 131.86,
      lowerPetrol: 126.9,
      upperPetrol: 127.4,
      lowerDiesel: 130.8,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 6, 22),
      petrol: 127.81,
      diesel: 132.21,
      lowerPetrol: 127.6,
      upperPetrol: 128.1,
      lowerDiesel: 131.8,
      upperDiesel: 133.9,
    },
    {
      date: new Date(2019, 6, 29),
      petrol: 128.03,
      diesel: 132.6,
      lowerPetrol: 127.8,
      upperPetrol: 128.3,
      lowerDiesel: 131.6,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 7, 5),
      petrol: 128.37,
      diesel: 132.61,
      lowerPetrol: 128.1,
      upperPetrol: 128.6,
      lowerDiesel: 132.0,
      upperDiesel: 133.2,
    },
    {
      date: new Date(2019, 7, 12),
      petrol: 128.36,
      diesel: 132.59,
      lowerPetrol: 128.1,
      upperPetrol: 128.6,
      lowerDiesel: 132.3,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 7, 19),
      petrol: 128.17,
      diesel: 132.6,
      lowerPetrol: 127.9,
      upperPetrol: 128.4,
      lowerDiesel: 132.0,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 7, 26),
      petrol: 128.22,
      diesel: 132.51,
      lowerPetrol: 128.0,
      upperPetrol: 128.4,
      lowerDiesel: 132.0,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 8, 2),
      petrol: 127.86,
      diesel: 132.29,
      lowerPetrol: 127.6,
      upperPetrol: 128.1,
      lowerDiesel: 132.0,
      upperDiesel: 133.0,
    },
    {
      date: new Date(2019, 8, 9),
      petrol: 127.79,
      diesel: 131.89,
      lowerPetrol: 127.6,
      upperPetrol: 128.1,
      lowerDiesel: 131.5,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 8, 16),
      petrol: 126.92,
      diesel: 131.35,
      lowerPetrol: 126.7,
      upperPetrol: 127.2,
      lowerDiesel: 131.0,
      upperDiesel: 131.7,
    },
    {
      date: new Date(2019, 8, 23),
      petrol: 126.78,
      diesel: 131.52,
      lowerPetrol: 126.5,
      upperPetrol: 127.0,
      lowerDiesel: 131.0,
      upperDiesel: 131.7,
    },
    {
      date: new Date(2019, 8, 30),
      petrol: 126.92,
      diesel: 131.83,
      lowerPetrol: 126.7,
      upperPetrol: 127.2,
      lowerDiesel: 131.0,
      upperDiesel: 131.85,
    },
    {
      date: new Date(2019, 9, 7),
      petrol: 126.87,
      diesel: 131.82,
      lowerPetrol: 126.6,
      upperPetrol: 127.1,
      lowerDiesel: 131.0,
      upperDiesel: 131.88,
    },
    {
      date: new Date(2019, 9, 14),
      petrol: 126.62,
      diesel: 131.58,
      lowerPetrol: 126,
      upperPetrol: 126.9,
      lowerDiesel: 131.2,
      upperDiesel: 131.9,
    },
    {
      date: new Date(2019, 9, 21),
      petrol: 126.72,
      diesel: 131.48,
      lowerPetrol: 126.5,
      upperPetrol: 127.0,
      lowerDiesel: 131.2,
      upperDiesel: 131.9,
    },
    {
      date: new Date(2019, 9, 28),
      petrol: 126.75,
      diesel: 131.47,
      lowerPetrol: 126.5,
      upperPetrol: 127.0,
      lowerDiesel: 131.2,
      upperDiesel: 131.9,
    },
    {
      date: new Date(2019, 10, 4),
      petrol: 127.07,
      diesel: 131.6,
      lowerPetrol: 126.9,
      upperPetrol: 127.2,
      lowerDiesel: 131.3,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 10, 11),
      petrol: 127.03,
      diesel: 131.58,
      lowerPetrol: 126.9,
      upperPetrol: 127.2,
      lowerDiesel: 131.3,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 10, 18),
      petrol: 127.01,
      diesel: 131.57,
      lowerPetrol: 126.8,
      upperPetrol: 127.1,
      lowerDiesel: 131.3,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 10, 25),
      petrol: 127.09,
      diesel: 131.6,
      lowerPetrol: 126.9,
      upperPetrol: 127.2,
      lowerDiesel: 131.3,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 11, 2),
      petrol: 127.02,
      diesel: 131.55,
      lowerPetrol: 126.8,
      upperPetrol: 127.1,
      lowerDiesel: 131.3,
      upperDiesel: 132.0,
    },
    {
      date: new Date(2019, 11, 9),
      petrol: 126.78,
      diesel: 131.36,
      lowerPetrol: 126.6,
      upperPetrol: 127.0,
      lowerDiesel: 131.2,
      upperDiesel: 131.9,
    },
    {
      date: new Date(2019, 11, 16),
      petrol: 126.56,
      diesel: 131.2,
      lowerPetrol: 126.4,
      upperPetrol: 126.9,
      lowerDiesel: 131.1,
      upperDiesel: 131.8,
    },
    {
      date: new Date(2019, 11, 23),
      petrol: 126.4,
      diesel: 131.07,
      lowerPetrol: 126.2,
      upperPetrol: 126.7,
      lowerDiesel: 131.0,
      upperDiesel: 131.7,
    },
    {
      date: new Date(2019, 11, 30),
      petrol: 126.19,
      diesel: 130.88,
      lowerPetrol: 125.9,
      upperPetrol: 126.4,
      lowerDiesel: 130.8,
      upperDiesel: 131.3,
    },
  ];
  return data;
}

export default getData