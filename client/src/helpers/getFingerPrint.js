import Fingerprint2 from "fingerprintjs2";

function getFingerPrint (callback) {
    Fingerprint2.getV18({}, fingerPrint => {
        callback(fingerPrint)
    })
}
export default getFingerPrint;