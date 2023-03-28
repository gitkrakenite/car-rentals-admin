import React, { useEffect, useState } from "react";
import "./orders.css";
import moment from "moment";
import { toast } from "react-hot-toast";
// {moment(customer.createdAt).fromNow()}
import axios from "../../axios";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { BsCurrencyDollar, BsPeople, BsSpeedometer2 } from "react-icons/bs";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState();
  const [showMore, setShowMore] = useState(false);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://car-rentals-backend.vercel.app/api/v1/order/admin"
      );

      if (data) {
        setAllOrders(data);
        setLoading(false);
        toast.success("Orders fetched");
        // console.log(allUsers);
      }
    } catch (error) {
      toast.error("Could not fetch orders" + error);
    }
  };
  useEffect(() => {
    fetchAllCars();
  }, []);
  return (
    <div className="mt-[2em]">
      <h2 className="mb-[2em] text-xl" style={{ fontWeight: 700 }}>
        All Orders
      </h2>
      <div>
        {allOrders?.map((order) => (
          <div key={order._id} className="itemShadow mt-2 mb-7 p-2">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-blue-600 underline cursor-pointer">
                  {order._id}
                </p>
                <p>{order.name}</p>
                <p>
                  <a
                    href={`mailto:${order.email}`}
                    className="text-blue-600 underline cursor-pointer"
                  >
                    {order.email}
                  </a>
                </p>
                <p>Pickup : {order.pickUp}</p>
                <p>Status : {order.status}</p>
                <p>{moment(order.createdAt).fromNow()}</p>
                <AiOutlineEye
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                />
              </div>

              {showMore && (
                <>
                  {/* more details */}
                  <div className="mt-8">
                    <div className="flex justify-between">
                      <p> Drop Off Location: {order.dropOff}</p>
                      <p>
                        Pick Up Date And Time:{" "}
                        <span style={{ fontWeight: 600 }}>
                          {moment(order.pickUpDateAndTime).fromNow()}
                        </span>
                      </p>
                      <p>
                        Drop off Date and Time:{" "}
                        <span style={{ fontWeight: 600 }}>
                          {moment(order.dropOffDateAndTime).fromNow()}
                        </span>
                      </p>
                    </div>
                    <div>
                      {console.log(order)}

                      <div className=" mt-3 mb-3">
                        <div className="flex justify-left mb-[10px] text-4xl">
                          <img
                            src={
                              order.car[0]?.image ||
                              "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            }
                            alt=""
                            className="w-[200px%] h-[200px] object-cover rounded-md"
                          />
                        </div>
                        <p
                          className="p-[10px] text-xl"
                          style={{ fontWeight: 600 }}
                        >
                          Name: {order.car[0]?.title}
                        </p>
                        <div className="flex items-center gap-[5px] p-[10px]">
                          <AiFillStar className="text-[#f518e3]" />
                          <AiFillStar className="text-[#f518e3]" />
                          <AiFillStar className="text-[#f518e3]" />
                          <AiFillStar className="text-[#f518e3]" />
                        </div>
                        <div className="flex items-center justify-between text-zinc-600 p-[10px]">
                          <div className="flex items-center gap-[10px]">
                            <BsPeople className="text-lg" />
                            <p className="text-lg">
                              {order.car[0]?.seats} seater
                            </p>
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <BsCurrencyDollar className="text-lg" />
                            <p className="text-lg">Economy</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-zinc-600 p-[10px]">
                          <div className="flex items-center gap-[5px]">
                            <BsSpeedometer2 />
                            <p className="text-lg">{order.car[0]?.gear}</p>
                          </div>
                        </div>
                        <div className="p-[10px]">
                          <p>
                            Ksh.
                            <span
                              className="p-[10px]"
                              style={{ fontWeight: 700 }}
                            >
                              {" "}
                              {order.car[0]?.price}
                            </span>{" "}
                            / day
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
