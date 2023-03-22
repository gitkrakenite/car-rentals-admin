import React, { useEffect, useState } from "react";
import "./register.css";
import logoPg from "../assets/pic1.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setisAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Error occurred" + message);
    }
    if (isSuccess || user) {
      toast.success("Welcome!");
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisAdmin("true");

    if (password !== cpassword) {
      toast.error("Password mismatch");
      return;
    }

    if (!name || !email || !password || !isAdmin) {
      toast.error("All details needed");
      return;
    } else {
      try {
        const userData = { name, email, isAdmin, password };
        // console.log(profile);
        dispatch(register(userData));
      } catch (error) {
        toast.error("An error occurred" + message);
        alert("Registration failed");
      }
    }
  };

  return (
    <div className=" w-[99%] lg:w-[80%] m-auto">
      <div className="mb-[20px]">
        <div className="flex justify-center mb-[1em]">
          <img src={logoPg} alt="" className="w-[120px]" />
        </div>
        <h1 className="text-3xl" style={{ fontWeight: 700 }}>
          Manage All your vehicles
        </h1>
      </div>
      <div className="">
        <form className="flex flex-col gap-[1.3em]" onSubmit={handleSubmit}>
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
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[1em]">
            <label
              htmlFor="email"
              style={{ fontWeight: 600 }}
              className="text-lg"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="p-[8px] rounded-md"
              style={{ border: "2px solid black" }}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex flex-col gap-[1em]">
            <label
              htmlFor="confirm"
              style={{ fontWeight: 600 }}
              className="text-lg"
            >
              Confirm Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="username"
              placeholder="Password again"
              className="p-[8px] rounded-md"
              style={{ border: "2px solid black" }}
              required
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>

          {isLoading ? (
            <Spinner message="Please wait" />
          ) : (
            <button
              className="createBtn text-zinc-100 text-lg rounded-md"
              style={{ fontWeight: 600 }}
              onClick={handleSubmit}
            >
              Create account
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
