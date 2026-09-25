// Location challenge cards.
//
// Every card is tied to the destination where it can be drawn — WHERE you go
// decides WHAT you experience. Physical equivalent: one small deck per
// destination, sorted by Local Cred category and difficulty.
//
// verification:
//   'web-checked'        — checked against the listed source on 2026-09-25
//   'needs-verification' — believed accurate; confirm against the source before print
//   'judgment'           — etiquette/situational card; no single factual answer.
//                          The brand owner should review the tone and the “best” answer.
//
// correctAnswer is the index into choices.

const NHA = { label: 'Nantucket Historical Association', url: 'https://nha.org' };
const NHA_FIRE = {
  label: 'NHA — The Great Fire of 1846',
  url: 'https://nha.org/whats-on/public-programs/the-great-fire-of-1846/',
};
const USCG_BRANT = {
  label: 'U.S. Coast Guard History — Brant Point Lighthouse',
  url: 'https://www.history.uscg.mil/Browse-by-Topic/Assets/Land/All/Article/1900808/brant-point-lighthouse/',
};
const SANKATY = {
  label: 'NHA digital exhibit — Sankaty Head Light, 1849/50; New England Lighthouses: Sankaty history',
  url: 'https://www.newenglandlighthouses.net/sankaty-head-light-history.html',
};
const MILESTONE = {
  label: 'Nantucket Preservation Trust — Milestone Road',
  url: 'https://nantucketpreservation.org/milestone-road-seven-miles-hundreds-of-years-of-history-7532/',
};
const SURFSIDE_STATION = {
  label: 'Library of Congress HABS — U.S. Lifesaving Station, Surfside; US Life-Saving Service Heritage Assn.',
  url: 'https://uslife-savingservice.org/station-buildings/surfside-station-house/',
};
const MILLIE = {
  label: 'Yesterday’s Island — Madaket Millie & the West End Command',
  url: 'https://yesterdaysisland.com/madaket-millie-west-end-command/',
};
const TOWN = { label: 'Town & County of Nantucket', url: 'https://www.nantucket-ma.gov' };
const SCONSET_PATH = { label: 'Town of Nantucket — ’Sconset Path', url: 'https://www.nantucket-ma.gov/2538/Sconset-Path' };
const NOAA_RIP = { label: 'NOAA / National Weather Service — Rip current safety', url: 'https://www.weather.gov/safety/ripcurrent' };
const JUDGMENT = { label: 'Community judgment card — to be reviewed by Acktual Local', url: null };

