<div align="center">

<img src="https://avatars2.githubusercontent.com/u/67568167" width="100"/>  

<h1>NotionAPI</h1>
<p>The unofficial Javascript API for Notion content. Written in Typescript, GraphQL friendly.</p>

[![Build](https://github.com/NotionDocs/NotionAPI/actions/workflows/build.yml/badge.svg)](https://github.com/NotionDocs/NotionAPI/actions/workflows/build.yml)
[![release](https://badgen.net/github/release/NotionDocs/NotionAPI)](https://github.com/NotionDocs/NotionAPI/releases)
[![last commit](https://badgen.net/github/last-commit/NotionDocs/NotionAPI/main)](https://github.com/NotionDocs/NotionAPI/commits/main)
![contributors welcome](https://badgen.net/badge/contributors/welcome/purple)

![Code Quality Score](https://www.code-inspector.com/project/21908/score/svg)
![Code Grade](https://www.code-inspector.com/project/21908/status/svg)

</div>

---

# Overview

NotionAPI comes with 3 packages: [`@notiondocs/api-client`](https://github.com/NotionDocs/NotionAPI/packages/696039), [`@notiondocs/api-core`](https://github.com/NotionDocs/NotionAPI/packages/696041), and [`@notiondocs/api-transform`](https://github.com/NotionDocs/NotionAPI/packages/696040). Each package serves a different purpose:

- [`@notiondocs/api-client`](https://github.com/NotionDocs/NotionAPI/packages/696039) is used for making queries to the Notion backend. It is a required dependency for `@notiondocs/api-core`.
- [`@notiondocs/api-client`](https://github.com/NotionDocs/NotionAPI/packages/696041) provides a layer of abstraction on top of the `client` package that makes manipulating data from the Notion backend a breeze.
- [`@notiondocs/api-transform`](https://github.com/NotionDocs/NotionAPI/packages/696040) allows you to transform Notion page content by providing specific transformation rules.

# Features

Notion API supports all read operations on pages and collections. Write operations are coming soon!

## Notion backend

| Feature | Availability | Notes |
|---------|--------------|-------|
| Query Notion backend | ✅ | see [`client` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/client) |
| Query private pages | ✅ | see [`client` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/client) |
| Get user information | 😕 | not directly supported, but possible with [`client` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/client) |

## Notion page

| Feature | Availability | Notes |
|---------|--------------|-------|
| Read page properties | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Read page metadata | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Read full page content | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Transform content block map | ✅ | see [`transform` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/transform) |
| Update page | ❌ | Feature coming soon! 👀 |

## Notion table/collection

| Feature | Availability | Notes |
|---------|--------------|-------|
| Fetch collection schema | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Fetch collection from collection page | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Fetch collection from collection ID | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Filter collection based on view | ✅ | see [`core` package](https://github.com/NotionDocs/NotionAPI/tree/main/packages/core) |
| Create new page in collection    | ❌ |                                                                         |
| Delete page in collection        | ❌ |                                                                         |

# Documentation

Documentation is coming soon, once the entire NotionDocs suite is finished. **That being said**, NotionAPI is written entirely in Typescript and is (WIP) fully documented in code.