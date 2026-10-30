/**
 * Photos for the gallery inside each section of the Property page
 * (/the-property). Each section's photos are listed in the order they appear,
 * so put the brightest, most useful shots first.
 *
 * To add a photo: drop a web-sized JPEG (about 2000px on the long edge) in
 * public/images/gallery/ and add a line to the right section below.
 * `credit` is for our records (not shown on the page yet).
 *
 * Photos that read dark are left out on purpose: guests told us the site's
 * photos felt dark and that cabin interiors were hard to find, so the Cabins
 * gallery opens with the interiors.
 */

export type GalleryPhoto = {
  src: string
  w: number
  h: number
  alt: string
  credit: string
}

export type GallerySectionId = 'cabins' | 'barn' | 'kitchen' | 'lake' | 'farm' | 'land'

const p = (slug: string, w: number, h: number, credit: string, alt: string): GalleryPhoto => ({
  src: `/images/gallery/${slug}.jpg`,
  w,
  h,
  alt,
  credit,
})

export const GALLERY: Record<GallerySectionId, GalleryPhoto[]> = {
  // Cabins: interiors first, then outsides and the cedar tubs
  cabins: [
    p('cabin-bedroom-guitar', 2000, 1333, 'Ashley Estave',
      'Cabin bedroom with a bed, white duvet, a rust leather chair and a guitar on the wall under a beamed ceiling'),
    p('cabin-bedroom-boots-rug', 2000, 1333, 'Ashley Estave',
      'Cabin bedroom with a wood-framed bed, patterned rug, linen curtains and a pair of cowboy boots'),
    p('cabin-bedroom-french-doors', 2000, 1333, 'Ashley Estave',
      'Cabin bed in the foreground with French doors to the porch and a writing desk by the window'),
    p('cabin-bookshelf-table', 2000, 1333, 'Ashley Estave',
      'Cabin interior with an olive-green bookshelf, a small table with flowers and a vaulted ceiling'),
    p('cabin-suite-bunk-beds', 2000, 1333, 'Ashley Estave',
      'Bunk beds tucked behind the olive-green bookshelf in a cabin'),
    p('cabin-bathroom-arched-mirror', 2000, 1333, 'Ashley Estave',
      'Cabin bathroom with an arched mirror, black fixtures and a live-edge wood vanity with yellow flowers'),
    p('cabin-bathroom-shower', 2000, 1333, 'Ashley Estave',
      'Cabin bathroom with a glass walk-in shower, tile walls and a window'),
    p('cabin-desk-bookshelf-open-door', 2000, 1333, 'Ashley Estave',
      'Cabin writing desk, bookshelf and an open door to the porch in soft daylight'),
    p('cabin-desk-flowers-window', 2000, 1333, 'Ashley Estave',
      'Wooden cabin desk with red flowers in a glass vase and a cushioned chair by the window'),
    p('cabin-bedroom-warm-light', 2000, 1333, 'Richard Casteel',
      'Cabin bedroom in warm light with a wood headboard, rust chairs and a guitar on the wall'),
    p('cabin-bed-door-to-porch', 2000, 1333, 'Richard Casteel',
      'Cabin bed with a wooden headboard and glass door to the porch under a vaulted ceiling'),
    p('cabin-desk-sunlight-guitar', 2000, 1333, 'Richard Casteel',
      'Sunlight across a cabin desk and chair with a guitar hanging on the wall'),
    p('cabin-bedroom-view-to-desk', 2000, 1333, 'Richard Casteel',
      'Looking across a cabin bed to the desk and bookshelf through a sunlit glass door'),
    p('cabin-leather-chair-guitar', 2000, 1333, 'Ashley Estave',
      'Rust leather chair beside a vintage suitcase stand with a guitar on the wall'),
    p('cabin-bookshelf-detail', 1333, 2000, 'Ashley Estave',
      'Close view of cabin bookshelf styled with baskets, books and a framed heron print'),
    p('cabin-desk-red-flowers', 1333, 2000, 'Ashley Estave',
      'Cabin writing desk with a bouquet of red flowers, a stack of books and a wooden chair'),
    p('cabin-vintage-suitcase', 2000, 1333, 'Ashley Estave',
      'Vintage suitcase on a leather chair with a knit throw and guitar above'),
    p('cabin-cowboy-boots', 2000, 1333, 'Ashley Estave',
      'Cowboy boots on a patterned rug beside the bed and linen curtains'),
    p('cabin-bathroom-through-doorway', 2000, 1333, 'Ashley Estave',
      'Cabin bathroom seen through the doorway, with an arched mirror and glass shower'),
    p('cabin-guitar-leather-chair', 1333, 2000, 'Ashley Estave',
      'Rust leather chair in a cabin corner with a guitar on the wall above'),
    p('cabin-exterior-red-chairs-lake', 2000, 1333, 'Ashley Estave',
      'A cabin with red Adirondack chairs on the porch and the lake behind the trees'),
    p('cabin-exterior-cedar-tub-deck', 2000, 1333, 'Ashley Estave',
      'A cabin with French doors and a cedar soaking tub on the deck'),
    p('cabins-under-oaks', 2000, 1333, 'Richard Casteel',
      'Cabins set along a gravel path beneath large oak trees'),
    p('cabins-across-the-pond', 2000, 1125, 'Richard Casteel',
      'Three cabins with a path through the grass beside the pond at golden hour'),
    p('cabin-cedar-tub-sunset', 2000, 1333, 'Richard Casteel',
      'A dark-sided cabin with a cedar soaking tub on its deck in late light'),
    p('cedar-tub-lakeside', 2000, 1125, 'Limestone Fields video',
      'Soaking in a cedar tub with the lake in the distance'),
    p('cedar-tub-view', 2000, 1125, 'Limestone Fields video',
      'A guest relaxing in a cedar tub looking out over the meadow and lake'),
    p('cedar-tub-water', 2000, 1125, 'Limestone Fields video',
      'A hand trailing through the warm water of a cedar soaking tub'),
  ],
  // The Commons Barn
  barn: [
    p('barn-lounge-art-sofas', 2000, 1333, 'Richard Casteel',
      'Commons barn lounge with leather sofas, a burl-wood table and colorful artwork'),
    p('barn-kitchen-sofa', 2000, 1333, 'Richard Casteel',
      'Commons barn open kitchen with a farm table, pendant lights and a leather sofa'),
    p('barn-kitchen-range-lounge', 2000, 1333, 'Richard Casteel',
      'Commons barn kitchen with a six-burner range, a farm table with stools and the lounge beyond'),
    p('barn-dining-room', 2000, 1333, 'Richard Casteel',
      'Long wooden dining table with black chairs in the commons barn, with French doors beyond'),
    p('barn-lounge-wide', 2000, 1333, 'Richard Casteel',
      'Wide view of the commons barn lounge and kitchen under exposed beams'),
    p('barn-lounge-sofas-window', 2000, 1333, 'Richard Casteel',
      'Leather sofas and armchairs around a burl-wood coffee table, with a window to the trees'),
    p('barn-kitchen-farm-table', 2000, 1333, 'Richard Casteel',
      'Commons barn kitchen with a long farm table, steel fridge and pendant lights'),
    p('barn-coffee-chemex', 2000, 1333, 'Richard Casteel',
      'Chemex coffee and steel cups on the commons barn coffee counter'),
    p('barn-coffee-bar', 2000, 1333, 'Richard Casteel',
      'The commons barn coffee bar with espresso machine, grinder and local roasted coffee'),
    p('barn-kitchen-wide-cooking', 2000, 1125, 'Limestone Fields video',
      'Guests cooking together in the commons barn kitchen under the pendant lights'),
    p('barn-coffee-machine-chemex', 2000, 1125, 'Limestone Fields video',
      'The coffee station: espresso machine, grinder and a Chemex brewing'),
    p('barn-pouring-coffee', 2000, 1125, 'Limestone Fields video',
      'Pouring fresh coffee into a mug by the window'),
    p('barn-breakfast-bowl', 2000, 1125, 'Limestone Fields video',
      'A breakfast bowl with sweet peppers on the farm table'),
    p('barn-peppers-on-board', 2000, 1125, 'Limestone Fields video',
      'Sweet peppers from the garden on a cutting board'),
    p('barn-whisking-eggs', 2000, 1125, 'Limestone Fields video',
      'Whisking farm eggs at the kitchen counter'),
    p('barn-chemex-closeup', 2000, 1125, 'Limestone Fields video',
      'Coffee dripping into a Chemex'),
    p('barn-breakfast-table', 2000, 1125, 'Limestone Fields video',
      'Breakfast laid out on the long wooden table'),
    p('barn-exterior-trees', 2000, 1333, 'Ashley Estave',
      'The white commons barn with a metal roof under an oak branch, seen from the lawn'),
    p('barn-exterior-evening', 2000, 1333, 'Richard Casteel',
      'The commons barn at evening beneath a wide sky'),
  ],
  // The Outdoor Kitchen
  kitchen: [
    p('outdoor-grill-wide', 2000, 1125, 'Limestone Fields video',
      'Cooking at the outdoor grill, framed by timber posts and trees'),
    p('outdoor-grill-flames', 2000, 1125, 'Limestone Fields video',
      'Steaks sizzling over the flames on the outdoor grill'),
    p('outdoor-grill-steaks-broccolini', 2000, 1125, 'Limestone Fields video',
      'Steaks and broccolini on the grill grate'),
    p('outdoor-grill-tongs', 2000, 1125, 'Limestone Fields video',
      'Tending the outdoor grill with tongs'),
    p('outdoor-grill-grate', 2000, 1125, 'Limestone Fields video',
      'Close-up of the grill grate over glowing coals'),
    p('outdoor-grill-cook-low-angle', 2000, 1125, 'Limestone Fields video',
      'Cooking at the outdoor grill beneath the timber frame'),
    p('outdoor-grill-cooking', 2000, 1125, 'Limestone Fields video',
      'Tending the wood-fired grill with the trees behind'),
    p('outdoor-squeezing-lemon', 2000, 1125, 'Limestone Fields video',
      'Squeezing lemon over the grill'),
    p('outdoor-firewood-stack', 2000, 1125, 'Limestone Fields video',
      'Split firewood stacked for the grill'),
  ],
  // The Lake
  lake: [
    p('aerial-cabins-and-lake', 2000, 1125, 'Richard Casteel',
      'Aerial view of the cabins in the trees with Lake Limestone beyond'),
    p('lake-kayak-reeds', 2000, 1125, 'Limestone Fields video',
      'A kayaker paddling through the reeds on Lake Limestone'),
    p('cabin-reflected-in-pond', 2000, 1333, 'Richard Casteel',
      'A cabin reflected in the still pond with tall grass and the lake beyond'),
    p('lake-kayaking', 2000, 1125, 'Limestone Fields video',
      'Kayaking on Lake Limestone past the tree line'),
    p('lake-tall-grass', 1920, 1080, 'Limestone Fields video',
      'Tall green grass along the lakeshore'),
    p('lake-bare-tree', 2000, 1125, 'Limestone Fields video',
      'A bare tree standing in the lake under a soft sky'),
    p('lake-water-ripples', 2000, 1125, 'Limestone Fields video',
      'Sunlit ripples on the surface of the lake'),
  ],
  // The Farm: Highland cattle, ducks, garden and hens
  farm: [
    p('highland-cow-in-the-trees', 2000, 1334, 'Sarah Wilson',
      'A Highland cow grazing in the shade of the oak trees'),
    p('highland-cow-in-pasture', 2000, 1125, 'Limestone Fields video',
      'A golden Highland cow standing in the pasture among wildflowers'),
    p('highland-cattle-wildflowers', 2000, 1125, 'Limestone Fields video',
      'Two Highland cattle grazing in the wildflowers'),
    p('highland-cow-face', 2000, 1125, 'Limestone Fields video',
      'Close-up of a Highland cow’s face with long fringe and horns'),
    p('highland-cow-profile-sky', 2000, 1125, 'Limestone Fields video',
      'A black Highland cow in profile against the sky'),
    p('ducks-in-the-grass', 2000, 1125, 'Limestone Fields video',
      'A group of ducks crowding together in the grass'),
    p('ducks-walking', 2000, 1125, 'Limestone Fields video',
      'Ducks walking together across the farm'),
    p('garden-zinnia', 2000, 1125, 'Limestone Fields video',
      'An orange zinnia blooming in the garden'),
    p('garden-rows', 2000, 1125, 'Limestone Fields video',
      'Freshly planted garden rows with drip irrigation lines'),
    p('picking-zinnias', 2000, 1125, 'Limestone Fields video',
      'A guest in a straw hat cutting zinnias in the garden'),
    p('feeding-the-hens', 2000, 1125, 'Limestone Fields video',
      'Feeding the hens and ducks at the coop'),
  ],
  // The Land
  land: [
    p('aerial-property-and-lake', 2000, 1333, 'Richard Casteel',
      'Aerial view of the property, the barn and the garden beds beside Lake Limestone'),
    p('land-wildflower-field', 2000, 1125, 'Limestone Fields video',
      'A lone tree in a field of yellow wildflowers'),
    p('land-oak-in-pasture', 2000, 1125, 'Limestone Fields video',
      'A broad oak tree in the pasture under a blue sky'),
    p('aerial-cabins-around-pond', 2000, 1125, 'Richard Casteel',
      'Aerial view of the row of cabins around the pond'),
    p('aerial-cabins-pond-lake', 2000, 1125, 'Richard Casteel',
      'Aerial view of cabins curving around the pond with the lake behind'),
    p('land-oak-canopy', 2000, 1125, 'Limestone Fields video',
      'Looking up into the canopy of a large oak'),
    p('land-black-eyed-susans', 2000, 1125, 'Limestone Fields video',
      'Black-eyed Susans in the meadow'),
    p('land-black-eyed-susans-field', 2000, 1125, 'Limestone Fields video',
      'Black-eyed Susans with the barn beyond'),
    p('land-wildflower-meadow', 2000, 1125, 'Limestone Fields video',
      'A meadow of yellow wildflowers edged by trees'),
    p('land-walking-in-woods', 2000, 1125, 'Limestone Fields video',
      'Walking the wooded path through the post oaks'),
    p('land-walking-the-meadow', 2000, 1125, 'Limestone Fields video',
      'A guest walking out across the meadow'),
    p('land-profile-against-sky', 2000, 1125, 'Limestone Fields video',
      'Looking out over the property under a big sky'),
    p('land-cedar-branches', 2000, 1125, 'Limestone Fields video',
      'Cedar branches in the afternoon light'),
    p('land-birdhouse', 2000, 1125, 'Limestone Fields video',
      'A carved wooden birdhouse on an oak'),
    p('land-sunset', 2000, 1125, 'Limestone Fields video',
      'Sunset over the tree line'),
  ],
}

