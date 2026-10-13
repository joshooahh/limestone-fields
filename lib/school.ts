/**
 * The Art of Living School — weekend classes at Limestone Fields.
 *
 * Source of truth for the class list: Trisha's "Art of Living School" Google
 * Sheet (teacher, backup, general month). One entry here = one page at
 * /school/[slug]. Dates and prices aren't set yet, so pages collect "first
 * word" sign-ups (/api/school-interest) instead of bookings.
 *
 * Assumptions to confirm with Trisha before these go public: every class is a
 * Fri–Sun, two-night weekend; meals and a cabin are included in one price;
 * groups are capped by cabin count (~12).
 */

const DEFAULT_SCHOOL_NOTIFY_EMAILS = ['josh@limestonefields.com', 'jaclyn@limestonefields.com']

const fromEnv = (process.env.SCHOOL_NOTIFY_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)

/** Everyone who gets each sign-up. Override with SCHOOL_NOTIFY_EMAILS (comma-separated). */
export const SCHOOL_NOTIFY_EMAILS: string[] = fromEnv.length ? fromEnv : DEFAULT_SCHOOL_NOTIFY_EMAILS

/** Reply-to on the guest acknowledgement. */
export const SCHOOL_REPLY_TO = 'josh@limestonefields.com'

export type SchoolPhoto = { src: string; w: number; h: number; alt: string }

export type SchoolTeacher = {
  name: string
  role: string
  bio: string[]
  portrait?: SchoolPhoto
  work: SchoolPhoto[]
  website?: { label: string; url: string }
  instagram?: string
  /** Optional closing line, e.g. a backup teacher. */
  alsoTeaching?: string
}

type Item = [time: string, what: string]

export type SchoolClass = {
  slug: string
  title: string
  /** Month from the sheet, e.g. "December 2026". */
  season: string
  headline: string
  subhead: string
  cardBlurb: string
  heroImage: SchoolPhoto
  cardImage: SchoolPhoto
  expect: string[]
  expectPhotos: [SchoolPhoto, SchoolPhoto]
  why: { eyebrow: string; lead: string; body: string[] }
  bleed: SchoolPhoto
  pillars: { title: string; body: string }[]
  schedulePhoto: SchoolPhoto
  days: { date: string; title: string; items: Item[] }[]
  takeHomeHeadline: string
  takeHome: string[]
  included: string[]
  faqs: [string, string][]
  who: string
  teacher: SchoolTeacher | null
}

/** Property photos already in /public/images. */
const P = {
  fire: { src: '/images/writers-retreat/hero.jpg', w: 2200, h: 1466, alt: 'Evening fire at Limestone Fields' },
  aerial: { src: '/images/writers-retreat/aerial.jpg', w: 2400, h: 1350, alt: 'Aerial view of the cabins around the pond, with Lake Limestone beyond' },
  cabinsDusk: { src: '/images/writers-retreat/cabins-dusk.jpg', w: 2000, h: 1333, alt: 'Cabins at dusk with the windows lit' },
  kayak: { src: '/images/writers-retreat/kayak.jpg', w: 2000, h: 1071, alt: 'A guest kayaking across Lake Limestone under a big sky' },
  ducks: { src: '/images/writers-retreat/ducks.jpg', w: 2000, h: 1031, alt: 'The farm ducks walking through the grass' },
  wildflowers: { src: '/images/writers-retreat/wildflowers.jpg', w: 2000, h: 1031, alt: 'A field of yellow wildflowers at the edge of the woods' },
  barnKitchen: { src: '/images/landing/barn-kitchen.jpg', w: 2000, h: 1333, alt: 'The Commons, the barn kitchen at Limestone Fields' },
  barnExterior: { src: '/images/landing/barn-exterior.jpg', w: 2000, h: 1333, alt: 'The barn at Limestone Fields' },
  barnLounge: { src: '/images/landing/barn-lounge.jpg', w: 2000, h: 1333, alt: 'The lounge inside the barn' },
  grill: { src: '/images/landing/grill.jpg', w: 2000, h: 1031, alt: 'The Santa Maria grill at The Commons' },
  garden: { src: '/images/landing/garden.jpg', w: 2000, h: 1031, alt: 'The kitchen garden at Limestone Fields' },
  breakfast: { src: '/images/landing/breakfast.jpg', w: 2000, h: 1031, alt: 'Breakfast on the table at The Commons' },
  coffee: { src: '/images/landing/coffee.jpg', w: 2000, h: 1031, alt: 'Morning coffee at Limestone Fields' },
  aerialLake: { src: '/images/landing/aerial-lake.jpg', w: 2000, h: 1031, alt: 'Lake Limestone from above' },
  aerialWide: { src: '/images/landing/aerial-wide.jpg', w: 2400, h: 1600, alt: 'Limestone Fields from above, fields and woods running to the lake' },
  lakeTrees: { src: '/images/landing/lake-through-trees.jpg', w: 2000, h: 1333, alt: 'Lake Limestone seen through the trees' },
  woods: { src: '/images/landing/woods.jpg', w: 2000, h: 1031, alt: 'The woods at Limestone Fields' },
  cows: { src: '/images/landing/cows.jpg', w: 2000, h: 1031, alt: 'Highland cattle in the pasture' },
  cabinsRow: { src: '/images/landing/cabins-row.jpg', w: 2000, h: 1031, alt: 'A row of cabins at Limestone Fields' },
  readingNook: { src: '/images/landing/reading-nook.jpg', w: 2000, h: 1031, alt: 'A reading nook inside a cabin' },
  desk: { src: '/images/landing/desk.jpg', w: 2000, h: 1031, alt: 'A writing desk by a cabin window' },
  soakingTub: { src: '/images/landing/soaking-tub.jpg', w: 2000, h: 1031, alt: 'A cedar soaking tub on a cabin deck' },
  swing: { src: '/images/landing/swing.jpg', w: 2000, h: 1031, alt: 'A swing hanging from a tree at Limestone Fields' },
} satisfies Record<string, SchoolPhoto>

/**
 * The shared Fri–Sun rhythm. Each class supplies what happens in its own
 * sessions; pass [time, text] to override a default time.
 */
function weekend(s: {
  fri: string
  satMorning: string | Item
  satAfternoon: string | Item
  satEvening?: Item
  satDinner: string
  sunMorning: string | Item
  sunClose: string
}): SchoolClass['days'] {
  const at = (v: string | Item, time: string): Item => (typeof v === 'string' ? [time, v] : v)
  return [
    {
      date: 'Friday',
      title: 'Arrive',
      items: [
        ['3pm onward', 'Arrive, settle into your cabin, walk the property'],
        ['6:30pm', s.fri],
        ['8pm', 'Fire outside, and an early night if you want one'],
      ],
    },
    {
      date: 'Saturday',
      title: 'Learn',
      items: [
        ['8:30am', 'Breakfast at The Commons: eggs from our hens, real coffee'],
        at(s.satMorning, '9:30am'),
        ['12:30pm', 'Lunch'],
        at(s.satAfternoon, '2–4:30pm'),
        ...(s.satEvening ? [s.satEvening] : []),
        ['6:30pm', s.satDinner],
      ],
    },
    {
      date: 'Sunday',
      title: 'Make it yours',
      items: [
        ['8:30am', 'Breakfast at The Commons'],
        at(s.sunMorning, '9:30am'),
        ['12:30pm', s.sunClose],
        ['2pm', 'Checkout and slow goodbyes'],
      ],
    },
  ]
}

