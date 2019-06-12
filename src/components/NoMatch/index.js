import React from "react";

const NoMatch = ({ location }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
    <img
      src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/404-error.png"
      alt="from elegantthemes website"
      width="250"
    />
  	{
  		!location.pathname.includes('/nomatch')? <h3>No match for {location.pathname} route</h3>: <h3>This question does not exist</h3>
	}
  </div>
);

export default NoMatch;
