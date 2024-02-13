import "./flex_box.scss";
import { className } from "../../utils/className";
import { forwardRef, RefObject } from "react";

type Props = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    flex?: number;
    shrink?: number;
    gap?: number | string;
    direction?: "row" | "column";
    column?: boolean;
    row?: boolean;
    wrap?: boolean;
    crossAxisAlignment?:
        | "start"
        | "center"
        | "end"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch";
    crossAxisAlignmentSelf?:
        | "start"
        | "center"
        | "end"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch";
    mainAxisAlignment?:
        | "start"
        | "center"
        | "end"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch";
    mainAxisAlignmentSelf?:
        | "start"
        | "center"
        | "end"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch";
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const FlexBox = forwardRef((props: Props, ref: any) => {
    const alignmentTypes = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        "space-between": "space-between",
        "space-around": "space-around",
        "space-evenly": "space-evenly",
        stretch: "stretch",
    };
    return (
        <div
            ref={ref}
            onClick={(e) =>
                props.onClick !== undefined ? props.onClick(e) : {}
            }
            className={className([
                "studium_ui_flex_box",
                props.className || "",
            ])}
            style={{
                flex: props.flex ?? undefined,
                flexShrink: props.shrink ?? undefined,
                ...(props.wrap ? { flexWrap: "wrap" } : {}),
                flexDirection:
                    props.direction === "row" || props.row ? "row" : "column",
                gap: props.gap
                    ? typeof props.gap === "string"
                        ? props.gap
                        : `${props.gap}px`
                    : undefined,
                alignItems: props.crossAxisAlignment
                    ? alignmentTypes[props.crossAxisAlignment]
                    : undefined,
                justifyContent: props.mainAxisAlignment
                    ? alignmentTypes[props.mainAxisAlignment]
                    : undefined,
                alignSelf: props.crossAxisAlignmentSelf
                    ? alignmentTypes[props.crossAxisAlignmentSelf]
                    : undefined,
                justifySelf: props.mainAxisAlignmentSelf
                    ? alignmentTypes[props.mainAxisAlignmentSelf]
                    : undefined,
                ...props.style,
            }}>
            {props.children}
        </div>
    );
});

export default FlexBox;
