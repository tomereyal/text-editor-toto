import { ReactEditor } from "slate-react";
import { Element } from "slate";
export default function withMathBlockInserts(editor: ReactEditor) {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: Element) => {
    return element.type === "math-block" ? true : isInline(element);
  };

  //   editor.isVoid = (element: SlateElement) => {
  //     return element.type === "math-block" ? true : isVoid(element);
  //   };

  return editor;
}
