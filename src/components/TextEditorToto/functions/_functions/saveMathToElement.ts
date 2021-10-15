import { ReactEditor } from "slate-react";
import { Editor, Range, Transforms, Element as SlateElement } from "slate";

export default function saveMathToElement(
  editor: ReactEditor,
  math: string,
  options: any
) {
  const { selection } = editor;

  if (selection && Range.isCollapsed(selection)) {
    Transforms.setNodes(
      editor,
      { math: math },
      {
        match: (n, path) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "math-block",
      }
    );
    // console.log(`math saved`, math);

    //previous element check for hebrew:
    const [prevNode, prevLocation] = Editor.previous(editor)!;
    const text = "text" in prevNode ? prevNode.text : void 0;
    let hebrew = false;
    let i = 0;
    if (text) {
      while (!hebrew && i < text.length) {
        let isHebrew = text[i].match(/([\u0590-\u05fe\u200f\u200e]+)$/);
        if (isHebrew) {
          hebrew = true;
        }
        i++;
      }
    }
    // const prevText = prevNode[0].text;
    if (options && options.exitOnSave) {
      ReactEditor.focus(editor);
      if (!hebrew) {
        if (options.direction === -1) {
          Transforms.move(editor, { reverse: true });
        } else Transforms.move(editor);
      } else {
        if (options.direction === -1) {
          Transforms.move(editor);
        } else Transforms.move(editor, { reverse: true });
      }
    }
  }
}
