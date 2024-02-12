import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { convertFromRaw, convertToRaw, Editor as DraftEditor, EditorState, RichUtils } from "draft-js";
import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import "draft-js/dist/Draft.css";
import * as styles from "../../utils/styles";
import { FlexBox } from "../authdoc_ui";
import { className } from "../../utils/className";
import { CheckDiffDocumentRequestDTO, getDiff } from "../../api/documents";

type EditorProps = {
    data?: string,
    setData: (data: string) => void,
}

export default function Editor(props: EditorProps) {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({ theme });
    const rawObject = markdownToDraft(props.data ?? "");
    const contentState = convertFromRaw(rawObject);
    const newEditorState = EditorState.createWithContent(contentState);
    const [editorState, setEditorState] = useState(
        () => newEditorState
    );

    const onChange = (newEditorState: any) => {

        setEditorState(newEditorState);
        // var markdownString = draftToMarkdown(convertToRaw(newEditorState.getCurrentContent()));
        // console.log(markdownString)
        // getDiff

    };

    const handleInlineStyle = (inlineStyle: any) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const handleBlockType = (blockType: any) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    function getDataAsMarkdown(): string {
        var markdownString = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        return markdownString;
    }

    const isBlockTypeSelected = (blockType: string) => {
        const selection = editorState.getSelection();
        const currentBlockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return currentBlockType === blockType;
    };

    const isInlineStyleSelected = (inlineStyle: string) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(inlineStyle);
    }

    return (
        <FlexBox
            column
            gap={styles.size(1)}
            className={classes.cards}>
            <FlexBox mainAxisAlignment="space-between">
            <FlexBox>
                <FlexBox
                    onClick={() => handleInlineStyle("BOLD")}
                    className={className([classes.card, isInlineStyleSelected('BOLD') ? classes.cardSelected : null])}>N</FlexBox>
                <FlexBox
                    onClick={() => handleInlineStyle("ITALIC")}
                    style={{ fontStyle: "italic" }}
                    className={className([classes.card, isInlineStyleSelected('ITALIC') ? classes.cardSelected : null])}>I</FlexBox>
                <FlexBox
                    onClick={() => handleInlineStyle("UNDERLINE")}
                    style={{ textDecoration: "underline" }}
                    className={className([classes.card, isInlineStyleSelected('UNDERLINE') ? classes.cardSelected : null])}>S</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("header-one")}
                    className={className([classes.card, isBlockTypeSelected('header-one') ? classes.cardSelected : null])}>H1</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("header-two")}
                    className={className([classes.card, isBlockTypeSelected('header-two') ? classes.cardSelected : null])}>H2</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("header-three")}
                    className={className([classes.card, isBlockTypeSelected('header-three') ? classes.cardSelected : null])}>H3</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("header-four")}
                    className={className([classes.card, isBlockTypeSelected('header-four') ? classes.cardSelected : null])}>H4</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("blockquote")}
                    className={className([classes.card, isBlockTypeSelected("blockquote") ? classes.cardSelected : null])}>❝❞</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("unordered-list-item")}
                    className={className([classes.card, isBlockTypeSelected("unordered-list-item") ? classes.cardSelected : null])}>UL</FlexBox>
                <FlexBox
                    onClick={() => handleBlockType("ordered-list-item")}
                    className={className([classes.card, isBlockTypeSelected("ordered-list-item") ? classes.cardSelected : null])}>OL</FlexBox>
            </FlexBox>
                <FlexBox
                    onClick={() => props.setData(getDataAsMarkdown())}
                    className={classes.card} style={{color: "#FF77FF"}}>Salvar</FlexBox>
            </FlexBox>
            <section className={classes.divider} />
            <FlexBox column className={classes.editorBody}>
                <DraftEditor editorState={editorState} onChange={onChange} />
            </FlexBox>
        </FlexBox>
    );
}

// region styles
const useStyles = createUseStyles({
    cards: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        paddingInline: styles.size(1),
        paddingBlock: styles.size(1),
        borderRadius: styles.size(1),
        flex: 1
    },
    card: {
        paddingInline: styles.size(2),
        height: styles.size(3),
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer",
        fontWeight: 500,
        color: ({ theme }: any) => theme.foregroundSecondary
    },
    cardSelected: {
        borderBottom: ({ theme }: any) => styles.border("#FF77FF", "solid", 2),
        fontWeight: 700,
        color: ({ theme }: any) => theme.foreground
    },
    editorBody: {
        padding: styles.size(1.5),
        backgroundColor: ({ theme }: any) => styles.lighten(theme.backgroundAlt, 0.02),
        borderRadius: styles.size(.5),
        alignItems: "start",
        justifyContent: "stretch",
        flex: 1,
        "& > div": {
            flex: 1,
            width: "100%",
            "& > div": {
                flex: 1,
                height: "100%",
            }
        }
    },
    divider: {
        height: "1px",
        width: `calc(100% + ${styles.size(2)})`,
        background: ({ theme }: any) => styles.rgbA(theme.contrast, 0.05),
        marginTop: styles.size(-1),
        marginInline: styles.size(-1)
    }
});
// endregion