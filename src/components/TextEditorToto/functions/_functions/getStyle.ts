import { Editor, Node } from "slate";

export default function getStyle(editor: Editor) {
  const [match] = Editor.nodes(editor, {
    match: (n: Node) => "style" in n && "type" in n,
    mode: "all",
  });
  const [element] = match;

  if (!("style" in element)) {
    return void 0;
  } else {
    return element.style;
  }
}
