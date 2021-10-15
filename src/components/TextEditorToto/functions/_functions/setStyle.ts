import { Editor, Transforms, Node } from "slate";
import getStyle from "./getStyle";
export default function updateStyle(
  editor: Editor,
  attribute: string,
  value: any
) {
  const style = getStyle(editor);
  if (!style) return;

  const newProperties = {
    style: {
      ...style,
      [attribute]: value,
    },
  };

  Transforms.setNodes(editor, newProperties);
}
