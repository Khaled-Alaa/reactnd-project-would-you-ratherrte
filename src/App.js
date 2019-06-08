import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Loggin from "./components/Loggin";
import NoMatch from "./components/NoMatch";
import Question from "./components/Question";
import Questions from "./components/Questions";
import Leaderboard from "./components/Leaderboard";
import Create from "./components/Create";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { initialData } from "../../redux/actions/shared";
import { withStyles } from "@material-ui/core/styles";
import { loggOut } from "../../redux/actions/loggedUser";

import style from "./App.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: "none"
  }
});

class App extends Component {
  componentDidMount() {
    this.props.initialData();
  }

  handleClick = event => {
    this.props.loggOut();
  };

  render() {
    return (
      <Router>
        <div>
          <Grid container className={styles.root} spacing={8} justify="center">
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <Grid
                    container
                    className={styles.root}
                    spacing={40}
                    justify="space-between">
                    <Grid item xs={2}>
                      {this.props.loggedUser ? (
                        <Link to="/">
                          <div>
                            <h3>{this.props.loggedUser.name}</h3>{" "}
                          </div>
                        </Link>
                      ) : (
                        <Link to="/">
                          <div>
                            <h3>Would you rather?</h3>
                          </div>
                        </Link>
                      )}
                    </Grid>

                    <Grid item xs={5}>
                      <div>
                        <Button>
                          <Link to="/leaderboard">
                            <h3>leaderboard</h3>
                          </Link>
                        </Button>
                        <Button>
                          <Link to="/add">
                            <h3>Create new Question</h3>
                          </Link>
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        {this.props.loggedUser ? (
                          <Button onClick={this.handleClick}>Logout</Button>
                        ) : null}
                      </div>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    this.props.loggedUser ? (
                      <Questions />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  path="/leaderboard"
                  render={() =>
                    this.props.loggedUser ? (
                      <Leaderboard />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  path="/add"
                  render={() =>
                    this.props.loggedUser ? (
                      <Create />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  path="/questions/:id"
                  render={({ match }) => {
                    if (this.props.loggedUser) {
                      let question = this.props.polls[match.params.id];
                      if(question){
                      	let user = this.props.users[question.author];
                        return (
                          <Question
                            question={question}
                            user={user}
                            answerQuestion={true}
                          />
                        );
                      }
                      else {
                        return <Redirect to="/nomatch" />
                      }    
                    } else {
                      return <Redirect to="/login" />;
                    }
                  }}
                />
                <Route path="/login" component={Loggin} />
				<Route path="/nomatch" component={NoMatch} />
                <Route component={NoMatch} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initialData: () => {
      dispatch(initialData());
    },
    loggOut: () => {
      dispatch(loggOut());
    }
  };
}
function mapStateToProps({ loggedUser, users, polls }) {
  return {
    loggedUser,
    users,
    polls
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
