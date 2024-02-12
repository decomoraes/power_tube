import { className } from "../../../utils/className"

type iconProps = {
    width?: number,
    height?: number,
    onClick?: () => void,
    isOpen?: boolean,
    filePattern?: boolean,
    style?: React.CSSProperties,
    className?: string,
}

export default function Arrow(props: iconProps) {
    return (
        <svg
            style={{
                transition: "transform .3s",
                ...(
                    props.filePattern
                    ? !props.isOpen ? { transform: "rotate(90deg)" } : { transform: "rotate(180deg)" }
                    : !props.isOpen ? { transform: "rotate(180deg)" } : null
                ),
                ...(props.onClick ? {cursor: "pointer"} : null),
                ...props.style
            }}
            onClick={props.onClick}
            className={className(["arrow", props.className])}
            width={props.width ?? 10}
            height={props.height ?? 10}
            viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.42395 7.58764C1.09783 7.91112 0.569216 7.91112 0.243102 7.58764C-0.0803828 7.26152 -0.0803828 6.73291 0.243102 6.40942L4.3248 2.32773C4.64828 2.00424 5.1769 2.00424 5.50301 2.32773L9.58208 6.40942C9.90819 6.73291 9.90819 7.26152 9.58208 7.58764C9.25596 7.91112 8.72998 7.91112 8.40386 7.58764L4.91391 4.09768L1.42395 7.58764Z" fill="#707071"/>
        </svg>
    )
}