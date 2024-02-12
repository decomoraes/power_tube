import { useEffect, useState } from "react";
import QRCode, { QRCodeSVG } from "qrcode.react";

export default function Signatures() {
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
        const pc = new RTCPeerConnection(configuration);

        pc.onicecandidate = event => {
            if (event.candidate) {
                // Aqui você poderia adicionar os candidatos ICE ao URL ou enviá-los separadamente
            }
        };

        pc.ondatachannel = (event) => {
            const dataChannel = event.channel;
            dataChannel.onmessage = (messageEvent) => {
                console.log("Mensagem recebida:", messageEvent.data);
            };
        };

        const dataChannel = pc.createDataChannel("signature");
        dataChannel.onopen = () => {
            console.log("Conexão estabelecida com sucesso!");
            dataChannel.send("Hello, world!"); // Envia a string para o celular
        };

        pc.createOffer().then(offer => {
            pc.setLocalDescription(offer).then(() => {
                // Crie um URL com a oferta como parâmetro e armazene-o no estado para ser usado no código QR
                const offerUrl = `${window.location.origin}/#/mob-sign?offer=${encodeURIComponent(JSON.stringify(offer))}`;
                setUrl(offerUrl);
            });
        });

        setPeerConnection(pc);
    }, []);

    return (
        <div>
            <h2>Assinatura</h2>
            {/*<p>Por favor, escaneie o QR code com o seu celular para assinar.</p>*/}
        </div>
    );
}
