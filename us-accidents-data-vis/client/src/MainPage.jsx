import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import USDashboard from "./components/USDashboard";
import CaliforniaDashboard from "./components/CaliforniaDashboard";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// const routes = {
//     '/USDashboard': () => <USDashboard />,
//     '/CaliforniaDashboard': () => <CaliforniaDashboard />,
// };

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: theme.spacing(7)
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        height: theme.spacing(1)
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.root}> 
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" className={classes.title}>
                        Road Accidents Data
                    </Typography>
                    <Button color="inherit">About</Button>
                </Toolbar>
            </AppBar>
            <CssBaseline />
            <Router>
                <Container align="center">
                    <Switch>
                        <Route exact path="/USDashboard" component={USDashboard}>
                            <USDashboard />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}
