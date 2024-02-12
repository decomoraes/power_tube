// region imports
import {FlexBox} from '../../components/authdoc_ui';
import * as styles from "../../utils/styles";
import React, { useContext, useEffect, useMemo } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { itns } from "./texts/home.itn";
import {createUseStyles, useTheme} from "react-jss";
import {className} from "../../utils/className";
import {LanguageContext} from "../../utils/itn";
import { DocumentRequestDTO, DocumentResponseDTO, fetchDocuments } from "../../api/documents";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/icon/icon";
import icons from "../../utils/icons";
import { observer } from "mobx-react";
import Store, { StoreContext } from "../../store";
import DocumentsViewModel from '../../view_models/documents/documents_view_model';
// endregion

// region Home
const HomeView = observer(({viewModel} : { viewModel: DocumentsViewModel }) => {
    // region properties
    const theme = useTheme();
    const navigate = useNavigate();
    const classes = useStyles({theme});
    const language = useContext(LanguageContext);
    const itn = itns[language];
    const {width} = useWindowDimensions();
    const [firstRender, setFirstRender] = React.useState(true);
    // const [documents, setDocuments] = React.useState<DocumentResponseDTO[]>([]);
    // endregion

    // async function _fetchDocuments() {
    //     const params: DocumentRequestDTO = {
    //
    //     };
    //     const response = await fetchDocuments(params, "");
    //     console.log(response);
    //     if (response.status === 200 && response.payload !== undefined) {
    //         setDocuments(response.payload);
    //     }
    // }

    useEffect(() => {
        setTimeout(() => {
            setFirstRender(false);
        }, 10);
    }, []);

    // region render
    return (
        <FlexBox
            className={className([classes.container, !firstRender ? classes.containerInitialized : null])}
            gap={styles.size(1)}
            flex={1} direction="column">
        <FlexBox crossAxisAlignment="center" mainAxisAlignment="space-between">
            <h1 className={classes.h1}>Meus documentos</h1>
            <button className={classes.button} onClick={() => navigate("/new-document")}>Novo documento</button>
        </FlexBox>
            <FlexBox
                column
                gap={styles.size(1)}
                className={classes.cards}>
                <FlexBox>
                    <FlexBox className={className([classes.card, classes.cardSelected])}>Todos</FlexBox>
                    <FlexBox className={classes.card}>Abertos</FlexBox>
                    <FlexBox className={classes.card}>Aprovados</FlexBox>
                    <FlexBox className={classes.card}>Recusados</FlexBox>
                </FlexBox>
                <section className={classes.divider} />
                <FlexBox crossAxisAlignment="center" className={classes.cardHeader}>
                    <FlexBox className={classes.cardHeaderText}>
                        NOME DO DOCUMENTO
                    </FlexBox>
                </FlexBox>
                <FlexBox column>
                {viewModel.documents?.map((document, index) => (
                    <DocumentItem document={document} index={index} key={index} randomNumber={Math.floor(Math.random() * 3)} />
                ))}
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
    // endregion
});
// endregion

function DocumentItem({key, index, document, randomNumber}: {key: any, index: number, document: DocumentResponseDTO, randomNumber: number}) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    return (
        <FlexBox className={classes.documentItem} key={index} column>
            <FlexBox
                mainAxisAlignment="space-between"
                className={classes.documentItemHeader}>
                <FlexBox gap={styles.size(1)}>
                <Icon name={icons.rightLine} className={className([classes.documentItemCollapseToggle, open ? classes.documentItemCollapseToggleOpen : null])} onClick={() => setOpen(!open)} />
                {document.type === 0 ? <Icon name={icons.documentLine} />
                    : <Icon name={icons.pdfLine} />}
                {randomNumber === 0 ?
                    <FlexBox className={classes.documentItemStatus}>Aberto 2/5</FlexBox>
                    : randomNumber === 1 ?
                        <FlexBox className={className([classes.documentItemStatus, classes.documentItemStatusApproved])}>Aprovado 5/5</FlexBox>
                        :
                        <FlexBox className={className([classes.documentItemStatus, classes.documentItemStatusRejected])}>Recusado 3/5</FlexBox>
                }

                <FlexBox>{document.name}</FlexBox>
                </FlexBox>
                {/*<div>{document.hash}</div>*/}
                <FlexBox onClick={() => navigate(`/documents/${document.id}`)} className={classes.documentItemOpenDocument}>Abrir documento</FlexBox>
            </FlexBox>
            {open && (
                <FlexBox className={classes.documentItemDetails} column>
                    <FlexBox gap={styles.size(1)} column>
                        <FlexBox gap={styles.size(1)}><Icon name={icons.checkCircleFill} style={{color: styles.rgba(85, 255, 119, 1)}} /> Fulano de Tal</FlexBox>
                        <FlexBox gap={styles.size(1)}><Icon name={icons.checkCircleFill} style={{color: styles.rgba(85, 255, 119, 1)}} /> Ciclano De Cá</FlexBox>
                        <FlexBox gap={styles.size(1)}><Icon name={icons.closeCircleFill} style={{color: styles.rgba(255, 85, 119, 1)}} /> Fulano de Tal</FlexBox>
                        <FlexBox gap={styles.size(1)}><Icon name={icons.loading2Line} style={{color: styles.rgba(0, 187, 255, 1)}} /> Fulano de Tal</FlexBox>
                    </FlexBox>
                </FlexBox>
            )}
        </FlexBox>
    )
}
// endregion

