import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import axios from "axios";
import Countries from "./dropDownData"

// const Countries = [
//   { label: "California", value: "CA" },
//   { label: "Argentina", value: 54 },
//   { label: "Austria", value: 43 },
//   { label: "Cocos Islands", value: 61 },
//   { label: "Kuwait", value: 965 },
//   { label: "Sweden", value: 46 },
//   { label: "Venezuela", value: 58 }
// ];


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
  createData("Severe accidents", "32.81 %"),
];

export default function State1() {
  const classes = useStyles();
  const [data,setData] = React.useState(rows);

  function onDropDownChange(e){
    console.log(e);
    
    axios.post(`http://127.0.0.1:5000/stateStats/${e.value}`,{
      }).then((response) => {
        setData(response.data.result);
      });
  
  }

console.log(rows);
  
  return (
    <Grid container spacing = {1} >
      <Grid item xs>
        <br />
        <div className="col-md-6">
          <Select options={Countries} onChange = {(e) => onDropDownChange(e)}/>
        </div>
      </Grid>
      <Grid item xs>
        <TableContainer component={Paper}>
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
      </Grid>
    </Grid>
  );
}
