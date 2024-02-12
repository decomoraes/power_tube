import React from "react";

type iconProps = {
    width?: number,
    height?: number,
    onClick?: () => void;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
}

export default function HomeIcon(props: iconProps) {
    return (
        <svg
            style={props.style}
            className={props.className}
            width={props.width ?? 24}
            height={props.height ?? 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.7722 2.68814C11.4493 2.16152 12.3804 2.12861 13.0892 2.5894L13.2279 2.68814L21.6117 9.20884C22.3334 9.77023 21.9818 10.9006 21.1133 10.9939L20.9971 11H20.0001V19C20.0001 20.0544 19.1842 20.9182 18.1494 20.9945L18.0001 21H6.00005C4.94569 21 4.08189 20.1842 4.00554 19.1493L4.00005 19V11H3.00297C2.0896 11 1.67147 9.89242 2.30039 9.28509L2.38841 9.20884L10.7722 2.68814ZM12.0001 4.26685L5.62546 9.22486C5.85399 9.41004 6.00005 9.69297 6.00005 10.01V19H9.00005V14C9.00005 12.3431 10.3432 11 12.0001 11C13.6569 11 15.0001 12.3431 15.0001 14V19H18.0001V10.01C18.0001 9.69295 18.1461 9.41003 18.3746 9.22486L12.0001 4.26685ZM12.0001 13C11.4478 13 11.0001 13.4477 11.0001 14V19H13.0001V14C13.0001 13.4477 12.5523 13 12.0001 13Z"
                fill="black"/>
</svg>
)
}