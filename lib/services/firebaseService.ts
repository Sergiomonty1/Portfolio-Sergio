import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
  Query,
  DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Profile, Experience, Project } from '@/types'

/**
 * Servicio para obtener datos del perfil personal
 */
export const profileService = {
  // Obtener perfil completo
  async getProfile(): Promise<Profile & { id: string }> {
    const docRef = doc(db, 'portfolio', 'profile', 'personal', 'data')
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw new Error('Profile not found')
    }
    return { id: docSnap.id, ...docSnap.data() } as Profile & { id: string }
  },

  // Validar estructura (para admin)
  async ensureProfileDocument(defaultData: Profile): Promise<void> {
    const docRef = doc(db, 'portfolio', 'profile', 'personal', 'data')
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      // El documento será creado manualmente por el admin
      console.log('Profile document not found. Please create it manually in Firestore.')
    }
  },
}

/**
 * Servicio para obtener datos de experiencia
 */
export const experienceService = {
  // Obtener todas las experiencias ordenadas
  async getExperiences(): Promise<Experience[]> {
    const q = query(
      collection(db, 'portfolio', 'profile', 'personal', 'experiences'),
      orderBy('startDate', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
      endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
    })) as Experience[]
  },

  // Obtener experiencia actual
  async getCurrentExperience(): Promise<Experience | null> {
    const q = query(
      collection(db, 'portfolio', 'profile', 'personal', 'experiences'),
      where('current', '==', true)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return null
    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
      endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
    } as Experience
  },
}

/**
 * Servicio para obtener datos de proyectos
 */
export const projectService = {
  // Obtener todos los proyectos
  async getProjects(): Promise<Project[]> {
    const q = query(
      collection(db, 'portfolio', 'profile', 'personal', 'projects'),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
    })) as Project[]
  },

  // Obtener proyectos destacados
  async getFeaturedProjects(): Promise<Project[]> {
    const q = query(
      collection(db, 'portfolio', 'profile', 'personal', 'projects'),
      where('featured', '==', true),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
    })) as Project[]
  },

  // Obtener proyecto por ID
  async getProjectById(id: string): Promise<Project & { id: string }> {
    const docRef = doc(db, 'portfolio', 'profile', 'personal', 'projects', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw new Error('Project not found')
    }
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.() || docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt?.toDate?.() || docSnap.data().updatedAt,
    } as Project & { id: string }
  },

  // Obtener proyectos por categoría
  async getProjectsByCategory(category: string): Promise<Project[]> {
    const q = query(
      collection(db, 'portfolio', 'profile', 'personal', 'projects'),
      where('category', '==', category),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
    })) as Project[]
  },
}
