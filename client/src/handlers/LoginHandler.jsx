import axios from "axios";

import { redirect } from "react-router-dom";

export const loginUser = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`http://localhost:3000/api/auth/login-user`);

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, show an error message to the user, etc.
    }
}
export const registerUser = async (data) => {
    console.log(data)
    try {

        const response = await axios.post('http://localhost:3000/api/auth/register-user', {
            full_name: data.full_name,
            email: data.email,
            password: data.password,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return error.message;
        // Handle the error, show an error message to the user, etc.
    }
}
export const registerCineplex = async (data) => {
    console.log(data)
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register-cineplex', {
            company_name: data.company_name,
            email: data.email,
            password: data.password,
            brand_name: data.brand_name,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return error.message;
        // Handle the error, show an error message to the user, etc.
    }
}
export const registerEventOrganizer = async (data) => {
    console.log(data)
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register-promotor', {
            company_name: data.company_name,
            email: data.email,
            password: data.password,
            brand_name: data.brand_name,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return error.message;
        // Handle the error, show an error message to the user, etc.
    }
}