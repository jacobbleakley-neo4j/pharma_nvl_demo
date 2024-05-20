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

  for (let i = 0; i < compoundsArray.length; i++) {
    const moleculeId = compoundsArray[i].compound_id.toString();
    const caption = compoundsArray[i].caption.toString();
    const html = document.createElement("img");
    html.src = `https://www.chemspider.com/ImagesHandler.ashx?id=${moleculeId}&w=250&h=250`;
    html.style = nodeViewImg ? "opacity: 1" : "opacity: 0";

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
      width: relsArray[i].noCoActives
    });
  }

  useEffect(() => {
    nvlRef.current?.fit(idArray);
  }, [nodeViewImg]);

  const mouseEventCallbacks = {
    onNodeClick: (element) => console.log("onClick", element),
    onZoom: (zoom) => console.log("onZoom", zoom),
    onDrag: (nodes) => console.log('onDrag', nodes),
    onPan: (evt) => console.log('onPan', evt),
  };

  const handleChangeNodeView = () => {
    setNodeViewImg((prevNodeViewImg) => !prevNodeViewImg);
  };

  const idArray = [];
  for (let i = 0; i < compoundsArray.length; i++) {
    idArray.push(nodes[i].id);
  }

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
      <FitToScreenButton onClick={() => nvlRef.current?.fit(idArray)} />
      <ChangeNodeViewButton onClick={handleChangeNodeView} />
    </div>
  );
};

export default GraphView;
