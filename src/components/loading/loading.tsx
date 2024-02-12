import { BarWave } from "react-cssfx-loading";
import {FlexBox} from "../authdoc_ui";
import * as styles from "../../utils/styles";
import {createUseStyles, useTheme} from "react-jss";
import {useContext} from "react";
import {LanguageContext} from "../../utils/itn";
import {itns} from "./texts/loading.itn";

type Props = {
    iconOnly?: boolean;
    iconSize?: number;
}

export default function Loading(props: Props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const language = useContext(LanguageContext);
    const itn = itns[language];
    return (
        <FlexBox column gap={styles.size(1)} flex={1} mainAxisAlignment="center" crossAxisAlignment="center">
            <BarWave width={`${props.iconSize ?? 32}px`} height={`${(props.iconSize ?? 32) / 2}px`} className={classes.flipping} />
            {
                !props.iconOnly &&
                <span className={classes.text}><span style={{opacity: 0}}>...</span>{itn.loading}...</span>
            }
        </FlexBox>
    )
}

// region styles
const useStyles = createUseStyles({
    flipping: {
        "& > span": {
            backgroundColor: ({theme}: any) => theme.elementBlue,
            // borderTopColor: ({theme}: any) => theme.elementBlue,
            // borderRightColor: ({theme}: any) => theme.elementBlue,
        }
    },
    text: {
        color: ({theme}: any) => theme.elementBlue,
        fontSize: styles.size(1),
    },
});
// endregion