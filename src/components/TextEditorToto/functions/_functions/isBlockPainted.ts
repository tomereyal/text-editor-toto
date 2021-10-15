import { Editor, Element as SlateElement } from "slate";

export default function isBlockPainted(
  editor: Editor,
  backgroundColor: string
) {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return (
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        "style" in n &&
        n.style.backgroundColor === backgroundColor
      );
    },
  });

  return !!match;
}
