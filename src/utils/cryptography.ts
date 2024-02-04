const Crypto = require("crypto");

interface EncriptProps {
  [key: string]: string | number;
}

const cryptography = {
  pass: "0123456789abcdef0123456789abcdef",
  iv: "0123456789abcdef",
  encript: function (data: EncriptProps) {
    try {
      const cipher = Crypto.createCipheriv("aes-256-cbc", this.pass, this.iv);
      const hash = cipher.update(JSON.stringify(data), 'utf8', "hex");
      const hex = hash + cipher.final("hex");
      return hex;
    } catch (err) {
      console.error(err);
      return "";
    }
  },
  decript: function (hex: any) {
    try {
      const decipher = Crypto.createDecipheriv("aes-256-cbc", this.pass, this.iv);
      const dec = decipher.update(hex, "hex", 'utf8');
      return dec + decipher.final('utf8');
    } catch (err) {
      console.error(err);
      return "";
    }
  }
}

export { cryptography };


// interface EncodeProps {
//   [key: string]: string | number;
// }

// const encodeHMAC = (data: EncodeProps): string => {
//   const dadosString = JSON.stringify(data);
//   const slug = btoa(unescape(encodeURIComponent(dadosString)));
//   return slug;
// };

// const decodeHMAC = (token: string): EncodeProps | null => {
//   try {
//     const dadosString = decodeURIComponent(escape(atob(token)));
//     const objeto: EncodeProps = JSON.parse(dadosString);
//     return objeto;
//   } catch (error) {
//     console.error('Erro ao decodificar token:', error);
//     return null;
//   }
// };

// export { encodeHMAC, decodeHMAC };
