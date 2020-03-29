import Datum from './datum';

/**
 * @link https://en.wikipedia.org/wiki/Sankey_diagram
 * @link https://github.com/d3/d3-sankey
 */
export default class SankeyGraph {
  nodes: SankeyNodes;
  links: SankeyLink[];

  constructor(nodes: SankeyNodes = new Map(), links: SankeyLink[] = []) {
    this.nodes = nodes;
    this.links = links;
  }

  append(link: SankeyLink): void {
    this.nodes.set(link.source.id, link.source);
    this.nodes.set(link.target.id, link.target);
    this.links.push(link);
  }
}

export interface SankeyNode {
  id: string;
  label: string;
  kind: string;
}

export interface SankeyLink {
  source: SankeyNode;
  target: SankeyNode;
  data: Datum[];
}

export type SankeyNodes = Map<string, SankeyNode>;
