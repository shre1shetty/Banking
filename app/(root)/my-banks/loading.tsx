import React from "react";

const loading = () => {
  return (
    <div className="relative">
      <div className="animate-pulse ml-7">
        <div className="bg-slate-200 h-16 w-56 mt-12"></div>
        <div className="bg-slate-200 h-48 w-96 rounded mt-5"></div>
      </div>
    </div>
  );
};

export default loading;