// region export
export default function Home() {
    // const notificationsContext = useNotifications()
    const store = useContext(StoreContext);
    const [searchParams] = useSearchParams()
    const viewModel = useMemo(() =>
            new DocumentsViewModel(),
        [store]);
    useEffect(() => {
        viewModel.onInitialized(store, searchParams);
    }, [viewModel]);
    return <HomeView viewModel={viewModel} />
}
// endregion

// region styles
const useStyles = createUseStyles({
    container: {
        // transition: "all 0.2s ease-in-out",
        // transform: "translateY(.5%) scale(0.995)",
        // opacity: 0.95,
    },
    containerInitialized: {
        // transform: "translateY(0%) scale(1)",
        // opacity: 1,
    },
    h1: {
        fontSize: styles.size(2),
        fontWeight: "bold",
        marginBottom: 0,
    },
    cards: {
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        paddingInline: styles.size(1),
        paddingBlock: styles.size(1),
        borderRadius: styles.size(1),
        flex: 1,
    },
    card: {
        paddingInline: styles.size(2),
        height: styles.size(3),
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer",
        fontWeight: 500,
        color: ({theme}: any) => theme.foregroundSecondary,
    },
    cardHeader: {
        paddingInline: styles.size(1.5),
        height: styles.size(3.5),
        backgroundColor: ({theme}: any) => styles.lighten(theme.backgroundAlt, 0.02),
        borderRadius: styles.size(.5),
    },
    cardHeaderText: {
        color: ({theme}: any) => theme.foregroundSecondary,
        fontSize: styles.size(1),
        fontWeight: 500,
    },
    divider: {
        height: "1px",
        width: `calc(100% + ${styles.size(2)})`,
        background: ({theme}: any) => styles.rgbA(theme.contrast, 0.05),
        marginTop: styles.size(-1),
        marginInline: styles.size(-1),
    },
    documentItem: {
        borderBottom: ({theme}: any) => styles.border(styles.rgbA(theme.contrast, 0.05)),
        paddingInline: styles.size(1.5),
    },
    documentItemCollapseToggle: {
        cursor: "pointer",
        userSelect: "none",
        color: ({theme}: any) => theme.foregroundSecondary,
    },
    documentItemCollapseToggleOpen: {
        transform: "rotate(90deg)",
    },
    documentItemHeader: {
        height: styles.size(6),
        alignItems: "center",
    },
    documentItemStatus: {
        color: styles.rgba(0, 187, 255, 1),
        backgroundColor: styles.rgba(0, 187, 255, 0.1),
        fontWeight: 700,
        width: styles.size(10),
        fontSize: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingInline: styles.size(1),
        borderRadius: styles.size(.5),
        textTransform: "uppercase",
        userSelect: "none",
        cursor: "default",
        border: ({theme}: any) => styles.border(styles.rgba(0, 187, 255, 0.2), "solid", 1),
    },
    documentItemStatusApproved: {
        color: styles.rgba(85, 255, 119, 1),
        backgroundColor: styles.rgba(85, 255, 119, 0.1),
        border: ({theme}: any) => styles.border(styles.rgba(85, 255, 119, 0.2), "solid", 1),
    },
    documentItemStatusRejected: {
        color: styles.rgba(255, 85, 119, 1),
        backgroundColor: styles.rgba(255, 85, 119, 0.1),
        border: ({theme}: any) => styles.border(styles.rgba(255, 85, 119, 0.2), "solid", 1),
    },
    documentItemOpenDocument: {
        color: ({theme}: any) => theme.foreground,
        backgroundColor: styles.rgba(255, 255, 255, 0.05),
        border: ({theme}: any) => styles.border(styles.rgbA(theme.contrast, 0.1), "solid", 1),
        height: styles.size(3),
        fontWeight: 700,
        fontSize: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingInline: styles.size(1),
        borderRadius: styles.size(.5),
        textTransform: "uppercase",
        userSelect: "none",
        cursor: "pointer",
    },
    documentItemDetails: {
        paddingBlock: styles.size(1)
    },
    cardSelected: {
        borderBottom: ({theme}: any) => styles.border("#FF77FF", "solid", 2),
        fontWeight: 700,
        color: ({theme}: any) => theme.foreground,
    },
    child: {
        gridArea: "area",
        height: "auto",
    },
    button: {
        backgroundColor: ({theme}: any) => theme.secondary,
        // backgroundColor: styles.rgba(255, 119, 255, 0.1),
        border: styles.border(styles.rgba(255, 119, 255, .2)),
        color: ({theme}: any) => theme.primaryContrast,
        fontWeight: 700,
        paddingInline: styles.size(1),
        borderRadius: styles.size(.5),
        height: styles.size(3)
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        grid: "'area'",
        minWidth: styles.size(2),
        // height: styles.size(15),
        height: "auto",
        background: ({theme}: any) => theme.backgroundAlt,
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
        borderRadius: "12px",
    },
    flexContainer: {
        gridArea: "area",
        paddingTop: styles.size(1),
        paddingBottom: "20%",
        paddingInline: styles.size(1),
        color: ({theme}: any) => theme.foreground,
    },
    smooth: {
        backgroundColor: "transparent",
        height: "0px",
        width: "0px",
        borderRadius: "100%",
        // boxShadow: "0 0 50px 35px rgba(180, 180, 180, 0.5)",
    },
    number: {
        color: "white",
        fontWeight: "bold",
        textShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    },
    eventsBox: {
        border: ({theme}: any) => `1px solid ${theme.border}`,
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
        height: styles.size(3),
        paddingInline: styles.size(1),
    },
    eventBoxActive: {
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
    },
});
// endregion
