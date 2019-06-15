import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import { Link } from "react-router-dom";
import { answerQuestion } from "../../redux/actions/polls";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  Avatar: {
    width: 60,
    height: 60
  },
  link: {
    color: "blue"
  }
};

class Question extends Component {
  answerQuestion = answer => {
    this.props.answerQuestion({
      answer,
      qid: this.props.question.id,
      authedUser: this.props.loggedUser.id
    });
  };
  isAnswered = answer => {
    return answer
      ? this.props.question[answer].votes.filter(
        user => user === this.props.loggedUser.id
      ).length > 0
      : this.props.question.optionOne.votes.filter(
        user => user === this.props.loggedUser.id
      ).length > 0 ||
      this.props.question.optionTwo.votes.filter(
        user => user === this.props.loggedUser.id
      ).length > 0;
  };

  render() {
    const { question, answerQuestion, user } = this.props;
    return (
      <Paper className={styles.paper}>
        <Grid container className={styles.root} spacing={8} justify="center">
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={6}>
            <h2>Would You Rather ?</h2>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              className={styles.root}
              spacing={8}
              justify="space-around">
              <Grid item xs={5}></Grid>
              <Grid item xs={1}>
                <Avatar
                  alt={user.name}
                  src={user.avatarURL}
                  className={styles.avatar}
                />
              </Grid>
              <Grid item xs={6}>
                Posted by:
                {user.name}
              </Grid>
            </Grid>
          </Grid>
          {answerQuestion && !this.isAnswered() ? (
            <Grid item xs={12}>
              <Grid container className={styles.root} spacing={8}>
              <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <button
                    onClick={() => {
                      this.answerQuestion("optionOne");
                    }}
                    className="btn blue">
                    {question.optionOne.text}
                  </button>
                </Grid>
                <Grid item xs={3}>
                  <button
                    onClick={() => {
                      this.answerQuestion("optionTwo");
                    }}
                    className="btn red">
                    {question.optionTwo.text}
                  </button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
              <Grid item xs={12}>
                <Grid container className={styles.root} spacing={8}>
                  <Grid item xs={6}>
                    <div
                      className={`btn ${
                        this.isAnswered("optionOne") ? "red" : ""
                        }`}>
                      <h4>{question.optionOne.text}</h4>
                      <p>{question.optionOne.votes.length} person answered</p>
                      <p>
                        answeres % :
                      {(question.optionTwo.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                          100}
                        %
                    </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      className={`btn ${
                        this.isAnswered("optionTwo") ? "red" : ""
                        }`}>
                      <h4>{question.optionTwo.text}</h4>
                      <p>{question.optionTwo.votes.length} person answered</p>
                      <p>
                        answeres % :
                      {(question.optionTwo.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                          100}
                        %
                    </p>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            )}
        </Grid>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    answerQuestion: config => {
      dispatch(answerQuestion(config));
    }
  };
}
function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Question));
