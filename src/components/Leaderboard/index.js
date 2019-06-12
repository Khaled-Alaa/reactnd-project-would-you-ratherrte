import React, { Component } from "react";
import { connect } from "react-redux";

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
  },
  item: {
    textAlign: "center"
  }
});

class Leaderboard extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.setState({
      users: this.props.users
        ? [
            ...Object.keys(this.props.users)
              .sort((a, b) => {
                return (
                  Object.keys(this.props.users[b].answers).length -
                  Object.keys(this.props.users[a].answers).length
                );
              })
              .sort((a, b) => {
                return (
                  this.props.users[b].questions.length -
                  this.props.users[a].questions.length
                );
              })
          ]
        : []
    });
  }

  render() {
    return (
      <Grid
        container
        className={styles.root}
        spacing={8}
        justify="center"
        alignItems="center">
        {this.state.users.map(user => (
          <Grid item xs={10} className={styles.item}>
            <Paper className={styles.paper}>
              <Avatar
                src={this.props.users[user].avatarURL}
                className={styles.avatar}
              />
              <h3>{this.props.users[user].id}</h3>
              <h3>
                {Object.keys(this.props.users[user].answers).length} answers
              </h3>
              <h3>{this.props.users[user].questions.length} questions </h3>
              <h3>{this.props.users[user].name}</h3>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
}

function mapStateToProps({ loggedUser, users }) {
  return {
    loggedUser,
    users
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Leaderboard));
