import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ContactForm } from '@/types'

// Validar email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitizar entrada
const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 1000)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validar longitudes
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Entrada demasiado larga' },
        { status: 400 }
      )
    }

    // Sanitizar inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      timestamp: serverTimestamp(),
      read: false,
    }

    // Guardar en Firestore
    const contactsRef = collection(db, 'portfolio', 'profile', 'personal', 'contacts')
    const docRef = await addDoc(contactsRef, sanitizedData)

    // Aquí podrías enviar un email usando SendGrid, Nodemailer, etc.
    // await sendEmailNotification(sanitizedData)

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje recibido correctamente',
        id: docRef.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error procesando el formulario' },
      { status: 500 }
    )
  }
}
