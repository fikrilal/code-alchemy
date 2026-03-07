import { defaultSchema } from "hast-util-sanitize";

import type { Schema } from "hast-util-sanitize";

const baseGlobalAttributes = defaultSchema.attributes?.["*"] ?? [];

const lineAndTokenAttributes = [
  "data-line",
  "data-highlighted-line",
  "data-highlighted-chars",
  "data-chars-id",
  "data-chars",
  "data-language",
  "data-theme",
  "data-rehype-pretty-code-figure",
];

export const mdxSanitizeSchema: Schema = {
  ...defaultSchema,
  clobberPrefix: "mdx-",
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "figure",
    "figcaption",
    "details",
    "summary",
    "mark",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [
      ...baseGlobalAttributes,
      "id",
      "className",
      ...lineAndTokenAttributes,
    ],
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      "target",
      "rel",
      "ariaLabel",
      "ariaHidden",
      "tabIndex",
      "className",
    ],
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      "className",
      ...lineAndTokenAttributes,
    ],
    pre: [
      ...(defaultSchema.attributes?.pre ?? []),
      "className",
      ...lineAndTokenAttributes,
    ],
    span: [
      ...(defaultSchema.attributes?.span ?? []),
      "className",
      ...lineAndTokenAttributes,
    ],
    div: [
      ...(defaultSchema.attributes?.div ?? []),
      "className",
      ...lineAndTokenAttributes,
    ],
    figure: [
      ...(defaultSchema.attributes?.figure ?? []),
      "className",
      ...lineAndTokenAttributes,
    ],
  },
};
