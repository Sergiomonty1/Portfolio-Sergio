import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 1000)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos', success: false },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido', success: false },
        { status: 400 }
      )
    }

    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Entrada demasiado larga', success: false },
        { status: 400 }
      )
    }

    const sName = sanitizeInput(name)
    const sEmail = sanitizeInput(email)
    const sSubject = sanitizeInput(subject)
    const sMessage = sanitizeInput(message)

    // Send email via Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: sEmail,
      subject: `[Portfolio] ${sSubject} - de ${sName}`,
      text: `Nombre: ${sName}\nEmail: ${sEmail}\nAsunto: ${sSubject}\n\nMensaje:\n${sMessage}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1db954;">Nuevo mensaje desde tu Portfolio</h2>
          <p><strong>Nombre:</strong> ${sName}</p>
          <p><strong>Email:</strong> <a href="mailto:${sEmail}">${sEmail}</a></p>
          <p><strong>Asunto:</strong> ${sSubject}</p>
          <hr style="border: 1px solid #333;" />
          <p style="white-space: pre-wrap;">${sMessage}</p>
        </div>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
