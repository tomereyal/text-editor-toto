import { Editor, NodeInterface, Descendant } from "slate";
export default function getNodes(editor: Editor, nodeType: string) {
  if (!editor || !nodeType || !(typeof nodeType == "string")) {
    return;
  }
  let root = editor.children;
  let nodeArr: Descendant[] = [];
  findNodes(root, nodeType);

  function findNodes(rootChildren: Descendant[], nodeType: string) {
    rootChildren.forEach((child: Descendant) => {
      if ("type" in child && child.type) {
        if (child.type == nodeType) {
          nodeArr.push(child);
        }
      }
      if ("children" in child && child.children) {
        return findNodes(child.children, nodeType);
      }
    });
  }
  return nodeArr;
}
