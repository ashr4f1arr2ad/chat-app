import React from "react";
import classes from "./Spinner.module.css";

export default function LoadingSpinner({styles}) {
  return (
    <div className={classes.spinner_container} style={styles}>
      <div className={classes.loading_spinner}>
      </div>
    </div>
  );
}