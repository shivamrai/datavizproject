import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {connect} from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 300
  }
});

function createData(name, value) {
  return { name, value};
}

const rows = [
  createData("Name", "California"),
  createData("Code", "CA"),
  createData("Rank", 1),
  createData("Number of Accidents", 663204),
  createData("Severe accidents", "22%"),
];

function State2({ user }) {
  const classes = useStyles();

  const [data, setData] = useState(rows);
  const [localUser, setLocalUser] = useState("");

  if(localUser !== user){

    axios.post(`http://127.0.0.1:5000/stateStats/${user}`,{
    }).then((response) => {
      console.log(rows);
      console.log(response.data.result);
      setData(response.data.result);
      setLocalUser(user);
    });
}

  return (
    
    <TableContainer component={Paper}>
      <span className="label">{user}</span>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Attribute</TableCell>
          <TableCell align="right">Value&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(State2);