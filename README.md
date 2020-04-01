# pore for [cull](https://cull.email)

An email data analysis library.

## Installation

```sh
npm install @cull/pore
```

## Usage

Generate analytical collections from email _envelopes_ (see [@cull/imap](https://github.com/cull-email/imap)).

### Origin

Analyze sender data to identify distinct senders, addresses and domains. Also, generate a collection of nodes (computing the number of emails for each distinct value) and links connecting the three for use with a data visualization library like [d3-sankey](https://github.com/d3/d3-sankey).

```js
import { Origin } from '@cull/pore';

// envelopes retrieved from a `@cull/imap` Client
let envelopes = [];

let analysis = new Origin(envelopes);

// optionally apply filters
analysis.filter([datum => datum.from.domain === 'cull.email']);

let senders = [...analysis.senders]; // distinct senders
let addresses = [...analysis.addresses]; // distinct addresses
let domains = [...analysis.domains]; // distinct domains
let sankey = analysis.sankey(); // generate nodes and links
```

Also, see [tests](https://github.com/cull-email/pore/blob/master/test/origin.spec.ts).

### Chronology

Analyze chronological data to bucket data by date, hour, day of week and a nested computation by day of week and then by hour.

```js
import { Chronology } from '@cull/pore';

// envelopes retrieved from a `@cull/imap` Client
let envelopes = [];

let analysis = new Chronology(envelopes);

// optionally apply filters
analysis.filter([datum => datum.from.domain === 'cull.email']);

let byDate = [...analysis.byDate];
let byHour = [...analysis.byHour];
let byWeekday = [...analysis.byWeekday];
let byHourByWeekday = [...analysis.byHourByWeekday];
```

Also, see [tests](https://github.com/cull-email/pore/blob/master/test/chronology.spec.ts).

## Development

[`makefile`](https://github.com/cull-email/pore/blob/master/makefile) codifies directives for building, testing, linting and other development oriented tasks.