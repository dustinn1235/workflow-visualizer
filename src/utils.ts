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
