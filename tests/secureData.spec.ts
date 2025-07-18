import CryptoJS from 'crypto-js';

export function encryptData(data: string, secretKey: string): string {
    const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
    return ciphertext;
}

export function decryptData(ciphertext: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}