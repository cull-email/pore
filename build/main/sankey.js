"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @link https://en.wikipedia.org/wiki/Sankey_diagram
 * @link https://github.com/d3/d3-sankey
 */
class SankeyGraph {
    constructor(nodes = new Map(), links = []) {
        this.nodes = nodes;
        this.links = links;
    }
    append(link) {
        this.nodes.set(link.source.id, link.source);
        this.nodes.set(link.target.id, link.target);
        this.links.push(link);
    }
}
exports.default = SankeyGraph;
