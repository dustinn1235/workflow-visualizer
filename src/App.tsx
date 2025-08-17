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

// Define the edge data from the user's requirements
const edgeData = [
  {
    sourceNodeId: "start",
    sourcePinId: "",
    targetNodeId: "expectationAboutYourself",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "expectationAboutYourself",
    sourcePinId: "",
    targetNodeId: "name",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "name",
    sourcePinId: "",
    targetNodeId: "dob",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "dob",
    sourcePinId: "",
    targetNodeId: "address",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "address",
    sourcePinId: "",
    targetNodeId: "ageCheck",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "ageCheck",
    sourcePinId: "Continue",
    targetNodeId: "employment",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "ageCheck",
    sourcePinId: "Decline",
    targetNodeId: "ageCheckDecline",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "ageCheckDecline",
    sourcePinId: "",
    targetNodeId: "end",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "employment",
    sourcePinId: "",
    targetNodeId: "housing",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "housing",
    sourcePinId: "",
    targetNodeId: "income",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "income",
    sourcePinId: "",
    targetNodeId: "householdIncome",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "householdIncome",
    sourcePinId: "",
    targetNodeId: "informationReview",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "informationReview",
    sourcePinId: "",
    targetNodeId: "primaryChecks",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "primaryChecks",
    sourcePinId: "",
    targetNodeId: "pin",
    targetPinId: "inputNavigationPin",
  },
  {
    sourceNodeId: "pin",
    sourcePinId: "",
    targetNodeId: "end",
    targetPinId: "inputNavigationPin",
  },
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

  // Create initial edges with pin information as labels
  const initialEdges = useMemo(() => {
    return edgeData.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.sourceNodeId,
      target: edge.targetNodeId,
      label: edge.sourcePinId,
      animated: false,
      style: { stroke: "#374151", strokeWidth: 2 },
      markerEnd: {
        type: "arrowclosed" as const,
        color: "#374151",
      },
      labelStyle: {
        fontSize: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "2px 4px",
        borderRadius: "3px",
        border: "1px solid #d1d5db",
      },
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
