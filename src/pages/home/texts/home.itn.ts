import {ItnType, Months, months} from "../../../utils/itn";

type Type = {
    nextEvents: string,
    scheduleOfTheDay: string,
    performance: string,
    months: Months,
    monthsQuantityLabel: string,
}

export const itns: ItnType<Type> = {
    ptBr: {
        nextEvents: "Próximos eventos",
        scheduleOfTheDay: "Cronograma do dia",
        performance: "Aproveitamento",
        months: months.ptBr,
        monthsQuantityLabel: "Quantidade",
    },
    ptEu: {
        nextEvents: "Próximos eventos",
        scheduleOfTheDay: "Cronograma do dia",
        performance: "Aproveitamento",
        months: months.ptEu,
        monthsQuantityLabel: "Quantidade",
    },
    en: {
        nextEvents: "Next events",
        scheduleOfTheDay: "Schedule of the day",
        performance: "Performance",
        months: months.en,
        monthsQuantityLabel: "Quantity",
    },
    es: {
        nextEvents: "Próximos eventos",
        scheduleOfTheDay: "Cronograma del día",
        performance: "Rendimiento",
        months: months.es,
        monthsQuantityLabel: "Cantidad",
    },
    fr: {
        nextEvents: "Prochains événements",
        scheduleOfTheDay: "Programme du jour",
        performance: "Performance",
        months: months.fr,
        monthsQuantityLabel: "Quantité",
    },
    it: {
        nextEvents: "Prossimi eventi",
        scheduleOfTheDay: "Programma del giorno",
        performance: "Prestazione",
        months: months.it,
        monthsQuantityLabel: "Quantità",
    },
    de: {
        nextEvents: "Nächste Veranstaltungen",
        scheduleOfTheDay: "Tagesplan",
        performance: "Leistung",
        months: months.de,
        monthsQuantityLabel: "Menge",
    },
}