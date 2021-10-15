import React, { useState, useEffect, useRef } from "react";
//---------SLATE-EDITOR-IMPORTS----------------------//
import { useSelected, useFocused, useSlateStatic } from "slate-react";
import { Editor, Element, Node, Text } from "slate";

//----------STYLE-IMPORTS-------------------------------//
import { css } from "@emotion/css";
//------THIRD-PARTY-COMPONENTS-------------------------//
// import Latex from "react-latex";
// import MathJax from "react-mathjax-preview";

// import MathEditor from "../MathEditor";
// import { Button, Modal } from "antd";

// import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
// import { Portal } from "./EditorToolBar/EditorHoverToolbar";

// addStyles();

//----------------------------------------------------//
const defaultBgc = "white";

interface IPropsElement {
  attributes: any;
  children: Element[];
  element: Element;
}
interface IPropsLeaf {
  attributes: any;
  children: Text;
  leaf: Element;
}

export const Span = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  const storedAttributes =
    "storedAttributes" in element ? element.storedAttributes : {};
  return (
    <span
      // style={style}
      // className={css`
      //   ${cssText}
      // `}
      {...attributes}
      {...storedAttributes}
    >
      {children}
    </span>
  );
};

export const DefaultElement = ({
  attributes,
  children,
  element,
}: IPropsElement) => {
  // const style = "style" in element ? element.style : {};
  // const cssText = "cssText" in element ? element.cssText : "";
  const storedAttributes =
    "storedAttributes" in element ? element.storedAttributes : {};
  return (
    <p
      // className={css`
      //   ${cssText}
      // `}
      // style={style}
      {...attributes}
      {...storedAttributes}
    >
      {children}
    </p>
  );
};
export const Other = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  // const DOMelement = "DOMelement" in element ? element.DOMelement : {};

  return (
    <p
      className={css`
        ${cssText}
      `}
      style={style}
      {...attributes}
    >
      {children}
    </p>
  );
};

export const Leaf = ({ attributes, children, leaf }: IPropsLeaf) => {
  const style = "style" in leaf ? leaf.style : {};
  const cssText = "cssText" in leaf ? leaf.cssText : "";
  return (
    <span
      style={style}
      className={css`
        ${cssText}
      `}
      {...attributes}
    >
      {children}
    </span>
  );
};

export const CodeElement = ({
  attributes,
  children,
  element,
}: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";

  return (
    <pre
      style={style}
      className={css`
        ${cssText}
      `}
      {...attributes}
    >
      <code>{children}</code>
    </pre>
  );
};

// export const MathBlock = ({ attributes, children, element }:IPropsElement) => {
//   const selected = useSelected();
//   const focused = useFocused();
//   const editor = useSlateStatic();
//   const { math, backgroundColor = defaultBgc, isReadOnly, color } = element;
//   const bcg = backgroundColor;
//   const [mathFieldFocus, setMathFieldFocus] = useState(false);
//   const [mathFieldSelected, setMathFieldSelected] = useState(false);
//   useEffect(() => {
//     if (selected && focused) {
//       setMathFieldSelected(true);

//       const { anchor, focus } = editor.selection;
//       const [node] = Editor.nodes(editor, {
//         match: (n, path) => n.type === "math-block",
//       });
//       console.log(`math`, node[0].math);
//       console.log(`mathBlock path`, node[1]);
//       console.log(`anchor.path`, anchor.path);
//       console.log(`focus.path`, focus.path);

//       if (anchor.path[0] === focus.path[0] && anchor.path[1] === focus.path[1])
//         setMathFieldFocus(true);
//     } else {
//       setMathFieldFocus(false);
//       setMathFieldSelected(false);
//     }
//   }, [selected]);

//   return (
//     <span
//       {...attributes}
//       contentEditable={false}
//       style={{
//         direction: "ltr",
//         margin: "0 1px",
//         verticalAlign: "baseline",
//         // display: "inline-block",
//         borderRadius: "4px",
//         fontWeight: "bold",
//         color: color,
//         backgroundColor: bcg,
//         position: "relative",
//         // boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
//       }}
//     >
//       {isReadOnly ? (
//         <span>
//           <StaticMathField>{math}</StaticMathField>{" "}
//         </span>
//       ) : (
//         <MathEditor
//           slateEditor={editor}
//           savedMath={math}
//           bcg={bcg}
//           mathFieldFocus={mathFieldFocus}
//           mathFieldSelected={mathFieldSelected}
//         ></MathEditor>
//       )}
//       {children}
//     </span>
//   );
// };

export const QuoteBlock = ({
  attributes,
  children,
  element,
}: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  return (
    <blockquote
      {...attributes}
      style={style}
      className={css`
        ${cssText}
      `}
    >
      {children}
    </blockquote>
  );
};
export const H1Block = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  return (
    <h1
      {...attributes}
      style={style}
      className={css`
        ${cssText}
      `}
    >
      {children}
    </h1>
  );
};
export const H2Block = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  return (
    <h2
      {...attributes}
      style={style}
      className={css`
        ${cssText}
      `}
    >
      {children}
    </h2>
  );
};
export const BulletList = ({
  attributes,
  children,
  element,
}: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  return (
    <ul
      {...attributes}
      style={style}
      className={css`
        ${cssText}
      `}
    >
      {children}
    </ul>
  );
};
export const NumberList = ({
  attributes,
  children,
  element,
}: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  return (
    <ol
      {...attributes}
      style={style}
      className={css`
        ${cssText}
      `}
    >
      {children}
    </ol>
  );
};
export const ListItem = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  return (
    <li
      {...attributes}
      style={style}
      className={css`
        ${cssText}
      `}
    >
      {children}
    </li>
  );
};

export const Image = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  const url = "url" in element ? element.url : "";

  const selected = useSelected();
  const focused = useFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div {...attributes}>
      <div contentEditable={false} style={{ width: "200px" }}>
        <img
          src={url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
          onClick={showModal}
        />
        {/* <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p> */}
        {/* 
        <img
          src={url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        /> */}
        {/* </Modal> */}
      </div>
      {children}
    </div>
  );
};

export const Mention = ({ attributes, children, element }: IPropsElement) => {
  const style = "style" in element ? element.style : {};
  const cssText = "cssText" in element ? element.cssText : "";
  const selected = useSelected();
  const focused = useFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <span {...attributes} contentEditable={false} style={style}>
      {/* <button
        default
        style={{ padding: "3px 3px 2px" }}
        type="dashed"
        onClick={() => {
          console.log("Button works");
          showModal();
        }}
      >
        {element.character}
      </button>

      <Modal
        title={element.character}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img src={element.image} width={"100px"} height={"100px"}></img>
      </Modal> */}
      {children}
    </span>
  );
};
