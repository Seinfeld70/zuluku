import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://sosho-74fef.firebaseio.com/posts"
});

export default customAxios;
