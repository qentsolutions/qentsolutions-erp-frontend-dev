import crypto from "crypto";

// Définir la clé de chiffrement comme une constante
const encryptionKey: Buffer = Buffer.from(
  process.env.NEXT_ENCRYPT_SECRET_KEY || "",
  "utf-8",
);

// Fonction de chiffrement
export function encryptData(text: string): string {
  const cipher = crypto.createCipheriv(
    "aes-256-ecb",
    encryptionKey as unknown as crypto.CipherKey,
    null,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Fonction de déchiffrement
export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(
    "aes-256-ecb",
    encryptionKey as unknown as crypto.CipherKey,
    null,
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
