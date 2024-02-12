// region imports
import {FlexBox} from "../../components/authdoc_ui";
import * as store from "../../store/indexOld";
import TextField from "../../components/text_field/text_field";
import Card from "../../components/cards/card";
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import UploadFileModal from "./components/upload_file_modal";
import {useSearchParams} from "react-router-dom";
import {observer} from "mobx-react";
import ProfileViewModel from "../../view_models/users/profile_view_model";
import { useContext, useEffect } from "react";
import {StoreContext} from "../../store";
import useProfileViewModel from "../../view_models/users/f_profile_view_model";
// endregion

// region ProfileView
export default function ProfileView() {
    // region properties
    const theme = useTheme();
    const classes = useStyles({theme});

    // const token = useRecoilValue(store.token);
    const [searchParams] = useSearchParams()
    const store = useContext(StoreContext);
    const viewModel = useProfileViewModel();
    useEffect(() => {
        viewModel.onInitialized(store, searchParams);
    }, [])
    // endregion

    // region render
    return (
        <Card style={{overflowY: "auto"}}>
            <FlexBox flex={12} direction="column" gap={12}>
                <h5 className={classes.title}>Editar perfil</h5>
                {/* region fields */}
                <FlexBox column crossAxisAlignmentSelf="center" crossAxisAlignment="center" style={{marginBottom: styles.size(2)}}>
                    {viewModel.user?.photo ?
                        <img src={`http://static.studium.academy/${viewModel.user.photo}`} alt="profile" className={classes.photo}/>
                        : <div className={classes.photo}/>}
                    <div onClick={viewModel.openModal} className={classes.editPhoto}>Editar foto</div>
                </FlexBox>
                <TextField
                    value={viewModel.user?.name}
                    onChange={(value) => viewModel.setUser({...viewModel.user, name: value})}
                    title="Nome"/>
                <TextField
                    value={viewModel.user?.email}
                    onChange={(value) => viewModel.setUser({...viewModel.user, email: value})}
                    title="E-mail"/>
                <TextField
                    value={viewModel.user?.phone}
                    onChange={(value) => viewModel.setUser({...viewModel.user, phone: value})}
                    title="Telefone"/>
                <TextField
                    value={viewModel.user?.username}
                    onChange={(value) => viewModel.setUser({...viewModel.user, username: value})}
                    title="Nome de usuário"/>
                <TextField
                    value={viewModel.user?.idDocumentNumber}
                    onChange={(value) => viewModel.setUser({...viewModel.user, idDocumentNumber: value})}
                    title="CPF"/>
                <TextField
                    value={viewModel.user?.birthdate}
                    onChange={(value) => viewModel.setUser({...viewModel.user, birthdate: value})}
                    title="Data de nascimento"/>
                <TextField
                    value={viewModel.user?.postalCode}
                    onChange={(value) => viewModel.setUser({...viewModel.user, postalCode: value})}
                    title="CEP"/>
                <TextField
                    value={viewModel.user?.address}
                    onChange={(value) => viewModel.setUser({...viewModel.user, address: value})}
                    title="Endereço"/>
                <TextField
                    value={viewModel.user?.city}
                    onChange={(value) => viewModel.setUser({...viewModel.user, city: value})}
                    title="Cidade"/>
                <TextField
                    value={viewModel.user?.state}
                    onChange={(value) => viewModel.setUser({...viewModel.user, state: value})}
                    title="Estado"/>
                <TextField
                    value={viewModel.user?.country}
                    onChange={(value) => viewModel.setUser({...viewModel.user, country: value})}
                    title="País"/>
                {/* endregion */}
                <button className={classes.button} onClick={viewModel.onSubmit}>Salvar</button>
                {/*{viewModel.showModal ? <UploadFileModal viewModel={viewModel} /> : null}*/}
            </FlexBox>
        </Card>
    );
    // endregion
}
// endregion

// region styles
const useStyles = createUseStyles({
    title: {
        color: ({theme}: any) => theme.foreground,
        marginTop: 0,
    },
    button: {
        border: "none",
        minWidth: "103px",
        height: styles.size(3),
        paddingInline: styles.size(1),
        left: "822px",
        top: "336px",
        borderRadius: "9px",
        width: "100%",
        marginTop: styles.size(1),
        backgroundColor: ({theme}: any) => theme.elementBlue,
        // color: ({theme}: any) => theme.foregroundSecondary,
        color: ({theme}: any) => theme.foreground,
    },
    photo: {
        width: styles.size(15),
        height: styles.size(15),
        objectFit: "cover",
        borderRadius: "50%",
        border: ({theme}: any) => `5px solid ${theme.elementBlue}`,
    },
    editPhoto: {
        backgroundColor: ({theme}: any) => theme.elementBlue,
        borderRadius: styles.size(0.75),
        paddingBlock: styles.size(0.25),
        paddingInline: styles.size(0.5),
        border: ({theme}: any) => `5px solid ${theme.background}`,
        fontSize: styles.size(1),
        fontWeight: 700,
        color: ({theme}: any) => theme.background,
        marginTop: styles.size(-1.5),
        userSelect: "none",
        msUserSelect: "none",
        cursor: "pointer",
    },
});
// endregion
