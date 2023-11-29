import client from "../util/client";

export const createEvent = async (data, config) => {
    console.log(data);
    console.log(config);
    try {
      const response = await client.post("api/promotor/create-event", data, {
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error.message;
    }
  };