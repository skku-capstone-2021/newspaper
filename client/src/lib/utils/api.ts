import axios from "axios";
import Cookies from "js-cookie";

const apiHost =
  "http://ec2-13-125-226-128.ap-northeast-2.compute.amazonaws.com:5000/api";

export const sendPost = (url: any, params: any) => {
  let headers = {
    "Content-Type": "application/json",
    "x-access-token": "",
  };

  let token = Cookies.get("jwt");

  if (token) {
    headers["x-access-token"] = token;
  }

  const postUrl = apiHost + url;

  return axios
    .post(postUrl, JSON.stringify(params), { headers })
    .then((res) => {
      return res;
    });
};
