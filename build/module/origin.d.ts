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
    senders: Set<string>;
    /**
     * Distinct addresses
     * e.g. `["jon@mail.example.com",...]`
     */
    addresses: Set<string>;
    /**
     * Distinct domains
     * e.g. `["example.com",...]`
     */
    domains: Set<string>;
    /**
     * Compute properties dependent on filtered data.
     */
    protected compute(): void;
    /**
     * Generate Sankey graph nodes and links for email origins against filtered data.
     *
     * @todo benchmark
     * @todo seems like the kind of processing that could move to worker?
     */
    sankey(): SankeyGraph;
}
/**
 * Convenience utility to create a SankeyNode entity from a terse object as input.
 */
export declare let createNode: (n: {
    sender: string;
} | {
    address: string;
} | {
    domain: string;
}) => SankeyNode;
