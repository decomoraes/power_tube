import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MobileSignature() {
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const location = useLocation();

    useEffect(() => {
        const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
        const pc = new RTCPeerConnection(configuration);

        pc.onicecandidate = event => {
            if (event.candidate) {
                // Você precisaria receber os candidatos ICE do outro peer de alguma maneira
            }
        };

        pc.ondatachannel = (event) => {
            const dataChannel = event.channel;
            dataChannel.onmessage = (messageEvent) => {
                console.log("Mensagem recebida:", messageEvent.data);
                // Aqui você pode processar a assinatura recebida do computador
            };
        };

        const offerUrl = new URL(window.location.href);
        const offerFromOtherPeer = JSON.parse(offerUrl.searchParams.get("offer") as string);
        const sessionDescription = new RTCSessionDescription(offerFromOtherPeer);
        pc.setRemoteDescription(sessionDescription).then(() => {
            pc.createAnswer().then(answer => {
                pc.setLocalDescription(answer);
                // Você precisaria enviar esta resposta para o outro peer de alguma maneira
            });
        });

        setPeerConnection(pc);
    }, []);

    return (
        <div>
            <button onClick={handleClick}>Enviar assinatura</button>
        </div>
    );

    function handleClick() {
        if (peerConnection) {
            const dataChannel = peerConnection.createDataChannel("signature");
            dataChannel.onopen = () => {
                console.log("Conexão estabelecida com sucesso!");
                dataChannel.send("Hello, world!"); // Envia a string para o computador
            };
        }
    }
}
