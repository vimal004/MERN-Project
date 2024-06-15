import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../App";
import Card from "./card2";
import ShimmerCard from "./shimmercard"; // Make sure to import ShimmerCard
import Button from "./button"; // Import the custom Button component

const Checkout = () => {
  const { currmode, email } = useContext(Context);
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");
  const [shimmer, setShimmer] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/users/address", {
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        setAddress(res?.data?.address);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button clicked");

    axios
      .put("http://localhost:3000/api/users/address", {
        email: localStorage.getItem("email"),
        address: address,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/users/getcart", {
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        setData(res.data);
        setShimmer(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  const calculateTotal = () => {
    if (data.length === 0) return "0.00"; // Return 0 if there are no items in the cart
    const totalPrice = data.reduce((total, item) => {
      // Remove the currency symbol and any non-numeric characters from the price
      const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.qty;
      return isNaN(price) ? total : total + price; // Add price to total if it's a valid number
    }, 0);
    return totalPrice.toFixed(2); // Return total price rounded to 2 decimal places
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        currmode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center px-4 mt-7 mb-4">
        <div className="flex-1 flex justify-center items-center">
          <h1
            className={`text-3xl font-bold ${
              currmode ? "text-white" : "text-black"
            }`}
          >
            Checkout
          </h1>
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center gap-4 p-2">
        <h5
          className={`text-lg mb-2 ${currmode ? "text-white" : "text-black"}`}
        >
          Deliver to:
        </h5>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col items-center"
        >
          <textarea
            className="p-4 w-full h-32 mb-4 text-black rounded-lg text-xl border border-gray-300 resize-none"
            placeholder={
              address === "" ? "Enter your delivery address" : address
            }
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            name="Update Address"
            altname="Update Address"
            action={handleSubmit}
            mode={currmode}
          />
        </form>
        <div className="flex flex-wrap justify-center items-center gap-6 p-2 w-full">
          {shimmer ? (
            <>
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </>
          ) : (
            data.map((d, index) => (
              <Card
                key={index}
                name={d.product_name}
                rating={d.rating}
                price={d.price}
                imageLink={d.image_link}
                qty={d.qty}
                mode={currmode} // Assuming qty is provided in the data
              />
            ))
          )}
        </div>
        <div
          className={`w-full max-w-lg p-4 mt-6 mb-4 rounded-lg ${
            // Added mb-4 for margin-bottom
            currmode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow-lg`}
        >
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <ul className="text-lg mb-4">
            {data.map((item, index) => (
              <li key={index} className="flex justify-between py-1">
                <span>
                  {item.product_name} (x{item.qty || 1})
                </span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold">Total Cost</h3>
          <p className="text-xl"> {`$` + calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
