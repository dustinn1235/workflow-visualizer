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

// Define the node data from the user's requirements
const nodeData = [
  { id: "start", type: "StartNode", label: "Start" },
  {
    id: "expectationAboutYourself",
    type: "ExpectationNode",
    label: "Expectation About Yourself",
  },
  { id: "name", type: "NameNode", label: "Name" },
  { id: "dob", type: "DobNode", label: "Date of Birth" },
  { id: "address", type: "AddressNode", label: "Address" },
  { id: "employment", type: "EmploymentNode", label: "Employment" },
  { id: "ageCheck", type: "AgeCheckNode", label: "Age Check" },
  { id: "ageCheckDecline", type: "DeclineNode", label: "Age Check Decline" },
  { id: "housing", type: "HousingNode", label: "Housing" },
  { id: "income", type: "IncomeNode", label: "Income" },
  {
    id: "householdIncome",
    type: "HouseholdIncomeNode",
    label: "Household Income",
  },
  {
    id: "informationReview",
    type: "InformationReviewNode",
    label: "Information Review",
  },
  { id: "primaryChecks", type: "PrimaryChecksNode", label: "Primary Checks" },
  { id: "pin", type: "PinNode", label: "PIN" },
  { id: "end", type: "EndNode", label: "End" },
];

// Define the edge data - simplified without pin concept
const edgeData = [
  { source: "start", target: "expectationAboutYourself" },
  { source: "expectationAboutYourself", target: "name" },
  { source: "name", target: "dob" },
  { source: "dob", target: "address" },
  { source: "address", target: "ageCheck" },
  { source: "ageCheck", target: "employment", label: "Continue" },
  { source: "ageCheck", target: "ageCheckDecline", label: "Decline" },
  { source: "ageCheckDecline", target: "end" },
  { source: "employment", target: "housing" },
  { source: "housing", target: "income" },
  { source: "income", target: "householdIncome" },
  { source: "householdIncome", target: "informationReview" },
  { source: "informationReview", target: "primaryChecks" },
  { source: "primaryChecks", target: "pin" },
  { source: "pin", target: "end" },
];

function App() {
  // Create initial nodes with vertical positioning
  const initialNodes = useMemo(() => {
    // Define the vertical order of nodes in the workflow
    const verticalOrder = [
      "start",
      "expectationAboutYourself",
      "name",
      "dob",
      "address",
      "ageCheck",
      "employment",
      "housing",
      "income",
      "householdIncome",
      "informationReview",
      "primaryChecks",
      "pin",
      "end",
    ];

    return nodeData.map((node) => {
      const verticalIndex = verticalOrder.indexOf(node.id);
      const isDeclineNode = node.id === "ageCheckDecline";

      return {
        id: node.id,
        position: {
          // Main flow in center, decline node offset to the right
          x: isDeclineNode ? 600 : 400,
          // Decline node positioned at same level as employment
          y: isDeclineNode
            ? verticalOrder.indexOf("employment") * 120 + 50
            : verticalIndex * 120 + 50,
        },
        data: {
          label: node.label,
          nodeType: node.type,
        },
        className: `border-2 border-gray-800 rounded-lg p-3 min-w-[150px] text-center text-gray-800 font-bold`,
        style: {
          backgroundColor: getNodeColor(node.type),
        },
      };
    });
  }, []);

  // Create initial edges with simplified structure
  const initialEdges = useMemo(() => {
    return edgeData.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label || "", // Only show label if it exists (Continue/Decline)
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

// Helper function to assign colors based on node type
function getNodeColor(nodeType: string): string {
  const colorMap: { [key: string]: string } = {
    StartNode: "#90EE90", // Light green for start
    EndNode: "#FFB6C1", // Light pink for end
    DeclineNode: "#FFB6B6", // Light red for decline
    AgeCheckNode: "#FFD700", // Gold for decision nodes
    PrimaryChecksNode: "#DDA0DD", // Plum for complex checks
    ExpectationNode: "#87CEEB", // Sky blue for expectations
    InformationReviewNode: "#F0E68C", // Khaki for review
  };

  return colorMap[nodeType] || "#E6E6FA"; // Default lavender color
}

export default App;
