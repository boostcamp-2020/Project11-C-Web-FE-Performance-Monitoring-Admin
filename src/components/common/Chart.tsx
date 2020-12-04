import React, { useEffect, useRef } from 'react';
import bb, { area } from 'billboard.js';

const Chart = () => {
  const chartDiv = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        columns: [['data1', 300, 350, 300, 0, 0, 0]],
        types: {
          data1: area(),
        },
      },
      bindto: chartDiv.current,
    });
  }, []);

  return <div ref={chartDiv} />;
};

export default Chart;
