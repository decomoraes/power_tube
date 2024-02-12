import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
    CheckDiffDocumentRequestDTO, CheckDiffDocumentResponseDTO,
    DocumentRequestDTO,
    DocumentResponseDTO,
    fetchDocuments,
    getDiff
} from "../../api/documents";
import { FlexBox } from "../../components/authdoc_ui";
import * as styles from "../../utils/styles";
import { createUseStyles, useTheme } from "react-jss";
import { className } from "../../utils/className";
import Button from "../../components/button/button";
import Editor from "../../components/editor/editor";
import ReactMarkdown from "react-markdown";
import Icon from "../../components/icon/icon";
import icons from "../../utils/icons";
import { StoreContext } from "../../store";
import DocumentsViewModel from "../../view_models/documents/documents_view_model";
import { observer } from "mobx-react";
import PdfViewer from "./components/pdf_viewer";

class GetGetlocation extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    render() {
        return (
            <div>
                <h4>Using geolocation JavaScript API in React</h4>
            </div>
        );
    }
}

const DocumentDetailView = observer(({viewModel} : { viewModel: DocumentsViewModel }) => {
    const { id } = useParams();
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({ theme });
    // const [showModal, setShowModal] = React.useState<boolean>(false);
    // const [documentDiffLines, setDocumentDiffLines] = React.useState<CheckDiffDocumentResponseDTO[]>([]);
    // const [editMode, setEditMode] = React.useState<boolean>(false);
    // endregion

    async function _fetchDocuments() {
        const params: DocumentRequestDTO = {
            id: id
        };
        const response = await fetchDocuments(params, "");
        console.log(response);
        if (response.status === 200 && response.payload !== undefined && response.payload.length > 0) {
            viewModel.documentSelected = response.payload[0];
        }
    }

    useEffect(() => {
        viewModel.store.settingsStore.focusMode = true;
        return () => {
            viewModel.store.settingsStore.focusMode = false;
        }
    }, [viewModel.store])

    useEffect(() => {
        id && viewModel.fetchDocumentById(id);
    }, [id, viewModel.store.authStore.token]);

    const markDownType = (
        <FlexBox column flex={1} gap={styles.size(1)}>
        {viewModel.documentSelected ? (
            <>
                <FlexBox style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {viewModel.documentSelected?.name}
                </FlexBox>
        {viewModel.documentSelected?.reference}
                {!viewModel.editMode || viewModel.documentSelected.type != 0 ? (
                <FlexBox
                    column
                    gap={styles.size(1)}
                    className={classes.cards}>
                <FlexBox mainAxisAlignment="end">
                <FlexBox className={className([classes.card])}>Assinar</FlexBox>
                <FlexBox className={classes.card}>Recusar</FlexBox>
                <FlexBox onClick={() => viewModel.editMode = true} className={classes.card}>Solicitar modificação</FlexBox>
                </FlexBox>
                <section className={classes.divider} />
                <FlexBox column className={classes.cardHeader}>
                {viewModel.documentSelected?.type === 0 ? (
                <ReactMarkdown>
                    {viewModel.documentSelected?.content ?? ""}
                </ReactMarkdown>
                    ) : viewModel.documentSelectedFile && (
                        <FlexBox gap={styles.size(1)} flex={1} style={{height: "100%"}}>
                            <FlexBox flex={1}>asdf</FlexBox>
                            <FlexBox flex={1} style={{height: "100%"}} column>
                                <PdfViewer file={viewModel.documentSelectedFile} />
                            </FlexBox>
                        </FlexBox>
                )}
                </FlexBox>
                </FlexBox>
                )
                :
                <Editor
                    data={viewModel.documentSelected?.content}
                    setData={async (data) => {
                        await viewModel.checkDiff(data);
                        // console.log(data);
                        // const request: CheckDiffDocumentRequestDTO = {
                        //     previous: viewModel.documentSelected?.content ?? "",
                        //     current: data
                        // };
                        // const response = await getDiff(request);
                        // console.log(response);
                        // if (response.status === 200 && response.payload !== undefined) {
                        //     console.log(response.payload);
                        //     setDocumentDiffLines(response.payload);
                        //     setShowModal(true);
                        //     setEditMode(false);
                        // }
                    }} />
                }
            </>
        ) : null}
        {
            viewModel.showDiffLinesModal ? (
                <FlexBox column className={classes.modal}>
                    <FlexBox mainAxisAlignment="space-between" style={{ padding: styles.size(1), borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}} gap={styles.size(1)}>
                        <FlexBox gap={styles.size(2)}>
                        <FlexBox crossAxisAlignment="center"><Icon style={{color: styles.rgba(75, 200, 100, 1)}} name={icons.addCircleFill} /> Adicionado</FlexBox>
                        <FlexBox crossAxisAlignment="center"><Icon style={{color: styles.rgba(255, 85, 119, 1)}} name={icons.minusCircleFill} /> Removido</FlexBox>
                        </FlexBox>
                        <Icon style={{cursor: "pointer"}} onClick={() => viewModel.showDiffLinesModal = false} name={icons.closeLine} />
                    </FlexBox>
                    <FlexBox column flex={1} style={{overflowY: "scroll"}}>
                        {viewModel.documentDiffLines.map((line, index) => (
                            <FlexBox
                                key={index}
                                gap={styles.size(1)}
                                className={className([line.type === "Unmodified" ? classes.lineUnmodified : line.type === "Added" ? classes.lineAdded : classes.lineRemoved])}>
                                <ReactMarkdown>
                                    {line.line}
                                </ReactMarkdown>
                            </FlexBox>
                        ))}
                    </FlexBox>
                    <FlexBox mainAxisAlignment="end" style={{ padding: styles.size(1), borderTop: "1px solid rgba(255, 255, 255, 0.1)"}} gap={styles.size(1)}>
                    <Button style={{paddingInline: styles.size(2), height: styles.size(3), margin: 0 }}>Enviar Solicitação</Button>
                    <Button onClick={() => viewModel.showDiffLinesModal = false} style={{paddingInline: styles.size(2), height: styles.size(3), margin: 0 }}>Cancelar</Button>
                    </FlexBox>
                </FlexBox>
            ) : null
        }
        </FlexBox>
    );

    const pdfType = (
        <FlexBox
            gap={styles.size(2)}
            flex={1}
            style={{
                height: `calc(100% + ${styles.size(6)})`,
                width: `calc(100% + ${styles.size(6)})`,
                margin: styles.size(-3),
            }}>
            <FlexBox
                column
                gap={styles.size(1)}
                style={{
                    marginLeft: styles.size(3),
                    paddingBlock: styles.size(3),
                    overflowY: "auto",
                    width: "100%",
                    flex: 1,
                }}>
            <GetGetlocation />
                <FlexBox column>
                    <h1 style={{fontSize: "24px", margin: 0}}>
                        {viewModel.documentSelected?.name}
                    </h1>
                    <p style={{overflowWrap: "break-word", fontSize: "12px"}}>
                        {viewModel.documentSelected?.hash}
                    </p>
                </FlexBox>
                <Button style={{flexShrink: 0}}>Assinar</Button>
                <div style={{height: "1px", width: "100%", backgroundColor: "black"}} />
                <FlexBox column gap={styles.size(1)}>
                    <h2 style={{fontSize: "20px"}}>
                        Histórico
                    </h2>
                    {Array.from({ length: 10 }, (_, index) => (
                        <FlexBox key={index} gap={styles.size(1)}>
                            <FlexBox style={{fontSize: "12px", width: styles.size(10)}}>
                                05 jun 2023
                                17:17:16
                            </FlexBox>
                            <FlexBox style={{fontSize: "12px"}}>
                                Arnaldo Rodrigues Bracale criou este documento. (E-mail: arnaldo.bracale@gmail.com, CPF: 219.049.918-66)
                            </FlexBox>
                        </FlexBox>
                    ))}
                </FlexBox>
            </FlexBox>
            <FlexBox flex={2} style={{height: "100%", width: "100%", flexShrink: 0}} column>
            {viewModel.documentSelectedFile && <PdfViewer file={viewModel.documentSelectedFile} />}
            </FlexBox>
        </FlexBox>
    )

    return viewModel.documentSelected?.type === 0 ? markDownType : viewModel.documentSelected?.type === 1 ? pdfType : <>Carregando...</>;
});
// endregion

