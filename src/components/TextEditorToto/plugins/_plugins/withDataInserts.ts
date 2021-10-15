import { ReactEditor } from "slate-react";
import { Node, Transforms } from "slate";
import deserialize from "../../functions/_functions/deserialize";
import insertImage from "../../functions/_functions/insertImage";
import isImageUrl from "../../functions/_functions/isImageUrl";
import wrapTopLevelInlineNodesInParagraphs from "../../functions/_functions/wrapTopLevelInlineNodesInParagraphs";
export default function withDataInserts(editor: ReactEditor) {
  const { insertData } = editor;

  // editor.isVoid = (element) => {
  //   return element.type === "image" ? true : isVoid(element);
  // };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const html = data.getData("text/html");
    const { files } = data;
    // console.log(`text`, text);
    // console.log(`html`, html);
    // console.log(`files`, files);

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            if (typeof url === "string") insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body) as Node[];
      console.log(`parsed.body`, parsed.body);
      let fragmentWithOnlyBlocks = fragment;
      if (Array.isArray(fragment)) {
        fragmentWithOnlyBlocks = wrapTopLevelInlineNodesInParagraphs(
          editor,
          fragment
        );
      }
      Transforms.insertFragment(editor, fragmentWithOnlyBlocks);
    } else {
      insertData(data);
    }
  };

  return editor;
}
