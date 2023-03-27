import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Customers from "../../components/customers/Customers";
import Cars from "../../components/cars/Cars";
import { BiLogOutCircle } from "react-icons/bi";

const Landing = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(false);
  const [cars, setCars] = useState(false);
  const [orders, setOrders] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const showCustomers = () => {
    setCars(false);
    setCustomer(true);
    localStorage.setItem("screen", JSON.stringify("customer"));
  };

  const showCars = () => {
    setCustomer(false);
    setCars(true);
    localStorage.setItem("screen", JSON.stringify("cars"));
  };

  const showOrders = () => {
    setCustomer(false);
    setCars(false);
    setOrders(true);
    localStorage.setItem("screen", JSON.stringify("orders"));
  };

  // get screen from localstorage
  const currentscreen = JSON.parse(localStorage.getItem("screen"));

  useEffect(() => {
    if (user?.isAdmin !== "true") {
      toast.error("You are not admin");
      navigate("/auth");
      return;
    }
  }, []);

  return (
    <div className=" h-[100vh] hide-scrollbar">
      {/* topbar */}
      <div className="flex  items-center justify-between bg-zinc-200 p-[10px] h-[5vh]">
        <div>
          <p>Hello {user?.name}</p>
        </div>
        <div>
          <p>Your Admin email is {user?.email}</p>
        </div>
        <div>
          <BiLogOutCircle
            className="text-4xl text-[#f518e3] cursor-pointer"
            title="log out"
          />
        </div>
      </div>
      {/* other section */}
      <div className="flex justify-between min-h-[95vh]">
        {/* left main panel */}
        <div className="flex-[0.2] bg-[#f518e3] text-white p-[10px] ">
          <ul>
            <div
              style={{ borderBottom: "1px solid white" }}
              className="cursor-pointer mb-2"
            >
              <li onClick={showCustomers} className="p-[10px]">
                All Customers
              </li>
            </div>
            <div
              style={{ borderBottom: "1px solid white" }}
              className="cursor-pointer mb-2"
            >
              <li onClick={showCars} className="p-[10px]">
                All Cars
              </li>
            </div>
            <div
              style={{ borderBottom: "1px solid white" }}
              className="cursor-pointer mb-2"
            >
              <li onClick={showOrders} className="p-[10px]">
                Orders
              </li>
            </div>
          </ul>
        </div>
        {/* other components */}
        <div className="flex-[0.8] bg-zinc-100 px-3">
          {
            <div>
              {currentscreen === "customer" && <Customers />}
              {currentscreen === "cars" && <Cars />}
              {currentscreen === "orders" && <p>Orders</p>}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Landing;
