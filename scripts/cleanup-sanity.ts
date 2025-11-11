import { config as loadEnv } from 'dotenv'
import { createClient, type SanityDocumentStub } from '@sanity/client'

loadEnv({ path: '.env.local' })
loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error('Missing Sanity environment variables. Check .env.local.')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const seededIds: string[] = [
  'siteSettings',
  'cabin-standard-cabin',
  'cabin-cabin-suite',
  ...Array.from({ length: 9 }, (_, i) => `faq-${i + 1}`),
  'policy-pet-policy',
  'policy-cancellation-policy',
  'policy-check-in-check-out',
  'policy-accessibility',
  'page-home',
  'page-stay',
  'page-buyouts',
  'page-story',
  'page-contact',
]

async function cleanup() {
  try {
    console.log('🧹 Removing seeded Sanity documents...\n')

    const existingDocs: { _id: string }[] = await client.fetch(
      '*[_id in $ids]{ _id }',
      { ids: seededIds },
      { tag: 'cleanup-seeded-docs' }
    )

    if (existingDocs.length === 0) {
      console.log('Nothing to delete. All seeded documents are already removed.')
      return
    }

    const transaction = client.transaction()

    for (const doc of existingDocs) {
      console.log(`→ Deleting ${doc._id}`)
      transaction.delete(doc._id)
    }

    await transaction.commit({ visibility: 'async' })

    console.log('\n✅ Cleanup job enqueued. The documents should disappear momentarily.')
  } catch (error) {
    console.error('❌ Cleanup failed', error)
    process.exit(1)
  }
}

cleanup()

