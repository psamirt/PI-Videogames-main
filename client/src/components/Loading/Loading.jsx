import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-position">
      <div className="container-Loading">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <p className="p-loading">Loanding...</p>
      </div>
    </div>
  );
};

export default Loading;
