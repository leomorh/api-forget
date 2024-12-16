import User from '../models/UserModel';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';


async function send(req, res) {
  try {
    let { Email } = req.body;

    const response = await User.findOne({
      where: {
        Email: Email
      }
    });

    if (!response) {
      return res.status(200).send({
        type: "error",
        message: "Conta não encontrada!"
      });
    };

    let resetToken = crypto.randomBytes(2).toString("hex");

    response.recuperation = resetToken;
    await response.save();

    const smtp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "leo.dasilvamohr@gmail.com",
        pass: " gvkj jxgg aynf dsxh",
      },
    });

    async function sendMail(to, sub, msg) {
      await smtp.sendMail({
        to: to,
        subject: sub,
        html: msg
      });
    }

    const resetLink = "https://example.com/reset-password";
    const htmlMessage = `
   <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperação de Senha</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.5;
      margin: 10px 0;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      margin-top: 20px;
    }
    .footer {
      font-size: 12px;
      color: #777777;
      text-align: center;
      margin-top: 20px;
    }
    /* Media Queries for mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .container {
        padding: 15px;
      }
      h1 {
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
      .button {
        font-size: 14px;
        padding: 8px 16px;
      }
      .footer p {
        font-size: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Recuperação de Senha</h1>
    <p>Olá <strong>'${response.Username}'</strong>,</p>
    <p>Você solicitou a recuperação de sua senha. Para continuar, use o código de recuperação abaixo:</p>
    <p style="font-size: 18px; font-weight: bold; text-align: center; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
      ${resetToken}
    </p>
    <p>Digite esse código na página de recuperação de senha para redefinir sua senha. Se você não solicitou a recuperação, desconsidere este email.</p>
    <a href="${resetLink}" class="button">Recuperar Senha</a>
    <div class="footer">
      <p>Se você não solicitou a recuperação de senha, ignore este email. <br>
      Este é um email automático, por favor, não responda.</p>
    </div>
  </div>
</body>
</html>`;

    await sendMail(Email, "Recuperação de senha", htmlMessage);

    return res.status(200).send({
      type: "success",
      message: "Código de recuperação enviado com sucesso!",
      data: response
    });

  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "!",
      data: error.message
    })
  }
}

const receiveCode = async (req, res) => {
  try {
    let { code, Email } = req.body;
    let response = await User.findOne({
      where: {
        Email
      }
    });

    if (response.recuperation === code) {
      response.recuperation = null;
      await response.save();
      return res.status(200).send({
        type: "success",
        message: "Código de recuperação validado com sucesso!"
      });
    } else {
      return res.status(200).send({
        type: "error",
        message: "Código de recuperação inválido!"
      });
    }

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const updatePassword = async (req, res) => {
  try {
    let { newPassword, Email } = req.body;

    let user = await User.findOne({
      where: {
        Email: Email
      }
    });

    const passwordHash = (Password) => {
      const hash = crypto.createHash('sha256');
      hash.update(Password);
      return hash.digest('hex');
    }

    user.PasswordHash = passwordHash(newPassword);
    await user.save();

    return res.status(200).send({
      type: 'info',
      message: 'Senha atualizada com sucesso, logue-se novamente.'
    });

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

export default {
  send,
  updatePassword,
  receiveCode
}
