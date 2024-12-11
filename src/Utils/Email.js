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
        message: "Conta não encontrado!"
      });
    };

    let resetToken = crypto.randomBytes(2).toString("hex");

    response.recuperation = resetToken;
    await response.save();


    const smtp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: "leo.dasilvamohr@gmail.com",
        pass: "gvkj jxgg aynf dsxh ",
      },
    });

    function sendMail(to, sub, msg) {
      smtp.sendMail({
      to: to,
      subject: sub,
      html: msg
      })
    };

    await sendMail(Email, "Recuperação de senha", `Olá ${User.Name}, seu código de recuperação é: ${resetToken}`);

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
        Email
      }
    });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.token = null;
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