/** Included in every class, after the class-specific lines. */
export const SCHOOL_INCLUDED = [
  'Two nights in a private cabin on Lake Limestone, with a cedar soaking tub and a king bed',
  'Every meal from Friday dinner through Sunday lunch, at The Commons, our barn kitchen',
  'Evenings by the fire, and the lake, the kayaks, and sixteen acres of land all weekend',
  'A small group, so the teacher knows your name by Friday night',
]

/** Asked on every class page, after the class-specific questions. */
export const SCHOOL_FAQS: [string, string][] = [
  [
    'How big is the group?',
    'Small on purpose. Each class is limited by the cabins on the property, around a dozen people, so everyone gets real time with the teacher.',
  ],
  [
    'Can I bring someone?',
    'Yes. Suites sleep two, and a partner or friend can take the class with you. Tick the box when you sign up and we’ll hold a suite for two.',
  ],
  [
    'When will dates and prices be set?',
    'Soon. Everyone on the list hears first, before the class is announced anywhere else, and gets first pick of the cabins.',
  ],
  [
    'What about dietary needs?',
    'Tell us when you sign up. Meals are planned around every dietary need at the table from the start, not adjusted after the fact.',
  ],
  [
    'How do I get there?',
    'Limestone Fields is at 159 LCR 890 in Jewett, Texas, on Lake Limestone, about two hours from Dallas, Austin, and Houston. Arrive Friday from 3pm. The class wraps after lunch on Sunday.',
  ],
]

