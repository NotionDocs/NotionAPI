<div align="center">

<img src="https://avatars2.githubusercontent.com/u/67568167" width="100"/>  

<h1>Notion API</h1>
<p>The unofficial Javascript API for Notion content. Written in Typescript, GraphQL friendly.</p>

[![Build](https://github.com/NotionDocs/NotionAPI/actions/workflows/build.yml/badge.svg)](https://github.com/NotionDocs/NotionAPI/actions/workflows/build.yml)
[![release](https://badgen.net/github/release/NotionDocs/NotionAPI)](https://github.com/NotionDocs/NotionAPI/releases)
[![last commit](https://badgen.net/github/last-commit/NotionDocs/NotionAPI/main)](https://github.com/NotionDocs/NotionAPI/commits/main)
![contributors welcome](https://badgen.net/badge/contributors/welcome/purple)

![Code Quality Score](https://www.code-inspector.com/project/21908/score/svg)
![Code Grade](https://www.code-inspector.com/project/21908/status/svg)

</div>

---

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
| Create new page in collection    | ❌            |                                                                         |
| Delete page in collection        | ❌            |                                                                         |

# Documentation

Documentation is coming soon, once the entire NotionDocs suite is finished. **That being said**, Notion API is written entirely in Typescript and is (WIP) fully documented in code.