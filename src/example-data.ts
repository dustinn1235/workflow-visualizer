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
    new ANode('a'),
    new BNode('b'),
    new CNode('c'),
    new EndNode('end'),
  ];
  const edges = [
    new Edge({
      sourceNodeId: 'start',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'a',
      targetPinId: 'inputNavigationPin',
    }),
    new Edge({
      sourceNodeId: 'a',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'b',
      targetPinId: 'inputNavigationPin',
    }),
    new Edge({
      sourceNodeId: 'b',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'c',
      targetPinId: 'inputNavigationPin',
    }),
    new Edge({
      sourceNodeId: 'c',
      sourcePinId: 'outputNavigationPin',
      targetNodeId: 'end',
      targetPinId: 'inputNavigationPin',
    }),
  ];
  `;
