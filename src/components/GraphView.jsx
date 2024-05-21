import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import React, { useRef, useState, useEffect } from "react";
import "../output.css";
import FitToScreenButton from "./FitToScreenButton";
import ChangeNodeViewButton from "./ChangeNodeViewButton";

const GraphView = ({ nodeData }) => {
  const compoundsArray = nodeData.compounds;
  const relsArray = nodeData.relationships;
  const nodes = [];
  const relationships = [];
  const nvlRef = useRef();
  const [nodeViewImg, setNodeViewImg] = useState(true);
  const [nodePositions, setNodePositions] = useState({});

  for (let i = 0; i < compoundsArray.length; i++) {
    const moleculeId = compoundsArray[i].compound_id.toString();
    const caption = compoundsArray[i].caption.toString();
    const html = document.createElement("img");
    html.src = `https://www.chemspider.com/ImagesHandler.ashx?id=${moleculeId}&w=250&h=250`;
    html.style = nodeViewImg ? "opacity: 1" : "opacity: 0";
    html.setAttribute("draggable", "false");

    nodes.push({
      id: moleculeId,
      captions: [{ value: nodeViewImg ? `` : `${caption}`, styles: ["bold"] }],
      color: nodeViewImg ? "#FFFFFF" : "#006699",
      size: 25,
      html,
    });
  }

  for (let i = 0; i < relsArray.length; i++) {
    const caption = relsArray[i].label.toString();
    relationships.push({
      id: i.toString(),
      from: relsArray[i].from.toString(),
      to: relsArray[i].to.toString(),
      color: "#00334d",
      captions: [{ value: `${caption}` }],
      width: relsArray[i].width,
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const initialNodePositions = nvlRef.current?.getNodePositions();
      setNodePositions(initialNodePositions);
      console.log("nodePositions", initialNodePositions);
    }, 500); // Delay of 500 milliseconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    nvlRef.current?.fit(idArray);
  }, [nodeViewImg]);

  const mouseEventCallbacks = {
    onNodeClick: (element) => console.log("onClick", element),
    onZoom: (zoom) => console.log("onZoom", zoom),
    onDrag: (nodes) => console.log("onDrag", nodes),
    onPan: (evt) => console.log("onPan", evt),
  };

  const handleChangeNodeView = () => {
    setNodeViewImg((prevNodeViewImg) => !prevNodeViewImg);
  };

  const idArray = [];
  for (let i = 0; i < compoundsArray.length; i++) {
    idArray.push(nodes[i].id);
  }

  const checkCoactives = (relsArray) => {
    // Create a copy of relsArray and sort it by noCoActives
    const sortedRelsArray = [...relsArray].sort(
      (a, b) => a.noCoActives - b.noCoActives
    );
    console.log("sortedRelsArray", sortedRelsArray);

    // Calculate the number of distinct widths needed
    const numberOfWidths = Math.min(sortedRelsArray.length, 5); // Changed to 5 for more distribution
    console.log("numberOfWidths", numberOfWidths);

    // Get the maximum noCoActives value
    const maxCoactives =
      sortedRelsArray[sortedRelsArray.length - 1].noCoActives;
    console.log("maxCoactives", maxCoactives);

    // Calculate the range for each width group
    const coactiveDivide = Math.ceil(maxCoactives / numberOfWidths);
    console.log("coactiveDivide", coactiveDivide);

    // Assign widths to the relationships based on noCoActives
    for (let i = 1; i <= numberOfWidths; i++) {
      for (let j = 0; j < sortedRelsArray.length; j++) {
        const noCoActives = sortedRelsArray[j].noCoActives;
        if (
          noCoActives > coactiveDivide * (i - 1) &&
          noCoActives <= coactiveDivide * i
        ) {
          sortedRelsArray[j].width = i;
        }
      }
    }
    return sortedRelsArray;
  };

  const handleClick = () => {
    nvlRef.current?.fit(idArray);
    if (nodePositions) {
      nvlRef.current?.setNodePositions(nodePositions);
    }
  };

  useEffect(() => {
    checkCoactives(relsArray);
  }, []);
  return (
    <div>
      <div style={{ height: "95vh" }}>
        <InteractiveNvlWrapper
          nodes={nodes}
          rels={relationships}
          captions={["caption"]}
          ref={nvlRef}
          layout="hierarchical"
          nvlOptions={{ initialZoom: 3, useWebGL: false }}
          nvlCallbacks={{ onLayoutDone: () => console.log("layout done") }}
          mouseEventCallbacks={mouseEventCallbacks}
        />
      </div>
      <FitToScreenButton onClick={handleClick} />
      <ChangeNodeViewButton onClick={handleChangeNodeView} />
    </div>
  );
};

export default GraphView;
