import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./redux/actions";
import JobCard from "./components/jobCard";
import "./assets/css/App.css";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.posts.postsData);
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("API call");
    dispatch(fetchPosts(page));
  }, []);

  return (
    <div className="main-container">
      <div className="posting__container">
        {data.map((item) => (
          <div key={item.jdUid} className="posting__card">
            <JobCard {...item} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
