<h1 align="center"><code>@jpmonette/req</code></h1>

<p align="center">
  <a href="https://travis-ci.org/jpmonette/req-ts"><img src="https://travis-ci.org/jpmonette/req-ts.svg?branch=master" alt="Build Status"></a> <a href='https://coveralls.io/github/jpmonette/req-ts?branch=master'><img src='https://coveralls.io/repos/github/jpmonette/req-ts/badge.svg?branch=master' alt='Coverage Status' /></a> <a href="https://badge.fury.io/js/%40jpmonette%2Freq"><img src="https://badge.fury.io/js/%40jpmonette%2Freq.svg" alt="npm version" height="18"></a> <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Tested with Jest"></a> <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>
<p align="center"><code>@jpmonette/req</code> - a JavaScript client library for accessing the <a href="http://www.registreentreprises.gouv.qc.ca/en/default.aspx">Registre des entreprises du Québec</a>.</p>

# Getting Started

## Installation

```sh
$ yarn add @jpmonette/req
```

## Usage

### Import

#### Using Node

```ts
import REQ from "req";
```

#### Using Deno

```ts
import REQ from "https://deno.land/x/req@v1.0.0/src/index.ts";
```

### Search a NEQ

```ts
const client = new REQ();
const company = await client.getNEQ("1143920115");
console.log(company.SectionInformationsGenerales.SousSecIdentification.NomEntreprise);
// Output: BOMBARDIER INC.
```

### Search the registry

```ts
const client = new REQ();
const companies = await client.search({ keywords: "mrc" });

companies.ListeEntreprises.map((company) => {
  console.log(`(${company.NumeroDossier}) ${company.Nom}`);
});
// Output:
// (1165737934) M.R.C.
// (2260227451) M.R.C.
// (1161426722) MRC CARE
// (1142443804) MRC GROUP
// ...
```

## Roadmap

This library is being initially developed for one of my internal project,
so API methods will likely be implemented in the order that they are
needed by my project. Eventually, I would like to cover the entire API,
so contributions are of course [always welcome][contributing]. The
calling pattern is pretty well established, so adding new methods is relatively
straightforward.

[contributing]: CONTRIBUTING.md

## License

This library is distributed under the MIT license found in the [LICENSE](./LICENSE)
file.
