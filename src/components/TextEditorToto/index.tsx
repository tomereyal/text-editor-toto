//---------REACT-AND-HOOKS-IMPORTS----------------------//
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
//---------SLATE-EDITOR-IMPORTS----------------------//
import { createEditor, Editor, Transforms, Range, Node } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
//Import the actual editor and its methods..
import { withHistory } from "slate-history";
import { EditorPlugins } from "./plugins";
import { editorFunctions } from "./functions/index";
//---------MY-COMPONENTS-IMPORTS------------------------//
// import EditorHoverToolbar, {
//   Portal,
// } from "./sections/EditorToolBar/EditorHoverToolbar";
// import EditorMainToolbar from "./sections/EditorToolBar/EditorMainToolBar";
// import { mathConfig } from "./sections/math_Config";
//------MY-SLATE-ELEMENTS-------------------------//
import {
  DefaultElement,
  Leaf,
  Image,
  Mention,
  CodeElement,
  QuoteBlock,
  H2Block,
  BulletList,
  NumberList,
  ListItem,
  H1Block,
  // MathBlock,
  Span,
  Other,
} from "./elements";
// import TitleEditor from "./TitleEditor/TitleEditor";
//-----------------------------------------------------//

/**
 * @param {container} container Recieves container element of slate editor.
 * @param {content} content Recieves initial content of a slate array of editable objects| default: [DefaultElement]
 * @param {setContent} setContent a useState hook to give the parent component access to the updated value
 * @returns SlateEditor React Component
 */
export default function SlateEditor(props: any) {
  const { content, setContent, style } = props;

  const [value, setValue] = useState(
    content?.length
      ? content
      : [
          {
            type: "paragraph",
            style: style,
            children: [{ text: "" }],
          },
        ]
  );
  // const writersTags = useSelector((state) => card.tags);
  const [userTags, setUserTags] = useState();
  const [fetchedIcons, setFetchedIcons] = useState([]);
  const [target, setTarget] = useState();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const {
    withDataInserts,
    withEditableVoids,
    withMathBlockInserts,
    withInlineElements,
  } = EditorPlugins;

  const { getNodes } = editorFunctions;

  const ref = useRef();

  const editor = useMemo(
    () =>
      withInlineElements(
        withMathBlockInserts(
          withEditableVoids(
            withDataInserts(withHistory(withReact(createEditor())))
          )
        )
      ),
    []
  );

  // const chars =
  //   userTags && userTags.length > 0
  //     ? userTags
  //         .filter((tag) =>
  //           tag.name.toLowerCase().startsWith(search.toLowerCase())
  //         )
  //         .slice(0, 10)
  //     : [];

  // useEffect(() => {
  //   if (target && chars.length > 0) {
  //     const el = ref.current;
  //     const domRange = ReactEditor.toDOMRange(editor, target);
  //     const rect = domRange.getBoundingClientRect();
  //     el.style.top = `${rect.top + window.pageYOffset + 24}px`;
  //     el.style.left = `${rect.left + window.pageXOffset}px`;
  //   }

  //   //removing props dependency made component NOT rerender 6 time on every saveNote
  //   //removing previous math dependency made component Not rerender on every delete
  // }, [chars.length, editor, index, search, target]);

  const renderElement = useCallback((props) => {
    const { element } = props;
    switch (element.type) {
      case "image":
        return <Image {...props} />;
      case "code":
        return <CodeElement {...props} />;
      case "mention":
        return <Mention {...props} />;
      case "block-quote":
        return <QuoteBlock {...props} />;
      case "heading-one":
        return <H1Block {...props} />;
      case "heading-two":
        return <H2Block {...props} />;
      case "bulleted-list":
        return <BulletList {...props} />;
      case "numbered-list":
        return <NumberList {...props} />;
      case "list-item":
        return <ListItem {...props} />;
      // case "math-block":
      //   return <MathBlock {...props} />;

      case "span": {
        return <Span {...props} />;
      }
      case "other": {
        return <Other {...props} />;
      }
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  // For every format you add, Slate will break up the text content into "leaves",
  // and you need to tell Slate how to read it, just like for elements.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  /////////////EVENTS/////////////////

  const onKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case "q": {
            event.preventDefault();
            editorFunctions.toggleBlock(editor, "code");
            break;
          }

          case "b": {
            event.preventDefault();
            editorFunctions.toggleFormat(editor, "bold");
            break;
          }
          case "i": {
            event.preventDefault();
            editorFunctions.toggleFormat(editor, "italic");
            break;
          }
          case "u": {
            event.preventDefault();
            editorFunctions.toggleFormat(editor, "underlined");
            break;
          }
          case "=": {
            event.preventDefault();
            editorFunctions.changeFontSize(editor, "bigger");
            break;
          }
          case "-": {
            event.preventDefault();
            editorFunctions.changeFontSize(editor, "smaller");
            break;
          }
        }
      }
    },
    [index, search, target]
  );

  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
      style={{ width: "100%", position: "relative" }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={async (value) => {
          setValue(value);
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={props.isReadOnly}
          spellCheck={false}
          onDOMBeforeInput={(event) => {
            //Make sure you place the event.preventDefault() inside each case,
            //Else you will disable editing of the note.
            switch (event.inputType) {
              case "formatBold":
                event.preventDefault();
                return editorFunctions.toggleFormat(editor, "bold");
              case "formatItalic":
                event.preventDefault();
                return editorFunctions.toggleFormat(editor, "italic");
              case "formatUnderline":
                event.preventDefault();
                return editorFunctions.toggleFormat(editor, "underlined");
            }
          }}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  );
}
