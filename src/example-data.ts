export const exampleNodeDefinitions = [
  { id: "start" },
  { id: "nodeA" },
  { id: "nodeB" },
  { id: "nodeC" },
  { id: "end" },
];

export const exampleEdgeDefinitions = [
  { source: "start", target: "nodeA" },
  { source: "nodeA", target: "nodeB" },
  { source: "nodeB", target: "nodeC" },
  { source: "nodeC", target: "end" },
];

export const exampleInputText = `
  const nodes = [
    new StartNode('start'),
    new NodeA('nodeA'),
    new NodeB('nodeB'),
    new NodeC('nodeC'),
    new EndNode('end'),
  ];
  const edges = [
    new Edge({
      sourceNodeId: 'start',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'nodeA',
      targetPinId: 'inputNavigationPin',
    }),
    new Edge({
      sourceNodeId: 'nodeA',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'nodeB',
      targetPinId: 'inputNavigationPin',
    }),
    new Edge({
      sourceNodeId: 'nodeB',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'nodeC',
      targetPinId: 'inputNavigationPin',
    }),
    new Edge({
      sourceNodeId: 'nodeC',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'end',
      targetPinId: 'inputNavigationPin',
    }),
  ];
  `;
