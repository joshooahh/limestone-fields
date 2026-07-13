/**
 * Stable identifier for the Limestone Fields entity. The homepage declares
 * the full LodgingBusiness/Organization schema under this @id; every other
 * page's schema (blog posts, etc.) should reference it via
 * `{ "@id": ORGANIZATION_ID }` instead of duplicating Organization details.
 * This is the "entity recognition" pattern recommended in the SEO/AEO/GEO
 * strategy doc (Section 2) so search engines and LLMs resolve every mention
 * of Limestone Fields back to one consistent entity.
 */
export const ORGANIZATION_ID = 'https://limestonefields.com/#organization'
