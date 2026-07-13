import { createClient } from '@sanity/client'
// console.log(import.meta.env.VITE_SANITY_TOKEN)
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
  apiVersion: '2025-10-01',
})  