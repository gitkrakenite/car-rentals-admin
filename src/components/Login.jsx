import React, { useState } from "react";
import "./register.css";
import logoPg from "../assets/pic1.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-[99%] lg:w-[80%] m-auto ">
      <div className="mb-[20px]">
        <div className="flex justify-center mb-[1em]">
          <img src={logoPg} alt="" className="w-[120px]" />
        </div>
        <h1 className="text-3xl" style={{ fontWeight: 700 }}>
          Welcome Back.
        </h1>
      </div>
      <div className="">
        <form className="flex flex-col gap-[1.3em]">
          <div className="flex flex-col gap-[1em]">
            <label
              htmlFor="username"
              style={{ fontWeight: 600 }}
              className="text-lg"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Create Username"
              className="p-[8px] rounded-md"
              style={{ border: "2px solid black" }}
            />
          </div>
          <div className="flex items-center">
            <div className=" flex-[0.9] flex flex-col gap-[1em]">
              <label
                htmlFor="password"
                style={{ fontWeight: 600 }}
                className="text-lg"
              >
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                id="password"
                placeholder="Create Password"
                className="p-[8px] rounded-md"
                style={{ border: "2px solid black" }}
                required
              />
            </div>

            {show ? (
              <div className="flex-[0.1] flex justify-end">
                <AiOutlineEyeInvisible
                  className="text-3xl text-[#f518e3] cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              </div>
            ) : (
              <div className="flex-[0.1] flex justify-end">
                <AiOutlineEye
                  className="text-3xl text-[#f518e3] cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              </div>
            )}
          </div>

          <button
            className="createBtn text-zinc-100 text-lg rounded-md"
            style={{ fontWeight: 600 }}
          >
            Sign in now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
