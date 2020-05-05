import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Usa from '../USAMap/USAMap';
import WordCloud from './WordCloud';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import ResponsiveLine from './timeseries';
import State1Info from './stateInfo/state1';
import State2Info from './stateInfo/state2';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperHeighted: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: theme.spacing(50),
  },
  paperWidthConstricted: {
    padding: theme.spacing(1),
    alignContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(60),
  },
}));



export default connect(null)(USDashboard);

function USDashboard() {
  const [store, setStore] = React.useState('');
const classes = useStyles();
return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <State1Info />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><Usa /></Paper>
        </Grid>
        <Grid item xs>
          <State2Info />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}><WordCloud /></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><BarChart data={[5,10,11,23,12,13,20,11]} size={[500,500]} /></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
              <PieChart />
          </Paper>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paperHeighted}>
              <ResponsiveLine />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
