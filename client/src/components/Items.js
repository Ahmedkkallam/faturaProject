import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
export const Items = (props) => {
  const [itemsList, setItems] = useState([]);
  useEffect(async () => {
    try {
      const config = { "Content-Type": "application/json" };
      const body = "";
      const res = await axios.get("/api/item", body, config);

      setItems(res.data);
    } catch (error) {}
  }, []);

  const handleAddToCart = async (item) => {
    const config = { "Content-Type": "application/json" };
    const body = { item, count: 1 };
    const res = await axios.post("/api/cart", body, config);
    if ((res.status = 200)) {
      props.history.push("/cart");
    }
  };
  return (
    <Fragment>
      <h2 class="my-2">Items Page</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th class="hide-sm">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsList &&
            itemsList.map((item, key) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td class="hide-sm">{item.price} L.E.</td>

                  <td>
                    <button
                      class="btn btn-success"
                      onClick={(e) => {
                        handleAddToCart(item._id);
                      }}
                    >
                      Add to cart
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};
