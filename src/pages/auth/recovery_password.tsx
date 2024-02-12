import { useState } from "react";
import { recoveryPassword } from "../../api/sign_in";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/text_field/text_field";
import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { FlexBox } from "../../components/authdoc_ui";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { itns, messages } from "./texts/recovery_password.itn";
import { useNotifications } from "reapop";
import { useItn } from "../../utils/itn";

export default function RecoveryPassword(): JSX.Element {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const navigate = useNavigate();
  const { itn, t } = useItn(itns, messages);
  const [email, setEmail] = useState("");
  const { height } = useWindowDimensions();
  const { notify } = useNotifications();

  async function onRecoveryPassword(): Promise<void> {
    const response = await recoveryPassword(email);
    if (response.status >= 300 || response.payload === undefined) {
      notify(response.message ?? "", "error");
    }
    notify(t(response.message), "success");
    navigate("/reset-password?email=" + email);
  }

  return (
    <FlexBox
      column
      gap={styles.size(10)}
      crossAxisAlignment="center"
      className={classes.container}
      style={{ height: `${height}px` }}
    >
      <FlexBox
        mainAxisAlignment="center"
        gap={styles.size(10)}
        className={classes.content}
      >
        <FlexBox column gap={styles.size(2)} style={{ width: styles.size(30) }}>
          <h2 className={classes.title}>{itn.title}</h2>

          <TextField
            type="email"
            size="large"
            placeholder={itn.emailPlaceholder}
            value={email}
            onEnter={onRecoveryPassword}
            onChange={setEmail}
          />
          <FlexBox gap={styles.size(3)} mainAxisAlignment="space-between">
            <button
              className={classes.goBackButton}
              onClick={() => {
                navigate(-1);
              }}
            >
              {itn.goBack}
            </button>
            <button
              className={classes.submitButton}
              onClick={async () => {
                await onRecoveryPassword();
              }}
            >
              {itn.submit}
            </button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: ({ theme }: any) => theme.backgroundAlt,
    paddingInline: styles.size(2),
  },
  content: {
    width: "100%",
    maxWidth: styles.size(100),
  },
  title: {
    marginBottom: "36px",
    color: ({ theme }: any) => theme.foreground,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
    grid: "'area'",
  },
  child: {
    gridArea: "area",
  },
  smooth: {
    backgroundColor: "transparent",
    height: "0px",
    width: "0px",
    borderRadius: "50%",
    boxShadow: ({ theme }: any) => `0 0 150px 150px ${theme.elementBlue}44`,
  },
  image: {
    // maxWidth: styles.size(30),
    maxWidth: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
  },
  goBackButton: {
    height: styles.size(5),
    marginTop: styles.size(2),
    borderRadius: styles.size(0.75),
    fontSize: styles.size(1),
    fontWeight: "bold",
    // border: "none",
    backgroundColor: ({ theme }: any) => theme.elementBackgroundSecondary,
    color: ({ theme }: any) => theme.foregroundSecondary,
    border: ({ theme }: any) => `1px solid ${theme.foregroundSecondary}22`,
    cursor: "pointer",
    flex: 1,
    marginInline: 0,
  },
  submitButton: {
    height: styles.size(5),
    marginTop: styles.size(2),
    borderRadius: styles.size(0.75),
    fontSize: styles.size(1),
    fontWeight: "bold",
    border: "none",
    backgroundColor: ({ theme }: any) => theme.elementBlue,
    boxShadow: ({ theme }: any) => `0px 10px 20px 5px ${theme.elementBlue}33`,
    color: "white",
    cursor: "pointer",
    flex: 1,
    marginInline: 0,
  },
  checkBox: {
    width: styles.size(1.5),
    height: styles.size(1.5),
    backgroundColor: ({ theme }: any) => theme.foreground,
    color: ({ theme }: any) => theme.background,
    borderRadius: styles.size(0.25),
  },
  checkBoxText: {
    fontSize: styles.size(1),
    color: ({ theme }: any) => theme.foregroundSecondary,
  },
  recoveryPassword: {
    cursor: "pointer",
    fontSize: styles.size(1),
    color: ({ theme }: any) => theme.foregroundSecondary,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: ({ theme }: any) => theme.elementBlue,
      textShadow: ({ theme }: any) => `0px 2px 10px ${theme.elementBlue}77`,
    },
    "&:active": {
      color: ({ theme }: any) => theme.elementBlue,
      textShadow: ({ theme }: any) => `0px 2px 10px ${theme.elementBlue}dd`,
    },
  },
});
