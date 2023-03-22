import axios from "axios";

const instance = axios.create({
  baseURL: "https://car-rentals-backend.vercel.app/api/v1",
});

export default instance;
