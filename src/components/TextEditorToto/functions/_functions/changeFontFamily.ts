import { Editor } from "slate";
import updateStyle from "./setStyle";
export default function changeFontFamily(editor: Editor, fontFamily:string) {
  // ReactEditor.focus(editor);
  updateStyle(editor, "fontFamily", fontFamily);
}
