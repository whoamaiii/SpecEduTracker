import { useState, useEffect } from 'react' // Added useEffect
import { useForm } from 'react-hook-form'
import { saveLog } from '../lib/mockApi' // Import saveLog
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const moodOptions = ['Glad', 'Trist', 'Rolig', 'Engstelig', 'Sint', 'Nøytral'] as const
const emotionOptions = ['Begeistret', 'Frustrert', 'Overveldet', 'Fornøyd', 'Redd', 'Sliten'] as const
const sensoryOptions = ['Støy', 'Lys', 'Berøring', 'Lukt', 'Smak', 'Bevegelse'] as const

const formSchema = z.object({
  mood: z.enum(moodOptions),
  emotions: z.enum(emotionOptions),
  sensoryIssues: z.enum(sensoryOptions),
  notes: z.string().min(1, 'Notat er påkrevd').max(500, 'Notatet kan ikke være lengre enn 500 tegn')
})

type FormValues = z.infer<typeof formSchema>

export default function DailyLog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: ''
      // Initialize other fields if necessary, or let Zod handle defaults if specified in schema
    }
  })

  // Clear submission message when user starts editing the form again
  useEffect(() => {
    if (form.formState.isDirty && submissionStatus !== 'idle') {
      setSubmissionStatus('idle')
      setSubmissionMessage(null)
    }
  }, [form.formState.isDirty, submissionStatus, form])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmissionStatus('idle') // Reset status at the beginning of new submission
    setSubmissionMessage(null)

    try {
      await saveLog(data)
      setSubmissionStatus('success')
      setSubmissionMessage('Loggen er lagret!')
      form.reset() // Reset the form fields to defaultValues
      // DefaultValues are re-applied, isDirty becomes false.

      setTimeout(() => {
        setSubmissionStatus('idle')
        setSubmissionMessage(null)
      }, 3000) // Clear success message after 3 seconds
    } catch (error) {
      // console.error('Error saving log:', error)
      const errorMessage = error instanceof Error ? error.message : 'En ukjent feil oppstod.'
      setSubmissionStatus('error')
      setSubmissionMessage(`Kunne ikke lagre loggen: ${errorMessage}. Prøv igjen senere.`)
      // Error messages persist until next submission attempt or form interaction
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Daglig Logg</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Humør</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg humør" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emotions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Følelser</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg følelse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {emotionOptions.map((emotion) => (
                      <SelectItem key={emotion} value={emotion}>{emotion}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sensoryIssues"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sensoriske Utfordringer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg sensorisk utfordring" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sensoryOptions.map((issue) => (
                      <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notater</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Skriv dine observasjoner her..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Lagrer...' : 'Lagre Logg'}
          </Button>

          {submissionMessage && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                submissionStatus === 'success' ? 'bg-green-100 text-green-700' : ''
              } ${submissionStatus === 'error' ? 'bg-red-100 text-red-700' : ''}`}
            >
              {submissionMessage}
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}