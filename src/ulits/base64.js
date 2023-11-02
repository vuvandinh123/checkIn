export default function base64ToBlob(base64) {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const rawData = window.atob(parts[1]);

    const uInt8Array = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        uInt8Array[i] = rawData.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
