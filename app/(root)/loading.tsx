import React from "react";

const loading = () => {
  return (
    <div className="relative h-screen">
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-screen-lg w-full mx-auto mt-20 lg:ml-7">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-24 w-24"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-12 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-8 bg-slate-200 rounded col-span-2"></div>
                <div className="h-8 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-6 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="animate-pulse h-3/4">
        <div className=" mt-2 lg:ml-7  max-w-screen-lg grid grid-cols-4 gap-2">
          <div className="h-8 bg-slate-200 rounded col-span-3"></div>
          <div className="h-8 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-3/4 mt-2 lg:ml-7  max-w-screen-lg bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

export default loading;
