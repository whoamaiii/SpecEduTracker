import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLatestLog } from '../lib/mockApi' // Import getLatestLog
import type { FormValues } from '../lib/mockApi' // Import FormValues type

export default function Dashboard() {
  const [latestLog, setLatestLog] = useState<FormValues | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLog = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const log = await getLatestLog()
        setLatestLog(log)
      } catch (err) {
        // Though mockApi's getLatestLog currently resolves with null instead of rejecting on "not found"
        // this handles potential future changes or other error types.
        const errorMessage = err instanceof Error ? err.message : 'Kunne ikke hente siste logg.'
        setError(errorMessage)
        // console.error('Error fetching latest log:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLog()
  }, [])

  const renderContent = (value: string | undefined | null, placeholder: string) => {
    if (isLoading) return <p>Laster...</p>
    if (error) return <p className="text-red-500">{error}</p>
    if (!latestLog || !value) return <p>{placeholder}</p>
    return <p className="text-lg font-semibold">{value}</p>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dagens Humør</CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent(latestLog?.mood, 'Ingen humør registrert.')}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sensoriske Utfordringer</CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent(latestLog?.sensoryIssues, 'Ingen sensoriske utfordringer registrert.')}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emosjonell Status</CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent(latestLog?.emotions, 'Ingen emosjonell status registrert.')}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}