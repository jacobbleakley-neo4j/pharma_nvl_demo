import React, { useEffect, useRef } from "react";
import NVL from "@neo4j-nvl/base";
import "../output.css";

const GraphComponent = ({ nodesArray }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const nodes = [];
      const relationships = [];

      for (let i = 0; i < 5; i++) {
        const moleculeId = nodesArray[i];
        const html = document.createElement("img");
        html.src = `https://www.chemspider.com/ImagesHandler.ashx?id=${moleculeId}&w=250&h=250`;

        nodes.push({
          id: i.toString(),
          caption: i.toString(),
          color: "rgb(255, 255, 255)",
          size: 100,
          html,
        });

        if (i === 0) continue;

        relationships.push({
          id: i.toString(),
          captions: [`dsfsfs`],
          color: "green",
          from: "0",
          to: i.toString(),
        });
      }

      const myNvl = new NVL(containerRef.current, nodes, relationships, {
        layout: "hierarchical",
        initialZoom: 1,
      });

      // Cleanup NVL instance on component unmount
      return () => {
        myNvl.destroy();
      };
    }
  }, []);

  return (
    <div
      className="graph-container flex justify-center pt-20 pb-20 mt-10 mb-10"
      ref={containerRef}
    >
      <div></div>{" "}
    </div>
  );
};

export default GraphComponent;
