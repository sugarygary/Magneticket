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

export const createKodePromo = async (data) => {
  // console.log(data);
  try {
    const response = await client.post("api/cineplex/create-promo", {
      promo_code: data.kode_promo,
      valid_until: data.masa_berlaku,
      discount_amount: data.potongan,
      minimum_transaction: data.minimum_transaksi,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};

export const createCabang = async (data) => {
  // console.log(data);
  try {
    const response = await client.post("api/cineplex/create-branch", {
      branch_name: data.branch_name,
      address: data.address,
      city: data.city,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
export const createStudio = async (data) => {
  // console.log(data);
  try {
    const response = await client.post(`api/cineplex/studios/create-Studio`, {
      branch_id: data.branch_id,
      studio_name: data.studio_name,
      type: data.type,
      row: data.row,
      seating_layout: data.seating_layout,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating Studio:", error);
    return error.message;
  }
};
export const deleteKodePromo = async (data) => {
  try {
    const response = await client.post(`api/cineplex/delete-promo/${data}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
export const editMenu = async (data) => {
  console.log("ini datanyaa", data);
  try {
    const response = await client.post(`api/cineplex/edit-menu/${data._id}`, {
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
