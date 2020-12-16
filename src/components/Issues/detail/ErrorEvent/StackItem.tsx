import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TagArea from './TagArea';

const useStyles = makeStyles(theme => ({
  demo: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  listItem: {
    borderWidth: '0.1rem',
    borderColor: 'rgba(255,255,255,0.1)',
    borderBottomStyle: 'solid',
  },
  rightBar: {
    float: 'right',
  },
  accordion: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: '0.1rem',
    borderColor: 'rgba(255,255,255,0.1)',
    borderBottomStyle: 'solid',
    color: 'white',
  },
  accordionSummary: {
    border: 'none',
    marginBottom: '0',
    marginTop: '0',
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0',
    marginBottom: '0',
    paddingTop: '0',
  },
  expandIcon: {
    color: 'white',
  },
  errorLineContainer: {
    backgroundColor: '#DF013A',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
}));

const StackItem = ({ stack, code, line, errorRoot, tags }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');

  const unExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const errorLine: number = 5;

  const sourceCode =
    code.length !== 0 ? (
      code.map(function (value, idx, array) {
        if (idx === errorLine) {
          return (
            <div className={classes.errorLineContainer}>
              {' '}
              {`${line[idx]}: ${value}`}
              <br />
            </div>
          );
        }
        return (
          <div>
            {' '}
            {`${line[idx]}: ${value}`}
            <br />
          </div>
        );
      })
    ) : (
      <p>이 프로젝트는 코드를 확인할 수 없습니다.</p>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <div className={classes.demo}>
          <List>
            <Accordion
              className={classes.accordion}
              expanded={expanded === 'panel1'}
              onChange={unExpand('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accordionSummary}
              >
                <ListItemText primary={errorRoot} />
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <p>{sourceCode}</p>
              </AccordionDetails>
            </Accordion>
            {stack.map((line, index, array) => (
              <ListItem className={classes.listItem} key={index}>
                <ListItemText primary={line} />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      <Grid item xs={4} className={classes.rightBar}>
        <TagArea tags={tags} />
      </Grid>
    </Grid>
  );
};

export default StackItem;
