import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./assets/css/App.css";
import JobCard from "./components/jobCard";
import { fetchPosts } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state?.posts?.postsData);
  console.log("postsData", postsData);
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);
  return (
    <div className="main-container">
      {/* Filters Will Come Here */}
      <div className="posting__container">
        {Array(10)
          .fill("")
          .map((_, i) => {
            return (
              <div key={i} className="job__card">
                <JobCard />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
