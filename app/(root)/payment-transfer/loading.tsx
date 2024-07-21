import React from "react";

const loading = () => {
  return (
    <div className="relative h-screen">
      <div className="animate-pulse px-7 h-full">
        <div className="bg-slate-200 h-16 w-56 mt-12"></div>
        <div className="bg-slate-200 h-10 max-w-screen-lg rounded mt-5"></div>
        <div className="bg-slate-200 h-12 max-w-screen-lg rounded mt-2"></div>
        <div className="bg-slate-200 h-10 max-w-screen-lg rounded mt-2"></div>
        <div className="bg-slate-200 h-10 max-w-screen-lg rounded mt-2"></div>
        <div className="bg-slate-200 h-12 max-w-screen-lg rounded mt-2"></div>
        <div className="bg-slate-200 h-10 max-w-screen-lg rounded mt-2"></div>
      </div>
    </div>
  );
};

export default loading;
