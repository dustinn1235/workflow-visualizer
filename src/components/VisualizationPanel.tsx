import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useMemo, useEffect } from "react";

import type { EdgeDefinition, NodeDefinition } from "../types";
import { getLayoutedElements } from "../utils";

interface Props {
  nodeDefinitions: NodeDefinition[];
  edgeDefinitions: EdgeDefinition[];
}

const VisualizationPanel = ({ nodeDefinitions, edgeDefinitions }: Props) => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    return getLayoutedElements(nodeDefinitions, edgeDefinitions);
  }, [nodeDefinitions, edgeDefinitions]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default VisualizationPanel;
