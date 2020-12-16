import React from 'react';
import MainPoint from './MainPoint';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(80,100,150,0.3)',
    margin: '0.3rem',
    marginTop: '0',
    padding: '0.3rem',
    paddingTop: '0.5rem',
    color: 'white',
  },
}));

const getBrowserInfo = (tagArr: string[][]) => {
  const result = tagArr.filter(arr => arr.includes('browser'))[0];

  if (!result) return 'Unkown';
  return result[1];
};

const getNodeVersion = (tagArr: Array<string>[]) => {
  const result = tagArr.filter(arr => arr.includes('runtimeVersion'))[0];

  if (!result) return 'Unkown';
  return result[1];
};

const getOsInfo = (tagArr: Array<string>[]) => {
  const result = tagArr.filter(arr => arr.includes('osVersion'))[0];

  if (!result) return 'Unkown';
  return result[1];
};

const getTags = (tagArr: string[][]) => {
  const result: string[][] = tagArr.filter(
    arr =>
      !arr.includes('browser') &&
      !arr.includes('runtimeVersion') &&
      !arr.includes('osVersion') &&
      !arr.includes('body') &&
      !arr.includes('runtimeName')
  );

  return result;
};

const TagArea = (props: { tags: {} }) => {
  const classes = useStyles();
  const { tags } = props;
  const tagArr = Object.keys(tags).map(key => [key, tags[key]]);
  const browserInfo: string = getBrowserInfo(tagArr);
  const nodeVersion: string = getNodeVersion(tagArr);
  const osInfo: string = getOsInfo(tagArr);
  const etc: string[][] = getTags(tagArr);

  const getTagItem = tag => {
    if (tag[0] !== 'appVersion') {
      return (
        <Chip
          key={tag[0]}
          label={`${tag[0]} - ${tag[1]}`}
          className={classes.root}
        />
      );
    }

    return null;
  };

  return (
    <div>
      <MainPoint browser={browserInfo} nodeVersion={nodeVersion} os={osInfo} />
      {etc.map(tag => getTagItem(tag))}
    </div>
  );
};

export default TagArea;
