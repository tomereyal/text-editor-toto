import { Editor, Transforms } from "slate";
export default function insertImage(editor: Editor, url: string) {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.move(editor);
}
