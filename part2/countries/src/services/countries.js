import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = async () => {
  const response = await axios.get(baseUrl + "api/all");
  return response.data;
};

export default { getAll };
