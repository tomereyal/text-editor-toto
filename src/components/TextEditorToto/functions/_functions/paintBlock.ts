import { Editor, Node, Transforms } from "slate";
import isBlockPainted from "./isBlockPainted";

//USE UPDATESTYLE INSTEAD

export default function paintBlock(editor: Editor, backgroundColor: string) {
  const [match] = Editor.nodes(editor, {
    match: (n: Node) => "style" in n && "type" in n,
    mode: "all",
  });
  const [element] = match;

  if (!("style" in element)) {
    return;
  }
  const newProperties = {
    style: {
      ...element.style,
      backgroundColor,
    },
  };

  Transforms.setNodes(editor, newProperties);
}
