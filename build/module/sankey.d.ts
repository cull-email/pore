import Datum from './datum';
/**
 * @link https://en.wikipedia.org/wiki/Sankey_diagram
 * @link https://github.com/d3/d3-sankey
 */
export default class SankeyGraph {
    nodes: SankeyNodes;
    links: SankeyLink[];
    constructor(nodes?: SankeyNodes, links?: SankeyLink[]);
    append(link: SankeyLink): void;
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
export declare type SankeyNodes = Map<string, SankeyNode>;
