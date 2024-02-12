import { Bar } from "react-chartjs-2";
export default function BarChart({ data }: any) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Bar Chart',
                        },
                    },
                }}
            />
        </div>
    );
};