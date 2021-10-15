import { Editor, Element as SlateElement } from "slate";
export default function isBlockActive(editor: Editor, format: string) {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return (
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
      );
    },
  });

  return !!match;
}
