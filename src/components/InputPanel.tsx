import { useState } from "react";

import { exampleInputText } from "../example-data";
import type { EdgeDefinition, NodeDefinition } from "../types";
import { parseEdges, parseNodes } from "../utils";

interface Props {
  setNodeDefinitions: (nodes: NodeDefinition[]) => void;
  setEdgeDefinitions: (edges: EdgeDefinition[]) => void;
}

const InputPanel = ({ setNodeDefinitions, setEdgeDefinitions }: Props) => {
  const [inputText, setInputText] = useState(exampleInputText);

  const handleParse = () => {
    const nodes = parseNodes(inputText);
    const edges = parseEdges(inputText);

    setNodeDefinitions(nodes);
    setEdgeDefinitions(edges);
  };

  return (
    <div className="w-1/3 p-4 bg-gray-100 border-r border-gray-300 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Workflow Parser</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste your nodes and edges code:
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-80 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none"
        />
      </div>

      <button
        onClick={handleParse}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Parse & Visualize
      </button>
    </div>
  );
};

export default InputPanel;
