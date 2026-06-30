import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const client = createClient({
  projectId: 've6k1p3k',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const submissions = await client.fetch(
  `*[_type == "waitlistSubmission"] | order(_createdAt asc) {
    firstName, lastName, email, interests, _createdAt
  }`
)

if (!submissions.length) {
  console.log('No waitlist submissions found.')
  process.exit(0)
}

// Build CSV
const rows = [['First Name', 'Last Name', 'Email', 'Interests', 'Date']]

for (const s of submissions) {
  rows.push([
    s.firstName ?? '',
    s.lastName ?? '',
    s.email ?? '',
    (s.interests ?? []).join('; '),
    s._createdAt ? new Date(s._createdAt).toLocaleDateString('en-US') : '',
  ])
}

const csv = rows
  .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  .join('\n')

const outPath = resolve('waitlist-export.csv')
writeFileSync(outPath, csv, 'utf8')
console.log(`✓ Exported ${submissions.length} submissions → ${outPath}`)