/** Teacher bios and photos, keyed by class slug. Filled from research; status and image sources in ART_OF_LIVING_SCHOOL.md. */
const S = '/images/school'
const TEACHERS: Partial<Record<string, SchoolTeacher>> = {
  fishing: {
    name: 'Jesse Griffiths',
    role: 'Chef, butcher, and angler · Dai Due, Austin',
    bio: [
      'Jesse Griffiths is a hunter, angler, chef, and butcher, and one of the best-known voices on wild food in Texas. He grew up fishing and camping in Texas State Parks, and in 2006 he started Dai Due as a supper club with a simple aim: to reconsider what “our” food is. Today Dai Due is a restaurant and butcher shop on Manor Road in Austin that sources nearly everything from Texas, and preserves it by curing, pickling, fermenting, and smoking.',
      'In the first Texas MICHELIN Guide, Dai Due earned a Green Star for sustainability and a Bib Gourmand. Jesse has written three cookbooks, Afield, The Hog Book, and The Turkey Book, and all three were nominated for James Beard Awards. The Hog Book won in 2022.',
      'He has been teaching for nearly twenty years through the New School of Traditional Cookery, small hands-on classes in fishing, hunting, butchery, and cooking. The philosophy is the one this weekend is built on: take only what you need, use all of it, and cook it well.',
    ],
    portrait: { src: `${S}/fishing/jesse-griffiths-portrait-kitchen.jpg`, w: 2000, h: 1333, alt: 'Jesse Griffiths at a butcher-block counter in the Dai Due kitchen' },
    work: [
      { src: `${S}/fishing/jesse-griffiths-outdoor-fire.jpg`, w: 2000, h: 2000, alt: 'Jesse Griffiths in a straw hat, cooking over an outdoor stone hearth' },
      { src: `${S}/fishing/jesse-griffiths-wood-fire.jpg`, w: 2000, h: 1333, alt: 'Meat over the wood-fired grill at Dai Due' },
    ],
    website: { label: 'daidue.com', url: 'https://www.daidue.com' },
    instagram: 'daidue',
  },
  'life-drawing': {
    name: 'RF. Alvarez',
    role: 'Painter · Austin',
    bio: [
      'RF. Alvarez is a figurative painter, born in San Antonio and working in Austin. His paintings are dark, candlelit scenes in dry-brushed acrylic on raw linen, with the drama of the Old Masters and the subject matter of Texas: gatherings, domestic life, tenderness, and the myth of the lone cowboy.',
      'He has had solo shows in Los Angeles, London, New York, and Austin, a solo booth at The Armory Show, and work in the collection of the Palm Springs Art Museum. In 2025 he won the Delfina Foundation Artist Residency Prize. Texas Monthly and The New York Times’ T Magazine have both written about him.',
      'He already teaches the thing this weekend is about. His LOVERS series pairs a live model with an evening of drawing for every skill level, and it sells out. At Limestone Fields he brings that same ease to a full weekend: patient teaching, a professional model, and plenty of charcoal.',
    ],
    portrait: { src: `${S}/life-drawing/portrait-studio.jpg`, w: 1290, h: 1936, alt: 'RF. Alvarez in a cowboy hat in front of his paintings' },
    work: [
      { src: `${S}/life-drawing/painting-all-the-little-deeds.jpg`, w: 1500, h: 1128, alt: 'Painting by RF. Alvarez: a man arranging wildflowers by candlelight' },
      { src: `${S}/life-drawing/painting-the-seed-bearer.jpg`, w: 1500, h: 1807, alt: 'Painting by RF. Alvarez: a figure lying in dappled grass' },
    ],
    website: { label: 'rfalvarez.com', url: 'https://www.rfalvarez.com' },
    instagram: 'rf_alvarez',
  },
  foraging: {
    name: 'Stacy Coplin & Eric Knight',
    role: 'Foragers and authors · Local Leaf, Austin',
    bio: [
      'Stacy Coplin and Eric Knight are Local Leaf. Both were born and raised in Austin, and they met in 2011 as nature educators at the Austin Nature & Science Center. They have been teaching people to find food in the Texas landscape ever since.',
      'They wrote the book on it, literally: Foraging Texas, from Falcon Guides, covers 92 wild foods and how to find, identify, and prepare them. They lead seasonal plant walks at the Lady Bird Johnson Wildflower Center and Earth Native Wilderness School, and they survey private land to show owners what is edible on it.',
      'Their wild-harvested Yaupon Matcha, made from North America’s only native caffeinated plant, is sold at Whole Foods across Austin. Expect a weekend of close looking, good stories, and a cup of yaupon tea you picked yourself.',
    ],
    portrait: { src: `${S}/foraging/stacy-coplin-eastside.jpg`, w: 1580, h: 1042, alt: 'Stacy Coplin on a trail with a basket of wild greens' },
    work: [
      { src: `${S}/foraging/eric-knight-plant-walk.jpg`, w: 1500, h: 1000, alt: 'Eric Knight leading a plant walk' },
      { src: `${S}/foraging/leaves-heart-shaped.jpg`, w: 1500, h: 903, alt: 'Three heart-shaped wild leaves on a wooden table' },
    ],
    website: { label: 'local-leaf.com', url: 'https://www.local-leaf.com' },
    instagram: 'localleafatx',
  },
  // Perrine is a charcutière (Belle Vie Farm, Thrall — ~40 mi from Austin), not billed anywhere as a whole-animal butcher; confirm scope with her.
  butchery: {
    name: 'Perrine Noelke',
    role: 'Chef and charcutière · Belle Vie Farm + Kitchen',
    bio: [
      'Perrine Noelke grew up in France and learned to cook there, then spent years cooking on yachts in the Mediterranean. That’s where, in 2007, she met Aubrey, a Texan. In 2014 they started Belle Vie Farm + Kitchen outside Thrall, northeast of Austin, to raise their own animals and cook from them the way her family always had.',
      'Everything Belle Vie makes comes from animals raised on the farm: pâtés and terrines, rillettes, duck prosciutto, smoked hams, and sausage. You’ll find it at Austin farmers markets and on the menus of Austin restaurants.',
      'Perrine brings the French farmhouse tradition to this weekend: nothing wasted, salt and patience doing the work, and a table at the end of it.',
    ],
    portrait: { src: `${S}/butchery/perrine-aubrey-market.jpg`, w: 2000, h: 2000, alt: 'Perrine and Aubrey Noelke at the Belle Vie Farm market stall' },
    work: [
      { src: `${S}/butchery/rillettes-pate.jpg`, w: 821, h: 828, alt: 'Jars of Belle Vie rillettes and pâté' },
      { src: `${S}/butchery/sausage.jpg`, w: 636, h: 609, alt: 'Hands coiling fresh sausage' },
    ],
    website: { label: 'belleviefarm.com', url: 'https://www.belleviefarm.com' },
    instagram: 'labelleviefarm',
    alsoTeaching:
      'Teaching alongside her: Julia Poplawsky, a Culinary Institute of America graduate who butchered at 4505 Meats in San Francisco, helped open Dai Due’s whole-animal butcher shop in Austin, and co-founded the Central Texas Meat Collective, teaching hands-on hog, beef, and chicken butchery.',
  },
  sauces: {
    name: 'Philip Speer',
    role: 'Chef · Comedor, Austin',
    bio: [
      'Philip Speer is one of Austin’s most decorated chefs. He spent about a decade at Uchi and Uchiko, where he was nominated four times for the James Beard Award for Outstanding Pastry Chef and went on to run culinary operations for the group.',
      'In 2019 he opened Comedor downtown. It was Texas Monthly’s best new restaurant of 2020 and is recommended by the MICHELIN Guide. He has since opened Garage Pizza and, this fall, Nobody’s Business, a downtown burger window.',
      'Pastry trained him in precision, and restaurants trained him in speed. He cooks with a pastry chef’s exactness and a line cook’s instincts, which is exactly what a weekend of sauces calls for.',
    ],
    portrait: { src: `${S}/sauces/philip-speer-portrait-seated.jpg`, w: 1334, h: 2000, alt: 'Portrait of chef Philip Speer' },
    work: [
      { src: `${S}/sauces/philip-speer-kitchen-bw.jpg`, w: 2000, h: 1333, alt: 'Philip Speer at a prep counter' },
      { src: `${S}/sauces/comedor-tacos-salsa.jpg`, w: 2000, h: 1333, alt: 'A masa dish with red salsa at Comedor' },
    ],
    website: { label: 'chefphilipspeer.com', url: 'https://www.chefphilipspeer.com' },
    instagram: 'philipspeer',
  },
  'french-pastry': {
    name: 'Aurélien & Tala Decaix',
    role: 'Pastry chefs · Nougatine, Austin',
    bio: [
      'Nougatine is Aurélien and Tala Decaix. Aurélien is a French pastry chef from Angers, in the Loire Valley. Tala is a Texan. They met working at a bakery in Washington, D.C., and brought French pastry home to Austin.',
      'Their counter is inside The Austin Winery on East St. Elmo Road, and you’ll find them at the Barton Creek Farmers Market. They make viennoiserie, canelés, and towering croquembouches, and a tin of French cookies modeled on the one Aurélien’s grandmother kept in Angers. In D.C., they built the croquembouche for Air France’s 90th anniversary at the French Embassy.',
      'For this weekend they bring the patience and the precision, and the particular calm of someone who has folded butter into dough a few thousand times.',
    ],
    portrait: { src: `${S}/french-pastry/founders-tala-aurelien-decaix.jpg`, w: 1602, h: 1834, alt: 'Tala and Aurélien Decaix of Nougatine' },
    work: [
      { src: `${S}/french-pastry/piping-pastries.jpg`, w: 1126, h: 2000, alt: 'Piping cream onto tartlets at Nougatine' },
      { src: `${S}/french-pastry/petits-fours-cookie-tin-open.jpg`, w: 1330, h: 2000, alt: 'An open tin of Nougatine French cookies' },
    ],
    website: { label: 'nougatinebakery.com', url: 'https://www.nougatinebakery.com' },
    instagram: 'nougatinebakeryaustin',
  },
  // Sheet says "Bethany Reid"; the only Austin match found is Bethany Reed (Tomato Peddler). Confirm before publishing.
  'kitchen-gardening': {
    name: 'Bethany Reed',
    role: 'Farmer · Tomato Peddler, Austin',
    bio: [
      'Bethany Reed is an Austin photographer and director who, as she puts it, went down a rabbit hole and came out a farmer. It started with pots of vegetables on small patches of outdoor space in California. In Texas it became Tomato Peddler, a small farm growing Italian and Mediterranean vegetables chosen to stand up to a Texas summer.',
      'Her beds are full of heirloom Italian tomatoes and peppers, a connection to her Italian heritage, and she sells what she grows straight to Austin cooks. She calls the farm “a petition for more brown girls with their hands in the dirt.”',
      'Her approach is the one she learned by doing: start small, grow what you love to eat, and pay attention to what the heat is telling you.',
    ],
    portrait: { src: `${S}/kitchen-gardening/portrait-sunflowers.jpg`, w: 1334, h: 2000, alt: 'Bethany Reed in a field of sunflowers' },
    work: [
      { src: `${S}/kitchen-gardening/greenhouse-tomatoes.jpg`, w: 1500, h: 1998, alt: 'Harvesting tomatoes in a hoop house' },
      { src: `${S}/kitchen-gardening/tomato-seedlings.jpg`, w: 1500, h: 1000, alt: 'Trays of tomato seedlings' },
    ],
    website: { label: 'tomatopeddler.com', url: 'https://www.tomatopeddler.com' },
    instagram: 'thetomatopeddler',
  },
}

