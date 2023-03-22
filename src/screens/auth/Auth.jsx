import React, { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";

const Auth = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="flex justify-center items-center h-[100vh] w-[99%]  lg:w-[95%] m-auto">
      <div className="flex gap-2">
        {/* img side */}
        <div className="hidden md:flex md:flex-[0.5] relative">
          <img
            src="https://images.pexels.com/photos/7144176/pexels-photo-7144176.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            className="w-full h-[100%] object-cover rounded-lg"
          />
          {/* overlay div */}
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] rounded-lg" />
          <div className="absolute w-full h-full top-0 flex flex-col justify-end items-end text-white ">
            <div className="pl-[10px] pr-[10px] pb-[10px]">
              <p className="text-lg" style={{ fontWeight: 600 }}>
                Mange all your cars, manage your orders and keep everything in
                an orderly fashion. Communicate directly to your customers via
                email and manage all users.
              </p>
            </div>
          </div>
        </div>
        {/* form side */}
        <div className="flex-[1] w-[100vw] md:w-[100%] md:flex-[0.5] ">
          {show ? (
            <>
              <Register />
              <div className="mt-[15px]">
                <p className="text-center">
                  Already Have an account ?{" "}
                  <span
                    className="text-[#f518e3] cursor-pointer"
                    onClick={() => setShow(false)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <Login />
              <div className="mt-[15px]">
                <p className="text-center">
                  Are you new here ?{" "}
                  <span
                    className="text-[#f518e3] cursor-pointer"
                    onClick={() => setShow(true)}
                  >
                    Create Account
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
