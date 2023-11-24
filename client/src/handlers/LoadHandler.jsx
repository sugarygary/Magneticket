import { useNavigate } from "react-router-dom";
import client from "../util/client";

export const loadInTheater = async (data) => {
  console.log(data);
  try {
    const response = await client.get("api/public/now-showing");

    return response.data;
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
};
export const loadScreenByMovie = async (data) => {
  console.log(data);
  try {
    // localhost:3000/api/public/movie-details/:movie_id
    let responseScreening = await client.get(
      `api/public/screenings-by-movie/${data?.params?.movie_id}`
    );
    const responseMovie = await client.get(
      `api/public/movie-details/${data?.params?.movie_id}`
    );

    // console.log(response);

    return {
      responseScreening: responseScreening.data,
      responseMovie: responseMovie.data,
    };
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
};
export const loadSeatInfo = async (data) => {
  // const navigate = useNavigate();
  console.log(data);
  try {
    // localhost:3000/api/public/movie-details/:movie_id
    const currUser = await client.get("api/auth/current-user");
    console.log("masuk");
    const response = await client.get(
      `api/user/screening/${data?.params?.screening_id}/seat-info`
    );

    console.log(response);

    return {
      currUser: currUser,
      response: response,
    };
  } catch (error) {
    alert(error);
    if (error.response.status == 403) {
      const logout = await client.get("api/auth/logout");
    }
    return error;
  }
};

export const loadMenu = async  (data) =>{
  console.log(data);
  try {
    const response = await client.get("api/cineplex/menus");

    return response.data;
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
}