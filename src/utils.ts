import dagre from "@dagrejs/dagre";
import type { Node, Edge } from "@xyflow/react";
import type { EdgeDefinition, NodeDefinition } from "./types";

export const parseNodes = (inputText: string): NodeDefinition[] => {
  const regex = /new\s+(\w+Node)\s*\(\s*'([^']+)'/g;
  let match: RegExpExecArray | null;
  const extractedRawIds: string[] = [];

  while ((match = regex.exec(inputText)) !== null) {
    extractedRawIds.push(match[2]);
  }

  return extractedRawIds.map((id) => ({ id }));
};

export const parseEdges = (inputText: string): EdgeDefinition[] => {
  const regex = /new Edge\(\{([^}]+)\}\)/g;
  let match: RegExpExecArray | null;
  const parsedEdges: EdgeDefinition[] = [];

  while ((match = regex.exec(inputText)) !== null) {
    const edgeContent = match[1];

    const sourceNodeIdMatch = edgeContent.match(/sourceNodeId:\s*'([^']+)'/);
    const sourcePinIdMatch = edgeContent.match(/sourcePinId:\s*'([^']+)'/);
    const targetNodeIdMatch = edgeContent.match(/targetNodeId:\s*'([^']+)'/);
    const targetPinIdMatch = edgeContent.match(/targetPinId:\s*'([^']+)'/);

    if (
      sourceNodeIdMatch &&
      sourcePinIdMatch &&
      targetNodeIdMatch &&
      targetPinIdMatch
    ) {
      const rawSourceNodeId = sourceNodeIdMatch[1];
      const rawSourcePinId = sourcePinIdMatch[1];
      const rawTargetNodeId = targetNodeIdMatch[1];

      const newEdge: EdgeDefinition = {
        source: rawSourceNodeId,
        target: rawTargetNodeId,
        label: rawSourcePinId.replace("outputNavigationPin", ""),
      };

      parsedEdges.push(newEdge);
    }
  }

  return parsedEdges;
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (
  nodeDefinitions: NodeDefinition[],
  edgeDefinitions: EdgeDefinition[]
) => {
  const nodeWidth = 200;
  const nodeHeight = 80;

  dagreGraph.setGraph({
    nodesep: 150, // Horizontal spacing between nodes
    ranksep: 50, // Vertical spacing between ranks
  });

  // Clear previous graph data
  nodeDefinitions.forEach((node) => {
    if (dagreGraph.hasNode(node.id)) {
      dagreGraph.removeNode(node.id);
    }
  });

  // Add nodes to the graph
  nodeDefinitions.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add edges to the graph
  edgeDefinitions.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Transform nodes to ReactFlow format with calculated positions
  const layoutedNodes: Node[] = nodeDefinitions.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      id: node.id,
      position: {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      },
      data: { label: node.id },
      className: `border-2 border-gray-800 rounded-lg p-3 min-w-[200px] text-center text-gray-800 font-bold`,
    };
  });

  // Transform edges to ReactFlow format with better styling and routing
  const layoutedEdges: Edge[] = edgeDefinitions.map((edge, index) => ({
    id: `edge-${index}`,
    source: edge.source,
    target: edge.target,
    label: edge.label || "",
    animated: true,
    type: "smoothstep",
    style: {
      stroke: "#374151",
      strokeWidth: 2,
    },
    markerEnd: {
      type: "arrowclosed" as const,
      color: "#374151",
    },
    labelStyle: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#374151",
    },
  }));

  return { nodes: layoutedNodes, edges: layoutedEdges };
};
