import { jsx } from "slate-hyperscript";
import { Editor, Text, Descendant, Node } from "slate";
import htmlAttributesToReact from "../../../../utils/htmlAttributesToReact";

export default function deserialize(
  el: HTMLElement | ChildNode
): Node[] | Descendant | String | null {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el.childNodes).map(deserialize);
  if (children?.length === 0) {
    children = [{ text: "" }];
  }
  //   console.log(`el.nodeName`, el.nodeName, el, el.style);

  const cssText = "style" in el ? el.style.cssText : null;
  // console.log(
  //   `TypeOfDOMNode:`,
  //   el.nodeName,
  //   " cssText:",
  //   cssText,
  //   "el: ",
  //   el,
  //   "getComputedStyle",
  //   getComputedStyle(el as Element),
  //   "    inline style:",
  //   //@ts-ignore
  //   el.style
  // );

  // Iterate over element's attributes
  let storedAttributes = {};
  if ("attributes" in el) {
    for (let name of el.getAttributeNames()) {
      let value = el.getAttribute(name);
      storedAttributes = { ...storedAttributes, [name]: value };
      // console.log(name, value);
    }
    console.log(`storedAttributes`, storedAttributes);
  }
  //@ts-ignore
  const props = htmlAttributesToReact(storedAttributes);

  console.log("react props", props);

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);

    case "SPAN":
      return jsx(
        "element",
        {
          type: "span",
          cssText,
          //@ts-ignore
          storedAttributes:props,
        },
        children
      );
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "DIV":
    case "P":
      return jsx("element", { type: "paragraph", cssText }, children);
    case "A":
      return jsx(
        "element",
        {
          type: "link",
          url: "getAttribute" in el ? el.getAttribute("href") : "",
        },
        children
      );
    default:
      return el.textContent;
  }
}
