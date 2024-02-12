import {FlexBox} from "../../../components/authdoc_ui";

type iconProps = {
    width?: number,
    height?: number,
    onClick?: () => void;
}

export default function Bell(props: iconProps) {
    return (
        <FlexBox gap={6}>
            <svg
                width={props.width ?? 19}
                height={props.height ?? 21}
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.4438 14.5779V7.20523C2.4438 3.22829 5.67264 0 9.64847 0C13.6254 0 16.8543 3.22829 16.8543 7.20523V14.5779H19.0002V16.0354H0.297852V14.5779H2.4438ZM12.4143 18.5824V20.0399H6.88373V18.5824H12.4143Z" fill="#7A7B7A"/>
        </svg>

        <div
            style={{
                height: "18px",
                paddingInline: "6px",
                backgroundColor: "#CB2B1D",
                borderRadius: "9px",
                fontSize: "10px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white"}}>
                23
            </div>
        </FlexBox>
    )
}