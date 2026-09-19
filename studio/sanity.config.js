import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes/index.js";
import { structure } from "./structure.js";

// projectId/dataset are filled in once `sanity init`/the Management API has
// created the project — see studio/README.md. Kept as env vars so the same
// config works for anyone on the team without hardcoding an id here.
export default defineConfig({
  name: "hairhood",
  title: "Hair Hood",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "ep0gakki",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
