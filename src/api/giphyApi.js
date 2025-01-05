import axios from "axios";

const API_KEY = "ssn6cOI8wWSNXbTPK2xSmrgBjaoMjTI0";

export const giphyApi = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs",
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingGifs = async (offset = 0, limit = 25) => {
  const response = await giphyApi.get("/trending", {
    params: { offset, limit },
  });
  return response.data;
};

export const searchGifs = async (query, offset = 0, limit = 25) => {
  const response = await giphyApi.get("/search", {
    params: { q: query, offset, limit },
  });
  return response.data;
};

export const fetchGifs = async (
  category,
  searchTerm,
  offset = 0,
  limit = 25
) => {
  let params = { limit, offset };

  if (category === "Search" && searchTerm) {
    params = { ...params, q: encodeURIComponent(searchTerm) };
    const response = await giphyApi.get("/search", { params });
    return response.data.data;
  } else if (category !== "Trending") {
    const response = await giphyApi.get(`/${category.toLowerCase()}`, {
      params,
    });
    return response.data.data;
  } else {
    const response = await giphyApi.get("/trending", { params });
    return response.data.data;
  }
};
