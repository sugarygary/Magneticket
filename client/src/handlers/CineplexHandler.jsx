import { useNavigate } from "react-router-dom";
import client from "../util/client";

export const createMenu = async (data) => {
  console.log(data);
  try {
    const response = await client.post("api/cineplex/create-menu", {
      item_name: data.item_name,
      item_description: data.item_description,
      price: data.price,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
