import { useEffect, useState } from 'react'
import type { Profile } from '@/types'
import { profileService } from '@/lib/services/firebaseService'

export const useProfile = () => {
  const [profile, setProfile] = useState<(Profile & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await profileService.getProfile()
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading profile')
        console.error('Error loading profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profile, loading, error }
}
