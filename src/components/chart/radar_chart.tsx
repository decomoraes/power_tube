import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {useTheme} from "react-jss";

function rnd(min: number = 0, max: number = 255) {
    return Math.random() * (max - min) + min;
}

const color = () => {
    let r1 = rnd();
    let r2 = rnd();
    let r3 = rnd();
    let translucent = `rgba(${r1}, ${r2}, ${r3}, 0.1)`;
    let opaque = `rgba(${r1}, ${r2}, ${r3}, 0.7)`;
    return [translucent, opaque];
}
let colors = color();

ChartJS.register(
    RadialLinearScale,
    // PointElement,
    // LineElement,
    // Filler,
    // Tooltip,
    // Legend
);
const labels = ['Matemática', 'Português', 'Geografia', 'História', 'Artes', 'Física', 'Química', 'Biologia', 'Inglês'];
export const data = {
    labels: labels,
    backgroundColor: "green",
    datasets: [
        {
            label: '# of Votes',
            data: labels.map(() => rnd(4, 10)),
            backgroundColor: colors[0],
            borderColor: colors[1],
            borderWidth: 1,
        },
    ],
};

export const options = (theme: any) => ({
    responsive: true,
    maintainAspectRatio: false,
    scale: {
        pointLabels: {
            fontColor: "red",
        },
    },
    scales: {
        r: {
            ticks: {
                backdropColor: theme.backgroundAlt,
                color: theme.foregroundSecondary,
            },
            beginAtZero: true,
            pointLabels: {
                color: theme.foreground,
            },
        },
    },
});

export function RadarChart() {
    const theme = useTheme();
    // @ts-ignore
    return <Radar options={options(theme)} data={data} />;
}