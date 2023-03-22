import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Spinner from "../Spinner";
import moment from "moment";
import "./customer.css";

const Customers = () => {
  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(false);

  // search
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://car-rentals-backend.vercel.app/api/v1/user"
      );

      if (data) {
        setAllUsers(data);
        setLoading(false);
        toast.success("Everyone connected fetched");
        // console.log(allUsers);
      }
    } catch (error) {
      toast.error("Could not fetch connected users");
    }
  };

  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allUsers?.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  useEffect(() => {
    fetchAllUsers();
    // alert("loaded");
  }, []);

  // console.log(searchedResults);

  return (
    <div>
      <h1 className="mb-[20px] text-2xl" style={{ fontWeight: 700 }}>
        Manage All your Customers
      </h1>
      <div>
        <form
          className="flex p-[14px] items-center gap-2 bg-zinc-300 w-[40%] rounded-lg"
          // onSubmit={handleSearchChange}
        >
          <div>
            <AiOutlineSearch className="text-lg" />
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search username"
              className="text-lg bg-transparent outline-none border-none"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>

      {/* all Users */}
      <h1 className="mt-[20px] text-2xl">List of All users</h1>

      {searchText && (
        <h2 className="font-medium text-[#666e75] text-xl mb-3">
          Showing Resuls for{" "}
          <span className="text-[#222328]">{searchText}</span>:
        </h2>
      )}

      {loading ? (
        <div className="h-[60vh]">
          <Spinner message="Fetching all users connected" />
        </div>
      ) : (
        <div>
          {searchText ? (
            <>
              <div className="mt-[1em] flex flex-wrap gap-[20px] ">
                {searchedResults?.map((customer) => (
                  <div key={customer._id} className="itemShadow p-[20px]">
                    <div className="flex justify-center mb-[1em] text-4xl">
                      <CgProfile />
                    </div>
                    <p>Name: {customer.name}</p>
                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${customer.email}`}
                        className="text-[#f518e3]"
                      >
                        {customer.email}
                      </a>{" "}
                    </p>
                    <div>
                      <p>Joined: {moment(customer.createdAt).fromNow()} </p>
                      <p>
                        Permissions:{" "}
                        {customer.isAdmin == "true" ? "Admin" : "Customer"}{" "}
                      </p>
                    </div>
                    {/* options */}
                    <div className="mt-[20px] flex items-center gap-[20px]">
                      <div className="flex items-center gap-[2px]">
                        <AiOutlineInfoCircle className="text-[#f518e3]" />
                        <p style={{ fontWeight: 700 }}>
                          Remove user from rentals ?
                        </p>
                      </div>
                      <div>
                        <BsTrash
                          title="Remove User"
                          className="text-red-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-[1em] flex flex-wrap gap-[20px] ">
              {allUsers?.map((customer) => (
                <div key={customer._id} className="itemShadow p-[20px]">
                  <div className="flex justify-center mb-[1em] text-4xl">
                    <CgProfile />
                  </div>
                  <p>Name: {customer.name}</p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${customer.email}`}
                      className="text-[#f518e3]"
                    >
                      {customer.email}
                    </a>{" "}
                  </p>
                  <div>
                    <p>Joined: {moment(customer.createdAt).fromNow()} </p>
                    <p>
                      Permissions:{" "}
                      {customer.isAdmin == "true" ? "Admin" : "Customer"}{" "}
                    </p>
                  </div>
                  {/* options */}
                  <div className="mt-[20px] flex items-center gap-[20px]">
                    <div className="flex items-center gap-[2px]">
                      <AiOutlineInfoCircle className="text-[#f518e3]" />
                      <p style={{ fontWeight: 700 }}>
                        Remove user from rentals ?
                      </p>
                    </div>
                    <div>
                      <BsTrash
                        title="Remove User"
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Customers;
