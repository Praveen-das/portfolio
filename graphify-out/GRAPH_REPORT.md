# Graph Report - .  (2026-04-28)

## Corpus Check
- 28 files · ~62,493 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 37 nodes · 21 edges · 16 communities detected
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.88)
- Token cost: 1,000 input · 500 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Core Projects Identity|Core Projects Identity]]
- [[_COMMUNITY_Snapping Button UI|Snapping Button UI]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_Bubble Pointer|Bubble Pointer]]
- [[_COMMUNITY_Skills Section|Skills Section]]
- [[_COMMUNITY_About Section|About Section]]
- [[_COMMUNITY_Contact Section|Contact Section]]
- [[_COMMUNITY_Header Navigation|Header Navigation]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Pointer Component|Pointer Component]]
- [[_COMMUNITY_Works Section|Works Section]]
- [[_COMMUNITY_Divider Component|Divider Component]]
- [[_COMMUNITY_Vite Configuration|Vite Configuration]]
- [[_COMMUNITY_Main Entry|Main Entry]]
- [[_COMMUNITY_Framer Utils|Framer Utils]]
- [[_COMMUNITY_Vite Docs|Vite Docs]]

## God Nodes (most connected - your core abstractions)
1. `Praveen Das` - 5 edges
2. `Full Stack Developer` - 1 edges
3. `React` - 1 edges
4. `Artworld Project` - 1 edges
5. `Chatsphere Project` - 1 edges
6. `Disney Plus Project` - 1 edges
7. `Vite` - 0 edges

## Surprising Connections (you probably didn't know these)
- `Artworld Project` --built_by--> `Praveen Das`  [INFERRED]
  src\assets\projects\artworld.png → index.html
- `Chatsphere Project` --built_by--> `Praveen Das`  [INFERRED]
  src\assets\projects\chatsphere.png → index.html
- `Disney Plus Project` --built_by--> `Praveen Das`  [INFERRED]
  src\assets\projects\disneyplus.png → index.html
- `Praveen Das` --uses--> `React`  [INFERRED]
  index.html → README.md

## Communities

### Community 0 - "Core Projects Identity"
Cohesion: 0.33
Nodes (6): Artworld Project, Chatsphere Project, Disney Plus Project, Full Stack Developer, Praveen Das, React

### Community 1 - "Snapping Button UI"
Cohesion: 0.5
Nodes (0): 

### Community 2 - "App Entry Point"
Cohesion: 0.67
Nodes (0): 

### Community 3 - "Bubble Pointer"
Cohesion: 0.67
Nodes (0): 

### Community 4 - "Skills Section"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "About Section"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Contact Section"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Header Navigation"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Hero Section"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Pointer Component"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Works Section"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Divider Component"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Vite Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Main Entry"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Framer Utils"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Vite Docs"
Cohesion: 1.0
Nodes (1): Vite

## Knowledge Gaps
- **6 isolated node(s):** `Full Stack Developer`, `React`, `Vite`, `Artworld Project`, `Chatsphere Project` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `About Section`** (2 nodes): `About()`, `About.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Section`** (2 nodes): `ContactMe()`, `ContactMe.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Header Navigation`** (2 nodes): `Header()`, `Header.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Section`** (2 nodes): `HeroSection()`, `HeroSection.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pointer Component`** (2 nodes): `Pointer()`, `Pointer.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Works Section`** (2 nodes): `Works.jsx`, `Works()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Divider Component`** (2 nodes): `Devider()`, `Divider.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Configuration`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Main Entry`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Framer Utils`** (1 nodes): `framer.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Docs`** (1 nodes): `Vite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 4 inferred relationships involving `Praveen Das` (e.g. with `React` and `Artworld Project`) actually correct?**
  _`Praveen Das` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Full Stack Developer`, `React`, `Vite` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._