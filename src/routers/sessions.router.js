import { Router } from "express";
import passport from 'passport';
import Cart from '../models/cart.model.js'
import UserPasswordModel from '../models/user-password.model.js'
import { generateRandomString, createHash } from '../utils.js'
import UserModel from '../models/user.model.js'
import nodemailer from 'nodemailer'
import config from '../config/config.js'
import bcrypt from 'bcryptjs'
import {
  createUserController,
  failCreateUserController,
  loginUserController,
  errorLoginUserController,
  failLoginUserController,
  githubLoginUserController,
  githubCallbackLoginUserController,
  readInfoUserController
} from "../controllers/session.controller.js";

const router = Router();

router.post('/register', createUserController); // crea un usuario

router.get('/failRegister', failCreateUserController) // devuelve un error al registrar un usuario

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/failLogin' }), loginUserController, errorLoginUserController); // inicia sesión

router.get('/failLogin', failLoginUserController) // devuelve un error al iniciar sesión

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), githubLoginUserController) // inicia sesión con GitHub

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallbackLoginUserController) // callback de GitHub para iniciar sesión

router.get('/current', readInfoUserController); // devuelve los detalles del usuario actual

router.post('/forget-password', async (req, res) => {
  const email = req.body.email
  const user = await UserModel.findOne({ email })
  if (!user) {
    return res.status(404).json({ status: 'error', error: 'User not found' });
  }
  const token = generateRandomString(16)
  await UserPasswordModel.create({ email, token })
  const mailerConfig = {
    service: 'gmail',
    auth: { user: config.mailDelEcommerce, pass: config.mailPasswordDelEcommerce }
  }
  let transporter = nodemailer.createTransport(mailerConfig)
  let message = {
    from: config.mailDelEcommerce,
    to: email,
    subject: '[Coder e-commerce API Backend] Reset you password',
    html: `<h1>[Coder e-commerce API Backend] Reset you password</h1>
    <hr>Debes resetear tu password haciendo click en el siguiente link <a href="http://localhost:8080/api/sessions/verify-token/${token}" target="_blank">http://localhost:8080/api/sessions/verify-token/${token}</a>
    <hr>
    Saludos cordiales,<br>
    <b>The Coder e-commerce API Backend</b>`
  }
  try {
    await transporter.sendMail(message)
    res.json({ status: 'success', message: `Email enviado con exito a ${email} para restablecer la contraseña` })
  } catch (err) {
    res.status(500).json({ status: 'errorx', error: err.message })
  }
}); // Restablece la password para iniciar sesión mediante un mail enviado al correo del usuario ingresado

router.get('/verify-token/:token', async (req, res) => {
  const token = req.params.token
  const userPassword = await UserPasswordModel.findOne({ token })
  if (!userPassword) {
    // return res.status(404).json({ status: 'error', error: 'Token no válido / El token ha expirado' })
    return res.redirect('/forget-password');
  }
  const user = userPassword.email
  res.render('reset-password', { user })
})

router.post('/reset-password/:user', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.user })

    const newPassword = req.body.newPassword;

    const passwordsMatch = await bcrypt.compareSync(newPassword, user.password);
    if (passwordsMatch) {
      return res.json({ status: 'error', message: 'No puedes usar la misma contraseña' });
    }

    await UserModel.findByIdAndUpdate(user._id, { password: createHash(newPassword) })
    res.json({ status: 'success', message: 'Se ha creado una nueva contraseña' })
    await UserPasswordModel.deleteOne({ email: req.params.user })
  } catch (err) {
    res.json({ status: 'error', message: 'No se ha podido crear la nueva contraseña' })
  }
})

export default router;