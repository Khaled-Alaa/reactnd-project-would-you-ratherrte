import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loadInitialUsers } from "../../redux/actions/loggedUser";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "auto"
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: "none"
  },
  Avatar: {
    width: 60,
    height: 60,
    float: "left"
  }
});

class Loggin extends Component {
  state = {
    user: null
  };
  handleChoose = user => {
    this.setState({ user });
  };
  handleSubmit = event => {
    this.props.loadInitialUsers(this.state.user);
    if (this.state.user) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <Grid
        container
        className={styles.root}
        spacing={0}
        justify="center"
        alignItems="center">
        {this.props.users ? (
          <Grid item xs={8}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div>
                  sign in as:{" "}
                  {this.state.user ? this.state.user.name : "Choose a user"}
                </div>
              </Grid>
              <Grid item xs={12}>
                {Object.keys(this.props.users).map(user => (
                  <Paper
                    onClick={() => this.handleChoose(this.props.users[user])}
                    key={user}>
                    <Avatar
                      src={this.props.users[user].avatarURL}
                      className={styles.avatar}
                    />
                    <div>{this.props.users[user].name}</div>
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}>
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <div>Loading ....</div>
          </Grid>
        )}
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadInitialUsers: user => {
      dispatch(loadInitialUsers(user));
    }
  };
}

function mapStateToProps({ loggedUser, users }) {
  return {
    loggedUser,
    users
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Loggin)));
