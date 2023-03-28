import axios from "../../axios";

// get all posts
const getPosts = async () => {
  const response = await axios.get("/posts/get");
  return response.data;
};

// get reels
const getReels = async () => {
  const response = await axios.get("/reel/get");
  return response.data;
};

// create posts
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("car/create", postData, config);
  return response.data;
};

// create reel
const createReel = async (reelData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/reel/create", reelData, config);
  return response.data;
};

// delete posts
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/posts/delete/${postId}`, config);
  return response.data;
};

const postService = {
  getPosts,
  createPost,
  deletePost,
  getReels,
  createReel,
};

export default postService;
