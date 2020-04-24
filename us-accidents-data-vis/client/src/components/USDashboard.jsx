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


const useStyles = makeStyles((theme) => ({
root: {
flexGrow: 6,
},
paper: {
padding: theme.spacing(2),
textAlign: 'center',
color: theme.palette.text.secondary,
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
<Paper className={classes.paper}><Usa /></Paper>
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
      </Grid>
    </div>
  );


// return (
// <div className={classes.root}>
// <br />
// <Grid container spacing={3}>
// <Grid item xs>
// <Paper className={classes.paper}>US map here</Paper>
// </Grid>
// </Grid>
// <Grid container spacing={3}>
// <Grid item xs>
// <Paper className={classes.paper}>xs</Paper>
// </Grid>
// <Grid item xs={6}>
// <Paper className={classes.paper}>xs=6</Paper>
// </Grid>
// <Grid item xs>
// <Paper className={classes.paper}>xs</Paper>
// </Grid>
// </Grid>
// </div>
// );
}
