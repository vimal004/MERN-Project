import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./card1";
import { Context } from "../App";
import ShimmerCard from "./shimmercard";
import { Link } from "react-router-dom";
import SearchBody from "./searchbdy";

const Cart = () => {
  const [shimmer, setShimmer] = useState(true);
  const [data, setData] = useState([]);
  const email = localStorage.getItem("email");
  const [mail, setEmail] = useState("");
  const { currmode, search } = useContext(Context);

  const handledelete = () => {
    axios
      .delete("http://localhost:3000/api/users/deleteall", { email: mail })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (email != "") {
      setEmail(email);
      axios
        .post("http://localhost:3000/api/users/getcart", { email })
        .then((res) => {
          setData(res.data);
          setShimmer(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("no email");
      setEmail("");
    }
  }, [email,data]);

  return mail === "" ? (
    <div
      className={`min-h-screen flex flex-col ${
        currmode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center bold m-8">
        <h1>Sign in to add items to the cart.</h1>
      </div>
    </div>
  ) : (
    <div
      className={`min-h-screen flex flex-col ${
        currmode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <h1
        className={`text-center text-3xl font-bold mt-7 mb-4 ${
          currmode ? "text-white" : "text-black"
        }`}
      >
        Cart Items
      </h1>
      <button className="" onClick={handledelete}>
        Clear Cart
      </button>
      <div className="flex-grow flex flex-wrap justify-center items-center gap-6 p-2 relative">
        <div
          className={`absolute inset-x-0 top-6 flex flex-wrap justify-center items-center gap-6 p-2 transition-opacity duration-500 ${
            shimmer ? "opacity-100" : "opacity-0"
          }`}
        >
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
        <div
          className={`transition-opacity duration-500 ${
            shimmer ? "opacity-0" : "opacity-100"
          } flex flex-wrap justify-center items-center gap-6 p-2`}
        >
          {data.map((d) => (
            <Card
              key={d.product_name}
              name={d.product_name}
              rating={d.rating}
              price={d.price}
              imageLink={d.image_link}
              mode={currmode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
