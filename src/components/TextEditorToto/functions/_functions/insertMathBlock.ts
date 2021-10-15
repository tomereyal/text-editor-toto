import { Editor, Transforms } from 'slate';

export default function insertMathBlock(editor:Editor) {
  const text = { text: "" };

  const mathBlock = {
    type: "math-block",
    math: "",
    children: [text],
  };

  Transforms.insertNodes(editor, mathBlock);
}
