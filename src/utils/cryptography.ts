type CryptographyProps = {
  uuid: string,
  phaseId: string | number,
  epicId: string | number,
  featureId?: string | number,
  userId?: string | number,
  taskId?: string | number,
};


const cryptography = {
  encrypt: function (data: CryptographyProps) {
    const dataFormatted = `${data.uuid}|${data.phaseId}|${data.epicId}|${data.featureId || 0}|${data.userId || 0}|${data.taskId || 0}`;
    return btoa(dataFormatted);
  },
  decrypt: function (hex: string) {
    const decrypted = atob(hex).split('|');

    return {
      uuid: decrypted[0],
      phaseId: Number(decrypted[1]),
      epicId: Number(decrypted[2]),
      featureId: Number(decrypted[3]),
      userId: Number(decrypted[4]),
      taskId: Number(decrypted[5]),
    }
  }
}

export { cryptography };