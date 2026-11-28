# Ecosystems

## VueJS

The `types/` directory in the project root is used for shared types and declarations. It's also possible to organize types in a modularized style — for example placing type definitions under the `src/modules/product/types/` directory. Types should be placed as close as possible to where they are used, to keep context clear.

The code should be organized thematically within the existing technical folders: per-feature subfolders inside components, composables, or views (e.g. components/product/, components/order/). This approach preserves the technical separation and grouping related code.
