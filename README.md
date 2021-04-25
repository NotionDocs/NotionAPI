<div align="center">

<img src="https://avatars2.githubusercontent.com/u/67568167" width="100"/>  

<h1>Notion API</h1>
<p>The unofficial Javascript API for Notion content. Written in Typescript, GraphQL friendly.</p>

[![Build](https://github.com/NotionDocs/NotionAPI/actions/workflows/build.yml/badge.svg)](https://github.com/NotionDocs/NotionAPI/actions/workflows/build.yml)
[![release](https://badgen.net/github/release/NotionDocs/NotionAPI)](https://github.com/NotionDocs/NotionAPI/releases)
[![last commit](https://badgen.net/github/last-commit/NotionDocs/NotionAPI/main)](https://github.com/NotionDocs/NotionAPI/commits/main)
![contributors welcome](https://badgen.net/badge/contributors/welcome/purple)

</div>

---

# Features

Notion API supports all read operations on pages and collections. Write operations are coming soon!

## Notion page

| Feature                | Availability | Notes                                                                  |
|------------------------|--------------|------------------------------------------------------------------------|
| Read page properties   | ✅            |                                                                        |
| Read page metadata     | ✅            |                                                                        |
| Read full page content | ✅            |                                                                        |
| Update page            | ❌            | Feature coming soon! 👀 |

## Notion table/collection

| Feature                          | Availability | Notes                                                                   |
|----------------------------------|--------------|-------------------------------------------------------------------------|
| Fetch collection schema          | ✅            |                                                                         |
| Fetch collection from table page | ✅            |                                                                         |
| Fetch collection from table ID   | ✅            |                                                                         |
| Filter collection based on view  | ✅            | Change the `collectionViewId` based on which view you wish to filter by |
| Create new page in collection    | ❌            |                                                                         |
| Delete page in collection        | ❌            |                                                                         |
