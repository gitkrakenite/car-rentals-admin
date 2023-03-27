import React, { useEffect, useState } from "react";
import "./register.css";
import logoPg from "../assets/pic1.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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

    if (!name || !password) {
      toast.error("All details needed");
      return;
    } else {
      try {
        const userData = { name, password };
        // console.log(profile);
        dispatch(login(userData));
      } catch (error) {
        toast.error("An error occurred: " + message);
        alert("Login failed");
      }
    }
  };

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
              placeholder="Enter Username"
              className="p-[8px] rounded-md"
              style={{ border: "2px solid black" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
                placeholder="Enter Password"
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

          <button
            className="createBtn text-zinc-100 text-lg rounded-md"
            style={{ fontWeight: 600 }}
            onClick={handleSubmit}
          >
            Sign in now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
