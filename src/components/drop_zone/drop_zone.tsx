import {FileError, useDropzone} from "react-dropzone";
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {className} from "../../utils/className";
import {FlexBox} from "../authdoc_ui";
import 'react-circular-progressbar/dist/styles.css';
import {useCallback, useEffect, useState} from "react";

type Props = {
    onChange: (file: File[]) => void,
}

export default function DropZone(props: Props) {
    const theme: any = useTheme();
    const classes = useStyles({theme});
    const [files, setFiles] = useState<any>([])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        isDragAccept,
        getInputProps,
        inputRef
    } = useDropzone({
        onDrop: files => {
            setFiles(files)
            props.onChange(files)
        },
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        multiple: false
    });

    function removeFile(file: any) {
        alert("hey")
        console.log('removeFile...')
        const newFiles = [...files]
        newFiles.splice(newFiles.indexOf(file), 1)
        // console.log(acceptedFiles)
        setFiles(newFiles)
    }
     //
    // const removeAll = () => {
    //     console.log('removeAll...')
    //     acceptedFiles.length = 0
    //     acceptedFiles.splice(0, acceptedFiles.length)
    //     if (inputRef.current !== null) {
    //         inputRef.current.value = ''
    //     }
    //     console.log(acceptedFiles)
    // }

    // const files = acceptedFiles.map((file: any) => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes <button onClick={removeFile(file)}>Remove File</button>
    //     </li>
    // ));

    // const acceptedFileItems = acceptedFiles.map((file: any) => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));

    const fileRejectionItems = fileRejections.map(({file, errors}: { file: any, errors: FileError[] }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (
        <FlexBox gap={styles.size(2)} column className={classes.container}>
            <div
                {...getRootProps({className: 'drop_zone'})}
                className={
                    className([
                        classes.dragZone,
                        isDragAccept ? classes.dragZoneAccept : null,
                        'drop_zone',
                    ])
                }>
                <input {...getInputProps()} />
                <p>Clique para selecionar ou arraste a foto dentro desta área.</p>
                <em>(Somente images *.jpeg e *.png serão aceitas)</em>
            </div>
            <aside>
                {files.map((file: any) => (
                    <li key={file.path} className={classes.item}>
                        <FlexBox gap={styles.size(1)}>
                            <img className={classes.itemPhoto} src={URL.createObjectURL(file)} alt="userPhoto"/>
                            <FlexBox gap={styles.size(.5)} column mainAxisAlignment="center">
                                <div className={classes.userFileName}>
                                    {file.path}
                                </div>
                                <FlexBox className={classes.userInfo}>
                                    {(file.size / 1000).toFixed()} kb
                                </FlexBox>
                            </FlexBox>
                        </FlexBox>
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            setFiles([])
                            props.onChange([])
                        }}>
                            <svg style={{ width: "15px", height: "15px" }} width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.2072 8.79289L18.0001 1L17.293 0.292892L9.50012 8.08579L1.70723 0.292892L1.00012 1L8.79301 8.79289L0.293015 17.2929L1.00012 18L9.50012 9.5L18.0001 18L18.7072 17.2929L10.2072 8.79289Z" fill={theme.foregroundSecondary}/>
                            </svg>
                        </div>
                    </li>
                ))}
            </aside>
        </FlexBox>
    );
}


const useStyles = createUseStyles({
    dragZone: {
        border: ({theme}: any) => `1px dashed ${theme.foregroundSecondary}`,
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: styles.size(1),
        padding: styles.size(1),
        borderRadius: styles.size(.75),
        fontSize: styles.size(1),
        minHeight: styles.size(10),
        cursor: "pointer",
        "& > p": {
            margin: 0,
            userSelect: "none",
            msUserSelect: "none",
        },
        "& > em": {
            userSelect: "none",
            msUserSelect: "none",
        },
    },
    dragZoneAccept: {
        border: ({theme}: any) => `1px dashed ${theme.elementBlue}`,
    },
    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemPhoto: {
        width: styles.size(4),
        height: styles.size(4),
        borderRadius: styles.size(2),
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
    },
    container: {
        color: ({theme}: any) => theme.foregroundSecondary,
    },
    title: {
        color: ({theme}: any) => theme.foreground,
        marginTop: 0,
    },
    userFileName: {
        color: ({theme}: any) => theme.foreground,
        fontSize: styles.size(1),
    },
    userInfo: {
        color: ({theme}: any) => theme.foregroundSecondary,
        fontSize: styles.size(1),
    },
});
