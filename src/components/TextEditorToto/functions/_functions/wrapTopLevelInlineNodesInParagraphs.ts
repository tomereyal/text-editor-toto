import { Editor, Node, Text } from "slate";
import { jsx } from "slate-hyperscript";

export default function wrapTopLevelInlineNodesInParagraphs(
  editor: Editor,
  fragment: Node[]
): Node[] {
  let inlineNodes: Node[] = [];
  const newFragments: Node[] = [];

  const maybePushInlineNodeParagraph = () => {
    if (inlineNodes.length > 0) {
      newFragments.push(jsx("element", { type: "paragraph" }, inlineNodes));
      inlineNodes = [];
    }
  };

  fragment.forEach((node) => {
    if (Text.isText(node) || Editor.isInline(editor, node)) {
      inlineNodes.push(node);
    } else {
      maybePushInlineNodeParagraph();
      newFragments.push(node);
    }
  });
  maybePushInlineNodeParagraph();

  return newFragments;
}
