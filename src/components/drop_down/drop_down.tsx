import { useEffect, useRef, useState } from "react";
import { useOutsideEvent } from "../../utils/useOutsideEvent";
import {createUseStyles, useTheme} from "react-jss";
import {className} from "../../utils/className";
import Icon from "../icon/icon";
import * as styles from "../../utils/styles";
import {FlexBox} from "../authdoc_ui";
import icons from "../../utils/icons";

type Props<T> = {
  items: T[] | any[];
  onChange: (item: T) => void;
  displayValuePath: string,// T extends { [key: string]: any } ? keyof T : never;
  selected?: string;
  style?: React.CSSProperties;
}

export default function DropDown<T>(props: Props<T>) {
  const theme = useTheme();
  const classes = useStyles({theme});
  const [show, setShow] = useState(false)
  const wrapperRef = useRef(null);
  useOutsideEvent(wrapperRef, () => setShow(false));

  useEffect(() => {
    console.log(props.items)
  }, [props.items])
  return (
    <div
      ref={wrapperRef}
      className={classes.container}
      style={{ ...props.style, maxWidth: "15rem" }}>
      <FlexBox className={classes.dropDown}>
        <FlexBox crossAxisAlignment="center" gap={styles.size(1)} className={classes.header} onClick={() => setShow(!show)}>
          <div className={classes.headerText}>
            {
              props.items.find((item: any) => item["id"] === props.selected) !== undefined
                ? props.items.find((item: any) => item["id"] === props.selected)[props.displayValuePath]
                : null
            }
          </div>
          <Icon style={{userSelect: "none"}} size={styles.size(1.5)} name={icons.downLine} />
        </FlexBox>
        {show && props.items.length > 0 ? (
          <div className={classes.body}>
            {props.items.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setShow(false);
                    props.onChange(item);
                  }}
                  className={className([classes.bodyItem, item["id"] === props.selected ? " selected" : null])}>
                  {item[props.displayValuePath]}
                </div>
              )
            })}
          </div>
        ) : null}
      </FlexBox>
    </div>
  )
}

// region styles
const useStyles = createUseStyles({
  icon: {
    cursor: "pointer",
    "&:before": {
      transition: "all .2s ease-in-out",
    },
    "&:hover:before": {
      color: ({theme}: any) => theme.elementBlue,
    },
  },
  item: {
    cursor: "pointer",
    transition: "all .2s ease-in-out",
    "&:hover": {
      color: ({theme}: any) => theme.elementBlue,
    },
  },
  container: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    verticalAlign: "middle",
  },
  dropDown: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    verticalAlign: "middle",
  },
  header: {
    position: "relative",
    backgroundColor: ({theme}: any) => theme.background,
    height: styles.size(3),
    // border: "1px solid rgba(0, 0, 0, 0.1)",
    border: ({theme}: any) => `1px solid ${theme.border}`,
    borderRadius: styles.size(1),
    paddingInline: `${styles.size(1)} ${styles.size(.5)}`,
    cursor: "pointer",
  },
  headerText: {
    fontSize: "12px",
    flex: "1",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  headerIcon: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  body: {
    position: "absolute",
    top: "110%",
    left: 0,
    zIndex: 5,
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    verticalAlign: "middle",
    backgroundColor: ({theme}: any) => theme.background,
    borderRadius: styles.size(1),
    overflow: "hidden",
    padding: styles.size(.5),
    boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  bodyItem: {
    display: "flex",
    alignItems: "center",
    paddingBlock: "6px",
    paddingInline: "3px",
    fontSize: "12px",
    cursor: "pointer",
    transition: ".2ms background-color",
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "&.selected": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: styles.size(.8),
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
});
// endregion
