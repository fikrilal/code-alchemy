import { visit } from "unist-util-visit";

type CodeNode = {
  type: "code";
  lang?: string;
  value: string;
  data?: Record<string, unknown>;
};

type HastElementNode = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: Array<{ type: string; value?: string }>;
};

type MdxJsxAttribute = {
  type: "mdxJsxAttribute";
  name: string;
  value?: string;
};

type MdxJsxFlowElement = {
  type: "mdxJsxFlowElement";
  name: string;
  attributes?: MdxJsxAttribute[];
  children: [];
};

type ParentNode = {
  children: unknown[];
};

export function remarkMermaid() {
  return (tree: unknown) => {
    visit(
      tree as { type: string },
      "code",
      (node: unknown) => {
        const codeNode = node as CodeNode;
        if (codeNode.lang !== "mermaid") return;

        codeNode.data = {
          hName: "div",
          hProperties: {
            className: ["mermaid-diagram-block"],
            "data-mermaid": codeNode.value,
          },
          hChildren: [
            {
              type: "text",
              value: codeNode.value,
            },
          ],
        };
      }
    );
  };
}

export function rehypeMermaid() {
  return (tree: unknown) => {
    visit(
      tree as { type: string },
      "element",
      (node: unknown, index: number | null, parent: unknown) => {
        if (!parent || typeof index !== "number") return;

        const elementNode = node as HastElementNode;
        const parentNode = parent as ParentNode;

        // If the element is a pre/figure whose child is the mermaid div, unwrap and replace the pre/figure
        if (
          (elementNode.tagName === "pre" || elementNode.tagName === "figure") &&
          Array.isArray(elementNode.children) &&
          elementNode.children.length === 1
        ) {
          const firstChild = elementNode.children[0] as HastElementNode;
          const mermaidData =
            firstChild?.properties?.["data-mermaid"] || firstChild?.properties?.dataMermaid;

          if (firstChild?.tagName === "div" && mermaidData) {
            const rawCode = String(mermaidData);
            const mdxNode: MdxJsxFlowElement = {
              type: "mdxJsxFlowElement",
              name: "Mermaid",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "code",
                  value: rawCode,
                },
              ],
              children: [],
            };
            parentNode.children[index] = mdxNode;
            return;
          }
        }

        // If the element itself is the mermaid div
        const mermaidData =
          elementNode.properties?.["data-mermaid"] || elementNode.properties?.dataMermaid;

        if (elementNode.tagName === "div" && mermaidData) {
          const rawCode = String(mermaidData);
          const mdxNode: MdxJsxFlowElement = {
            type: "mdxJsxFlowElement",
            name: "Mermaid",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "code",
                value: rawCode,
              },
            ],
            children: [],
          };
          parentNode.children[index] = mdxNode;
        }
      }
    );
  };
}

