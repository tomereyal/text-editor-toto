import { Editor, Transforms } from "slate";
export default function insertMention(
  editor: Editor,
  character: any,
  image: string
) {
  const mention = {
    type: "mention",
    character,
    image,
    style: {
      margin: "0 1px",
      verticalAlign: "baseline",
      display: "inline-block",
      borderRadius: "4px",
      fontSize: "0.9em",
    },
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
}
