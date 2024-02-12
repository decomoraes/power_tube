// region imports
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../../utils/styles";
import Button from "../../../components/button/button";
import {FlexBox} from "../../../components/authdoc_ui";
import DropZone from "../../../components/drop_zone/drop_zone";
import ProfileViewModel from "../../../view_models/users/profile_view_model";
import {useRef} from "react";
import {useOutsideEvent} from "../../../utils/useOutsideEvent";
// endregion

// region UploadFileModal
export default function UploadFileModal({viewModel}: { viewModel: ProfileViewModel }) {
    // region properties
    const theme: any = useTheme();
    const classes = useStyles({theme});
    const wrapperRef = useRef(null);
    useOutsideEvent(wrapperRef, () => viewModel.closeModal());
    // endregion

    // region render
    return (
        <div
            className={classes.background}
            tabIndex={-1}
        >
            <FlexBox
                column
                ref={wrapperRef}
                className={classes.container}>
                <FlexBox
                    style={{ marginBottom: styles.size(2) }}
                    crossAxisAlignment="center"
                    mainAxisAlignment="space-between">
                    <h2 className={classes.title}>Editar foto</h2>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={viewModel.closeModal}>
                        <svg
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.2072 8.79289L18.0001 1L17.293 0.292892L9.50012 8.08579L1.70723 0.292892L1.00012 1L8.79301 8.79289L0.293015 17.2929L1.00012 18L9.50012 9.5L18.0001 18L18.7072 17.2929L10.2072 8.79289Z"
                                fill={theme.foreground}/>
                        </svg>
                    </div>
                </FlexBox>
                <DropZone onChange={(e) => viewModel.files = e} />
                <Button
                    disabled={viewModel.files.length === 0}
                    onClick={viewModel.onPictureSubmit}>
                    Salvar
                </Button>
            </FlexBox>
        </div>
    );
    // endregion
}
// endregion

// region styles
const useStyles = createUseStyles({
    background: {
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 12,
        backgroundColor: ({theme}: any) => "rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingInline: styles.size(2),
    },
    container: {
        backgroundColor: ({theme}: any) => theme.background,
        pointerEvents: "all",
        width: "100%",
        maxWidth: styles.size(50),
        boxShadow: ({theme}: any) => "0px 5px 15px 5px rgba(0,0,0,0.2)",
        borderRadius: styles.size(0.75),
        padding: styles.size(2),
    },
    title: {
        color: ({theme}: any) => theme.foreground,
        margin: 0,
    },
});
// endregion