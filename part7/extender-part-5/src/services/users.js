import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const fetchSingleUser = async (userId) => {
  const user = await axios.get(baseUrl + "/" + userId);
  return user.data;
};

export { getAllUsers, fetchSingleUser };
