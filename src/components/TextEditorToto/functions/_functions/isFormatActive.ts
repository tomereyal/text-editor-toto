import { Editor } from "slate";

export default function isFormatActive(editor: Editor, format: string) {
  const [match]= Editor.nodes(editor, {
    match: (n) => "format" in n && n.format === format,
    mode: "all",
  });
  
  return !!match;
}
