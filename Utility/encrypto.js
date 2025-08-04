import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';


export function decryptData(ciphertext, secretKey) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
function encryptFileJS() {
    dotenv.config(); // Load environment variables from .env file

    console.log("Encrypting password...");
    const password = "Auto@123456"; // Example password to encrypt

    // Retrieve the secret key from the environment variable
    var secretKey = process.env.ENCRYPTION_KEY; 

    if (!secretKey) {
        console.error("Error: SECRET_KEY environment variable not set.");
        return; // Exit if the secret key is not available
    }

    const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
    console.log("Encrypted Password:", encrypted);
}

encryptFileJS();

const dat1=decryptData("U2FsdGVkX18NfNrTAa23qz1sYAbKk4Hr8xdfvXf9Hh0=","Testing1!")
console.log(dat1);
