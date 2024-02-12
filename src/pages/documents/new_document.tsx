import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    CheckDiffDocumentRequestDTO,
    CheckDiffDocumentResponseDTO,
    createDocument,
    CreateDocumentRequestDTO,
    createPdfDocument,
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
import UploadDocumentFileModal from "./components/upload_document_file_modal";
import TextField from "../../components/text_field/text_field";
import Signature from "../../components/signature/signature";
import Signatures from "../signatures/signatures";
import { StoreContext } from "../../store";

export default function NewDocument() {
    const { id } = useParams();
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({ theme });
    const store = useContext(StoreContext);

    const [document, setDocument] = React.useState<DocumentResponseDTO>();
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [signer, setSigner] = React.useState<string>("");
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [documentDiffLines, setDocumentDiffLines] = React.useState<CheckDiffDocumentResponseDTO[]>([]);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [data, setData] = React.useState<string>("Escreva aqui o seu documento");
    const [showUploadDocumentFileModal, setShowUploadDocumentFileModal] = React.useState<boolean>(false);
    const [file, setFile] = React.useState<any>(null);

    function uploadFile(_file: any) {
        if (_file) {
            // const formData = new FormData();
            // formData.append('file', file);
            // submitPdfDocument()

            // fetch("http://localhost:8080/documents", {
            //     method: "DELETE",
            //     body: formData,
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         setData(data.payload)
                    setShowUploadDocumentFileModal(false)
            setFile(_file)
            //         setEditMode(true)
            //     })
            //     .catch(error => {
            //         alert(error)
            //     })
        }
    };

    async function submitDocument() {
        const params: CreateDocumentRequestDTO = {
            name: name,
            size: 0,
            createdBy: "8f3739dd-2554-48a6-ba89-f31293db8598",
            type: 0,
            content: removeTrailingBlankLines(trimEndTextLines(data)),
        };
        const response = await createDocument(params);
        // const jsonResponse = await response.json()
    }

    async function submitPdfDocument() {
        const params: CreateDocumentRequestDTO = {
            name: name,
            size: 0,
            createdBy: "8f3739dd-2554-48a6-ba89-f31293db8598",
            type: 0,
            file: file,
            // content: removeTrailingBlankLines(trimEndTextLines(data)),
        };
        const response = await createPdfDocument(params, store.authStore.token);
        // const jsonResponse = await response.json()
    }

    useEffect(() => {
        // _fetchDocuments();
    }, []);
    return (
        <FlexBox column flex={1} gap={styles.size(1)}>
            <Signatures />
            <FlexBox column>
                <FlexBox>
                    <TextField title="Nome do arquivo" value={document?.name} onChange={(e) => setName(e)} />
                </FlexBox>
                {/*<Signature />*/}
                <FlexBox direction="column" crossAxisAlignment="start" style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {/*{document.name}*/}
                    <Button style={{ paddingInline: styles.size(2), height: styles.size(3) }} onClick={() => setShowUploadDocumentFileModal(true)}>Importar arquivo</Button>
                    {showUploadDocumentFileModal && <UploadDocumentFileModal closeModal={() => setShowUploadDocumentFileModal(false)} onPictureSubmit={(e) => uploadFile(e)} />}
                </FlexBox>
            </FlexBox>
            <FlexBox direction="column" crossAxisAlignment="start" style={{ fontSize: "24px", fontWeight: "bold" }}>
                {
                    file && <FlexBox>
                    <p style={{fontSize: styles.size(0.75), marginBottom: styles.size(1)}}>
                        {file?.path}
                    </p>
                    </FlexBox>
                }
                <h5>Assinante</h5>
                <FlexBox>
                    <TextField title="Email do assinante" value={email} onChange={(e) => setEmail(e)} />
                </FlexBox>
                <FlexBox>
                    <TextField title="Nome do assinante" value={signer} onChange={(e) => setSigner(e)} />
                </FlexBox>
                <Button style={{ paddingInline: styles.size(2), height: styles.size(3) }} onClick={() => submitPdfDocument()}>Criar documento</Button>
            </FlexBox>
            {
                showModal ? (
                    <FlexBox column className={classes.modal}>
                        <FlexBox mainAxisAlignment="space-between" style={{ padding: styles.size(1), borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }} gap={styles.size(1)}>
                            <FlexBox gap={styles.size(2)}>
                                <FlexBox crossAxisAlignment="center"><Icon style={{ color: styles.rgba(75, 200, 100, 1) }} name={icons.addCircleFill} /> Adicionado</FlexBox>
                                <FlexBox crossAxisAlignment="center"><Icon style={{ color: styles.rgba(255, 85, 119, 1) }} name={icons.minusCircleFill} /> Removido</FlexBox>
                            </FlexBox>
                            <Icon onClick={() => setShowModal(false)} name={icons.closeLine} />
                        </FlexBox>
                        <FlexBox column style={{ overflowY: "scroll" }}>
                            {documentDiffLines.map((line, index) => (
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
                        <FlexBox mainAxisAlignment="end" style={{ padding: styles.size(1), borderTop: "1px solid rgba(255, 255, 255, 0.1)" }} gap={styles.size(1)}>
                            <Button style={{ paddingInline: styles.size(2), height: styles.size(3), margin: 0 }}>Enviar Solicitação</Button>
                            <Button style={{ paddingInline: styles.size(2), height: styles.size(3), margin: 0 }}>Cancelar</Button>
                        </FlexBox>
                    </FlexBox>
                ) : null
            }
        </FlexBox>
    );
}

function trimTextLines(text: string) {
    const lines = text.split('\n');
    const trimmedLines = lines.map(line => line.trim());
    const trimmedText = trimmedLines.join('\n');

    return trimmedText;
}

function removeEmptyLines(text: string) {
    const nonEmptyLines = text.split('\n').filter(line => line.trim() !== '');
    const cleanedText = nonEmptyLines.join('\n');

    return cleanedText;
}

function trimEndTextLines(text: string) {
    const trimmedText = text.replace(/[ \t]+$/gm, '');

    return trimmedText;
}

function removeTrailingBlankLines(text: string): string {
    const lines = text.split('\n');
    let lastNonBlankLineIndex = lines.length - 1;

    // Find the index of the last non-blank line
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim() !== '') {
            lastNonBlankLineIndex = i;
            break;
        }
    }

    // Remove the trailing blank lines
    const textWithoutTrailingBlanks = lines.slice(0, lastNonBlankLineIndex + 1).join('\n');
    return textWithoutTrailingBlanks;
}


function FileUploadButton({ callback }: { callback?: (data: string) => void }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Aqui você pode fazer a requisição para enviar o arquivo para o servidor
            // Por exemplo, usando o fetch() ou uma biblioteca como o Axios
            // Exemplo usando o fetch():
            fetch("http://localhost:8080/documents", {
                method: "DELETE",
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    // Trate a resposta do servidor, se necessário
                    // console.log(data);
                    if (callback) {
                        // console.log(data.payload)
                        callback(data.payload);
                    }
                })
                .catch(error => {
                    // Lide com o erro, se necessário
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Enviar</button>
        </div>
    );
}


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
        paddingInline: styles.size(1.5),
        // height: styles.size(3.5),
        backgroundColor: ({ theme }: any) => styles.lighten(theme.backgroundAlt, 0.02),
        borderRadius: styles.size(.5)
    },
    divider: {
        height: "1px",
        width: `calc(100% + ${styles.size(2)})`,
        background: ({ theme }: any) => styles.rgbA(theme.contrast, 0.05),
        marginTop: styles.size(-1),
        marginInline: styles.size(-1)
    }
});
