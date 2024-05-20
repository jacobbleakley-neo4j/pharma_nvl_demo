import React from "react";

const TableView = ({ nodeData }) => {
  const data = nodeData.compounds
  const nodes = [];

  for (let i = 0; i < data.length; i++) {
    const moleculeId = data[i].compound_id;
    const html = (
      <img
        src={`https://www.chemspider.com/ImagesHandler.ashx?id=${moleculeId}&w=250&h=250`}
        alt={`Molecule ${moleculeId}`}
      />
    );
    nodes.push({
      id: i.toString(),
      caption: moleculeId.toString(),
      color: "rgb(100, 100, 100)",
      captionSize: 15,
      size: 25,
      captionPosition: "top",
      html,
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-10 mb-10">
      <table className="table-fixed w-1/2 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300 bg-gray-200">
              Molecule ID
            </th>
            <th className="px-4 py-2 border border-gray-300 bg-gray-200">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id}>
              <td className="px-4 py-2 border border-gray-300">
                {node.caption}
              </td>
              <td className="px-4 py-2 border border-gray-300"><div className="w-1/2 mx-auto">{node.html}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
