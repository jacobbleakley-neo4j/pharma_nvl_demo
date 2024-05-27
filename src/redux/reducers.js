import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import FitToScreenButton from "../utils/FitToScreenButton";
import ChangeNodeViewButton from "../utils/ChangeNodeViewButton";
import { setInitialNodePositions, setNodeViewImg } from "../redux/actions";
import "../output.css";

const GraphView = ({ nodeData }) => {
  const dispatch = useDispatch();
  const initialNodePositions = useSelector(
    (state) => state.initialNodePositions.initialNodePositions
  );
  const nodeViewImg = useSelector((state) => state.nodeViewImg.nodeViewImg);

  const nvlRef = useRef();
  const nodePositionsRef = useRef({});
  const nodesRef = useRef([]);

  const compoundsArray = nodeData.compounds;
  const relsArray = nodeData.relationships;
  const nodes = [];
  const relationships = [];

  useEffect(() => {
    compoundsArray.forEach((compound, i) => {
      const moleculeId = compound.compound_id.toString();
      const caption = compound.caption.toString();
      const html = document.createElement("img");
      html.src = `https://www.chemspider.com/ImagesHandler.ashx?id=${moleculeId}&w=250&h=250`;
      html.style.opacity = nodeViewImg ? "1" : "0";
      html.setAttribute("draggable", "false");

      const node = {
        id: moleculeId,
        captions: [{ value: nodeViewImg ? `` : `${caption}`, styles: ["bold"] }],
        color: nodeViewImg ? "#FFFFFF" : "#006699",
        size: 25,
        html,
      };

      nodes.push(node);
    });

    nodesRef.current = nodes;

    relsArray.forEach((rel, i) => {
      const caption = rel.label.toString();
      relationships.push({
        id: i.toString(),
        from: rel.from.toString(),
        to: rel.to.toString(),
        color: "#00334d",
        captions: [{ value: `${caption}` }],
        width: rel.width,
      });
    });

    const sortedRelsArray = checkCoactives(relsArray);
    sortedRelsArray.forEach((rel, i) => {
      relationships[i].width = rel.width;
    });
  }, [compoundsArray, relsArray, nodeViewImg]);

  const mouseEventCallbacks = {
    onNodeClick: () => void 0,
    onZoom: () => void 0,
    onDrag: (nodes) => {
      const newPositions = nvlRef.current?.getNodePositions();
      nodePositionsRef.current = newPositions;
    },
    onPan: () => void 0,
  };

  const handleChangeNodeView = () => {
    dispatch(setNodeViewImg(!nodeViewImg));
  };

  const idArray = compoundsArray.map((compound) => compound.compound_id.toString());

  const checkCoactives = (relsArray) => {
    const sortedRelsArray = [...relsArray].sort(
      (a, b) => a.noCoActives - b.noCoActives
    );

    const numberOfWidths = Math.min(sortedRelsArray.length, 5);
    const maxCoactives = sortedRelsArray[sortedRelsArray.length - 1].noCoActives;
    const coactiveDivide = Math.ceil(maxCoactives / numberOfWidths);

    sortedRelsArray.forEach((rel, i) => {
      for (let j = 1; j <= numberOfWidths; j++) {
        if (rel.noCoActives > coactiveDivide * (j - 1) && rel.noCoActives <= coactiveDivide * j) {
          sortedRelsArray[i].width = j;
        }
      }
    });

    return sortedRelsArray;
  };

  const fitToScreen = () => {
    nvlRef.current?.fit(idArray);
    nvlRef.current?.setNodePositions(initialNodePositions);
  };

  useEffect(() => {
    setTimeout(() => {
      nvlRef.current?.fit(idArray);
    }, 100);

    if (!initialNodePositions || Object.keys(initialNodePositions).length === 0) {
      setTimeout(() => {
        console.log("Component did mount");
        const initialPosition = nvlRef.current?.getNodePositions();
        dispatch(setInitialNodePositions(initialPosition));
      }, 1000);
    }
  }, [initialNodePositions, dispatch, idArray]);

  useEffect(() => {
    nodesRef.current.forEach((node) => {
      node.html.style.opacity = nodeViewImg ? "1" : "0";
    });
  }, [nodeViewImg]);

  return (
    <div>
      <div style={{ height: "95vh" }}>
        <InteractiveNvlWrapper
          nodes={nodesRef.current}
          rels={relationships}
          captions={["caption"]}
          ref={nvlRef}
          layout="hierarchical"
          nvlOptions={{ initialZoom: 2, useWebGL: false }}
          nvlCallbacks={{ onLayoutDone: () => console.log("layout done") }}
          mouseEventCallbacks={mouseEventCallbacks}
        />
      </div>
      <FitToScreenButton onClick={fitToScreen} />
      <ChangeNodeViewButton onClick={handleChangeNodeView} />
    </div>
  );
};

export default React.memo(GraphView);