// region export
export default function DocumentDetail() {
    // const notificationsContext = useNotifications()
    const store = useContext(StoreContext);
    const [searchParams] = useSearchParams()
    const { id: documentId } = useParams();
    const viewModel = useMemo(() => new DocumentsViewModel(), []);

    useEffect(() => {
        viewModel.onInitialized(store, searchParams, documentId);
    }, [location.pathname, store, searchParams, documentId, viewModel])
    return <DocumentDetailView viewModel={viewModel} />
}
// endregion

const useStyles = createUseStyles({
    modal: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        position: "absolute",
        top: "50%",
        left: "50%",
        height: "calc(100vh - 10rem)",
        width: "calc(100vw - 20rem)",
        zIndex: 100,
        transform: "translate(-50%, -50%)",
        border: ({ theme }: any) => styles.border(theme.border),
        // overflowY: "scroll",
        // padding: styles.size(2),
        borderRadius: styles.size(1),
        boxShadow: "0 4px 1rem 0 rgba(0, 0, 0, 0.2)"
    },
    lineUnmodified: {
        paddingInline: styles.size(2)
    },
    lineAdded: {
        backgroundColor: styles.rgba(85, 255, 119, 0.2),
        paddingInline: styles.size(2),
        position: "relative",
        "&:after": {
            content: "'+'",
            color: ({ theme }: any) => theme.foregroundSecondary,
            fontSize: styles.size(2),
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: ".5rem"
        }
    },
    lineRemoved: {
        backgroundColor: styles.rgba(255, 85, 119, 0.2),
        paddingInline: styles.size(2),
        position: "relative",
        "&:after": {
            content: "'-'",
            color: ({ theme }: any) => theme.foregroundSecondary,
            fontSize: styles.size(2),
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: ".5rem"
        }
    },
    cards: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        paddingInline: styles.size(1),
        paddingBlock: styles.size(1),
        borderRadius: styles.size(1),
        flex: 1
    },
    card: {
        paddingInline: styles.size(2),
        height: styles.size(3),
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer",
        fontWeight: 500,
        color: ({ theme }: any) => theme.foreground
    },
    cardSelected: {
        borderBottom: ({ theme }: any) => styles.border("#FF77FF", "solid", 2),
        fontWeight: 700,
        color: ({ theme }: any) => theme.foreground
    },
    cardHeader: {
        padding: styles.size(1.5),
        // height: styles.size(3.5),
        backgroundColor: ({ theme }: any) => styles.lighten(theme.backgroundAlt, 0.02),
        borderRadius: styles.size(.5),
        height: "100%",
    },
    divider: {
        height: "1px",
        width: `calc(100% + ${styles.size(2)})`,
        background: ({ theme }: any) => styles.rgbA(theme.contrast, 0.05),
        marginTop: styles.size(-1),
        marginInline: styles.size(-1)
    }
});
