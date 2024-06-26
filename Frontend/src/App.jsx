import React, { useState, useEffect } from "react";
import { Outlet, createBrowserRouter, useFetcher } from "react-router-dom";
import About from "./Utilities/about";
import Header from "./header";
import Body from "./body";
import Cart from "./Utilities/cart.jsx";
import Item from "./Utilities/item.jsx";
import CustomerService from "./Utilities/cs.jsx";
import Footer from "./footer.jsx";
import Checkout from "./Utilities/checkout.jsx";
import Product from "./Utilities/product.jsx";

export const Context = React.createContext();

const App = () => {
  const [cart, setcart] = useState([]);
  const [times, settimes] = useState(0);
  const [search, setsearch] = useState(false);
  const [text, settext] = useState("");
  const [regi, setregi] = useState(false);
  const [r, setr] = useState(false);
  const [reg, setreg] = useState(false);
  const [log, setlog] = useState(() => {
    return localStorage.getItem("logmode") === "true";
  });
  useEffect(() => {
    localStorage.setItem("logmode", log);
  }, [log]);

  useEffect(() => {
    localStorage.setItem("cart", cart);
  }, [cart]);

  const [currmode, setmode] = useState(() => {
    return localStorage.getItem("currmode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("currmode", currmode);
  }, [currmode]);

  const togglefunc = () => {
    setmode(!currmode);
  };

  const [lgnmodal, setlgnmodal] = useState(() => {
    return localStorage.getItem("lgnmodal") === "true";
  });

  useEffect(() => {
    localStorage.setItem("lgnmodal", lgnmodal);
  }, [lgnmodal]);

  const lgntoggle = () => {
    setlgnmodal(!lgnmodal);
  };

  const logfn = () => {
    setlog(!log);
  };

  const [mail, setmail] = useState("");

  const values = {
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
    regi,
    setregi,
    times,
    settimes,
    text,
    settext,
    search,
    setsearch,
    cart,
    setcart,
  };

  return (
    <Context.Provider value={values}>
      <div className="">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Context.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "clothing",
        element: <Product product={"clothing"} />,
      },
      {
        path: "electronics",
        element: <Product product={"electronics"} />,
      },
      {
        path: "sports",
        element: <Product product={"sports"} />,
      },
      {
        path: "kitchen",
        element: <Product product={"kitchen"} />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "electronics/:id",
        element: <Item />,
      },
      {
        path: "clothing/:id",
        element: <Item />,
      },
      {
        path: "kitchen/:id",
        element: <Item />,
      },
      {
        path: "sports/:id",
        element: <Item />,
      },
      {
        path: "cart/:id",
        element: <Item />,
      },
      {
        path: "customerservice",
        element: <CustomerService />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default appRouter;
