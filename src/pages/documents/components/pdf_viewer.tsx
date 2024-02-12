import React, { FC, useEffect, useState } from "react";
import * as styles from "../../../utils/styles";

type PDFViewerProps = {
    file: Uint8Array
}

const PDFViewer: FC<PDFViewerProps> = ({ file: data }) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        // Crie um blob a partir do Uint8Array
        const blob = new Blob([data], { type: "application/pdf" });
        // Crie uma URL a partir do blob
        const url = URL.createObjectURL(blob);

        // Armazene a URL no estado
        setPdfUrl(url);

        // Limpeza na desmontagem
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [data]);

    // Se a URL do PDF não foi gerada ainda, retorne null ou algum carregador
    if (!pdfUrl) {
        return null;
    }

    return <embed
        src={pdfUrl}
        type="application/pdf"
        style={{ width: "100%", height: "100%",  }}
    />
};

export default PDFViewer;


// import React, { useEffect, useState } from "react";
// import { pdfjs, Document, Page } from "react-pdf";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
//
// // import './Sample.css';
//
// import type { PDFDocumentProxy } from 'pdfjs-dist';
// import { createUseStyles, useTheme } from "react-jss";
// import { useItn } from "../../../utils/itn";
// import { itns } from "../../auth/texts/sign_in.itn";
// import { FlexBox } from "../../../components/authdoc_ui";
// import { inspect } from "util";
// import * as styles from "../../../utils/styles";
//
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();
//
// const options = {
//     cMapUrl: 'cmaps/',
//     standardFontDataUrl: 'standard_fonts/',
// };
//
// type PDFFile = string | File | null;
//
// type Props = {
//     file: Uint8Array,
//     fileName: string,
// }
//
// export default function PdfViewer(props: Props) {
//     const theme = useTheme();
//     // @ts-ignore
//     const classes = useStyles({theme});
//     const [file, setFile] = useState<PDFFile>('./sample.pdf');
//     const [numPages, setNumPages] = useState<number>();
//     const [currentPage, setCurrentPage] = useState<number>(1);
//
//     function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
//         const { files } = event.target;
//
//         if (files && files[0]) {
//             setFile(files[0] || null);
//         }
//     }
//
//     // useEffect(() => {
//     //     const blob = new Blob([props.file], { type: 'application/pdf' });
//     //     const url = URL.createObjectURL(blob);
//     //     return () => URL.revokeObjectURL(url);
//     // }, [props.file]);
//
//     function uint8ArrayToFile(uint8Array: Uint8Array, fileName: string, mimeType: string) : PDFFile {
//         const blob = new Blob([uint8Array], { type: mimeType });
//         return new File([blob], fileName, { type: mimeType });
//     }
//
//     function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
//         setNumPages(nextNumPages);
//     }
//
//     return (
//         // <FlexBox gap={styles.size(2)}>
//             <FlexBox column className={classes.pdfViewer}>
//                 <FlexBox mainAxisAlignment="space-between">
//                     <div onClick={() => setCurrentPage(currentPage - 1)}>Anterior</div>
//                     <div onClick={() => setCurrentPage(currentPage - 1)}>Aprovar página</div>
//                     <div onClick={() => setCurrentPage(currentPage - 1)}>Reprovar página</div>
//                     <div onClick={() => setCurrentPage(currentPage + 1)}>Próximo</div>
//                 </FlexBox>
//                 {/*<Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>*/}
//                 <FlexBox className={classes.pdfContainer} column>
//                 <Document file={uint8ArrayToFile(props.file, "", "application/pdf")} onLoadSuccess={onDocumentLoadSuccess} options={options}>
//                     {/*<Page key={`page_${currentPage}`} pageNumber={currentPage} width={500} />*/}
//                     {Array.from(new Array(numPages), (el, index) => (
//                         <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                     ))}
//                 </Document>
//                 </FlexBox>
//             {/*<FlexBox flex={1} className="Example__container__load">*/}
//             {/*    <label htmlFor="file">Load from file:</label>{' '}*/}
//             {/*    <input onChange={onFileChange} type="file" />*/}
//             {/*</FlexBox>*/}
//         {/*</FlexBox>*/}
//             </FlexBox>
//     );
// }
//
// // region style
// const useStyles = createUseStyles({
//     pdfViewer: {
//         minWidth: styles.size(40),
//     },
//     pdfContainer: {
//         backgroundColor: "magenta",
//         "& > div": {
//             backgroundColor: "cyan",
//         },
//
//         "& > div > div": {
//             backgroundColor: "yellow !important",
//         },
//         "& .react-pdf__Document > .react-pdf__Page > .react-pdf__Page__canvas": {
//             width: "100% !important",
//             height: "auto !important",
//         },
//         "& .react-pdf__Document > .react-pdf__Page > .react-pdf__Page__textContent": {
//             width: "100% !important",
//             height: "auto !important",
//         },
//     },
// });