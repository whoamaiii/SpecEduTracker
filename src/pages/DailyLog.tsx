import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Here we'll add the API call later
      console.log('Form data:', data)
      alert('Logg lagret!')
      form.reset()
    } catch (error) {
      console.error('Error saving log:', error)
      alert('Kunne ikke lagre loggen. Prøv igjen senere.')
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
        </form>
      </Form>
    </div>
  )
}