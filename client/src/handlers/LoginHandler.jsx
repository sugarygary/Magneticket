import axios from "axios";

import { redirect } from "react-router-dom";
import client from "../util/client";

export const loginUser = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/auth/login-user", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
};
export const registerUser = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/auth/register-user", {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
export const loginCineplex = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/auth/login-cineplex", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
};
export const loginPromotor = async (data) => {
  console.log(data);

  try {
    const response = await client.post("api/auth/login-promotor", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
};
export const registerCineplex = async (data, config) => {
  console.log(data);
  console.log(config);
  try {
    const response = await client.post("api/auth/register-cineplex", data, {
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
export const registerEventOrganizer = async (data, config) => {
  console.log(data);
  console.log(config);
  try {
    const response = await client.post("api/auth/register-promotor", data, {
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
