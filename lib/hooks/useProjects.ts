import { useEffect, useState } from 'react'
import type { Project } from '@/types'
import { projectService } from '@/lib/services/firebaseService'

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await projectService.getProjects()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading projects')
        console.error('Error loading projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await projectService.getFeaturedProjects()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading featured projects')
        console.error('Error loading featured projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

export const useProjectById = (id: string) => {
  const [project, setProject] = useState<(Project & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProject = async () => {
      try {
        setLoading(true)
        const data = await projectService.getProjectById(id)
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading project')
        console.error('Error loading project:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  return { project, loading, error }
}
