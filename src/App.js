import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./redux/actions";
import JobCard from "./components/jobCard";
import "./assets/css/App.css";
import Filters from "./components/filters/filters";

const InfiniteScroll = () => {
  const [isMounted, setIsMounted] = useState(false);
  const postsData = useSelector((state) => state.posts.filteredData);
  const totalCount = useSelector((state) => state.posts.totalCount || 11);
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isMounted) {
      // Check if component is mounted
      setIsMounted(true);
      return;
    }
    dispatch(fetchPosts(page));
  }, [dispatch, page, isMounted]);

  useEffect(() => {
    const options = {
      rootMargin: "250px",
      threshold: 0.1,
    };
    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting && page * 10 < totalCount) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (observer && !loading) {
      observer.observe(document.querySelector(".last-pointer"));
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [loading, setPage]);

  return (
    <div className="main-container">
      <Filters />
      <div className="posting__container">
        {postsData.map((item) => (
          <div key={item.jdUid} className="posting__card">
            <JobCard {...item} />
          </div>
        ))}
      </div>

      {postsData?.length <= 0 && page * 10 < totalCount && (
        <div>Getting posts...</div>
      )}
      {page * 10 > totalCount && !loading && (
        <div>You reached last post...</div>
      )}

      {loading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      <div className="last-pointer" style={{ height: "10px" }}></div>
    </div>
  );
};

export default InfiniteScroll;
