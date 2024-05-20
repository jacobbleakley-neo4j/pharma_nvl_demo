import React, { useState } from "react";
import GraphView from "./GraphView";
import TableView from "./TableView";
import NavBar from "./NavBar";
import data from "../data/data.json";

const Home = () => {
  const [viewMode, setViewMode] = useState("table");
  const toggleView = () => {
    setViewMode((prevMode) => {
      switch (prevMode) {
        case "table":
          return "graph";
        case "graph":
          return "table";
      }
    });
  };
   
  return (
    <div className="flex flex-col h-screen">
      <NavBar viewMode={viewMode} toggleView={toggleView} />
      <div className="flex-grow overflow-auto mt-16">
        {viewMode === "graph" ? (
          <GraphView nodeData ={data} />
        ) : (
          <TableView nodeData={data} />
        )}
      </div>
    </div>
  );
};

export default Home;
