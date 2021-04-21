import { Config } from '../../config';
export const template = {
  VerifyEmail: (from: string, to: string, url) => {
    return {
      from: '"Company" <' + Config.nodeMailerOptions.transport.auth.username + '>',
      to: Config.nodeMailerOptions.transport.auth.username,
      subject: 'Verify Email',
      text: 'Verify Email',
      html: `<h1>Hi User</h1> <br><br> <h2>Thanks for your registration</h2>
<h3>Please Verify Your Email by clicking the following link</h3><br><br>
        ${url}`,
    };
  },
  ResetPassword: (from: string, to: string, url) => {
    return {
      from: `Company" <' ${from} '>`,
      to,
      subject: 'Reset Your Password',
      text: 'Reset Your Password',
      html: `<h1>Hi User</h1> <br><br> <h2>You have requested to reset your password , please click the following link to change your password</h2>
     <h3>Please click the following link</h3><br><br>
        ${url}`,
    };
  },
};
