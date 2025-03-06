import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dagens Humør</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ingen registreringer enda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sensoriske Utfordringer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ingen registreringer enda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emosjonell Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ingen registreringer enda</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}