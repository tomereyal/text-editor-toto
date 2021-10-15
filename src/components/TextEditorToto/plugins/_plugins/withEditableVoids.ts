import { ReactEditor } from 'slate-react';

const voidElements: string[] = ["image", "math-block"];

export default function withEditableVoids(editor: ReactEditor) {
  const { isVoid } = editor;

    
  editor.isVoid = (element) => {
    return voidElements.includes(element.type) ? true : isVoid(element);
  };

  return editor;
}