const CLASSES: Omit<SchoolClass, 'teacher'>[] = [
  {
    slug: 'fishing',
    title: 'Fishing + Processing',
    season: 'November 2026',
    headline: 'Catch it, clean it, cook it.',
    subhead:
      'A weekend on Lake Limestone learning to fish, and then the part most people skip: cleaning, filleting, and cooking what you caught.',
    cardBlurb: 'Rod in hand on Lake Limestone, then knife in hand: cleaning, filleting, and cooking your catch.',
    heroImage: P.aerialLake,
    cardImage: { src: '/images/school/fishing/jesse-griffiths-outdoor-fire.jpg', w: 2000, h: 2000, alt: 'Jesse Griffiths cooking over an outdoor stone hearth' },
    expect: [
      'Lake Limestone is right there at the edge of the property: nearly fourteen thousand acres of water known for bass, catfish, and crappie. You’ll spend the mornings on it, learning to read the water, rig a line, and land a fish. Then you’ll come back to shore and learn what to do next.',
      'That second half is the heart of the weekend. How to dispatch a fish quickly and humanely, how to scale, gut, and fillet it, what to do with the frames and the heads, and how to cook it so it tastes worth the trouble. By Saturday night, dinner is what came out of the lake that morning.',
    ],
    expectPhotos: [P.kayak, P.lakeTrees],
    why: {
      eyebrow: 'Why fish',
      lead: 'Most of us have never followed a meal from the water to the plate. It changes how you eat.',
      body: [
        'There is a real respect that comes from doing the whole thing yourself. You waste less. You taste more. You understand what a fillet at the store actually cost somebody.',
        'And there is the plain pleasure of a morning on the lake: mist coming off the water, the line going tight, nowhere else to be.',
      ],
    },
    bleed: P.aerialWide,
    pillars: [
      { title: 'Fish', body: 'Rigging, casting, and reading the water. Where fish hold on Lake Limestone and how the weather moves them.' },
      { title: 'Clean', body: 'Humane dispatch, scaling, gutting, and filleting. The knife work that makes it quick and clean.' },
      { title: 'Use it all', body: 'Stock from the frames, crisp skin, the cheeks most people throw away. Nothing wasted.' },
      { title: 'Cook', body: 'Over the fire at The Commons: fried, grilled, and whole. Your catch, your dinner.' },
    ],
    schedulePhoto: P.lakeTrees,
    days: weekend({
      fri: 'Welcome dinner, then gear and knots by the fire',
      satMorning: ['7am', 'Early coffee, then on the water with rods and tackle'],
      satAfternoon: 'At the cleaning table: dispatch, scaling, and filleting the morning’s catch',
      satDinner: 'Fish fry at the long table: what came out of the lake that morning',
      sunMorning: ['7:30am', 'Back on the water, or a second knife session on whole fish'],
      sunClose: 'Closing lunch: fish cooked over wood, and how to keep it up at home',
    }),
    takeHomeHeadline: 'The whole path, from the lake to the plate.',
    takeHome: [
      'Knowing how to fish a Texas lake, and how to clean what you catch',
      'Real knife skills: filleting, skinning, portioning',
      'Recipes for the fish, and for what most people throw away',
      'Fillets from your catch, packed on ice, where the limits allow',
    ],
    included: [
      'Two mornings on Lake Limestone, with rods, tackle, and bait provided',
      'Knife sessions at the cleaning table, with all tools provided',
    ],
    faqs: [
      [
        'Do I need a fishing license?',
        'Yes. Anyone 17 or older fishing public water in Texas needs a Texas fishing license. A one-day or annual license takes a few minutes to buy online from Texas Parks and Wildlife, and we’ll send the link with the dates.',
      ],
      [
        'I’ve never fished.',
        'Good. Most people who come haven’t, or haven’t since they were kids. You’ll be taught from the knot up.',
      ],
      [
        'Is the cleaning part hard to watch?',
        'Killing and cleaning a fish is part of the class, and we won’t pretend otherwise. It’s done quickly and with respect, and nobody is asked to do anything they don’t want to. Plenty of people find it the most meaningful part of the weekend.',
      ],
    ],
    who: 'A small group, any experience. Bring clothes that can get wet, and a hat.',
  },
  {
    slug: 'antiquing',
    title: 'Antiquing + Interior Curation',
    season: 'November 2026',
    headline: 'Find the good stuff. Know where it goes.',
    subhead:
      'A weekend learning to hunt antiques the way dealers do, and then to put a room together so it feels like it has always been that way.',
    cardBlurb: 'How to hunt antiques like a dealer, and how to build a room that feels collected, not bought.',
    heroImage: P.barnLounge,
    cardImage: P.readingNook,
    expect: [
      'This weekend is about eye. You’ll learn how to walk into an antique shop or a country flea market and see what’s actually there: the good wood under the bad paint, the maker’s mark, the piece that’s priced wrong in your favor. How to tell old from made-to-look-old. How to haggle without being a jerk about it.',
      'Then we put it to work. Scale, texture, layering, and how a single old piece can change a room, using the cabins and the barn as the classroom. Expect a day out at the shops and markets nearby, where the good things still turn up, and a long dinner comparing what everyone found.',
    ],
    expectPhotos: [P.barnLounge, P.readingNook],
    why: {
      eyebrow: 'Why antiques',
      lead: 'Old things were made to last, and they carry a story you can’t order online.',
      body: [
        'A room built from things you found yourself feels different. It’s yours in a way a catalog never is. It also tends to cost less, hold its value, and keep good furniture out of the landfill.',
        'The trick is learning to see. That takes time next to someone who has done it for years, and a weekend is a very good start.',
      ],
    },
    bleed: P.cabinsDusk,
    pillars: [
      { title: 'See', body: 'What to look for: construction, joinery, patina, marks. Old versus old-looking, and why it matters.' },
      { title: 'Hunt', body: 'A day out at the shops and markets. Where to go, when to go, what to ask, and how to make an offer.' },
      { title: 'Place', body: 'Scale, texture, color, and layering. How to mix periods and give the one great piece room to breathe.' },
      { title: 'Keep', body: 'Basic care: cleaning, waxing, simple repairs, and knowing what to leave alone.' },
    ],
    schedulePhoto: P.desk,
    days: weekend({
      fri: 'Welcome dinner, and a first lesson in looking',
      satMorning: ['8:30am', 'Out to the shops and markets with the teacher'],
      satAfternoon: ['All day', 'On the road: hunting, haggling, and a lunch stop along the way'],
      satDinner: 'Dinner at the long table, with the day’s finds on display',
      sunMorning: 'Putting a room together, using the cabins and The Commons',
      sunClose: 'Closing lunch, and a look at your own rooms (bring photos)',
    }),
    takeHomeHeadline: 'An eye for it, and whatever fits in the car.',
    takeHome: [
      'A way of seeing that changes every shop and flea market you walk into',
      'Know-how on age, construction, value, and fair offers',
      'Principles for arranging a room that you can use at home',
      'Your finds, and advice on where they belong',
    ],
    included: [
      'A guided day at antique shops and markets nearby',
      'A session on arranging a room, and time with photos of your own space',
    ],
    faqs: [
      ['Do I have to buy anything?', 'Not at all. Looking is the lesson. But you may want to leave a little room in the car.'],
      ['Should I bring photos of my house?', 'Yes, please. Sunday includes time to talk about your own rooms, and photos make that real.'],
      [
        'How do I get large pieces home?',
        'We’ll talk through shipping and delivery on the day. Many dealers will hold a piece or help arrange transport.',
      ],
    ],
    who: 'A small group who love old things, from first-time hunters to people with a garage full of projects.',
  },
  {
    slug: 'pasta',
    title: 'Pasta Making',
    season: 'December 2026',
    headline: 'Flour, eggs, and your two hands.',
    subhead:
      'A weekend learning fresh pasta from scratch in our barn kitchen: the well, the knead, the roll, the shapes. Then dinner, which you made.',
    cardBlurb: 'Fresh pasta from flour and eggs, rolled and shaped by hand, then eaten at the long table.',
    heroImage: P.barnKitchen,
    cardImage: P.barnKitchen,
    expect: [
      'You’ll start where every pasta cook starts: a mound of flour, a well of eggs, and a fork. Over the weekend you’ll learn to feel when a dough is right, roll it thin by pin and by machine, and cut and fold the shapes that go with each sauce. Ribbons, filled pasta, the small shapes pinched one at a time.',
      'The classroom is The Commons, our barn kitchen, with a long wooden table dusted in semolina and the farm outside the windows. The eggs come from our hens. Whatever you make on Saturday is Saturday’s dinner. Nobody leaves without flour on their shirt.',
    ],
    expectPhotos: [P.barnKitchen, P.breakfast],
    why: {
      eyebrow: 'Why pasta',
      lead: 'Few things taste better for how little they ask. Flour, eggs, salt, and time.',
      body: [
        'Fresh pasta looks like magic from the outside and turns out to be practice. The dough tells you what it needs. Once your hands learn to listen, you have it for good.',
        'It is also a very good reason to gather people. A table of friends, a pile of tagliatelle, a sauce that has been going since the afternoon. That’s the whole idea of this school, in one dish.',
      ],
    },
    bleed: P.fire,
    pillars: [
      { title: 'Dough', body: 'The well, the knead, the rest, the roll. How hydration changes a dough, why semolina, and when to reach for the pin.' },
      { title: 'Shape', body: 'Ribbons cut by hand, filled pasta like ravioli and tortellini, and the little shapes you pinch while you talk.' },
      { title: 'Sauce', body: 'The sauces that belong with each shape: butter and sage, a slow ragù, something bright from the garden.' },
      { title: 'Eat', body: 'Every batch goes to the table. Saturday dinner is pasta you made, with the people who made it with you.' },
    ],
    schedulePhoto: P.grill,
    days: weekend({
      fri: 'Welcome dinner at The Commons, and a first look at the flour',
      satMorning: 'Session one: the dough. Mixing, kneading, and rolling by pin',
      satAfternoon: 'Session two: ribbons and filled pasta',
      satDinner: 'Dinner of the day’s pasta at the long table',
      sunMorning: 'Session three: hand-shaped pasta, and the sauces to match',
      sunClose: 'Closing lunch, recipes, and your own pasta to take home',
    }),
    takeHomeHeadline: 'A skill for the rest of your life, and dinner tonight.',
    takeHome: [
      'The confidence to make fresh pasta at home without a recipe',
      'Recipes for each dough, shape, and sauce from the weekend',
      'A batch of your own pasta, packed to travel',
      'A few friends who know exactly how you roll',
    ],
    included: ['Three hands-on pasta sessions, with all ingredients, tools, and aprons provided'],
    faqs: [
      [
        'Do I need any cooking experience?',
        'None. If you can crack an egg, you can do this. The class is built for beginners, and people who already cook will still leave with new shapes and better dough.',
      ],
      [
        'Do I need a pasta machine at home?',
        'No. We teach rolling by hand first, so you don’t need one. We’ll use machines too, and talk about which are worth buying if you want one.',
      ],
    ],
    who: 'A small group of home cooks, any level. Come hungry.',
  },
  {
    slug: 'butchery',
    title: 'Butchery + Preservation',
    season: 'December 2026',
    headline: 'The whole animal, and how to keep it.',
    subhead:
      'A weekend learning to break down meat by hand and to preserve it the old ways: salt, cure, sausage, and smoke.',
    cardBlurb: 'Break down whole cuts by hand, then learn to cure, salt, stuff, and smoke what you’ve cut.',
    heroImage: P.grill,
    cardImage: { src: '/images/school/butchery/rillettes-pate.jpg', w: 821, h: 828, alt: 'Jars of Belle Vie rillettes and pâté' },
    expect: [
      'Before refrigerators, every farm knew how to take a whole animal and make it last through the season. That knowledge is mostly gone from home kitchens. This weekend brings some of it back.',
      'You’ll work at the block in The Commons, learning the anatomy, the primal cuts, and how to break them into the pieces you’d buy at a good shop. Then comes preservation, the way French farmhouses have always done it: pâté and rillettes, sausage by hand, salt and time, and a cure you start here and finish at home. Dinners are cooked from the day’s work, over wood.',
    ],
    expectPhotos: [P.grill, P.cows],
    why: {
      eyebrow: 'Why butchery',
      lead: 'If you’re going to eat meat, it’s worth knowing where each cut comes from, and wasting none of it.',
      body: [
        'Butchery teaches respect. When you’ve taken a shoulder apart yourself, you cook it differently. You understand why the cheap cuts are often the best ones, and what a good rancher’s work is worth.',
        'Preservation is the other half: the old, patient methods that turned one animal into a winter’s worth of food. Salt, smoke, and time still do what they always did.',
      ],
    },
    bleed: P.barnExterior,
    pillars: [
      { title: 'Learn the animal', body: 'Anatomy and the primal cuts. How muscle works, where tenderness comes from, and what each part is good for.' },
      { title: 'Cut', body: 'Knife work at the block: seaming, trimming, tying, portioning. How to buy a whole or half animal and use all of it.' },
      { title: 'Preserve', body: 'Rillettes, pâté, and terrine. Dry curing and brining. Fresh sausage stuffed and tied by hand. A cure to take home and finish.' },
      { title: 'Cook', body: 'Dinners from the day’s cuts, over the Santa Maria grill and in the woodfired oven.' },
    ],
    schedulePhoto: P.barnKitchen,
    days: weekend({
      fri: 'Welcome dinner, and a walk through the animal with your teacher',
      satMorning: 'Session one: primals and breakdown at the block',
      satAfternoon: 'Session two: sausage by hand, from grind to link',
      satDinner: 'Dinner from the day’s work, cooked over wood',
      sunMorning: 'Session three: rillettes, pâté, and the cure',
      sunClose: 'Closing lunch, and your cure packed to finish at home',
    }),
    takeHomeHeadline: 'A butcher’s knowledge, for a home kitchen.',
    takeHome: [
      'The confidence to buy a whole or half animal and use every part',
      'Knife skills for breaking down and portioning meat',
      'Recipes for sausage, rillettes, pâté, and cures',
      'Sausage and a cure of your own, packed to travel',
    ],
    included: ['Three sessions at the butcher’s block, with meat from Texas ranches, tools, and aprons provided'],
    faqs: [
      [
        'I’ve never handled much raw meat.',
        'That’s who this is for. You’ll be taught step by step, with good sharp knives and a teacher at your elbow.',
      ],
      [
        'What animal do we work with?',
        'Mostly pork, the classic animal for preservation. The exact cuts are set with the teacher closer to the date, and all of it comes from Texas ranches that raise animals well.',
      ],
    ],
    who: 'A small group of home cooks, hunters, and the curious. No experience needed.',
  },
  {
    slug: 'plein-air-painting',
    title: 'Painting en Plein Air',
    season: 'December 2026',
    headline: 'Paint what’s in front of you.',
    subhead:
      'A weekend painting outdoors across sixteen acres of Texas farmland: the lake in the morning, the pond at noon, the barn in the last light.',
    cardBlurb: 'Easels in the grass. The lake, the pond, the barn at dusk, and the slow work of painting from life.',
    heroImage: P.aerial,
    cardImage: P.ducks,
    expect: [
      'Plein air just means painting in the open air, from life, in front of the thing itself. It’s how the Impressionists worked, and it’s still the best way to learn to see light. You’ll set up your easel wherever the land pulls you: the pond with the ducks, the tree line, the edge of Lake Limestone.',
      'The teaching is gentle and practical. How to simplify a landscape, mix color outside, and work fast enough to catch the light before it moves. Beginners are welcome. So are people who have painted for years and want a weekend with nothing else to do.',
    ],
    expectPhotos: [P.ducks, P.swing],
    why: {
      eyebrow: 'Why paint outside',
      lead: 'Painting outdoors is mostly about looking, and most of us have forgotten how.',
      body: [
        'When you paint a place for three hours, you notice what you would have walked past: the color a shadow actually is, the way the water changes when a cloud crosses it.',
        'In December the light here stays low and warm all day. It’s a very good season to learn.',
      ],
    },
    bleed: P.lakeTrees,
    pillars: [
      { title: 'See', body: 'Values, shapes, and simplifying. How to find the painting inside a big landscape.' },
      { title: 'Mix', body: 'Color mixing outdoors, and how light shifts color from morning to evening.' },
      { title: 'Paint', body: 'Short studies and one longer piece. Working fast, fixing less, trusting the first marks.' },
      { title: 'Share', body: 'An easy critique by the fire, and a small show of everyone’s work on the last day.' },
    ],
    schedulePhoto: P.aerialLake,
    days: weekend({
      fri: 'Welcome dinner, and a walk to scout painting spots',
      satMorning: 'Session one: quick studies at the pond in morning light',
      satAfternoon: 'Session two: a longer painting at the spot of your choice',
      satEvening: ['5pm', 'Optional: paint the sunset over the lake'],
      satDinner: 'Dinner at the long table',
      sunMorning: 'Session three: the lake, and pulling it all together',
      sunClose: 'Closing lunch, and a small show of the weekend’s work',
    }),
    takeHomeHeadline: 'A few paintings, and a new way of seeing.',
    takeHome: [
      'Several finished studies and one longer painting',
      'A simple, portable way to paint outside anywhere',
      'Practical color and composition you can keep building on',
      'A plein air kit list, so you can keep going at home',
    ],
    included: [
      'Three painting sessions with instruction, plus open painting time',
      'Easels and shared supplies on site; bring your own paints if you have favorites',
    ],
    faqs: [
      [
        'What medium will we use?',
        'We’ll confirm with the teacher: likely oils or acrylics, with watercolor welcome. The supply list goes out with the dates.',
      ],
      ['I haven’t painted since school.', 'Perfect. The weekend is built for beginners, and people who already paint get plenty out of it too.'],
      ['What if the weather turns?', 'The Commons has room to paint indoors with a view, and December here is usually mild.'],
    ],
    who: 'A small group, any level, from first brushstroke to working painters.',
  },
  {
    slug: 'sauces',
    title: 'Sauces + Cooking Techniques',
    season: 'January 2027',
    headline: 'The part of cooking that makes the rest make sense.',
    subhead:
      'A weekend in the barn kitchen learning the sauces and techniques professional cooks lean on: stocks, emulsions, reductions, and how to taste.',
    cardBlurb: 'Stocks, emulsions, pan sauces, and the techniques chefs lean on every night, taught at the stove.',
    heroImage: P.barnKitchen,
    cardImage: { src: '/images/school/sauces/comedor-tacos-salsa.jpg', w: 2000, h: 1333, alt: 'A masa dish with red salsa at Comedor' },
    expect: [
      'Great cooks don’t memorize recipes. They know a handful of techniques so well that they can cook almost anything. Sauces are where that shows most. Get the sauce right and a simple piece of meat or a plate of vegetables turns into dinner.',
      'This is a working kitchen class. You’ll make stock from scratch, build emulsions like beurre blanc and hollandaise, learn pan sauces and reductions, and practice the fundamentals underneath them: heat, knife work, seasoning, tasting as you go. Every session ends at the table.',
    ],
    expectPhotos: [P.barnKitchen, P.grill],
    why: {
      eyebrow: 'Why sauces',
      lead: 'Sauce is where a cook’s understanding shows. It’s also where most home cooks get nervous.',
      body: [
        'Once you understand why an emulsion holds or breaks, why a reduction thickens, why a little acid wakes up a plate, you stop following recipes and start cooking.',
        'That’s what a weekend next to a professional is for: the small corrections that take years to figure out alone.',
      ],
    },
    bleed: P.fire,
    pillars: [
      { title: 'Stock', body: 'The foundation. Chicken, beef, and vegetable stocks, and how to use them all week.' },
      { title: 'Emulsify', body: 'Butter sauces, mayonnaise, hollandaise, vinaigrettes. Why they hold, why they break, and how to save them.' },
      { title: 'Reduce', body: 'Pan sauces, glazes, and reductions. Fond, deglazing, and finishing with butter.' },
      { title: 'Taste', body: 'Salt, acid, fat, heat. Learning to taste and adjust the way a line cook does.' },
    ],
    schedulePhoto: P.breakfast,
    days: weekend({
      fri: 'Welcome dinner, and a first lesson: tasting',
      satMorning: 'Session one: stocks, and the fundamentals of heat and knife',
      satAfternoon: 'Session two: emulsions and butter sauces',
      satDinner: 'Dinner built on the day’s sauces',
      sunMorning: 'Session three: pan sauces and reductions',
      sunClose: 'Closing lunch you cook together, and recipes to take home',
    }),
    takeHomeHeadline: 'Techniques that make every recipe easier.',
    takeHome: [
      'A set of classic sauces you can make without looking',
      'The fundamentals under them: heat, knife, seasoning, tasting',
      'Written recipes and notes from the weekend',
      'Stock from the weekend, packed to take home',
    ],
    included: ['Three hands-on kitchen sessions, with all ingredients and tools provided'],
    faqs: [
      [
        'Is this for serious cooks or beginners?',
        'Both. Beginners get a solid foundation. People who already cook well get the professional details that make things click.',
      ],
      ['Will we use special equipment?', 'No. Everything is done with the pans and tools you’d have at home, so it carries over.'],
    ],
    who: 'A small group of home cooks, from nervous to confident.',
  },
  {
    slug: 'french-pastry',
    title: 'French Pastry',
    season: 'January 2027',
    headline: 'Butter, flour, patience.',
    subhead:
      'A weekend learning French pastry in the barn kitchen: laminated dough, tarts, choux, and the quiet discipline that makes them work.',
    cardBlurb: 'Laminated dough, tarts, and choux: the foundations of French pastry, one careful fold at a time.',
    heroImage: P.coffee,
    cardImage: { src: '/images/school/french-pastry/piping-pastries.jpg', w: 1126, h: 2000, alt: 'Piping cream onto tartlets at Nougatine' },
    expect: [
      'French pastry has a reputation for being difficult. It’s really a matter of a few techniques, done with care, at the right temperature. This weekend teaches those techniques by hand.',
      'You’ll laminate dough for croissants, make a proper pâte sucrée and fill a tart, pipe choux, and learn the creams that go inside. Pastry needs rests, so the weekend has natural pauses built in: a walk, a soak, a coffee on the porch while the butter chills. Sunday breakfast is the croissants you folded.',
    ],
    expectPhotos: [P.barnKitchen, P.coffee],
    why: {
      eyebrow: 'Why pastry',
      lead: 'Pastry is a lesson in patience that pays you back in croissants.',
      body: [
        'There is no rushing laminated dough. The butter has to stay cold, the dough has to rest, and the folds happen in their own time. Plenty of people find that slowness is the best part.',
        'And there are few better things to carry home than knowing how to make a real croissant on a Sunday morning.',
      ],
    },
    bleed: P.cabinsDusk,
    pillars: [
      { title: 'Laminate', body: 'Croissant and puff dough by hand. The butter block, the folds and turns, and why temperature is everything.' },
      { title: 'Tart', body: 'Pâte sucrée, blind baking, and fillings from pastry cream to winter citrus.' },
      { title: 'Choux', body: 'Pâte à choux, piped and baked, for éclairs and cream puffs.' },
      { title: 'Bake', body: 'Shaping, proofing, and baking, and the particular pleasure of a breakfast you made.' },
    ],
    schedulePhoto: P.breakfast,
    days: weekend({
      fri: 'Welcome dinner, and the first dough goes in the fridge',
      satMorning: 'Session one: lamination, from butter block to first folds',
      satAfternoon: 'Session two: tarts and pastry cream, while the dough rests',
      satDinner: 'Dinner at the long table, with a dessert you made',
      sunMorning: ['8am', 'Shape and bake croissants, then breakfast from the oven. Choux to follow'],
      sunClose: 'Closing lunch, and a box of pastry for the drive home',
    }),
    takeHomeHeadline: 'The foundations of French pastry, in your hands.',
    takeHome: [
      'Croissant and puff dough technique you can repeat at home',
      'A tart and a choux recipe you’ll use for years',
      'Notes on timing and temperature from a professional',
      'A box of your pastry for the drive home',
    ],
    included: ['Three pastry sessions, with all ingredients, tools, and aprons provided'],
    faqs: [
      [
        'Do I need baking experience?',
        'No. Careful beginners do very well at pastry. Experienced bakers still pick up professional technique.',
      ],
      ['Can I make croissants without special equipment?', 'Yes. We laminate by hand with a rolling pin, exactly as you would at home.'],
    ],
    who: 'A small group of home bakers, any level. Patience helps more than experience.',
  },
  {
    slug: 'life-drawing',
    title: 'Life Drawing',
    season: 'February 2027',
    headline: 'Learn to see by drawing from life.',
    subhead:
      'A weekend of figure drawing with a working artist: gesture, proportion, and the long, quiet attention that drawing asks for.',
    cardBlurb: 'Figure drawing with a working artist, from quick gesture sketches to long poses, in the barn by the fire.',
    heroImage: P.barnLounge,
    cardImage: { src: '/images/school/life-drawing/painting-all-the-little-deeds.jpg', w: 1500, h: 1128, alt: 'Painting by RF. Alvarez: a man arranging wildflowers by candlelight' },
    expect: [
      'Life drawing is the oldest discipline in art school: a model, a pencil, and time. It’s how artists have learned to see for centuries, and it works just as well for people who have never called themselves artists.',
      'You’ll work from a professional model in the barn, starting with quick gesture drawings to loosen up and moving to longer poses. The teaching covers proportion, line, weight, light, and shadow. There’s time to draw the land too, and evenings by the fire looking through the day’s pages.',
    ],
    expectPhotos: [P.barnLounge, P.readingNook],
    why: {
      eyebrow: 'Why draw',
      lead: 'Drawing is a way of paying attention. The drawing is almost a side effect.',
      body: [
        'When you draw a person for twenty minutes, you see them the way you almost never see anyone: the angle of a shoulder, the weight on one foot, the way light falls across a face.',
        'It is also a very good antidote to screens. Paper, charcoal, and a long quiet room do something to the mind.',
      ],
    },
    bleed: P.cabinsDusk,
    pillars: [
      { title: 'Gesture', body: 'Quick poses, one to five minutes, to find movement and life before detail.' },
      { title: 'Proportion', body: 'Measuring, sighting, and building the figure so it holds together.' },
      { title: 'Light', body: 'Value, form, and shadow. Turning a line drawing into something with weight.' },
      { title: 'Practice', body: 'Long poses, and a simple practice to take home so it doesn’t end on Sunday.' },
    ],
    schedulePhoto: P.desk,
    days: weekend({
      fri: 'Welcome dinner, and warm-up sketches by the fire',
      satMorning: 'Session one: gesture and movement with the model',
      satAfternoon: 'Session two: proportion and longer poses',
      satDinner: 'Dinner at the long table',
      sunMorning: 'Session three: light, shadow, and one long pose',
      sunClose: 'Closing lunch, and a look through everyone’s work',
    }),
    takeHomeHeadline: 'A full sketchbook, and eyes that see differently.',
    takeHome: [
      'A sketchbook of drawings from the weekend',
      'A foundation in gesture, proportion, and light',
      'A daily drawing practice you can keep',
      'Guidance from a working artist on where to go next',
    ],
    included: ['Three drawing sessions with a professional model', 'Paper, charcoal, and pencils provided'],
    faqs: [
      [
        'Is there nudity?',
        'Life drawing traditionally uses a nude model, and this class will. It’s handled with the professionalism of any art school studio. If that gives you pause, write to us and we’ll talk it through.',
      ],
      ['I can’t draw.', 'Almost nobody thinks they can at first. Drawing is a skill, not a talent, and this is where you learn it.'],
    ],
    who: 'Adults 18 and up, any level. A small group, so everyone gets time with the teacher.',
  },
  {
    slug: 'kitchen-gardening',
    title: 'Kitchen Gardening',
    season: 'April 2027',
    headline: 'Grow what you cook.',
    subhead:
      'A spring weekend in the garden at Limestone Fields, learning to plan, plant, and tend a kitchen garden that feeds you.',
    cardBlurb: 'Soil, seed, and season: plan and plant a kitchen garden that actually feeds you, Texas heat and all.',
    heroImage: P.garden,
    cardImage: { src: '/images/school/kitchen-gardening/tomato-seedlings.jpg', w: 1500, h: 1000, alt: 'Trays of tomato seedlings' },
    expect: [
      'A kitchen garden is a garden you eat from: herbs by the door, greens you cut for dinner, tomatoes you get to before the birds do. Growing one in Texas takes specific know-how, because the heat, the soil, and the seasons don’t follow the books written somewhere else.',
      'You’ll spend the weekend in our garden with your hands in the dirt: building soil, starting seeds, transplanting, and planning a garden sized for your own place, from a balcony to a backyard. Meals come from the garden and the farm, and you go home with plants to start your own.',
    ],
    expectPhotos: [P.garden, P.breakfast],
    why: {
      eyebrow: 'Why grow food',
      lead: 'Nothing tastes like something you grew. Nothing teaches patience quite like it, either.',
      body: [
        'A garden gets you outside every day and ties you to the season in a way a grocery store never will. You start noticing rain, heat, and the length of the days.',
        'In Central Texas, spring is the moment. Get it right in April and you’re eating from the garden well into summer.',
      ],
    },
    bleed: P.wildflowers,
    pillars: [
      { title: 'Soil', body: 'Building healthy soil: compost, amendments, raised beds, and what Texas clay and sand need.' },
      { title: 'Plan', body: 'What grows here and when. A planting calendar and a plan sized to your space.' },
      { title: 'Plant', body: 'Starting seeds, transplanting, watering, and mulching to get through the heat.' },
      { title: 'Harvest', body: 'When and how to pick, and cooking straight from the garden.' },
    ],
    schedulePhoto: P.cows,
    days: weekend({
      fri: 'Welcome dinner from the garden, and a first walk through the beds',
      satMorning: 'Session one: soil, beds, and compost',
      satAfternoon: 'Session two: seeds, transplants, and planting a bed together',
      satDinner: 'Dinner from the garden and the farm',
      sunMorning: 'Session three: planning your own garden, with a planting calendar',
      sunClose: 'Closing lunch, and seedlings to take home',
    }),
    takeHomeHeadline: 'A plan for your garden, and plants to start it.',
    takeHome: [
      'A kitchen garden plan sized to your own space',
      'A Central Texas planting calendar',
      'Seedlings and seeds to take home',
      'Know-how on soil, water, and pests that works in Texas heat',
    ],
    included: ['Three sessions in the garden, with tools, seeds, and seedlings provided'],
    faqs: [
      ['I only have a small yard, or a patio.', 'Good. Part of Sunday is planning for your actual space, and containers count.'],
      ['I’ve killed every plant I’ve owned.', 'Most people have. It’s usually water or soil, and both are very fixable.'],
    ],
    who: 'A small group of beginning and returning gardeners. Bring clothes you can kneel in.',
  },
  {
    slug: 'foraging',
    title: 'Foraging + Wild Crafting',
    season: 'April 2027',
    headline: 'The land is already feeding you.',
    subhead:
      'A spring weekend walking the fields and woods of Limestone Fields, learning to identify, gather, and use the wild plants around us.',
    cardBlurb: 'Walk the fields and woods to find what’s wild and useful, then turn it into dinner, tea, and salves.',
    heroImage: P.woods,
    cardImage: { src: '/images/school/foraging/stacy-coplin-eastside.jpg', w: 1580, h: 1042, alt: 'Stacy Coplin of Local Leaf with a basket of wild greens' },
    expect: [
      'Walk across a Texas pasture in April and you’re walking over food and medicine: greens, flowers, herbs, and roots that people used for generations before anyone sold them in a store. Most of us can’t name a single one.',
      'This weekend changes that. You’ll walk the property with an experienced forager, learning to identify plants safely, harvest them responsibly, and use them: in the kitchen, in teas and infusions, in simple salves. Dinner includes what we gathered.',
    ],
    expectPhotos: [P.woods, P.wildflowers],
    why: {
      eyebrow: 'Why forage',
      lead: 'Once you learn a few plants, you can’t unsee them. Every walk becomes a different walk.',
      body: [
        'Foraging is the oldest kind of knowledge there is: knowing a place well enough to feed yourself from it. It ties you to the land in a way that just looking never does.',
        'It also teaches care. Take a little, leave the rest, know exactly what you’re picking. Good rules for more than plants.',
      ],
    },
    bleed: P.aerialWide,
    pillars: [
      { title: 'Identify', body: 'Safe identification: key features, look-alikes, and the handful of plants to learn first.' },
      { title: 'Gather', body: 'Harvesting with care: how much to take, when, and how to leave a patch healthier than you found it.' },
      { title: 'Make', body: 'Wild greens and flowers in the kitchen, plus teas, infused oils, and a simple salve.' },
      { title: 'Belong', body: 'Knowing the plants of one place well, and how to keep learning wherever you live.' },
    ],
    schedulePhoto: P.wildflowers,
    days: weekend({
      fri: 'Welcome dinner, with a few wild things on the plate',
      satMorning: 'Session one: a slow walk through the fields and woods, learning to identify',
      satAfternoon: 'Session two: gathering, then turning it into teas, oils, and salves',
      satDinner: 'Dinner that includes the day’s foraging',
      sunMorning: 'Session three: a second walk, finding plants on your own with the teacher close by',
      sunClose: 'Closing lunch, and your own salve and tea blend to take home',
    }),
    takeHomeHeadline: 'A dozen plants you’ll know for life.',
    takeHome: [
      'The ability to identify common edible and useful wild plants of Central Texas',
      'Rules for safe, responsible harvesting',
      'A salve and a tea blend you made',
      'Recipes for cooking with wild greens and flowers',
    ],
    included: ['Three sessions in the field and at the worktable, with all tools and materials provided'],
    faqs: [
      [
        'Is foraging safe?',
        'With good teaching, yes. We focus on plants that are easy to identify with confidence, cover the dangerous look-alikes, and nobody eats anything the teacher hasn’t confirmed.',
      ],
      [
        'How much walking is there?',
        'Gentle walking over uneven ground, a few hours spread through the day. Tell us about any mobility concerns and we’ll plan around them.',
      ],
    ],
    who: 'A small group of the curious, any level. Bring sturdy shoes and long pants.',
  },
  {
    slug: 'flowers',
    title: 'Flower Growing + Arranging',
    season: 'May 2027',
    headline: 'Grow the flowers. Then arrange them.',
    subhead:
      'A May weekend in the cutting garden, learning to grow flowers for the vase and arrange them the way a florist does.',
    cardBlurb: 'From seed to vase: grow a cutting garden, then learn to arrange flowers the way a florist does.',
    heroImage: P.wildflowers,
    cardImage: P.wildflowers,
    expect: [
      'May is when Texas flowers show off. It’s the right time to learn the whole cycle: how to grow flowers for cutting, when to harvest, how to condition stems so they last, and how to put them in a vase so they look picked on purpose.',
      'You’ll spend time in the garden and the fields gathering flowers and foliage, then work at the long table in The Commons with a florist’s tools. Expect a few arrangements over the weekend, from a jar for the kitchen to something larger for the dinner table.',
    ],
    expectPhotos: [P.wildflowers, P.garden],
    why: {
      eyebrow: 'Why flowers',
      lead: 'A few stems in a jar can change a whole room. Growing them yourself changes more than that.',
      body: [
        'Flowers grown close to home simply look and smell better than ones flown in from far away. A cutting garden, even a small one, gives you that all season.',
        'And arranging is a quiet, absorbing kind of work. Hands busy, mind still.',
      ],
    },
    bleed: P.aerial,
    pillars: [
      { title: 'Grow', body: 'What to plant for cutting in Texas, when, and how to keep it blooming.' },
      { title: 'Harvest', body: 'When and how to cut, how to condition, and how to make flowers last a week or more.' },
      { title: 'Arrange', body: 'Structure, color, movement, and the mechanics florists use to hold it all together.' },
      { title: 'Share', body: 'Arrangements for the table and to take home, and ideas for giving them away.' },
    ],
    schedulePhoto: P.garden,
    days: weekend({
      fri: 'Welcome dinner at a table of garden flowers',
      satMorning: 'Session one: the cutting garden, planning and planting',
      satAfternoon: 'Session two: harvesting and conditioning, then a first arrangement',
      satDinner: 'Dinner at a table you arranged together',
      sunMorning: 'Session three: a larger arrangement for your own table',
      sunClose: 'Closing lunch, and your flowers wrapped for the drive home',
    }),
    takeHomeHeadline: 'Armfuls of flowers, and how to grow your own.',
    takeHome: [
      'Know-how to plan and grow a cutting garden in Texas',
      'Harvesting and conditioning techniques that make flowers last',
      'Florist’s arranging techniques you can use every week',
      'Your arrangements, wrapped to travel',
    ],
    included: ['Three sessions in the garden and at the arranging table', 'All flowers, tools, and vessels provided'],
    faqs: [['Do I need a big garden?', 'No. A few beds or even pots can keep a vase full. We’ll help you plan for your space.']],
    who: 'A small group, any level. A good one for friends, partners, and mothers and daughters.',
  },
]

export const SCHOOL_CLASSES: SchoolClass[] = CLASSES.map((c) => ({ ...c, teacher: TEACHERS[c.slug] ?? null }))

export function getSchoolClass(slug: string): SchoolClass | undefined {
  return SCHOOL_CLASSES.find((c) => c.slug === slug)
}
