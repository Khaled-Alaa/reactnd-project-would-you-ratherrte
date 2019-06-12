import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { createQuestion } from "../../redux/actions/polls";

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Create extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleClick = () => {
    this.props.createQuestion({
      ...this.state,
      author: this.props.loggedUser.id
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <Grid
        container
        className={styles.root}
        justify="center"
        alignItems="center">
        <Paper className={styles.paper}>
          <Grid item xs={12}>
            <div>Would you rather?</div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="optionOneText"
              label="optionOne"
              className={styles.textField}
              margin="normal"
              value={this.state.optionOne}
              onChange={this.handleChange("optionOneText")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="optionTwoText"
              label="optionTwo"
              className={styles.textField}
              margin="normal"
              value={this.state.optionTwo}
              onChange={this.handleChange("optionTwoText")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.handleClick}> create question</Button>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    createQuestion: info => {
      dispatch(createQuestion(info));
    }
  };
}
function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Create))
);
