import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "../output.css";
import FitToScreenButton from "../utils/FitToScreenButton";
import ChangeNodeViewButton from "../utils/ChangeNodeViewButton";

const GraphView = ({ nodeData }) => {
  const compoundsArray = nodeData.compounds;
  const relsArray = nodeData.relationships;
  const nvlRef = useRef();
  const [nodeViewImg, setNodeViewImg] = useState(true);
  const [nodePositions, setNodePositions] = useState({});
  const dispatch = useDispatch();
  const savedNodePositions = useSelector(
    (state) => state.nodePositions.nodePositions
  );

  const createCompoundImage = ( compoundId) => {
    const img = document.createElement('img');
    img.src = `https://www.chemspider.com/ImagesHandler.ashx?id=${compoundId}&w=250&h=250`;
    img.style = nodeViewImg ? 'opacity: 1' : 'opacity: 0';
    img.setAttribute('draggable', 'false');
    return img;
  };


  const nodes = compoundsArray.map(compound => ({
    id: compound.compound_id.toString(),
    captions: [{ value: `${compound.caption.toString()}`, styles: ['bold'] }],
    color: nodeViewImg ? "#FFFFFF" : "#006699",
    size: 25,
    html: createCompoundImage(compound.compound_id)
  }));

  const relationships = relsArray.map((rel, index) => ({
    id: index.toString(),
    from: rel.from.toString(),
    to: rel.to.toString(),
    color: '#00334d',
    captions: [{ value: `${rel.label.toString()}` }],
    width: rel.width,
  }));



  const handleNodeDrag = (nodes) => {
    const newPositions = nvlRef.current?.getNodePositions();
    dispatch(setNodePositions(newPositions));
  };

  const mouseEventCallbacks = {
    onNodeClick: (element) => console.log("onClick", element),
    onZoom: (zoom) => console.log("onZoom", zoom),
    onDrag: () => handleNodeDrag,
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

  checkCoactives(relsArray);

  useEffect(() => {
    const timer = 
    // setTimeout(
      () => {
      nvlRef.current?.fit(idArray);
      const initialNodePositions = nvlRef.current?.getNodePositions();
      setNodePositions(initialNodePositions);
      console.log("nodePositions", initialNodePositions);
    }
    // , 1000); // Delay of 500 milliseconds
    // return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    nvlRef.current?.fit(idArray);
  }, [nodeViewImg]);

  return (
    <div>
      <div style={{ height: "95vh" }}>
        <InteractiveNvlWrapper
          nodes={nodes}
          rels={relationships}
          captions={["caption"]}
          ref={nvlRef}
          layout="hierarchical"
          nvlOptions={{ useWebGL: false }}
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
