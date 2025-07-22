import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';


function encryptFileJS() {
dotenv.config();
console.log("Encrypting password...");
const password = "Auto@123456" // Example password to encrypt
var secretKey = "Testing1!"
const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
console.log("Encrypted Password:", encrypted);
}
encryptFileJS();