import axios from "axios";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";
import hash from "../../../util/hash";

import { setAuthState } from "./actions";

const login = (email: string, password: string) => async (dispatch: any) => {
  const encodedPassword = hash(password);

  const credentials = `${email}:${encodedPassword}`;

  const base64credentials = Buffer.from(credentials, "utf-8").toString(
    "base64"
  );

  return axios
    .get(`${process.env.REACT_APP_API_URL}/auth/login`, {
      headers: {
        Authorization: `Basic ${base64credentials}`,
      },
    })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;
      const decoded = jwt.decode(accessToken, {
        json: true,
      });

      if (accessToken && refreshToken && decoded) {
        const userData = {
          accessToken,
          refreshToken,
          id: decoded.id,
          email: decoded.email,
        };

        const cookies = new Cookies();
        cookies.set("auth_info", userData);

        dispatch(
          setAuthState({
            loggedIn: true,
            userData,
          })
        );
      }
    });
};

export default login;
