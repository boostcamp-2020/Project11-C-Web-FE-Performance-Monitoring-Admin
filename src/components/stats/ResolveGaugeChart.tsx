import React, { useEffect, useRef } from 'react';
import bb, { gauge } from 'billboard.js';

const ResolveGaugeChart = ({ rateData, name }) => {
  const resolveGaugeChartDiv = useRef(null);

  useEffect(() => {
    if (rateData) {
      const columns = [
        [name, (rateData.true / (rateData.true + rateData.false)) * 100],
      ];
      const types = {};
      types[name] = gauge();

      bb.generate({
        data: {
          columns,
          types,
        },
        bindto: resolveGaugeChartDiv.current,
      });
    }
  }, [rateData, name]);

  return <div ref={resolveGaugeChartDiv} />;
};

export default ResolveGaugeChart;
