import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShippingIcon from "@material-ui/icons/LocalShipping";
import SupportIcon from "@material-ui/icons/ContactSupport";
import ReturnIcon from "@material-ui/icons/MonetizationOn";
import Divider from "@mui/material/Divider";

export default function About() {
  const styles = {
    largeIcon: {
      width: 30,
      height: 30,
      marginRight: 3,
    },
    backgroundImage: {
      width: "500px",
      borderRadius: 0,
      backgroundColor: "none",
    },
  };
  return (
    <section>
      <div className="landing-box">
        <div style={{ textAlign: "justify", alignItems: "start" }}>
          <h1>About Us</h1>
          <p style={{ color: "grey" }}>to contact us : number:16464748</p>
          <Link to="/products">Get Started Shopping</Link>
        </div>

        <img style={styles.backgroundImage} src="bg2.jpg" alt="landing-pic" />
      </div>
    </section>
  );
}
