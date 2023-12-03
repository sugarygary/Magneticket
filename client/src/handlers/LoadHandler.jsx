import { useNavigate } from "react-router-dom";
import client from "../util/client";

export const loadInTheater = async (data) => {
  try {
    const response = await client.get("api/public/now-showing");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        const logout = await client.get("api/auth/logout");
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};
export const loadOngoingEvent = async (data) => {
  try {
    const response = await client.get("api/public/ongoing-event");

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        const logout = await client.get("api/auth/logout");
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};
export const loadCabang = async (data) => {
  try {
    const response = await client.get("api/cineplex/branches");

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        const logout = await client.get("api/auth/logout");
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};
export const loadStudio = async (data) => {
  try {
    const response = await client.get(
      `api/cineplex/studios/${data.params.branch_id}`
    );
    const responseCabang = await client.get("api/cineplex/branches");
    return {
      responseStudio: response.data,
      responseCabang: responseCabang.data,
      currentCabang: data.params.branch_id,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        const logout = await client.get("api/auth/logout");
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};
export const loadSeatInfo = async (data) => {
  try {
    const currUser = await client.get("api/auth/current-user");
    const screening_data = await client.get(
      `api/user/screening/${data?.params?.screening_id}/seat-info`
    );

    const menu = await client.get(
      `api/user/screening/${data?.params?.screening_id}/menu`
    );

    const promotion = await client.get(
      `api/user/screening/${data?.params?.screening_id}/promotion`
    );

    return {
      current_user: currUser.data,
      screening_id: data.params.screening_id,
      screening_data: screening_data.data,
      menu: menu.data,
      promo: promotion.data,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        const logout = await client.get("api/auth/logout");
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};

export const loadMenu = async (data) => {
  try {
    const response = await client.get("api/cineplex/menus");
    return response.data;
  } catch (error) {
    return error;
  }
};
export const loadPromo = async () => {
  try {
    const response = await client.get("api/cineplex/promos");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
export const loadSingleMenu = async (data) => {
  try {
    const response = await client.get(
      `api/cineplex/menus/${data.params.menu_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};

export const loadHistory = async (data) => {
  try {
    const response = await client.get(`api/user/history`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const loadDetailHistory = async (data) => {
  try {
    const response = await client.get(
      `api/user/history/${data.params.history_id}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        throw new Response("Forbidden", { status: 403 });
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};
export const loadCineplexHistory = async (data) => {
  try {
    const response = await client.get(`api/cineplex/movie-ticket`);
    return response.data;
  } catch (error) {
    console.error("Error fetching load history:", error);
    return error.message;
  }
};
export const loadCineplexDetailHistory = async (data) => {
  console.log("ehehehehehe", data.params.history_id);
  try {
    const response = await client.get(
      `api/cineplex/movie-ticket/${data.params.history_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching load history:", error);
    return error.message;
  }
};
export const loadPromotorHistory = async (data) => {
  try {
    const response = await client.get(`api/promotor/event-ticket`);
    return response.data;
  } catch (error) {
    console.error("Error fetching load history:", error);
    return error.message;
  }
};
export const loadPromotorDetailHistory = async (data) => {
  console.log("ehehehehehe", data.params.history_id);
  try {
    const response = await client.get(
      `api/promotor/event-ticket/${data.params.history_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching load history:", error);
    return error.message;
  }
};
export const loadCineplexJadwal = async (data) => {
  try {
    const response = await client.get(`api/cineplex/screenings`);
    const responseCabang = await client.get("api/cineplex/branches");
    const responseStudio = await client.get("api/cineplex/studios");
    let respon = {
      jadwal: response.data,
      cabang: responseCabang.data,
      studio: responseStudio.data,
    };
    return respon;
  } catch (error) {
    console.error("Error fetching load CineplexJadwal", error);
    return error.message;
  }
};
export const loadStudioAll = async (data) => {
  try {
    const response = await client.get("api/cineplex/studios");
    return response.data;
  } catch (error) {
    console.error("Error fetching all studios:", error);
    return error.message;
  }
};

export const loadScreeningLengkap = async (data) => {
  try {
    const response = await client.get("api/cineplex/screenings-lengkap");
    return response.data;
  } catch (error) {
    console.error("Error fetching all studios:", error);
    return error.message;
  }
};

export const loadDetailEvent = async (data) => {
  try {
    const response = await client.get(
      `api/public/event-details/${data.params.event_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching detail event:", error);
    return error.message;
  }
};

export const loadCategoryEvent = async (data) => {
  try {
    const response = await client.get(
      `api/public/event-category/${data.params.event_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category event:", error);
    return error.message;
  }
};
export const loadDetailEventWithAuth = async (data) => {
  try {
    const response = await client.get(
      `api/user/event-details/${data.params.event_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching detail event:", error);
    return error.message;
  }
};

export const loadCategoryEventWithAuth = async (data) => {
  try {
    const response = await client.get(
      `api/user/event-category/${data.params.event_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category event:", error);
    return error.message;
  }
};
