import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");

  useEffect(async () => {
    try {
      const config = { "Content-Type": "application/json" };
      const body = "";
      const res = await axios.get("/api/cart", body, config);
      setCartItems(res.data);
      let cartTotal = res.data.reduce((prev, cur) => {
        return prev + cur.count * cur.item.price;
      }, 0);
      setTotal(cartTotal);
    } catch (error) {}
  }, []);

  const handleCountChange = async (count, key) => {
    const config = { "Content-Type": "application/json" };
    const body = { count };
    const res = await axios.patch(
      `/api/cart/${cartItems[key]._id}`,
      body,
      config
    );
    setCartItems(res.data);
  };

  const handleRemove = async (id) => {
    const config = { "Content-Type": "application/json" };
    const body = "";
    const res = await axios.delete(`/api/cart/${id}`, body, config);

    setCartItems(res.data);
  };

  const handleApplyCoupon = async () => {
    const config = { "Content-Type": "application/json" };
    const body = { code: coupon };
    const res = await axios.post(`/api/coupon/check`, body, config);
    if (res.data.total === total) {
    } else {
      setTotal(res.data.total);
    }
  };

  return (
    <Fragment>
      <h2 className="my-2">Cart Items</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item, key) => {
              return (
                <tr>
                  <td>{item.item.name}</td>
                  <td>{item.item.price} L.E.</td>
                  <td>
                    <input
                      type="number"
                      value={item.count}
                      onChange={(e) => {
                        handleCountChange(e.target.value, key);
                      }}
                    />
                  </td>
                  <td>{item.count * item.item.price} L.E.</td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        handleRemove(item._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <td>Apply Coupon</td>
            <td>
              <input
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
              />
            </td>
            <td>
              <button
                id="applyBtn"
                className="btn btn-success"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>{total} L.E.</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
