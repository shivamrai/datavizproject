import React, { useState, useEffect, state ,setState} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import PieHooks from "./PieHooks";
import "./styles.css";
import Select from '@material-ui/core/Select';
import { makeStyles, FormControl, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function PieChart() {
  const classes = useStyles();
  const generateData = (value, length = 2) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const [state, setState] = React.useState({age: '',});
  const changeData = () => {
    setData(generateData());
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return (
    <div className="App">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      </div>
      <div>
        <span className="label">Hooks</span>  
        <PieHooks
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </div>
  );
}
