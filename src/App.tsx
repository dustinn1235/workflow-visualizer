import "@xyflow/react/dist/style.css";
import { useState } from "react";

import InputPanel from "./components/InputPanel";
import VisualizationPanel from "./components/VisualizationPanel";
import type { EdgeDefinition, NodeDefinition } from "./types";

function App() {
  const [nodeDefinitions, setNodeDefinitions] = useState<NodeDefinition[]>([]);
  const [edgeDefinitions, setEdgeDefinitions] = useState<EdgeDefinition[]>([]);

  return (
    <div className="w-screen h-screen flex">
      <InputPanel
        setNodeDefinitions={setNodeDefinitions}
        setEdgeDefinitions={setEdgeDefinitions}
      />

      <VisualizationPanel
        nodeDefinitions={nodeDefinitions}
        edgeDefinitions={edgeDefinitions}
      />
    </div>
  );
}

export default App;
