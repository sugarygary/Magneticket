import { useNavigate } from "react-router-dom";
import client from "../util/client";

export const createTiket = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/user/create-ticket", {
      seats : data.seats,
      foods: data.foods,
      screening_id: data.screening_id,
      discount_amount: data.promo
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};