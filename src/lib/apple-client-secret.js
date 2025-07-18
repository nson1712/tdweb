import jwt from "jsonwebtoken";

export function generateAppleClientSecret() {
  const teamId = process.env.APPLE_TEAM_ID;
  const clientId = process.env.APPLE_CLIENT_ID;
  const keyId = process.env.APPLE_KEY_ID;
  const privateKey = process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  console.log("PRIVATE KEY:", privateKey);

  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "180d", // tối đa 180 ngày
    audience: "https://appleid.apple.com",
    issuer: teamId,
    subject: clientId,
    keyid: keyId,
  });

  return token;
}