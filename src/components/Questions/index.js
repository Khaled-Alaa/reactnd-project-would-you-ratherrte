import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";

import Question from "../Question";
import { withStyles } from "@material-ui/core/styles";

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

class Questions extends Component {
  state = {
    answered: false,
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value, answered: !this.state.answered });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  findUser = username => {
    return this.props.users[username];
  };
  render() {
    let polls;
    if (this.state.answered) {
      polls = this.props.polls.filter(
        poll =>
          poll.optionOne.votes.filter(vote => vote === this.props.loggedUser.id)
            .length > 0 ||
          poll.optionTwo.votes.filter(vote => vote === this.props.loggedUser.id)
            .length > 0
      );
    } else {
      polls = this.props.polls.filter(
        poll =>
          poll.optionOne.votes.filter(vote => vote === this.props.loggedUser.id)
            .length === 0 &&
          poll.optionTwo.votes.filter(vote => vote === this.props.loggedUser.id)
            .length === 0
      );
    }

    return (
      <Grid container className={styles.root} spacing={8} justify="center">
        <Grid item xs={10}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="Unanswered" />
            <Tab label="Answered" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <SwipeableViews
            axis="x"
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}>
            <Grid
              container
              className={styles.root}
              spacing={8}
              justify="center">
              {polls.map(q => {
                let user = this.findUser(q.author);
                return (
                  <Grid key={`${q.id} ${q.author}`} item xs={10}>
                    <Question
                      answerQuestion={false}
                      user={user}
                      question={q}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid
              container
              className={styles.root}
              spacing={8}
              justify="center">
              {polls.map(q => {
                let user = this.findUser(q.author);
                return (
                  <Grid key={`${q.id}`} item xs={10}>
                    <Question
                      answerQuestion={false}
                      user={user}
                      question={q}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </SwipeableViews>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ loggedUser, polls, users }) {
  return {
    loggedUser,
    polls: Object.keys(polls)
      .sort((a, b) => polls[b].timestamp - polls[a].timestamp)
      .map(key => polls[key]),
    users
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Questions));
