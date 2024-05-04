import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./redux/actions";
import JobCard from "./components/jobCard";
import "./assets/css/App.css";

const InfiniteScroll = () => {
  const [isMounted, setIsMounted] = useState(false);
  const data = useSelector((state) => state.posts.postsData);
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
      if (target.isIntersecting) {
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
      <div className="last-pointer" style={{ height: "10px" }}></div>
    </div>
  );
};

export default InfiniteScroll;
