import React from "react";

type iconProps = {
    width?: number,
    height?: number,
    onClick?: () => void;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
}

export default function CalendarIcon(props: iconProps) {
    return (
        <svg
            style={props.style}
            className={props.className}
            width={props.width ?? 24}
            height={props.height ?? 24}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3C16.5523 3 17 3.44772 17 4V5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H7V4C7 3.44772 7.44771 3 8 3C8.55229 3 9 3.44772 9 4V5H15V4C15 3.44772 15.4477 3 16 3ZM19 7H5V19H19V7ZM14.8241 9.37872C15.2146 8.9882 15.8478 8.9882 16.2383 9.37872C16.6289 9.76924 16.6289 10.4024 16.2383 10.7929L11.2957 15.7356C10.9012 16.13 10.2617 16.13 9.86731 15.7356L7.75306 13.6214C7.36253 13.2308 7.36253 12.5977 7.75306 12.2071C8.14358 11.8166 8.77675 11.8166 9.16727 12.2071L10.5815 13.6214L14.8241 9.37872Z" fill="black"/>
            </svg>

            )
}
