import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineInfoCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  BsCurrencyDollar,
  BsPen,
  BsPeople,
  BsSpeedometer2,
  BsTrash,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Spinner from "../Spinner";
import moment from "moment";
import "./cars.css";

const Cars = () => {
  const [allCars, setAllCars] = useState();
  const [loading, setLoading] = useState(false);
  const [createCarloading, setCreateCarLoading] = useState(false);
  const [createNewCarForm, setCreateNewCarForm] = useState(false);
  const [updateCarForm, setUpdateCarForm] = useState(false);

  // create car states
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [gear, setGear] = useState("");
  const [status, setStatus] = useState("");
  const [carUpdateDetail, setCarUpdateDetail] = useState([]);
  const [carUpdateId, setCarUpdateId] = useState(""); //works

  // search
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://car-rentals-backend.vercel.app/api/v1/car/all"
      );

      if (data) {
        setAllCars(data);
        setLoading(false);
        toast.success("Cars fetched");
        // console.log(allUsers);
      }
    } catch (error) {
      toast.error("Could not fetch cars");
    }
  };

  const handleCreateCar = async (e) => {
    e.preventDefault();
    if (!title || !seats || !price || !image || !gear) {
      toast.error("All fields Needed");
      return;
    }

    if (seats < 1 || price < 1) {
      toast.error("Seats or price is less than 1");
      return;
    }

    try {
      setLoading(true);

      const carData = { title, seats, price, image, gear };
      const { data } = await axios.post(
        "https://car-rentals-backend.vercel.app/api/v1/car/create",
        carData
      );
      if (data) {
        // setAllCars(data);
        setLoading(false);
        setCreateNewCarForm(false);
        toast.success("Car Added");
        setCreateCarLoading(!createCarloading);
        handleClearFields();
        // console.log(allUsers);
      }
    } catch (error) {
      toast.error("Could not Add car", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!carId) {
      toast.error("ID Needed");
      return;
    }
    try {
      setLoading(true);
      await axios.delete(
        "https://car-rentals-backend.vercel.app/api/v1/car/" + carId
      );
      setLoading(false);
      toast.success("Car Deleted");
      setCreateCarLoading(!createCarloading);
    } catch (error) {
      toast.error("Could not Add car", error);
    }
  };

  const handleClearFields = () => {
    setTitle("");
    setSeats("");
    setPrice("");
    setImage("");
    setGear("");
    setStatus("");
  };

  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allCars?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.status.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  useEffect(() => {
    fetchAllCars();
  }, [createCarloading]);

  return (
    <div>
      <h1 className="mb-[20px] text-2xl" style={{ fontWeight: 700 }}>
        Manage All your Cars
      </h1>
      <div className="flex justify-between items-center">
        <div className="">
          <form
            className="flex p-[14px] items-center gap-2  bg-zinc-300  rounded-lg"
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
                placeholder="Search car title or status"
                className="text-lg bg-transparent outline-none border-none"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
        <div>
          <button
            className="bg-[#fbae24] text-white p-[10px] rounded-md"
            onClick={() => setCreateNewCarForm(!createNewCarForm)}
          >
            Create New Car
          </button>
        </div>
      </div>

      {/* createNewCar form */}
      {createNewCarForm && (
        <div className="mt-8">
          {/* <h2 className="mb-3 text-lg" style={{ fontWeight: 700 }}>
            Create A New Car
          </h2> */}
          <form
            className="flex flex-col gap-[10px] w-[50%]"
            onSubmit={handleCreateCar}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="title"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Name Of The Car
              </label>
              <input
                type="text"
                name=""
                id="title"
                placeholder="i.e Mercedes c180"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="seats"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                How many seats ?
              </label>
              <input
                type="number"
                name=""
                id="seats"
                placeholder="i.e 5"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                required
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="price"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                How much per day ?
              </label>
              <input
                type="number"
                name=""
                id="price"
                placeholder="i.e 5000"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="gear"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Engine Transmission ?
              </label>
              <select
                name=""
                id="gear"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={gear}
                onChange={(e) => setGear(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="carImg"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Image of the car ?
              </label>
              <input
                type="text"
                name=""
                id="carImg"
                placeholder="i.e https://images.google.com/"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button
              className="bg-[#f518e3] text-white rounded-md p-[8px]"
              onClick={handleCreateCar}
            >
              Add This Car
            </button>
            <p
              className="bg-[#fbae24] text-white rounded-md p-[8px] text-center cursor-pointer"
              onClick={() => setCreateNewCarForm(false)}
            >
              Hide This Section
            </p>
          </form>
        </div>
      )}

      {/* update Car form */}
      {updateCarForm && (
        <div className="mt-8 p-[5px]">
          <form
            className="flex flex-col gap-[10px] w-[50%]"
            onSubmit={() => e.preventDefault()}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="title"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Name Of The Car
              </label>
              <input
                type="text"
                name=""
                id="title"
                placeholder="i.e Mercedes c180"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="seats"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                How many seats ?
              </label>
              <input
                type="number"
                name=""
                id="seats"
                placeholder="i.e 5"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="price"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                How much per day ?
              </label>
              <input
                type="number"
                name=""
                id="price"
                placeholder="i.e 5000"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="gear"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Engine Transmission ?
              </label>
              <select
                name=""
                id="gear"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={gear}
                onChange={(e) => setGear(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="status"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Available To Rent ?
              </label>
              <select
                name=""
                id="status"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="carImg"
                className="mb-3 text-md"
                style={{ fontWeight: 600 }}
              >
                Image of the car ?
              </label>
              <input
                type="text"
                name=""
                id="carImg"
                placeholder="i.e https://images.google.com/"
                className="bg-transparent p-[8px] rounded-md"
                style={{ border: "1px solid #ccc" }}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button
              className="bg-[#f518e3] text-white rounded-md p-[8px]"
              // onClick={handleUpdateCar}
            >
              Update Car
            </button>
            <p
              className="bg-[#fbae24] text-white rounded-md p-[8px] text-center cursor-pointer"
              onClick={() => setUpdateCarForm(false)}
            >
              Hide This Section
            </p>
          </form>
        </div>
      )}

      {/* all Cars */}
      <h1 className="mt-[20px] text-xl" style={{ fontWeight: 600 }}>
        List of All Cars
      </h1>

      {searchText && (
        <h2 className="font-medium text-[#666e75] text-xl mb-3">
          Showing Resuls for{" "}
          <span className="text-[#222328]">{searchText}</span>:
        </h2>
      )}

      {loading ? (
        <div className="h-[60vh]">
          <Spinner message="Fetching all cars" />
        </div>
      ) : (
        <div className="h-[76vh] overflow-y-scroll">
          {searchText ? (
            <>
              <div className="mt-[1em] carItemWrap gap-[20px] ">
                {searchedResults?.map((car) => (
                  <div key={car._id} className="itemShadow p-[20px]">
                    <div className="flex justify-center mb-[1em] text-4xl">
                      <img
                        src={
                          car.image ||
                          "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        }
                        alt=""
                        className="w-[100%] max-h-[350px] object-cover"
                      />
                    </div>
                    <p className="text-lg mb-3" style={{ fontWeight: 600 }}>
                      Name: {car.title}
                    </p>
                    <div className="flex items-center gap-[5px] mb-1">
                      <AiFillStar className="text-[#f518e3]" />
                      <AiFillStar className="text-[#f518e3]" />
                      <AiFillStar className="text-[#f518e3]" />
                      <AiFillStar className="text-[#f518e3]" />
                    </div>
                    <div className="flex items-center text-zinc-600 justify-between mb-2">
                      <div className="flex items-center gap-[5px]">
                        <BsPeople />
                        <p>{car.seats} seater</p>
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <BsCurrencyDollar />
                        <p>Economy</p>
                      </div>
                    </div>
                    <div className="flex items-center text-zinc-600 justify-between">
                      <div className="flex items-center gap-[5px]">
                        {/* <BsPeople /> */}
                        {car.status === "available" ? (
                          <p className="bg-green-700 text-white p-1 rounded-md">
                            {" "}
                            {car.status}
                          </p>
                        ) : (
                          <p className="bg-red-700 text-white p-1 rounded-md">
                            {" "}
                            {car.status}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <BsSpeedometer2 />
                        <p>{car.gear}</p>
                      </div>
                    </div>
                    {/* options */}
                    <div className="mt-[20px] flex items-center justify-between">
                      <div
                        className="flex items-center gap-[5px] cursor-pointer"
                        onClick={() => handleDeleteCar(car._id)}
                      >
                        <p>
                          <BsTrash
                            title="Remove Car"
                            className="text-red-600 cursor-pointer"
                          />
                        </p>
                        <p>Delete Car</p>
                      </div>
                      {/* <div
                        className="flex items-center gap-[5px] cursor-pointer"
                        onClick={() => setUpdateCarForm(true)}
                      >
                        <p>
                          <BsPen
                            title="Update Car"
                            className="text-green-600 cursor-pointer"
                          />
                        </p>

                        <p>Update Car</p>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-[1em] carItemWrap gap-[20px] ">
              {allCars?.map((car) => (
                <div key={car._id} className="itemShadow ">
                  <div className="flex justify-center mb-[10px] text-4xl">
                    <img
                      src={
                        car.image ||
                        "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      }
                      alt=""
                      className="w-[100%] max-h-[350px] object-cover"
                    />
                  </div>
                  <p className="p-[10px] text-xl" style={{ fontWeight: 600 }}>
                    Name: {car.title}
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
                      <p className="text-lg">{car.seats} seater</p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <BsCurrencyDollar className="text-lg" />
                      <p className="text-lg">Economy</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600 p-[10px]">
                    <div className="flex items-center gap-[5px]">
                      {/* <BsPeople /> */}
                      {car.status == "available" ? (
                        <p className="bg-green-800 text-white p-[8px] rounded-md">
                          Available
                        </p>
                      ) : (
                        <p className="bg-red-800 text-white p-[8px] rounded-md">
                          Unavailable
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <BsSpeedometer2 />
                      <p className="text-lg">{car.gear}</p>
                    </div>
                  </div>
                  <div className="p-[10px]">
                    <p>
                      Ksh.
                      <span className="p-[10px]" style={{ fontWeight: 700 }}>
                        {" "}
                        {car.price}
                      </span>{" "}
                      / day
                    </p>
                  </div>
                  {/* options */}
                  <div className="mt-[20px] flex items-center justify-between p-2">
                    <div
                      className="flex items-center gap-[5px] cursor-pointer"
                      onClick={() => handleDeleteCar(car._id)}
                    >
                      <p>
                        <BsTrash
                          title="Remove Car"
                          className="text-red-600 cursor-pointer"
                        />
                      </p>
                      <p>Delete Car</p>
                    </div>

                    {/* <div
                      className="flex items-center gap-[5px] cursor-pointer"
                      onClick={() => {
                        setUpdateCarForm(true);
                        setCarUpdateId(car._id);
                      }}
                    >
                      <p>
                        <BsPen
                          title="Update Car"
                          className="text-green-600 cursor-pointer"
                        />
                      </p>

                      <p>Update Car</p>
                    </div> */}
                  </div>
                  {/* update car */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cars;
