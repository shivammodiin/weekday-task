import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_START,
  SET_FILTER_DATA,
} from "./types";

const initialState = {
  postsData: [],
  filteredData: [],
  filtersOption: {},
  appliedFilters: {
    location: [],
    jobRole: [],
    minExp: null,
    minJdSalary: null,
    remote: null,
    companyName: "",
  },
  totalCount: 0,
  loading: false,
};

const helperApplyFilter = (data, appliedFilters) => {
  let filteredData = data;

  // Filter by locations
  if (appliedFilters.location.length > 0) {
    filteredData = filteredData.filter((item) =>
      appliedFilters.location.includes(item.location)
    );
  }

  // Filter by jobRoles
  if (appliedFilters.jobRole.length > 0) {
    filteredData = filteredData.filter((item) =>
      appliedFilters.jobRole.includes(item.jobRole)
    );
  }

  // Filter by minExp
  if (appliedFilters.minExp) {
    filteredData = filteredData.filter(
      (item) => appliedFilters.minExp < item.minExp
    );
  }

  if (appliedFilters.minJdSalary) {
    filteredData = filteredData.filter(
      (item) => appliedFilters.minJdSalary < item.minJdSalary
    );
  }

  if (appliedFilters.companyName.trim().length > 0) {
    const companyName = appliedFilters.companyName.trim().toLowerCase();
    filteredData = filteredData.filter((item) =>
      item?.companyName?.toLowerCase().includes(companyName)
    );
  }

  // Filter by remote
  if (appliedFilters.remote !== null) {
    if (appliedFilters.remote === "on-site") {
      filteredData = filteredData.filter((item) => item.location !== "remote");
    } else if (appliedFilters.remote === "remote") {
      filteredData = filteredData.filter((item) => item.location === "remote");
    }
  }

  return filteredData;
};

const postsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { jdList, totalCount } = action.payload;
      const updatedData = [...state.postsData, ...jdList];
      const filtersArray = {
        locations: new Set(updatedData.map((jd) => jd.location)),
        roles: new Set(updatedData.map((jd) => jd.jobRole)),
      };
      let filteredData = helperApplyFilter(updatedData, state.appliedFilters);
      return {
        ...state,
        postsData: updatedData,
        filtersOption: { ...filtersArray },
        filteredData: filteredData,
        loading: false,
        totalCount,
      };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false };
    case FETCH_DATA_START:
      return { ...state, loading: true };
    case SET_FILTER_DATA:
      const { name, value } = action.payload;
      const newAppliedFilters = { ...state.appliedFilters };
      newAppliedFilters[name] = value;
      let newFilteredData = helperApplyFilter(
        state.postsData,
        newAppliedFilters
      );
      return {
        ...state,
        filteredData: newFilteredData,
        appliedFilters: newAppliedFilters,
        loading: false,
      };
    default:
      return state;
  }
};

export default postsReducers;
