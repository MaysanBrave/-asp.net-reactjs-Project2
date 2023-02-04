import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ShippingIcon from "@material-ui/icons/LocalShipping";
import SupportIcon from "@material-ui/icons/ContactSupport";
import ReturnIcon from "@material-ui/icons/MonetizationOn";
import CancelIcon from "@material-ui/icons/Cancel";
import Products from "./Products";
import { DataContext } from "./DataProvider";

export default function Home() {
  const value = useContext(DataContext);
  const [search, setSearch] = useState("");
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
        <div>
          <h1>
            Everything you need. Delivered right to your door. We ship you
            happiness.
          </h1>
          <p>We are World's fastest growing online Store.</p>
          <div className="row">
            {value.currentUser && value.currentUser === "admin" ? (
              <Link to="/add-product">Add Product</Link>
            ) : (
              <Link to="/products">Shop Now</Link>
            )}
          </div>
        </div>

        <img style={styles.backgroundImage} src="bg.png" alt="landing-pic" />
      </div>
      {value.currentUser && value.currentUser !== "admin" ? (
        <>
          <Products search={search} isAdmin={true} />
        </>
      ) : (
        <>
          <Products search={search} isAdmin={false} />
        </>
      )}

      <div className="features">
        <div className="features-card">
          <p className="features-head">
            <ShippingIcon style={styles.largeIcon} /> Free Home Delivery
          </p>
          <p className="features-para">
            No shipping Charges on Orders above &#8377; 500.
          </p>
        </div>

        <div className="features-card">
          <p className="features-head">
            <CancelIcon style={styles.largeIcon} /> Easy Cancellation
          </p>
          <p className="features-para">Cancel anytime as per your needs.</p>
        </div>

        <div className="features-card">
          <p className="features-head">
            <ReturnIcon style={styles.largeIcon} /> Easy Return &amp; Refund
          </p>
          <p className="features-para">
            We offer 30 days return and refund policy.
          </p>
        </div>

        <div className="features-card">
          <p className="features-head">
            <SupportIcon style={styles.largeIcon} /> 24x7 Customer Care
          </p>
          <p className="features-para">
            We provide 24*7 Customer Care support for feedbacks, suggestions and
            complaints.
          </p>
        </div>
      </div>
    </section>
  );
}
