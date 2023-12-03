import client from "../util/client";
export const loadAllCineplex = async (data) => {
  try {
    const response = await client.get(`api/admin/list-cineplexs`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const loadAllEvent = async (data) => {
  try {
    const response = await client.get(`api/admin/list-events`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const loadAllPromotor = async (data) => {
  try {
    const response = await client.get(`api/admin/list-promotors`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const loadSinglePromotor = async (data) => {
  console.log(data);
  try {
    const response = await client.get(
      `api/admin/promotor/${data.params.promotorId}`
    );
    return response.data;
    console.log(response.data); // Log the response for debugging
  } catch (error) {
    console.error("Error fetching Cineplex:", error);
    // Handle the error, check the status, and log the error details
  }
};
export const loadSingleCineplex = async (data) => {
  console.log(data);
  try {
    const response = await client.get(
      `api/admin/cineplex/${data.params.cineplexId}`
    );
    return response.data;
    console.log(response.data); // Log the response for debugging
  } catch (error) {
    console.error("Error fetching Cineplex:", error);
    // Handle the error, check the status, and log the error details
  }
};
export const loadSingleEvent = async (data) => {
  console.log(data);
  try {
    const response = await client.get(`api/admin/event/${data.params.eventId}`);
    return response.data;
    console.log(response.data); // Log the response for debugging
  } catch (error) {
    console.error("Error fetching Cineplex:", error);
    // Handle the error, check the status, and log the error details
  }
};
export const acceptVerif = async (data) => {
  console.log(data);
  try {
    const response = await client.post(`api/admin/verify-cineplex/${data}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const acceptVerifPromotor = async (data) => {
  console.log(data);
  try {
    const response = await client.post(`api/admin/verify-promotor/${data}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const tolakVerifPromotor = async (data, alasan) => {
  console.log(data);
  console.log(alasan);

  try {
    const response = await client.delete(`api/admin/delete-promotor/${data}`, {
      data: { alasan: alasan },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const tolakVerif = async (data, alasan) => {
  console.log(data);
  console.log(alasan);

  try {
    const response = await client.delete(`api/admin/delete-cineplex/${data}`, {
      data: { alasan: alasan },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const acceptVerifEvent = async (data, event_id) => {
  console.log(data); //data itu email nya buat kirim notifikasi tolak atau terima
  console.log(event_id);
  try {
    const response = await client.post(`api/admin/verify-event/${event_id}`, {
      data: { email_promotor: data },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const tolakVerifEvent = async (data, alasan, event_id) => {
  console.log(data);
  console.log(alasan);
  console.log(event_id);
  try {
    const response = await client.delete(`api/admin/delete-event/${event_id}`, {
      data: [{ alasan: alasan }, { email_promotor: data }],
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

