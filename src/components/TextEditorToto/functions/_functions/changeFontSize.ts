import { Editor, Node, Transforms } from "slate";
import getStyle from "./getStyle";
import updateStyle from "./setStyle";

export default function changeFontSize(editor: Editor, change: string) {
  const FONT_CHANGE_RATIO = change === "bigger" ? 0.2 : -0.2;
  let { fontSize } = getStyle(editor)!;

  if (!fontSize) {
    alert(
      "Atleast one of the selected elements does not have change font size feature."
    );
    return;
  }

  //fontSize is represented in rem units

  if (fontSize >= 2) {
    fontSize = 2;
  } else if (fontSize <= 0.5) {
    fontSize = 0.5;
  } else {
    fontSize += FONT_CHANGE_RATIO;
  }

  updateStyle(editor, "fontSize", fontSize);
}
