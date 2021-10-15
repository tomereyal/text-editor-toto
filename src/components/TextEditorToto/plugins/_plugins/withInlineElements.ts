import { ReactEditor } from "slate-react";
import { Element } from "slate";

const listOfInlineElTypes = ["span"];
export default function withInlineElements(editor: ReactEditor) {
  editor.isInline = (element: Element) => {
    return listOfInlineElTypes.includes(element.type);
  };

  return editor;
}
