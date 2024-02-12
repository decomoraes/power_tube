import { useState, useEffect } from 'react';
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";

export default function Clock(){
    const theme = useTheme();
    const classes = useStyles({theme});
    const [date, setDate] = useState(new Date());

    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);
    return (
        <span className={classes.clock}>
            {date.toLocaleTimeString()}
        </span>
    );
}

const useStyles = createUseStyles({
    clock: {
        fontWeight: "500",
        fontSize: "18px",
        width: "80px",
        whiteSpace: "nowrap",
        color: ({theme}: any) => theme.foreground,
    },
});
