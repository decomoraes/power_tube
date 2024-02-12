import {FlexBox} from "../../components/authdoc_ui";
import Card from "../../components/cards/card";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import {itns} from "./texts/language_settings.itn";
import React, {useContext, useEffect, useState} from "react";
import {ItnLanguage, LanguageContext} from "../../utils/itn";
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import DropDown from "../../components/drop_down/drop_down";
import Button from "../../components/button/button";
import {observer} from "mobx-react";
import {StoreContext} from "../../store";

const LanguageSettings = observer(() => {
    const {settingsStore} = useContext(StoreContext);
    const theme = useTheme();
    const classes = useStyles({theme});
    const language = useContext(LanguageContext);
    const itn = itns[language];
    const items: {id: ItnLanguage | undefined, name: string}[] = [
        {id: undefined, name: itn.browserDefault},
        {id: "ptBr", name: "Português (Brasil)"},
        {id: "ptEu", name: "Português (Portugal)"},
        {id: "en", name: "English"},
        {id: "es", name: "Español"},
        {id: "fr", name: "Français"},
        {id: "it", name: "Italiano"},
        {id: "de", name: "Deutsch"},
    ];
    const [selectedItem, setSelectedItem] = useState(items[0]);

    useEffect(() => {
        setSelectedItem(items.find(item => item.id === settingsStore.language) ?? items[0]);
    }, []);

    function submit() {
        settingsStore.language = selectedItem.id;
        window.location.reload();
    }

    return (
        <FlexBox column flex={1} gap={styles.size(1)}>
            <BreadCrumbs items={[{text: itn.breadcrumbs.languageSettings}]}/>
            <Card>
                <FlexBox column gap={styles.size(1)}>
                    <DropDown
                        style={{width: "14rem", flexShrink: 1 }}
                        selected={selectedItem.id}
                        items={items}
                        displayValuePath="name"
                        onChange={(item: any) => setSelectedItem(item)} />
                    <Button onClick={submit}>{itn.save}</Button>
                </FlexBox>
            </Card>
        </FlexBox>
    )
});

const useStyles = createUseStyles({
    headerContainer: {
        position: "relative",
        zIndex: 2,
        height: styles.size(5),
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        paddingInline: styles.size(1.5),
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
    },
});

export default LanguageSettings;