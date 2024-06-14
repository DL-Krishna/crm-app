import { AgChartsReact } from 'ag-charts-react';
import React, { useState } from 'react'

const LineCharts = ({ xLable, yLable }: { xLable?: any, yLable?: any }) => {

  const Top3Services = [
    { ratingreceived: '10am', spatreatments: 60, },
    { ratingreceived: '11am', spatreatments: 40, },
    { ratingreceived: '12am', spatreatments: 50, },
    { ratingreceived: '01am', spatreatments: 30, },
    { ratingreceived: '02am', spatreatments: 0, },
    { ratingreceived: '03am', spatreatments: 50, },
    { ratingreceived: '04am', spatreatments: 60, },
    { ratingreceived: '05am', spatreatments: 40, },
    { ratingreceived: '06am', spatreatments: 50, },
    { ratingreceived: '07am', spatreatments: 90, },
  ]

  const [options, setOptions] = useState<any>({
    height: 408,
    data: Top3Services,
    theme: {
      overrides: {
        line: {
          series: {
            highlightStyle: {
              series: {
                strokeWidth: 3,
                dimOpacity: 0.2,
              },
            },
          },
        },
      },
    },
    title: {
      text: 'Today Leads',
      fontSize: 18,
      spacing: 25,
    },
    footnote: {
      text: '',
    },
    series: [
      {
        type: 'line',
        xKey: 'ratingreceived',
        yKey: 'spatreatments',
        yName: "Today Leads",
        stroke: '#605BFF',
        marker: {
          stroke: '#605BFF',
          fill: '#605BFF',
        },
        // tooltip,
      },
    ],
    axes: [
      {
        position: 'bottom',
        type: 'data',
        tick: {
          // interval: time.month.every(2),
        },
        title: {
          text: 'data',
        },
        base: 0,
        label: {
          autoRotate: true,
        },
      },
      {
        position: 'left',
        type: 'number',
        title: {
          text: 'Price in pence',
        },
        base: 0,
        label: {
          autoRotate: true,
        },
      },
    ],
  });
  return (
    <div className="w-full " >
      <div className='relative'>
        {xLable && <span className='absolute z-10 rotate-[270deg] bottom-2/4 -left-[45px]'>{xLable}</span>}
        {yLable && <span className='absolute z-10 bottom-[15px] left-2/4'>{yLable}</span>}
        <AgChartsReact options={options} />
      </div>
    </div>
  )
}

export default LineCharts