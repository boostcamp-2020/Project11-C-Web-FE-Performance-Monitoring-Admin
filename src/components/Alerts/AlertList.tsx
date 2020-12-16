import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AlertApi from '@utils/AlertApi';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import styled from 'styled-components';
import { Avatar, Chip } from '@material-ui/core';

const TitleContainer = styled.div`
  font-size: 1.2rem;
  border-width: 0.1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  border: none;
  color: #f1f1f1;

  & > h2 {
    color: #f1f1f1;
    margin: 0.6rem;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: #3ab2e2;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const RectangleChip = styled(Link)`
  border-radius: 0;
  color: #f1f1f1;
  font-size: 1rem;
  width: 150px;
`;

const useRowStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontSize: '1.5rem',
    borderWidth: '0.1rem',
    borderColor: 'rgba(255,255,255,0.1)',
    border: 'none',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: '1.5rem',
    paddingTop: '1rem',
    borderWidth: '0.1rem',
    borderColor: 'rgba(255,255,255,0.1)',
    border: 'none',
  },
  cell: {
    fontSize: '1rem',
    color: '#f1f1f1 !important',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  row: {
    '&:hover': {
      background: '#d43838',
    },
  },
});

function Row(props: { row: any }) {
  const { row } = props;

  const classes = useRowStyles();

  return (
    <>
      <TableRow
        component={StyledLink}
        to={`/projects/issues/detail/${row.issue}`}
        className={classes.row}
        style={{
          backgroundColor:
            row.alertType.type > 0
              ? 'rgba(77,179,228,0.3)'
              : 'rgba(255,89,89,0.3) ',
        }}
      >
        <TableCell align="center" className={classes.cell}></TableCell>
        <TableCell
          align="center"
          component="th"
          scope="row"
          className={classes.cell}
        >
          {row.alertType.type > 0 ? (
            <Chip
              component={RectangleChip}
              label={row.alertType.name}
              icon={
                <InfoOutlinedIcon color="primary" style={{ color: 'white' }} />
              }
              style={{ backgroundColor: '#2b70be' }}
            />
          ) : (
            <Chip
              component={RectangleChip}
              label={row.alertType.name}
              icon={
                <InfoOutlinedIcon color="primary" style={{ color: 'white' }} />
              }
              style={{ backgroundColor: '#ec5151' }}
            />
          )}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          {row.alertType.title}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          <StyledLink to={`/projects/issues/${row.project._id}`}>
            {row.project.title}
          </StyledLink>
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          {!row.from ? (
            'SYSTEM'
          ) : (
            <Chip
              avatar={<Avatar src={row.from.imageURL} />}
              label={row.from.name}
            />
          )}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          {new Date(row.createdAt).toLocaleString()}
        </TableCell>
      </TableRow>
    </>
  );
}

const AlertListTable = () => {
  const [alertList, setAlertList] = useState([]); // 이슈 상세정보
  const classes = useRowStyles();
  async function initData() {
    const res = await AlertApi.getLoginUserAlertList();
    setAlertList(res);
  }

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <TitleContainer>
        <h2>ALERT LIST</h2>
      </TitleContainer>
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell align="center" className={classes.cell} />
              <TableCell align="center" className={classes.cell}>
                TYPE
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                TITLE
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                PROJECT
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                FROM
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                DATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.cell}>
            {alertList.map(row => (
              <Row row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AlertListTable;
