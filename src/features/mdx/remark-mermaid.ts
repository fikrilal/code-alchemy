import { visit } from "unist-util-visit";

type CodeNode = {
  type: "code";
  lang?: string;
  value: string;
};

type ParentNode = {
  children: unknown[];
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

export function remarkMermaid() {
  return (tree: unknown) => {
    visit(
      tree as { type: string },
      "code",
      (node: unknown, index: number | null, parent: unknown) => {
        if (!parent || typeof index !== "number") return;

        const codeNode = node as CodeNode;
        if (codeNode.lang !== "mermaid") return;

        const parentNode = parent as ParentNode;

        const mdxNode: MdxJsxFlowElement = {
          type: "mdxJsxFlowElement",
          name: "Mermaid",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "code",
              value: codeNode.value,
            },
          ],
          children: [],
        };

        parentNode.children[index] = mdxNode;
      }
    );
  };
}

