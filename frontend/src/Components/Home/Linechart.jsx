
import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchLeadStatistics } from '../../features/leads/statistics'; // Ensure the correct path

const Linechart = () => {
  const dispatch = useDispatch();
  // const { data, status } = useSelector((state) => state.leadStatistics);
  const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchLeadStatistics());
  // }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && data) {
      const currentDate = new Date(); // Get the current date
      const transformedData = data.hourlyLeadsCount.map(({ hour, count }) => ({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour), // Use current day
        leads: count,
      }));
      setChartData(transformedData);
    }
  }, [status, data]);

  const dateFormatter = new Intl.DateTimeFormat('en-US');
  const tooltip = {
    renderer: ({ title, datum, xKey, yKey }) => ({
      title,
      content: `${dateFormatter.format(datum[xKey])}: ${datum[yKey]}`,
    }),
  };

  const options = {
    data: chartData,
    title: {
      text: "Hourly Leads",
    },
    series: [
      {
        type: 'line',
        xKey: 'date',
        yKey: 'leads',
        tooltip,
      },
    ],
    axes: [
      {
        position: 'bottom',
        type: 'time',
        title: {
          text: 'Time',
        },
        label: {
          format: '%H:%M', // Format as hours and minutes
        },
      },
      {
        position: 'left',
        type: 'number',
        title: {
          text: 'Leads',
        },
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

export default Linechart;
