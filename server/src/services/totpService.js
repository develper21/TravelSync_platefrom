import { authenticator } from 'otplib';
import qrcode from 'qrcode';

export const generateOTP = async (user) => {
  const secret = authenticator.generateSecret();
  user.otpSecret = secret;
  await user.save();

  const otpauth = authenticator.keyuri(user.email, 'TravelSync', secret);
  const qrCode = await qrcode.toDataURL(otpauth);

  return { secret, qrCode };
};

export const verifyOTPToken = (user, token) => {
  if (!user || !user.otpSecret) return false;
  return authenticator.check(token, user.otpSecret);
};