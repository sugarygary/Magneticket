import axios from "axios";

import { redirect } from "react-router-dom";
import client from "../util/client";

export const loginUser = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/auth/login-user");

    return response.data;
  } catch (error) {
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
    return error.message;
  }
};
export const registerCineplex = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/auth/register-cineplex", {
      company_name: data.company_name,
      email: data.email,
      password: data.password,
      brand_name: data.brand_name,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
export const registerEventOrganizer = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/auth/register-promotor", {
      company_name: data.company_name,
      email: data.email,
      password: data.password,
      brand_name: data.brand_name,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
