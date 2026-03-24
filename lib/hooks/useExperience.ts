import { useEffect, useState } from 'react'
import type { Experience } from '@/types'
import { experienceService } from '@/lib/services/firebaseService'

export const useExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true)
        const data = await experienceService.getExperiences()
        setExperiences(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading experiences')
        console.error('Error loading experiences:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return { experiences, loading, error }
}

export const useCurrentExperience = () => {
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true)
        const data = await experienceService.getCurrentExperience()
        setExperience(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading experience')
        console.error('Error loading experience:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [])

  return { experience, loading, error }
}
