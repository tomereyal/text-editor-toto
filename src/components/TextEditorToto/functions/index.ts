import changeFontSize from "./_functions/changeFontSize";
import changeFontFamily from "./_functions/changeFontFamily";
import getNodes from "./_functions/getNodes";
import insertImage from "./_functions/insertImage";
import insertMathBlock from "./_functions/insertMathBlock";
import insertMention from "./_functions/insertMention";
import isBlockActive from "./_functions/isBlockActive";
import isFormatActive from "./_functions/isFormatActive";
import isImageUrl from "./_functions/isImageUrl";
import paintBlock from "./_functions/paintBlock";
import saveMathToElement from "./_functions/saveMathToElement";
import serializeMathAndText from "./_functions/serializeMathAndText";
import toggleBlock from "./_functions/toggleBlock";
import toggleFormat from "./_functions/toggleFormat";

export const editorFunctions = {
  changeFontSize,
  changeFontFamily,
  getNodes,
  insertImage,
  insertMathBlock,
  insertMention,
  isBlockActive,
  isFormatActive,
  isImageUrl,
  paintBlock,
  saveMathToElement,
  serializeMathAndText,
  toggleBlock,
  toggleFormat,
};

// export function getPreviousMathElement(editor) {
//   const { selection } = editor;
//   if (!(selection && Range.isCollapsed(selection))) {
//     return;
//   }
//   const nodeBefore = Editor.previous(editor, selection.anchor.path);

//   const previousElement = nodeBefore ? nodeBefore[0] : null;
//   return previousElement && previousElement.math
//     ? { ...previousElement, path: nodeBefore[1] }
//     : null;
// }
