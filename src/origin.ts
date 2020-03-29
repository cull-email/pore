import SankeyGraph, { SankeyNode } from './sankey';

import Data from './data';

/**
 * Datum collection analyzing the origins of email.
 */
export default class Origin extends Data {
  /**
   * Distinct sender values
   * e.g. `["jon <jon@mail.example.com>",...]`
   */
  senders!: Set<string>;
  /**
   * Distinct addresses
   * e.g. `["jon@mail.example.com",...]`
   */
  addresses!: Set<string>;
  /**
   * Distinct domains
   * e.g. `["example.com",...]`
   */
  domains!: Set<string>;

  /**
   * Compute properties dependent on filtered data.
   */
  protected compute(): void {
    super.compute();
    /**
     * Though seemingly uncommon in practice, technically there may be more than one "from" header.
     * Currently, treat each value as a distinct message. A natural side effect of this approach is that
     * counting distinct "from" values may be greater than the total number of distinct Datum.
     *
     * @todo Is there a better way to handle the scenario where more than one "from" value is present?
     * @todo Should the "from" values be filtered to guarantee uniqueness in the context of Datum?
     */
    this.senders = new Set();
    this.addresses = new Set();
    this.domains = new Set();
    this.data
      .flatMap(d => d.from)
      .forEach(d => {
        this.senders.add(d.value);
        this.addresses.add(d.address);
        this.domains.add(d.domain);
      });
  }

  /**
   * Generate Sankey graph nodes and links for email origins against filtered data.
   *
   * @todo benchmark
   * @todo seems like the kind of processing that could move to worker?
   */
  sankey(): SankeyGraph {
    let graph = new SankeyGraph();
    this.senders.forEach(sender => {
      let data = this.data.filter(d => d.from.find(f => f.value === sender));
      if (data.length > 0) {
        let first = data[0].from.find(f => f.value === sender);
        if (first !== undefined) {
          let address = first.address;
          let source = createNode({ sender });
          let target = createNode({ address });
          graph.append({ source, target, data });
        }
      }
    });
    this.addresses.forEach(address => {
      let data = this.data.filter(d => d.from.find(f => f.address === address));
      if (data.length > 0) {
        let first = data[0].from.find(f => f.address === address);
        if (first !== undefined) {
          let domain = first.domain;
          let source = createNode({ address });
          let target = createNode({ domain });
          graph.append({ source, target, data });
        }
      }
    });
    return graph;
  }
}

/**
 * Convenience utility to create a SankeyNode entity from a terse object as input.
 */
export let createNode = (
  n: { sender: string } | { address: string } | { domain: string }
): SankeyNode => {
  let kind = Object.keys(n)[0];
  let label = n[kind];
  let id = `${kind}__${label}`;
  let node = { kind, label, id };
  return node;
};
