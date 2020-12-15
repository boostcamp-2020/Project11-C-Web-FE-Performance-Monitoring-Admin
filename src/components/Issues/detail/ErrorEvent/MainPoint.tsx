import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
const useStyles = makeStyles(theme => ({
  rootWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
  },
  root: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'rgba(108,0,197,0.2)',
    margin: '0.3rem',
    marginTop: '0',
    padding: '0.3rem',
    paddingTop: '0.5rem',
    color: 'white',
    height: 'fit-content',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '100%',
  },
  ImgLayout: {
    flex: '1 0 auto',
    alignSelf: 'center',
  },
  InfoLayout: {
    flex: '1 0 auto',
    alignSelf: 'center',
    marginTop: '5px',
    width: 'fit-content',
  },
}));

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

const getBrowserImg = (browserInfo: string) => {
  const imgPath = browserInfo.includes('Chrome')
    ? '../../../public/png/chrome.png'
    : browserInfo.includes('Edg')
    ? '../../../public/png/edge.png'
    : browserInfo.includes('Firefox')
    ? '../../../public/png/firefox.png'
    : browserInfo.includes('OPR')
    ? '../../../public/png/opera.png'
    : browserInfo.includes('Safari')
    ? '../../../public/png/safari.png'
    : '../../../public/png/unknown.png';

  return imgPath;
};

const getOsInfo = (os: string) => {
  console.log(os);
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

const MainPoin = ({ browser, nodeVersion, os }) => {
  const classes = useStyles();
  const checkBrowser: string = browserChecker(browser);
  const browserInfo: string[] = checkBrowser.split('/');
  const majorVersion: string =
    browserInfo.length > 1 ? browserInfo[1].split('.')[0] : '';
  const imgPath: string = getBrowserImg(checkBrowser);
  const osInfo: { name: string; imgPath: string } = getOsInfo(os);

  const getOsCard = info => {
    if (info.name !== 'Unkown') {
      return (
        <Card className={classes.root}>
          <div className={classes.details}>
            <img className={classes.ImgLayout} src={info.imgPath} height="30" />
            <p className={classes.InfoLayout}>{info.name}</p>
          </div>
        </Card>
      );
    }

    const reg = /\(.+?[\)]{2,}|\(.+?\)/g;
    const target: string = reg.exec(browser)[0];
    const platformInfo: string = target.substring(1, target.length - 1);
    const os: string = platformInfo
      .split(';')
      .filter(
        element =>
          element.includes('Linux') ||
          element.includes('Windows') ||
          element.includes('Mac')
      )[0];

    const result: { name: string; imgPath: string } = getOsInfo(os);
    return (
      <Card className={classes.root}>
        <div className={classes.details}>
          <img className={classes.ImgLayout} src={result.imgPath} height="30" />
          <p className={classes.InfoLayout}>{result.name}</p>
        </div>
      </Card>
    );
  };

  const getMiddleCard = (nodeVersion: string) => {
    if (nodeVersion !== 'Unkown') {
      return (
        <Card className={classes.root}>
          <div className={classes.details}>
            <img
              className={classes.ImgLayout}
              src="../../../public/png/nodeIcon.png"
              height="30"
            />
            <p className={classes.InfoLayout}>Node {nodeVersion}</p>
          </div>
        </Card>
      );
    }

    return (
      <Card className={classes.root}>
        <div className={classes.details}>
          <img
            className={classes.ImgLayout}
            src="../../../public/png/unkown.png"
            height="30"
          />
          <p className={classes.InfoLayout}>Unkown</p>
        </div>
      </Card>
    );
  };

  return (
    <div className={classes.rootWrapper}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <img className={classes.ImgLayout} src={imgPath} height="30" />
          <p className={classes.InfoLayout}>
            {' '}
            {`${browserInfo[0]} ${majorVersion}`}
          </p>
        </div>
      </Card>
      {getMiddleCard(nodeVersion)}
      {getOsCard(osInfo)}
    </div>
  );
};

export default MainPoin;
