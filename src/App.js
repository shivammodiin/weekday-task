import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./redux/actions";
import JobCard from "./components/jobCard";
import "./assets/css/App.css";
import Filters from "./components/filters/filters";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const postsData = useSelector((state) => state.posts.filteredData);
  const totalCount = useSelector((state) => state.posts.totalCount || 11); // Set a default value for totalCount
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();
  const observerRef = useRef(null); // Use a ref to store the IntersectionObserver instance

  // Fetch posts when component mounts and page changes
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    dispatch(fetchPosts(page));
  }, [dispatch, isMounted, page]);

  //  IntersectionObserver for Infinite Scrolling
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

    observerRef.current = new IntersectionObserver(handleObserver, options);
    if (observerRef.current && !loading) {
      observerRef.current.observe(document.querySelector(".last-pointer"));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, setPage, totalCount, page]);

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

      {/* Display loading message when fetching posts */}
      {postsData?.length <= 0 && page * 10 < totalCount && (
        <div>Getting posts...</div>
      )}
      {/* Display message when reached last post */}
      {page * 10 > totalCount && !loading && (
        <div>You reached the last post...</div>
      )}

      {/* Display loading spinner */}
      {loading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      {/* IntersectionObserver Refrence*/}
      <div className="last-pointer" style={{ height: "10px" }}></div>
    </div>
  );
};

export default InfiniteScroll;