export const CARDS = [
  // ───────────────────────── NANTUCKET TOWN ─────────────────────────
  {
    id: 'town-h-01', deck: 'history', category: 'history', difficulty: 'easy', location: 'town',
    question: 'In the first half of the 1800s, Nantucket was famous around the world as the capital of which industry?',
    choices: ['Cod fishing', 'Whaling', 'Shipbuilding', 'Cranberry growing'],
    correctAnswer: 1,
    explanation: 'Nantucket whaling ships sailed as far as the Pacific. Whale oil and spermaceti candles made island merchants rich.',
    source: NHA, verification: 'needs-verification',
  },
  {
    id: 'town-h-02', deck: 'history', category: 'history', difficulty: 'medium', location: 'town',
    question: 'The Great Fire of 1846 began late on the night of July 13 in a hat shop on which street?',
    choices: ['Orange Street', 'India Street', 'Main Street', 'Federal Street'],
    correctAnswer: 2,
    explanation: 'The fire began in William Geary’s hat shop on Main Street, spread along the waterfront, then moved up Main toward Centre and Broad Streets.',
    source: NHA_FIRE, verification: 'web-checked',
  },
  {
    id: 'town-h-03', deck: 'history', category: 'history', difficulty: 'local', location: 'town',
    question: 'Roughly how many buildings did the Great Fire of 1846 destroy in the town centre?',
    choices: ['About 25', 'About 250', 'About 1,000', 'About 2,500'],
    correctAnswer: 1,
    explanation: 'About 250 buildings and more than 33 acres were lost, including the original Atheneum and its collection.',
    source: NHA_FIRE, verification: 'web-checked',
  },
  {
    id: 'town-h-04', deck: 'history', category: 'history', difficulty: 'medium', location: 'town',
    question: 'Nantucket-born Maria Mitchell became internationally famous in 1847 for what?',
    choices: ['Discovering a comet', 'Captaining a whaleship', 'Founding the Atheneum', 'Charting Nantucket Shoals'],
    correctAnswer: 0,
    explanation: '“Miss Mitchell’s Comet” brought her a medal from the King of Denmark. She went on to become Vassar College’s first professor of astronomy.',
    source: { label: 'Maria Mitchell Association', url: 'https://www.mariamitchell.org' }, verification: 'needs-verification',
  },
  {
    id: 'town-h-05', deck: 'knowIt', category: 'history', difficulty: 'local', location: 'town',
    question: 'In August 1841, Frederick Douglass gave one of his first speeches to a largely white audience at which Nantucket building?',
    choices: ['The Pacific Club', 'The Atheneum', 'The Unitarian Church', 'The Town Building'],
    correctAnswer: 1,
    explanation: 'He spoke at an anti-slavery convention at the Nantucket Atheneum. The speech helped launch his career as an abolitionist speaker.',
    source: { label: 'Nantucket Atheneum', url: 'https://nantucketatheneum.org' }, verification: 'needs-verification',
  },
  {
    id: 'town-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'town',
    question: 'Downtown Main Street is famously paved with…',
    choices: ['Brick', 'Crushed scallop shells', 'Cobblestones', 'Granite slabs'],
    correctAnswer: 2,
    explanation: 'Main Street’s cobblestones are part of the downtown historic district, and anyone who has biked over them remembers it.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'town-k-02', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'medium', location: 'town',
    question: 'The Steamship Authority ferries dock at which wharf?',
    choices: ['Straight Wharf', 'Steamboat Wharf', 'Old South Wharf', 'Commercial Wharf'],
    correctAnswer: 1,
    explanation: 'Steamship Authority boats use Steamboat Wharf. Hy-Line boats use Straight Wharf, at the foot of Main Street.',
    source: { label: 'Steamship Authority', url: 'https://www.steamshipauthority.com' }, verification: 'needs-verification',
  },
  {
    id: 'town-k-03', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'local', location: 'town',
    question: 'Who were the “Three Bricks” on upper Main Street built for?',
    choices: ['Three whaling captains', 'Joseph Starbuck’s three sons', 'Three island churches', 'The three Coffin sisters'],
    correctAnswer: 1,
    explanation: 'Whaling merchant Joseph Starbuck built the three identical brick houses in the late 1830s for his three sons.',
    source: NHA, verification: 'needs-verification',
  },
  {
    id: 'town-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'easy', location: 'town',
    question: 'It’s a busy July afternoon. You’re walking three abreast on a narrow brick sidewalk downtown when someone with a stroller comes the other way. What does an Acktual Local do?',
    choices: ['Keep going. They’ll squeeze by.', 'Drop into single file and let them pass.', 'Step into the street without looking.', 'Stop right there for a group photo.'],
    correctAnswer: 1,
    explanation: 'Downtown sidewalks are old and narrow. Making room for people is ordinary island courtesy.',
    source: JUDGMENT, verification: 'judgment',
  },
  {
    id: 'town-c-02', deck: 'acktualLocal', category: 'community', difficulty: 'medium', location: 'town',
    question: 'You’re driving slowly down Main Street and a pedestrian starts to cross mid-block over the cobbles. What does an Acktual Local do?',
    choices: ['Honk so they hurry', 'Stop, let them cross and give a wave', 'Speed up to get past first', 'Swerve around them'],
    correctAnswer: 1,
    explanation: 'Downtown moves at walking pace. Patience, and a wave, is how islanders share the road.',
    source: JUDGMENT, verification: 'judgment',
  },

  // ───────────────────────── BRANT POINT ─────────────────────────
  {
    id: 'brant-h-01', deck: 'history', category: 'history', difficulty: 'medium', location: 'brant',
    question: 'Brant Point’s light station was established in 1746. What distinction does that give it?',
    choices: ['Oldest lighthouse in the United States', 'Second lighthouse established in colonial America', 'First electric lighthouse', 'First lighthouse in Massachusetts'],
    correctAnswer: 1,
    explanation: 'Only Boston Light is older. Brant Point is also the most rebuilt lighthouse in the country; the present tower dates from 1901.',
    source: USCG_BRANT, verification: 'web-checked',
  },
  {
    id: 'brant-k-01', deck: 'knowIt', category: 'knowledge', difficulty: 'easy', location: 'brant',
    question: 'Brant Point Light is known for being…',
    choices: ['The tallest lighthouse in Massachusetts', 'Painted solid red', 'The shortest lighthouse in New England', 'Built on a floating platform'],
    correctAnswer: 2,
    explanation: 'The 1901 tower is just 26 feet tall, the shortest lighthouse in New England.',
    source: USCG_BRANT, verification: 'web-checked',
  },
  {
    id: 'brant-h-02', deck: 'history', category: 'history', difficulty: 'local', location: 'brant',
    question: 'What record does Brant Point hold among U.S. lighthouses?',
    choices: ['Never once been automated', 'Moved and rebuilt more times than any other', 'First to use a Fresnel lens', 'Longest-serving single keeper'],
    correctAnswer: 1,
    explanation: 'Fires and storms led to many rebuilds. The current 1901 tower stands about 600 feet east of its predecessor and was automated in 1965.',
    source: USCG_BRANT, verification: 'web-checked',
  },
  {
    id: 'brant-l-01', deck: 'islandLife', category: 'life', difficulty: 'easy', location: 'brant',
    question: 'Nantucket’s nickname, “The Grey Lady,” is most often linked to…',
    choices: ['The fog that often wraps the island', 'A famous whaleship', 'A ghost story on Orange Street', 'The colour of the ferries'],
    correctAnswer: 0,
    explanation: 'Thick sea fog often rolls in over the island. Weathered grey shingles are often mentioned too.',
    source: { label: 'Commonly cited nickname — confirm preferred wording', url: null }, verification: 'needs-verification',
  },
  {
    id: 'brant-k-02', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'medium', location: 'brant',
    question: 'Standing at Brant Point, you’re watching boats enter which harbour?',
    choices: ['Madaket Harbor', 'Polpis Harbor', 'Nantucket Harbor', 'Hyannis Harbor'],
    correctAnswer: 2,
    explanation: 'Brant Point marks the entrance to Nantucket Harbor. Every ferry to and from town passes it.',
    source: USCG_BRANT, verification: 'needs-verification',
  },
  {
    id: 'brant-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'easy', location: 'brant',
    question: 'You’re leaving on the ferry and rounding Brant Point. Island tradition says that to be sure you’ll come back, you should…',
    choices: ['Ring the ship’s bell', 'Toss a penny overboard', 'Wave to the lighthouse three times', 'Keep your ticket stub'],
    correctAnswer: 1,
    explanation: 'Tossing a penny (some say two) overboard as you pass Brant Point is said to guarantee your return to Nantucket.',
    source: { label: 'Island tradition — confirm preferred telling', url: null }, verification: 'needs-verification',
  },

  // ───────────────────────── JETTIES BEACH ─────────────────────────
  {
    id: 'jetties-l-01', deck: 'islandLife', category: 'life', difficulty: 'easy', location: 'jetties',
    question: 'Compared with south-shore beaches like Surfside and Cisco, Jetties Beach is known for…',
    choices: ['Bigger surf', 'Calmer water', 'Black volcanic sand', 'Having no lifeguards ever'],
    correctAnswer: 1,
    explanation: 'The north shore faces Nantucket Sound and is sheltered from Atlantic swell, which is why families favour it.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'jetties-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'jetties',
    question: 'Jetties Beach looks out on which body of water?',
    choices: ['The open Atlantic', 'Nantucket Sound', 'Long Island Sound', 'Hummock Pond'],
    correctAnswer: 1,
    explanation: 'The north shore faces Nantucket Sound, the water between the island and Cape Cod.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'jetties-k-02', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'medium', location: 'jetties',
    question: 'What are the stone jetties the beach is named for there to do?',
    choices: ['Shelter a seaplane base', 'Keep the channel into Nantucket Harbor open', 'Mark the town line', 'Hold up an old railway pier'],
    correctAnswer: 1,
    explanation: 'The jetties guard the harbour entrance channel and help keep sand from filling it in.',
    source: { label: 'U.S. Army Corps of Engineers — Nantucket Harbor', url: 'https://www.nae.usace.army.mil' }, verification: 'needs-verification',
  },
  {
    id: 'jetties-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'medium', location: 'jetties',
    question: 'Your group wants an evening cookout with a fire on the beach. What does an Acktual Local do first?',
    choices: ['Light it and hope nobody minds', 'Check the Town’s current beach-fire rules and get a permit if needed', 'Build it in the dunes for shelter', 'Borrow someone else’s fire pit'],
    correctAnswer: 1,
    explanation: 'The Town regulates beach fires and they may need a permit. Check the current rules, and stay off the dunes.',
    source: TOWN, verification: 'judgment',
  },

  // ───────────────────────── SURFSIDE ─────────────────────────
  {
    id: 'surf-h-01', deck: 'history', category: 'history', difficulty: 'medium', location: 'surfside',
    question: 'The historic building at Surfside that became a youth hostel in 1963 was first built as…',
    choices: ['A U.S. Life-Saving Service station', 'A whale-oil tryworks', 'A summer hotel', 'A lighthouse keeper’s house'],
    correctAnswer: 0,
    explanation: 'Built in 1874, it was the island’s first life-saving station. Its crews rowed out to shipwrecks off the south shore.',
    source: SURFSIDE_STATION, verification: 'web-checked',
  },
  {
    id: 'surf-h-02', deck: 'history', category: 'history', difficulty: 'local', location: 'surfside',
    question: 'The Surfside Life-Saving Station’s first rescue, in March 1877, brought ashore the whole crew of which vessel?',
    choices: ['The Essex', 'The W.F. Marshall', 'The Andrea Doria', 'The Nantucket Lightship'],
    correctAnswer: 1,
    explanation: 'On March 9, 1877 the Surfside crew rescued the entire crew of the W.F. Marshall.',
    source: SURFSIDE_STATION, verification: 'web-checked',
  },
  {
    id: 'surf-l-01', deck: 'islandLife', category: 'life', difficulty: 'easy', location: 'surfside',
    question: 'Surfside is on the south shore. What should swimmers expect compared with the harbour beaches?',
    choices: ['Flat, still water', 'Open-ocean waves and stronger surf', 'Freshwater', 'No tides'],
    correctAnswer: 1,
    explanation: 'The south shore faces the open Atlantic, so the waves are bigger and the currents stronger. Read the flags and swim near the lifeguards.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'surf-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'medium', location: 'surfside',
    question: 'In early summer you find part of the upper beach roped off with small signs. What’s most likely going on, and what do you do?',
    choices: ['A private party. Ask to join.', 'Shorebirds are nesting. Keep well outside the ropes.', 'Filming. Walk through quickly.', 'A volleyball court. Set up next to it.'],
    correctAnswer: 1,
    explanation: 'Protected shorebirds such as piping plovers and terns nest on island beaches. Symbolic fencing marks areas to avoid.',
    source: { label: 'Nantucket Conservation Foundation', url: 'https://www.nantucketconservation.org' }, verification: 'needs-verification',
  },
  {
    id: 'surf-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'surfside',
    question: 'Roughly how far is Surfside Beach from town by the Surfside bike path?',
    choices: ['About half a mile', 'About 3 miles', 'About 10 miles', 'About 15 miles'],
    correctAnswer: 1,
    explanation: 'It’s an easy ride of roughly three miles, which is why Surfside is a favourite bike-to beach.',
    source: { label: 'Town of Nantucket — multi-use path map', url: 'https://nantucket-ma.gov/DocumentCenter/View/47922/2019-Sidepath-Map-PDF' }, verification: 'needs-verification',
  },

  // ───────────────────────── CISCO ─────────────────────────
  {
    id: 'cisco-l-01', deck: 'islandLife', category: 'life', difficulty: 'easy', location: 'cisco',
    question: 'Cisco Beach is especially popular with…',
    choices: ['Surfers', 'Harbour sailboat racers', 'Ferry passengers', 'Ice skaters'],
    correctAnswer: 0,
    explanation: 'Cisco’s exposed south-shore break has made it one of the island’s best-known surf spots.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'cisco-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'medium', location: 'cisco',
    question: 'Which road do you take from town out toward Cisco?',
    choices: ['Milestone Road', 'Hummock Pond Road', 'Polpis Road', 'Madaket Road'],
    correctAnswer: 1,
    explanation: 'Hummock Pond Road runs south-west from town toward Cisco and the south shore, past Hummock Pond.',
    source: { label: 'Town of Nantucket — multi-use path map', url: 'https://nantucket-ma.gov/DocumentCenter/View/47922/2019-Sidepath-Map-PDF' }, verification: 'needs-verification',
  },
  {
    id: 'cisco-l-02', deck: 'islandLife', category: 'life', difficulty: 'medium', location: 'cisco',
    question: 'You get caught in a rip current off the south shore. What’s the recommended way out?',
    choices: ['Swim straight back toward shore', 'Swim parallel to the shore until you’re out of the current', 'Dive to the bottom', 'Swim straight out to sea'],
    correctAnswer: 1,
    explanation: 'Rip currents pull straight out. Swim parallel to the beach to get out of the channel, and if you can’t, float and signal for help.',
    source: NOAA_RIP, verification: 'web-checked',
  },
  {
    id: 'cisco-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'easy', location: 'cisco',
    question: 'The small lot at the end of the beach road is full. What does an Acktual Local do?',
    choices: ['Park across someone’s driveway', 'Pull onto the dune grass', 'Come back later, or bike next time', 'Double-park and leave the hazards on'],
    correctAnswer: 2,
    explanation: 'Beach roads run past neighbours and fragile dunes. Islanders plan ahead, and often just bike.',
    source: JUDGMENT, verification: 'judgment',
  },
  {
    id: 'cisco-k-02', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'cisco',
    question: 'Which shore of the island is Cisco on?',
    choices: ['North shore', 'South shore', 'The eastern tip', 'Inside the harbour'],
    correctAnswer: 1,
    explanation: 'Cisco faces the open Atlantic on the south shore, west of Surfside.',
    source: TOWN, verification: 'needs-verification',
  },

  // ───────────────────────── MADAKET ─────────────────────────
  {
    id: 'madaket-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'madaket',
    question: 'Madaket is at which end of Nantucket?',
    choices: ['The east end', 'The west end', 'The northern tip', 'The centre'],
    correctAnswer: 1,
    explanation: 'Madaket is the westernmost village on the island, at the end of Madaket Road.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'madaket-l-01', deck: 'islandLife', category: 'life', difficulty: 'easy', location: 'madaket',
    question: 'Islanders head to Madaket Beach at the end of the day to watch…',
    choices: ['The sunrise', 'The sunset', 'The ferries arrive', 'The whales migrate'],
    correctAnswer: 1,
    explanation: 'It faces west over the water, which makes Madaket the island’s classic sunset spot.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'madaket-h-01', deck: 'history', category: 'history', difficulty: 'medium', location: 'madaket',
    question: 'Mildred “Madaket Millie” Jewett was honoured by which service for decades of watching over the west end?',
    choices: ['The U.S. Coast Guard', 'The U.S. Navy', 'The National Park Service', 'The U.S. Postal Service'],
    correctAnswer: 0,
    explanation: 'Millie kept watch on the waters off the west end and took part in rescues. The Coast Guard made her an honorary warrant officer.',
    source: MILLIE, verification: 'web-checked',
  },
  {
    id: 'madaket-h-02', deck: 'history', category: 'history', difficulty: 'local', location: 'madaket',
    question: 'In 1965 the Coast Guard gave Madaket Millie which honorary title?',
    choices: ['Admiral of Nantucket Sound', 'Keeper of Smith Point', 'Commanding Officer, West End Command', 'Harbormaster of Madaket'],
    correctAnswer: 2,
    explanation: 'With the title “Commanding Officer, West End Command,” the Coast Guard made official what the west end already knew.',
    source: MILLIE, verification: 'web-checked',
  },
  {
    id: 'madaket-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'medium', location: 'madaket',
    question: 'Everyone is gathered at Madaket for sunset and the sun is just touching the water. What does an Acktual Local do?',
    choices: ['Play music from a speaker', 'Stand in front of everyone for a selfie', 'Quiet down and enjoy it with everyone else', 'Leave early to beat the traffic'],
    correctAnswer: 2,
    explanation: 'Sunset at Madaket is a shared island ritual. Let everyone enjoy it.',
    source: JUDGMENT, verification: 'judgment',
  },

  // ───────────────────────── 'SCONSET ─────────────────────────
  {
    id: 'sconset-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'sconset',
    question: '“’Sconset” is short for…',
    choices: ['Sconsetville', 'Siasconset', 'Sankaty Sunset', 'Sconset Harbor'],
    correctAnswer: 1,
    explanation: 'Siasconset is the village’s full name, a word of Wampanoag origin. Almost nobody uses it in conversation.',
    source: TOWN, verification: 'needs-verification',
  },
  {
    id: 'sconset-h-01', deck: 'history', category: 'history', difficulty: 'medium', location: 'sconset',
    question: 'In 1824 granite markers were placed along the road from town to ’Sconset. What were they used for?',
    choices: ['Marking whale sightings', 'Timing horse races between town and ’Sconset', 'Marking property lines', 'Guiding ships at night'],
    correctAnswer: 1,
    explanation: 'The markers were set to time horse races, and they gave Milestone Road its name. Many still stand today.',
    source: MILESTONE, verification: 'web-checked',
  },
  {
    id: 'sconset-k-02', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'medium', location: 'sconset',
    question: 'The two classic routes from town to ’Sconset are Milestone Road and…',
    choices: ['Madaket Road', 'Hummock Pond Road', 'Polpis Road', 'Surfside Road'],
    correctAnswer: 2,
    explanation: 'Milestone Road is the direct route. Polpis Road loops north past the moors and Sankaty Head, a longer and more scenic ride.',
    source: SCONSET_PATH, verification: 'web-checked',
  },
  {
    id: 'sconset-h-02', deck: 'history', category: 'history', difficulty: 'local', location: 'sconset',
    question: '’Sconset first grew up as what kind of settlement?',
    choices: ['A deep-water whaling port', 'A fishing village', 'A military fort', 'A railroad terminus'],
    correctAnswer: 1,
    explanation: 'Fishermen built small shanties on the east end to be closer to the fishing grounds. Many of today’s cottages grew out of them.',
    source: NHA, verification: 'needs-verification',
  },
  {
    id: 'sconset-l-01', deck: 'islandLife', category: 'life', difficulty: 'easy', location: 'sconset',
    question: 'In early summer, many ’Sconset cottages are famous for being covered in…',
    choices: ['Climbing roses', 'Painted murals', 'Seashell mosaics', 'Ivy only'],
    correctAnswer: 0,
    explanation: 'Climbing roses cover the shingled cottages in early summer and draw people to the village.',
    source: { label: 'Siasconset Civic Association', url: 'https://www.siasconset.org' }, verification: 'needs-verification',
  },
  {
    id: 'sconset-c-01', deck: 'acktualLocal', category: 'community', difficulty: 'easy', location: 'sconset',
    question: 'The ’Sconset Bluff Walk passes right beside people’s homes and gardens. What’s the Acktual Local etiquette?',
    choices: ['Cut across lawns for a better view', 'Stay on the path and keep your voice down', 'Pick a rose or two as a souvenir', 'Knock and ask for a tour'],
    correctAnswer: 1,
    explanation: 'The walk exists because homeowners allow it. Being respectful keeps it open for everyone.',
    source: JUDGMENT, verification: 'judgment',
  },

  // ───────────────────────── SANKATY HEAD ─────────────────────────
  {
    id: 'sankaty-h-01', deck: 'history', category: 'history', difficulty: 'easy', location: 'sankaty',
    question: 'Sankaty Head Light is easy to recognise by its…',
    choices: ['Black-and-white spiral', 'White tower with a red band', 'Solid red paint', 'Green lantern'],
    correctAnswer: 1,
    explanation: 'The white tower with its wide red band is a landmark from land and sea.',
    source: SANKATY, verification: 'needs-verification',
  },
  {
    id: 'sankaty-h-02', deck: 'history', category: 'history', difficulty: 'medium', location: 'sankaty',
    question: 'Sankaty Head Light was first lit around which year?',
    choices: ['1746', '1850', '1901', '1986'],
    correctAnswer: 1,
    explanation: 'Built in 1849 and lit in 1850, Sankaty was one of the brightest lights on the New England coast.',
    source: SANKATY, verification: 'web-checked',
  },
  {
    id: 'sankaty-k-01', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'medium', location: 'sankaty',
    question: 'Why was Sankaty Head Light moved in 2007?',
    choices: ['To widen Polpis Road', 'The eroding bluff was getting close to it', 'To improve the view from ’Sconset', 'A storm knocked it over'],
    correctAnswer: 1,
    explanation: 'Erosion was eating the bluff. The lighthouse was moved inland before the edge reached it.',
    source: SANKATY, verification: 'web-checked',
  },
  {
    id: 'sankaty-k-02', deck: 'knowTheIsland', category: 'knowledge', difficulty: 'easy', location: 'sankaty',
    question: 'Sankaty Head stands near which village?',
    choices: ['Madaket', 'Siasconset (’Sconset)', 'Cisco', 'Surfside'],
    correctAnswer: 1,
    explanation: 'Sankaty is on the bluff just north of ’Sconset, near the island’s eastern edge.',
    source: SANKATY, verification: 'web-checked',
  },

  // ───────────────────────── LOCAL SECRETS ─────────────────────────
  {
    id: 'secret-sankaty-01', deck: 'localSecret', category: 'history', difficulty: 'local', location: 'sankaty', secret: true,
    question: 'By 2006, roughly how close had the eroding bluff come to Sankaty Head Light?',
    choices: ['About 7 feet', 'About 72 feet', 'About 720 feet', 'Over a quarter mile'],
    correctAnswer: 1,
    explanation: 'The tower was only about 72 feet from the edge when the move was organised.',
    source: SANKATY, verification: 'web-checked',
  },
  {
    id: 'secret-sankaty-02', deck: 'localSecret', category: 'history', difficulty: 'local', location: 'sankaty', secret: true,
    question: 'Which organisation took ownership of Sankaty Head Light in 2007 and raised the money to move it?',
    choices: ['The Nantucket Historical Association', 'The ’Sconset Trust', 'The U.S. Coast Guard Auxiliary', 'The Nantucket Conservation Foundation'],
    correctAnswer: 1,
    explanation: 'The ’Sconset Trust took ownership and raised the funds to move the tower in October 2007.',
    source: SANKATY, verification: 'web-checked',
  },
  {
    id: 'secret-sankaty-03', deck: 'localSecret', category: 'history', difficulty: 'local', location: 'sankaty', secret: true,
    question: 'After the move, Sankaty Head Light’s new foundation sat about 405 feet to the northwest, on land belonging to…',
    choices: ['Nantucket Memorial Airport', 'Sankaty Head Golf Club', 'The Coast Guard', 'The Wauwinet'],
    correctAnswer: 1,
    explanation: 'The new site is on Sankaty Head Golf Club land, safely back from the bluff.',
    source: SANKATY, verification: 'web-checked',
  },
  {
    id: 'secret-sankaty-04', deck: 'localSecret', category: 'history', difficulty: 'local', location: 'sankaty', secret: true,
    question: 'Roughly how much did Sankaty Head Light weigh when it was moved in 2007?',
    choices: ['About 40 tons', 'About 400 tons', 'About 4,000 tons', 'About 40,000 tons'],
    correctAnswer: 1,
    explanation: 'The 400-ton tower was moved in one piece in October 2007.',
    source: SANKATY, verification: 'web-checked',
  },
];

export const CARDS_BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));