/** Look up photos from the Cabins set by file name, in the order given. */
function pick(slugs: string[]): GalleryPhoto[] {
  return slugs.map((slug) => {
    const photo = GALLERY.cabins.find((x) => x.src === `/images/gallery/${slug}.jpg`)
    if (!photo) throw new Error(`Gallery photo not found: ${slug}`)
    return photo
  })
}

/**
 * Photo tours for the two cabin types on /stay. Matched to the cabin photos in
 * Sanity: the Standard Cabin has the smooth vaulted ceiling, French doors to
 * the porch and the desk by the window; the Cabin Suite has the exposed
 * rafters, the bunk beds behind the olive bookshelf and the red porch chairs.
 */
export const STANDARD_CABIN_GALLERY: GalleryPhoto[] = pick([
  'cabin-bed-door-to-porch',
  'cabin-bedroom-french-doors',
  'cabin-desk-flowers-window',
  'cabin-desk-sunlight-guitar',
  'cabin-desk-bookshelf-open-door',
  'cabin-exterior-cedar-tub-deck',
])

export const CABIN_SUITE_GALLERY: GalleryPhoto[] = pick([
  'cabin-bedroom-warm-light',
  'cabin-bedroom-guitar',
  'cabin-bookshelf-table',
  'cabin-suite-bunk-beds',
  'cabin-bedroom-view-to-desk',
  'cabin-bathroom-arched-mirror',
  'cabin-bedroom-boots-rug',
  'cabin-bathroom-shower',
  'cabin-leather-chair-guitar',
  'cabin-bookshelf-detail',
  'cabin-vintage-suitcase',
  'cabin-cowboy-boots',
  'cabin-desk-red-flowers',
  'cabin-bathroom-through-doorway',
  'cabin-guitar-leather-chair',
  'cabin-exterior-red-chairs-lake',
])
