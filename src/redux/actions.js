import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_START,
} from "./types";

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = () => ({
  type: FETCH_DATA_FAILURE,
});

export const fetchDataStart = () => ({
  type: FETCH_DATA_START,
});

export const fetchPosts = (page) => async (dispatch) => {
  try {
    dispatch(fetchDataStart());
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit: 10,
        offset: (page - 1) * 10,
      }),
    };

    const response = await fetch(
      `https://api.weekday.technology/adhoc/getSampleJdJSON`,
      requestOptions
    );
    const data = await response.json();
    dispatch(fetchDataSuccess(data.jdList));
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch(fetchDataFailure());
  }
};
