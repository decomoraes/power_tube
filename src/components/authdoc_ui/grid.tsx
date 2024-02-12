import * as styles from "../../utils/styles";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
}

export default function Grid(props: Props) {

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gridGap: styles.size(1)
            }}>
            {props.children}
        </div>
    )
}
