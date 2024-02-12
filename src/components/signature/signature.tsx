import React, { useState, useRef } from "react";

type Point = { x: number; y: number };

type Props = {
    streamlineFactor?: number;
    strokeWidth?: number;
    strokeColor?: string;
    strokeLinecap?: "butt" | "round" | "square" | "inherit";
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
    height?: string;
    width?: string;
    fieldOffset?: string;
}

const defaultProps: Props = {
    streamlineFactor: 0.1,
    strokeWidth: 4,
    strokeColor: "#194E92",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    height: "300px",
    width: "300px",
    fieldOffset: "30px",
}

export default function Signature(props: Props = defaultProps) {
    const [points, setPoints] = useState<Point[]>([]);
    const [paths, setPaths] = useState<Point[][]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const streamlineFactor = 0.1;
    const strokeWidth = 4;
    const strokeColor = "#194E92";
    const strokeLinecap = "round";
    const strokeLinejoin = "round";
    const height = "300px";
    const width = "300px";
    const fieldOffset = "30px";

    const transformPoint = (clientX: number, clientY: number): Point => {
        const rect = svgRef.current?.getBoundingClientRect();
        return {
            x: clientX - (rect?.left || 0),
            y: clientY - (rect?.top || 0),
        };
    };

    const startDrawing = (clientX: number, clientY: number) => {
        const pt = transformPoint(clientX, clientY);
        setIsDrawing(true);
        setPoints([{ x: pt.x, y: pt.y }, { x: pt.x, y: pt.y }]); // Duplicated point to handle tap/click without drag
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        setPaths((prevPaths) => [...prevPaths, points]);
        setPoints([]);
    };

    const draw = (clientX: number, clientY: number) => {
        if (!isDrawing) return;
        const pt = transformPoint(clientX, clientY);
        setPoints((prevPoints) => {
            const lastPoint = prevPoints[prevPoints.length - 1];
            const nextPoint = {
                x: lastPoint.x + (pt.x - lastPoint.x) * streamlineFactor,
                y: lastPoint.y + (pt.y - lastPoint.y) * streamlineFactor,
            };
            return [...prevPoints, nextPoint];
        });
    };

    const getPath = (points: Point[]) => {
        const d = points.reduce((acc, point, i, arr) => {
            if (i === 0) {
                return `M ${point.x},${point.y}`;
            } else if (i < arr.length - 2) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                return `${acc} Q ${point.x},${point.y} ${xc},${yc}`;
            } else {
                return `${acc} L ${point.x},${point.y}`;
            }
        }, "");
        return <path d={d} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} fill="none" />;
    };

    // const getSignaturePath = (points: Point[]) => { // Function to get signature path
    //     const d = points.reduce((acc, point, i, arr) => {
    //         if (i === 0) {
    //             return `M ${point.x},${point.y}`;
    //         } else if (i < arr.length - 2) {
    //             const xc = (points[i].x + points[i + 1].x) / 2;
    //             const yc = (points[i].y + points[i + 1].y) / 2;
    //             return `${acc} Q ${point.x},${point.y} ${xc},${yc}`;
    //         } else {
    //             return `${acc} L ${point.x},${point.y}`;
    //         }
    //     }, "");
    //     return (
    //         <path
    //             d={d}
    //             stroke={strokeColor}
    //             strokeWidth={strokeWidth}
    //             strokeLinecap={strokeLinecap}
    //             strokeLinejoin={strokeLinejoin}
    //             fill="none"
    //         />
    //     );
    // };

    const getAnimatedPath = (points: Point[]) => { // Separate function to get animated path
        if (!points || points.length === 0) {
            return null;
        }

        const d = points.reduce((acc, point, i, arr) => {
            if (i === 0) {
                return `M ${point.x},${point.y}`;
            } else if (i < arr.length - 2) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                return `${acc} Q ${point.x},${point.y} ${xc},${yc}`;
            } else {
                return `${acc} L ${point.x},${point.y}`;
            }
        }, "");
        return (
            <path
                d={d}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                strokeLinejoin={strokeLinejoin}
                fill="none"
                strokeDasharray='1000'
                strokeDashoffset='1000'
                style={{ animation: 'dash 2s linear forwards' }}
            />
        );
    };

    const saveSVG = () => {
        const svgData = svgRef.current?.outerHTML ?? "";
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgBlob = new Blob([preface, svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "signature.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <>
        <div
            style={{
                position: "relative",
                height: height,
                width: width,
                // backgroundColor: "magenta",
            }}>
            <div
                style={{
                    position: "absolute",
                    top: fieldOffset,
                    left: fieldOffset,
                    right: fieldOffset,
                    bottom: fieldOffset,
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    pointerEvents: "none",
                }}
            />
            <svg
                ref={svgRef}
                onMouseDown={e => startDrawing(e.clientX, e.clientY)}
                onMouseUp={stopDrawing}
                onMouseMove={e => draw(e.clientX, e.clientY)}
                onTouchStart={e => startDrawing(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={stopDrawing}
                onTouchMove={e => draw(e.touches[0].clientX, e.touches[0].clientY)}
                style={{ height: height, width: width, touchAction: 'none', position: 'absolute', top: 0, left: 0 }}
            >
                {/*<rect width="100%" height="100%" fill="white" />*/}
                {paths.map((path, i) => (
                    <React.Fragment key={i}>{getPath(path)}</React.Fragment>
                ))}
                {getPath(points)}
            </svg>
        </div>
        <button onClick={saveSVG}>Salvar</button>


            <button onClick={() => setIsModalOpen(true)}>Ver Assinatura</button> {/* New button to open modal */}

            <Modal isOpen={isModalOpen}>
                <svg style={{ height: height, width: width }}>
                    {/* Draw all paths with animation */}
                    {paths.map((path, i) => (
                        <React.Fragment key={i}>{getAnimatedPath(path)}</React.Fragment>
                    ))}
                </svg>
                <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </Modal>
    </>
    );
};

function Modal({children, isOpen}: {children: React.ReactNode, isOpen: boolean}) {
    return (
        <>
            {isOpen &&
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
<div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            width: '300px',
            height: '300px',
        }}>
            {children}
        </div>
        </div>
            }
        </>
    )
}