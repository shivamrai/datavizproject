import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Usa from '../USAMap/USAMap';
import WordCloud from './WordCloud';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { Divider, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ResponsiveLine from './timeseries';
import State1Info from './stateInfo/state1';
import State2Info from './stateInfo/state2';
import stateName from "../data/stateCodes";

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
    width: theme.spacing(120),
  },
  paperWidthConstricted: {
    padding: theme.spacing(1),
    alignContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(60),
  },
  paperWidthLow: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(30),
  },
  paperWordCloud: {
    padding: theme.spacing(1),
    alignContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(50),
  },
  paperUSAMap: {
    padding: theme.spacing(1),
    alignContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(50),
  },
  paperBarChart: {
    padding: theme.spacing(1),
    alignContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(100),
  },
  orangeDiv:{
    color: "orange",
  },
  blueDiv:{
    color :"blue",
  },
}));


const mapStateToProps = state => ({
  user: state.userReducer.user,
});


export default connect(mapStateToProps)(USDashboard);

function USDashboard({user}) {
  const [store, setStore] = React.useState('');
const classes = useStyles();
return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
            <State1Info />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><div><br /></div><div><Usa /></div><div><Typography variant="h8">Currently selected state: {stateName[user]}</Typography></div><div></div></Paper>
        </Grid>
        <Grid item xs>
          <State2Info />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paperBarChart}><BarChart data={[5,10,11,23,12,13,20,11]} size={[700,600]} /></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paperWordCloud}><WordCloud /></Paper>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className={classes.paperHeighted}>
              <div>A Time Series line plot for different weather conditions, time is divided in Quarters</div> 
              <ResponsiveLine />
            </Paper>
          </Grid>
          <Grid item xs>
          <Paper className={classes.paperWidthLow}>
              <PieChart />
              <div>Legend:</div>
              <div className={classes.blueDiv}>Male</div>
              <div className={classes.orangeDiv}>Female</div>
          </Paper>
         </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

