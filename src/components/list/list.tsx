import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { useState, ReactNode, Fragment, useRef, useEffect } from "react";
import { FlexBox } from "../authdoc_ui";
import { className } from "../../utils/className";
import Arrow from "../../assets/images/icons/arrow";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";

export type Row = {
    id: string | number,
    name: string,
    children?: Row[]
    isOpen?: boolean,
    onClick?: () => void,
    navigate?: string,
}

type Props = {
    title?: string;
    children?: ReactNode;
    index?: number;
    rows?: Row[];
    callback?: (rows: Row[]) => void;
}

export default function List(props: Props) {
    const theme: any = useTheme();
    const classes = useStyles({ theme });
    const [rows, setRows] = useState(props.rows);
    const [observerCreated, setObserverCreated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    function RenderRow(row: Row, level = 0): ReactNode {
        const paddingLeft = level * 24 + 12;
        return (
            <Fragment key={row.id}>
                <FlexBox
                    gap={styles.size(1)}
                    style={{ paddingLeft }}
                    className={className([classes.row])}
                    onClick={() => {
                        if (!row.children) {
                            row.onClick && row.onClick();
                            row.navigate && navigate(row.navigate);
                            return;
                        }

                        function updateRow(rows: Row[] | undefined, row: Row): Row[] {
                            if (!rows) return [];
                            return rows.map((r) => {
                                if (r.id === row.id) {
                                    return { ...r, isOpen: !r.isOpen };
                                } else if (r.children) {
                                    return { ...r, children: updateRow(r.children, row) };
                                } else {
                                    return r;
                                }
                            });
                        }

                        let tempRows: Row[] | undefined = rows;
                        tempRows = updateRow(tempRows, row);
                        setRows(tempRows);
                        setObserverCreated(false);
                        props.callback && props.callback(tempRows);
                    }}>
                    <FlexBox className={classes.arrowContainer}>
                        {row.children ?
                            <Arrow filePattern className={classes.arrow} isOpen={row.isOpen} /> : null}
                    </FlexBox>
                    <div className={classes.rowName}>{row.name}</div>
                </FlexBox>
                {row.children ? row.isOpen ? row.children.map(child => RenderRow(child, level + 1)) : null : null}
            </Fragment>
        );
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (observerCreated) return;
        const children = Array.from(container.children);
        children.forEach((child, index) => {
            if (index % 2 === 0) {
                child.classList.remove('odd');
                child.classList.add('even');
                // alert("mudou")
            } else {
                child.classList.remove('even');
                child.classList.add('odd');
                // alert("mudou")
            }
        });

        const observer = new MutationObserver(() => {
            const children = Array.from(container.children);
            children.forEach((child, index) => {
                if (index % 2 === 0) {
                    child.classList.remove('odd');
                    child.classList.add('even');
                    //   alert("mudou")
                } else {
                    child.classList.remove('even');
                    child.classList.add('odd');
                    //   alert("mudou")
                }
            });
        });

        observer.observe(container, { childList: true });
        setObserverCreated(true);

        return () => {
            observer.disconnect();
        };
    }, [containerRef, observerCreated, rows]);

    return (
        <FlexBox
            column
            ref={containerRef}
            gap={1}
            crossAxisAlignment="stretch"
            mainAxisAlignment="center"
            className={className([classes.container])}>
            {rows && rows.map((row) => RenderRow(row, 0))}
        </FlexBox>
    )
}

const useStyles = createUseStyles({
    container: {
        border: ({ theme }: any) => `1px solid ${theme.border}`,
        backgroundColor: ({ theme }: any) => theme.background,
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        color: ({ theme }: any) => theme.foregroundSecondary,
        cursor: "pointer",
        overflow: "hidden",
        "& .odd": {
            backgroundColor: ({ theme }: any) => theme.oddStripeBackground,
        },
        "& .even": {
            backgroundColor: ({ theme }: any) => theme.evenStripeBackground,
        }
    },
    row: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        height: styles.size(3),
        alignItems: "center",
        paddingInline: styles.size(1),
    },
    arrowContainer: {
        width: styles.size(1),
    },
    rowName: {
        marginLeft: "2px",
    },
    // odd: {
    //     backgroundColor: ({ theme }: any) => styles.blend(theme.backgroundAlt, theme.background, 0.4)
    // },
    arrow: {
        transition: "transform .3s",
    },
});
