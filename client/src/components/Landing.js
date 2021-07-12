import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Cart Task</h1>

          <div className="buttons">
            <Link to="/item" className="btn btn-primary">
              View Items
            </Link>
            <Link to="/cart" className="btn btn-primary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
