import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "./Utilities/button";
import "./index.css"; // Remove this line if not using custom styles
import Profile from "./Utilities/profile";
import { Context } from "./App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    mail,
    setmail,
    reg,
    setreg,
    r,
    setr,
    log,
    setlog,
    currmode,
    setmode,
    lgnmodal,
    setlgnmodal,
    lgntoggle,
    logfn,
    togglefunc,
    text,
    settext,
    search,
    setsearch,
    cart,
    setcart,
  } = useContext(Context);
  const [lgn, setlgn] = useState("Login");

  const lgtoggle = () => {
    lgn === "Login" ? setlgn("Logout") : setlgn("Login");
  };

  return (
    <div
      className={
        currmode
          ? "flex justify-between items-center bg-gray-800 p-6 shadow-lg"
          : "flex justify-between items-center bg-white p-6 shadow-lg"
      }
    >
      <Link to={"/"}>
        <div className="flex items-center space-x-4">
          <img
            aria-placeholder="Logo"
            className="h-12 w-12 rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/016/471/452/original/abstract-modern-ecommerce-logo-ecommerce-logo-design-shop-logo-design-template-creative-ecommerce-logo-vector.jpg"
            alt="Logo"
          />
          <h1
            className={
              currmode
                ? "text-2xl font-bold text-white"
                : "text-2xl font-bold text-gray-800"
            }
          >
            E-Shop
          </h1>
        </div>
      </Link>
      <div className="flex-grow mx-10">
        <div
          className={
            currmode
              ? "flex justify-center space-x-6 text-white"
              : "flex justify-center space-x-6 text-gray-700"
          }
        >
          <Link to={"/kitchen"}>
            <a href="" className="hover:text-blue-500 transition duration-300">
              Kitchen
            </a>
          </Link>
          <Link to={"/sports"}>
            <a href="" className="hover:text-blue-500 transition duration-300">
              Sports
            </a>
          </Link>
          <Link to={"/electronics"}>
            <a href="" className="hover:text-blue-500 transition duration-300">
              Electronics
            </a>
          </Link>
          <Link to={"/clothing"}>
            <a href="" className="hover:text-blue-500 transition duration-300">
              Clothing
            </a>
          </Link>
          <Link to={"/customerservice"}>
            <a href="" className="hover:text-blue-500 transition duration-300">
              Customer Service
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link to={"/cart"}>
          <Button name={"Cart"} mode={currmode} altname={"Cart"} />
        </Link>
        <input
          className="w-80 px-4 py-2 border border-gray-300 rounded-full shadow focus:outline-none

          focus:border-blue-500 transition duration-300"
          placeholder="Search for products, brands and more"
          onChange={(e) => {
            settext(e.target.value);
            e.target.value.length > 0 ? setsearch(true) : setsearch(false);
          }}
        />
        <Button
          name={"Dark Mode"}
          action={togglefunc}
          mode={currmode}
          altname={"Light Mode"}
        />
        {log ? (
          <Profile />
        ) : (
          <Button name={lgn} mode={currmode} action={lgntoggle} altname={lgn} />
        )}
      </div>
    </div>
  );
};

export default Header;
