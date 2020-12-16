import React, { useEffect, useRef } from 'react';
import bb, { bar } from 'billboard.js';
import styled from 'styled-components';

const ChartDiv = styled.div`
  height: 5rem;
`;

const browserChecker = (browser: string) => {
  const infoList: string[] = browser.split(' ');
  if (
    infoList[infoList.length - 1].includes('OPR') ||
    infoList[infoList.length - 1].includes('Firefox') ||
    infoList[infoList.length - 1].includes('Edg')
  ) {
    return infoList[infoList.length - 1];
  }

  if (infoList.length > 1) {
    if (infoList[infoList.length - 2].includes('Chrome')) {
      return infoList[infoList.length - 2];
    } else if (
      infoList[infoList.length - 2].includes('Mobile') &&
      infoList[infoList.length - 1].includes('Safari')
    ) {
      return infoList[infoList.length - 1];
    }
  }

  return 'Unknown';
};

const getOsInfo = (os: string) => {
  const basePath: string = '../../../public/png/';
  if (os.includes('Windows')) {
    const version = os.split(' ')[1];
    return {
      name: `Windows ${version}`,
      imgPath: basePath + 'window.png',
    };
  } else if (os.includes('Ubuntu')) {
    return {
      name: `Ubuntu`,
      imgPath: basePath + 'ubuntu.png',
    };
  } else if (os.includes('Ubuntu')) {
    return {
      name: `Mac`,
      imgPath: basePath + 'apple.png',
    };
  }

  return {
    name: `Unkown`,
    imgPath: 'none',
  };
};

const TagBarChart = ({ tagName, tagData }) => {
  const tagBarChartDiv = useRef(null);

  useEffect(() => {
    if (tagData) {
      const columns = [];
      const types = {};
      const groups = [];

      // if (tagName === 'browser') {
      //   tagData.forEach(element => {
      //     element.name = browserChecker(element.name);
      //   });
      // }
      columns.push(['x', tagName]);
      tagData.forEach(item => {
        if (tagName === 'browser') {
          const name = browserChecker(item.value[0]);
          columns.push([name, item.value[1]]);
          types[name] = bar();
          groups.push(name);
        } else {
          columns.push(item.value);
          types[item.name] = bar();
          groups.push(item.name);
        }
      });
      bb.generate({
        data: {
          x: 'x',
          columns,
          types,
          groups: [groups],
          stack: {
            normalize: true,
          },
        },
        axis: {
          rotated: true,
          x: {
            type: 'category',
            show: false,
          },
          y: {
            show: false,
          },
        },
        bar: { width: 15 },
        bindto: tagBarChartDiv.current,
      });
    }
  }, [tagData]);

  return <ChartDiv ref={tagBarChartDiv} />;
};

export default TagBarChart;
