// components/LineChart.jsx
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const CostChart = () => {
  const chartRef = useRef(null);
  let myChart;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // If a chart instance exists, destroy it to avoid duplicates
      if (myChart) {
        myChart.destroy();
      }

      // Create a new chart
      myChart = new Chart(ctx, {
        type: 'line', // You can change the chart type (e.g., bar, pie, etc.)
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Price Chart',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, []);

  return (
    <>
        <div className=''>
        <canvas ref={chartRef}></canvas>
        </div>
    </>
  );
};

export default CostChart;
