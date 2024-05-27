import React, { useMemo } from "react";
import GraphView from "./GraphView";
import TableView from "./TableView";
import NavBar from "./NavBar";
import data from "../data/data.json";
import { setViewMode } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.viewMode);

  const toggleView = () => {
    const newViewMode = viewMode === "table" ? "graph" : "table";
    dispatch(setViewMode(newViewMode));
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar viewMode={viewMode} toggleView={toggleView} />
      <div className="flex-grow overflow-auto mt-16">
        <div style={{ display: viewMode === "graph" ? "block" : "none" }}>
          <GraphView nodeData={data} />
        </div>
        <div style={{ display: viewMode === "table" ? "block" : "none" }}>
          <TableView nodeData={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;





