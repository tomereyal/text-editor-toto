import { Editor, Transforms, Text } from "slate";
import isFormatActive from "./isFormatActive";

export default function toggleFormat(editor: Editor, format: string) {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
}
