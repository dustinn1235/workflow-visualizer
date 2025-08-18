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

interface Props {
  nodeDefinitions: NodeDefinition[];
  edgeDefinitions: EdgeDefinition[];
}

const VisualizationPanel = ({ nodeDefinitions, edgeDefinitions }: Props) => {
  const initialNodes = useMemo(() => {
    const verticalOrder = nodeDefinitions.map((node) => node.id);

    return nodeDefinitions.map((node) => {
      const verticalIndex = verticalOrder.indexOf(node.id);

      return {
        id: node.id,
        position: {
          x: 400,
          y: verticalIndex * 120 + 50,
        },
        data: { label: node.id },
        className: `border-2 border-gray-800 rounded-lg p-3 min-w-[200px] text-center text-gray-800 font-bold`,
      };
    });
  }, [nodeDefinitions]);

  const initialEdges = useMemo(() => {
    return edgeDefinitions.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label || "",
      animated: true,
      style: { stroke: "#374151", strokeWidth: 2 },
      markerEnd: {
        type: "arrowclosed" as const,
        color: "#374151",
      },
      labelStyle: edge.label
        ? {
            fontSize: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            fontWeight: "bold",
          }
        : undefined,
    }));
  }, [edgeDefinitions]);

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
