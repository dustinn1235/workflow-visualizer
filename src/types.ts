export interface NodeDefinition {
  id: string;
}

export interface EdgeDefinition {
  source: string;
  target: string;
  label?: string;
}
