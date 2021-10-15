import { ReactEditor } from 'slate-react';
import { Descendant } from "slate";
export default function serializeMathAndText(editor: ReactEditor) {
  const childrenArr = editor.children;
  let string = "";
  const getChildTextAndMath = (children: Descendant[]) => {
    children.forEach((child: Descendant) => {
      if ("math" in child && child.type === "math-block") {
        string += child.math;
      } else if ("text" in child && child.text) {
        string += child.text;
      }
    });
  };
  if ("children" in childrenArr[0])
    getChildTextAndMath(childrenArr[0].children);
  return string;
}
