import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";

const nodeDefinitions = [
  { id: "start" },
  { id: "expectations" },
  { id: "name" },
  { id: "dob" },
  { id: "address" },
  { id: "ageCheck" },
  { id: "employment" },
  { id: "housing" },
  { id: "income" },
  { id: "householdIncome" },
  { id: "review" },
  { id: "checks" },
  { id: "pin" },
  { id: "pinEnd" },
  { id: "ageDecline" },
  { id: "ageDeclineEnd" },
];

const edgeDefinitions = [
  { source: "start", target: "expectations" },
  { source: "expectations", target: "name" },
  { source: "name", target: "dob" },
  { source: "dob", target: "address" },
  { source: "address", target: "ageCheck" },
  { source: "ageCheck", target: "employment", label: "Continue" },
  { source: "ageCheck", target: "ageDecline", label: "Decline" },
  { source: "ageDecline", target: "ageDeclineEnd" },
  { source: "employment", target: "housing" },
  { source: "housing", target: "income" },
  { source: "income", target: "householdIncome" },
  { source: "householdIncome", target: "review" },
  { source: "review", target: "checks" },
  { source: "checks", target: "pin" },
  { source: "pin", target: "pinEnd" },
];

function App() {
  const initialNodes = useMemo(() => {
    // Define the vertical order of nodes in the workflow
    const verticalOrder = [
      "start",
      "expectations",
      "name",
      "dob",
      "address",
      "ageCheck",
      "employment",
      "housing",
      "income",
      "householdIncome",
      "review",
      "checks",
      "pin",
      "pinEnd",
    ];

    return nodeDefinitions.map((node) => {
      const verticalIndex = verticalOrder.indexOf(node.id);
      const isDeclineNode =
        node.id === "ageDecline" || node.id === "ageDeclineEnd";

      return {
        id: node.id,
        position: {
          // Main flow in center, decline nodes offset to the right
          x: isDeclineNode ? 650 : 400,
          // Position decline nodes appropriately
          y:
            node.id === "ageDecline"
              ? verticalOrder.indexOf("employment") * 120 + 50
              : node.id === "ageDeclineEnd"
              ? verticalOrder.indexOf("employment") * 120 + 170
              : verticalIndex * 120 + 50,
        },
        data: { label: node.id },
        className: `border-2 border-gray-800 rounded-lg p-3 min-w-[150px] text-center text-gray-800 font-bold`,
      };
    });
  }, []);

  const initialEdges = useMemo(() => {
    return edgeDefinitions.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label || "",
      animated: false,
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
  }, []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-screen h-screen">
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
}

export default App;
