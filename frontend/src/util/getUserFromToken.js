// Parses the token to extract payload
export const getUserFromToken = (token) => {
  if (!token) {
    return null;
  } else {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(Buffer.from(encodedPayload, "base64"));
  }
};
export default getUserFromToken;
