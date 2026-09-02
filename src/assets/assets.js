// Centralized static asset and data registry for RoamStory Travel Platform

export const companyInfo = {
  name: "Travelvluv",
  tagline: "Adventure is Worthwhile",
  subtitle: "Travel Blog & Luxury Journeys",
  description: "Inspiring stories, useful travel tips, and breathtaking destinations to fuel your wanderlust and help you travel smarter.",
  aboutStory: "Founded by a collective of passionate world explorers and photographers, RoamStory has grown from a humble journal of nomadic adventures into a premier global travel authority. We curate bespoke journeys, authentic cultural immersions, and eco-conscious luxury escapes that leave a lifelong imprint on your soul.",
  topBarText: "Never stop exploring the world!",
  location: "Based in Bali, Indonesia",
  email: "hello@roamstory.com",
  phone: "+1 (800) 762-6786",
  hours: "Mon - Fri: 8:00 AM - 8:00 PM (GMT+8)",
  yearFounded: 2011,
  address: "Jalan Batu Bolong No. 88, Canggu, Bali 80361, Indonesia",
};

export const statistics = [
  { id: "destinations", value: "120+", label: "Exotic Destinations", description: "Across 6 continents" },
  { id: "travelers", value: "50K+", label: "Happy Travelers", description: "99.4% recommend rate" },
  { id: "experience", value: "15+", label: "Years of Craft", description: "Bespoke travel planning" },
  { id: "satisfaction", value: "98%", label: "Satisfaction Rate", description: "5-star average rating" },
];

export const quickFeatures = [
  {
    id: "destinations",
    title: "DESTINATIONS",
    subtitle: "Explore places",
    icon: "MapPin",
    targetSection: "destinations",
  },
  {
    id: "travel-tips",
    title: "TRAVEL TIPS",
    subtitle: "Tips & guides",
    icon: "Luggage",
    targetSection: "stories",
  },
  {
    id: "itineraries",
    title: "ITINERARIES",
    subtitle: "Plan your trip",
    icon: "Map",
    targetSection: "booking",
  },
  {
    id: "resources",
    title: "RESOURCES",
    subtitle: "Tools & more",
    icon: "Globe",
    targetSection: "gallery",
  },
];

export const categories = [
  "All",
  "Tropical",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature",
  "City",
];

export const destinations = [
  {
    id: 1,
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    description: "Cliffside pastel villages cascading into turquoise Mediterranean waters with aromatic lemon groves and world-class culinary wonders.",
    longDescription: "The Amalfi Coast is a 50-kilometer stretch of coastline along the southern edge of Italy’s Sorrentine Peninsula. Renowned for its dramatic sheer cliffs, rugged shoreline dotted with secluded pebble beaches, and pastel-hued fishing villages, this UNESCO World Heritage landscape represents the pinnacle of Mediterranean luxury and timeless romantic charm.",
    price: 1850,
    priceDisplay: "$1,850",
    duration: "8 Days",
    rating: 4.96,
    reviews: 312,
    category: "Luxury",
    featured: true,
    bestTimeToVisit: "May to September",
    groupSize: "Max 10 travelers",
    highlights: [
      "Private yacht charter along Capri & Faraglioni rocks",
      "Exclusive cliffside lemon grove culinary masterclass",
      "Panoramic Path of the Gods guided trek with sommelier",
      "5-star boutique seaside villa accommodation"
    ],
    includedExperiences: [
      "7 Nights Luxury Boutique Hotel Stays",
      "Daily Artisan Breakfast & 4 Chef Dinners",
      "Private Boat Transfer & Coastal Cruise",
      "English-speaking Private Guide & Concierge"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80",
    ]
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description: "Emerald rice terraces, spiritual water temples, serene beachfront villas, and world-renowned surf breaks in the Island of the Gods.",
    longDescription: "Bali is an Indonesian paradise that blends rich volcanic landscapes, spiritual Hindu heritage, and laid-back luxury. From the tranquil yoga sanctuaries and artisan woodcarvers of Ubud to the pristine beach clubs of Uluwatu and sacred dawn summits of Mount Batur, Bali awakens every sense.",
    price: 1299,
    priceDisplay: "$1,299",
    duration: "7 Days",
    rating: 4.92,
    reviews: 245,
    category: "Tropical",
    featured: true,
    bestTimeToVisit: "April to October",
    groupSize: "Max 12 travelers",
    highlights: [
      "Sunrise trek up Mount Batur with breakfast at summit",
      "Traditional Balinese blessing ceremony at Tirta Empul",
      "Luxury jungle infinity pool resort in Ubud",
      "Private speedboat day trip to Nusa Penida & Manta Point"
    ],
    includedExperiences: [
      "6 Nights Private Pool Villa Accommodation",
      "Airport VIP Chauffeur Transfer",
      "Holistic Balinese Spa & Wellness Ritual",
      "All Entrance Fees & Sacred Temple Passes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 3,
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    description: "Iconic whitewashed caldera architecture, cobalt blue domes, and legendary Aegean golden sunsets over volcanic cliffs.",
    longDescription: "Santorini is the jewel of the Cyclades. Perched high above an ancient flooded caldera, villages like Oia and Fira boast Cycladic minimalism overlooking azure waters. Indulge in crisp Assyrtiko volcanic wines, sunset catamaran cruises, and Michelin-starred dining.",
    price: 2150,
    priceDisplay: "$2,150",
    duration: "6 Days",
    rating: 4.98,
    reviews: 418,
    category: "Luxury",
    featured: true,
    bestTimeToVisit: "May to October",
    groupSize: "Max 8 travelers",
    highlights: [
      "Sunset catamaran cruise with fresh Aegean seafood BBQ",
      "Private volcanic vineyard wine tasting masterclass",
      "Cave-suite luxury hotel with private heated plunge pool",
      "Oia golden hour professional photography session"
    ],
    includedExperiences: [
      "5 Nights Luxury Caldera Cave Suite",
      "Helicopter or VIP Yacht Transfer Option",
      "Private Sommelier Wine Tour",
      "Gourmet Sunset Dinner on Private Terrace"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 4,
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "Ancient Zen rock gardens, towering Arashiyama bamboo groves, traditional Geisha quarters, and timeless culinary mastery.",
    longDescription: "Kyoto is the cultural heartbeat of Japan, boasting over a thousand Buddhist temples and Shinto shrines. Experience the sublime serenity of Ryokan inns with private onsens, Kaiseki fine dining, and quiet tea ceremonies steeped in centuries of mindfulness.",
    price: 1980,
    priceDisplay: "$1,980",
    duration: "9 Days",
    rating: 4.95,
    reviews: 189,
    category: "Cultural",
    featured: true,
    bestTimeToVisit: "March to May & Oct to Nov",
    groupSize: "Max 10 travelers",
    highlights: [
      "Private morning access to Fushimi Inari & Golden Pavilion",
      "Authentic Tea Ceremony with a certified Tea Master",
      "Exclusive Kaiseki dinner in Gion with Geiko performance",
      "2 Nights in a luxury traditional Onsen Ryokan"
    ],
    includedExperiences: [
      "8 Nights Premium Accommodations & Ryokan Stays",
      "7-Day Japan Rail Pass Green Car",
      "Private Cultural Interpreter & Historian Guide",
      "Handmade Wagashi Confectionery Workshop"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 5,
    name: "Swiss Alps & Zermatt",
    country: "Switzerland",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    description: "Towering Matterhorn peaks, alpine meadows, panoramic Glacier Express trains, and cozy fondue chalets.",
    longDescription: "Switzerland's alpine playground offers crisp glacier air, world-renowned mountain railways, and idyllic chalet villages. Marvel at the dramatic Matterhorn from Gornergrat, cruise through sparkling Lake Geneva, and unwind in world-class thermal mineral spas.",
    price: 2450,
    priceDisplay: "$2,450",
    duration: "7 Days",
    rating: 4.97,
    reviews: 215,
    category: "Adventure",
    featured: true,
    bestTimeToVisit: "June to September (Hiking) or Dec to April (Skiing)",
    groupSize: "Max 8 travelers",
    highlights: [
      "Panoramic Glacier Express First-Class Alpine Journey",
      "Matterhorn Glacier Paradise private cable car ascent",
      "Artisan Swiss cheese & Lindt chocolate private tasting",
      "Alpine thermal bath & hydrotherapy wellness day"
    ],
    includedExperiences: [
      "6 Nights 5-Star Alpine Chalet & Hotel Resort",
      "Swiss Travel Pass First Class Included",
      "Daily Mountain Excursions & Local Guide",
      "Gourmet Fondue & Raclette Dinner Experience"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 6,
    name: "South Island Fjords",
    country: "New Zealand",
    region: "Oceania",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    description: "Majestic Milford Sound waterfalls, glowing glacier valleys, Lord of the Rings landscapes, and adrenaline adventures.",
    longDescription: "New Zealand's South Island is the ultimate wilderness sanctuary. From the mirrored stillness of Milford Sound fjords to the stargazing Dark Sky Reserve of Lake Tekapo and Queenstown's boutique Pinot Noir vineyards, every turn is a cinematic masterpiece.",
    price: 2280,
    priceDisplay: "$2,280",
    duration: "10 Days",
    rating: 4.93,
    reviews: 172,
    category: "Nature",
    featured: true,
    bestTimeToVisit: "November to April",
    groupSize: "Max 12 travelers",
    highlights: [
      "Overnight luxury cruise on Milford Sound with kayak tours",
      "Helicopter glacier landing on Franz Josef Glacier",
      "Private Gibbston Valley winery bike & tasting tour",
      "Stargazing at Mount John Observatory Dark Sky Reserve"
    ],
    includedExperiences: [
      "9 Nights Luxury Eco-Lodges & Wilderness Retreats",
      "All Internal Flights & Luxury 4WD Transport",
      "Helicopter Flight & Glacier Hike",
      "Full Board Gourmet Meals with Local Pairings"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 7,
    name: "Maldives Atolls",
    country: "Maldives",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    description: "Overwater bungalows hovering over crystal lagoons, vibrant coral reefs, private sandbanks, and manta ray safaris.",
    longDescription: "An idyllic archipelago in the Indian Ocean where luxury meets pure marine wilderness. Wake up above coral reefs teeming with exotic marine life, dine in underwater restaurants, and watch bioluminescent waves beneath starry tropical skies.",
    price: 3100,
    priceDisplay: "$3,100",
    duration: "6 Days",
    rating: 4.99,
    reviews: 520,
    category: "Tropical",
    featured: true,
    bestTimeToVisit: "November to April",
    groupSize: "Private / Couples / Families",
    highlights: [
      "Overwater Sunset Villa with glass floor & private slide",
      "Dine 5 meters underwater at the Submarine Coral Restaurant",
      "Private sunset yacht charter with dolphin watching",
      "Guided coral restoration & bioluminescence night dive"
    ],
    includedExperiences: [
      "5 Nights All-Inclusive 5-Star Overwater Villa",
      "Roundtrip Scenic Seaplane Transfers from Male",
      "Daily Unlimited Water Sports & Snorkel Equipment",
      "Couples Signature Ayurvedic Spa Experience"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 8,
    name: "Cappadocia",
    country: "Turkey",
    region: "Europe / Asia",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    description: "Fairy chimney rock formations, subterranean cave cities, and surreal sunrise hot air balloon spectacles.",
    longDescription: "Cappadocia feels like another planet. Honeycomb hills, Byzantine cave monasteries, and subterranean cities come alive at dawn when hundreds of vibrant hot air balloons float harmoniously through fairy chimney valleys.",
    price: 1450,
    priceDisplay: "$1,450",
    duration: "5 Days",
    rating: 4.91,
    reviews: 260,
    category: "Adventure",
    featured: false,
    bestTimeToVisit: "April to June & Sept to Oct",
    groupSize: "Max 10 travelers",
    highlights: [
      "Sunrise VIP Hot Air Balloon flight with champagne celebration",
      "Stay in an authentic restored Ottoman cave boutique hotel",
      "Horseback ride through the Red & Rose Valleys at sunset",
      "Underground city exploration of Derinkuyu with archaeologist"
    ],
    includedExperiences: [
      "4 Nights Cave Boutique Hotel Stay",
      "Guaranteed Sunrise Balloon Flight Permit",
      "Private Anatolian Culinary & Pottery Workshop",
      "All Museum & National Park Passes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 9,
    name: "Reykjavik & Waterfalls",
    country: "Iceland",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
    description: "Roaring glacial waterfalls, volcanic geysers, the glowing Blue Lagoon, and dancing Aurora Borealis.",
    longDescription: "The Land of Fire and Ice is an elemental wonderland. Walk between tectonic plates, soak in geothermal minerals surrounded by snowfields, and witness the emerald Northern Lights igniting the arctic night.",
    price: 2190,
    priceDisplay: "$2,190",
    duration: "7 Days",
    rating: 4.94,
    reviews: 198,
    category: "Nature",
    featured: false,
    bestTimeToVisit: "Sept to March (Auroras) or June to Aug (Midnight Sun)",
    groupSize: "Max 8 travelers",
    highlights: [
      "Aurora Borealis private hunt with astronomer guide",
      "VIP Retreat Spa entry at the world-famous Blue Lagoon",
      "Super Jeep glacier ice cave exploration",
      "Golden Circle private tour with geothermal bread baking"
    ],
    includedExperiences: [
      "6 Nights Nordic Design Hotel & Aurora Domes",
      "Private 4x4 Heated Vehicle with Local Expert",
      "Glacier Safety Equipment & Crampons",
      "Geothermal Tasting Menu Dinner"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 10,
    name: "Phuket & Phi Phi Islands",
    country: "Thailand",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    description: "Emerald Andaman waters, limestone karsts, longtail wooden boats, and vibrant night bazaars.",
    longDescription: "Thailand's southern Andaman coast captivates with dramatic limestone cliffs emerging directly from turquoise lagoons. Explore hidden sea caves in Phang Nga Bay, snorkel with sea turtles in Maya Bay, and savor fresh Thai lemongrass seafood.",
    price: 1150,
    priceDisplay: "$1,150",
    duration: "6 Days",
    rating: 4.88,
    reviews: 340,
    category: "Tropical",
    featured: false,
    bestTimeToVisit: "November to April",
    groupSize: "Max 12 travelers",
    highlights: [
      "Private wooden longtail boat cruise to Maya Bay & Bamboo Island",
      "Sea canoeing through Hong Island hidden limestone lagoons",
      "Elephant sanctuary ethical visit and river bath",
      "Rooftop sunset cocktail dinner overlooking Patong Bay"
    ],
    includedExperiences: [
      "5 Nights Luxury Seaside Resort",
      "Private Island Hopping Speedboat Day",
      "Authentic Thai Cooking Class with Market Tour",
      "All Marine Park Conservation Taxes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 11,
    name: "Paris & French Riviera",
    country: "France",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description: "Haute couture boutiques, historic Louvre galleries, romantic Seine cruises, and Mediterranean azure coastal palaces.",
    longDescription: "The timeless elegance of France combines Paris’s legendary architecture and Michelin-starred dining with the sun-drenched coastal luxury of Nice, Cannes, and Monaco.",
    price: 2350,
    priceDisplay: "$2,350",
    duration: "8 Days",
    rating: 4.93,
    reviews: 280,
    category: "City",
    featured: false,
    bestTimeToVisit: "April to October",
    groupSize: "Max 10 travelers",
    highlights: [
      "Private VIP after-hours Louvre tour",
      "Champagne sunset dinner cruise on the Seine",
      "TGV First Class journey to the French Riviera",
      "Monaco Grand Prix circuit & Monte Carlo casino tour"
    ],
    includedExperiences: [
      "7 Nights 5-Star Boutique Hotels (Paris & Nice)",
      "Dedicated Private Driver & Art Historian Guide",
      "Pastry Masterclass with French Chef",
      "All Museum Fast-Track Passes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 12,
    name: "Dubai & Desert Oasis",
    country: "United Arab Emirates",
    region: "Middle East",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description: "Futuristic skyscrapers, desert starlit Bedouin glamping, luxury superyachts, and gold souk treasures.",
    longDescription: "Dubai is the definition of visionary modern luxury. Marvel at the Burj Khalifa, cruise Dubai Marina on a private yacht, and journey into golden Arabian sand dunes for a luxury Bedouin dinner under the desert sky.",
    price: 1750,
    priceDisplay: "$1,750",
    duration: "6 Days",
    rating: 4.90,
    reviews: 195,
    category: "City",
    featured: false,
    bestTimeToVisit: "November to March",
    groupSize: "Max 10 travelers",
    highlights: [
      "Top-floor Burj Khalifa VIP lounge access",
      "Private desert vintage Land Rover safari with falconry",
      "Luxury dinner under the stars at a private desert camp",
      "Dubai Marina luxury yacht sunset cruise"
    ],
    includedExperiences: [
      "5 Nights Luxury 5-Star Downtown Hotel",
      "Airport Rolls-Royce Chauffeur Transfer",
      "Private Desert Glamping Experience",
      "Personal Shopper & Souk Concierge"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

// Articles / Stories (Exactly matching the design reference layout)
export const featuredStories = [
  {
    id: 1,
    title: "The Ultimate Amalfi Coast Travel Guide",
    subtitle: "Everything you need to know before visiting this stunning coastline in Italy.",
    category: "DESTINATIONS",
    categoryColor: "bg-[#2D5A46]",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Olivia James",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Senior Travel Editor"
    },
    date: "May 20, 2024",
    readTime: "8 min read",
    layout: "featured-large" // Left large card
  },
  {
    id: 2,
    title: "20 Packing Tips to Travel Light & Smart",
    subtitle: "How to fit 2 weeks of travel essentials into a single carry-on bag.",
    category: "TRAVEL TIPS",
    categoryColor: "bg-[#2D5A46]",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Olivia James",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    date: "May 18, 2024",
    readTime: "5 min read",
    layout: "grid-top-left"
  },
  {
    id: 3,
    title: "10 Most Beautiful Places in Thailand",
    subtitle: "From hidden limestone coves in Krabi to Chiang Mai’s serene hill temples.",
    category: "DESTINATIONS",
    categoryColor: "bg-[#2D5A46]",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Olivia James",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    date: "May 15, 2024",
    readTime: "6 min read",
    layout: "grid-top-right"
  },
  {
    id: 4,
    title: "7 Days in Bali: The Perfect Itinerary",
    subtitle: "A balanced week of temple sunrises, jungle waterfalls, and seaside dining.",
    category: "ITINERARIES",
    categoryColor: "bg-[#2D5A46]",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Olivia James",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    date: "May 10, 2024",
    readTime: "7 min read",
    layout: "grid-bottom-left"
  },
  {
    id: 5,
    title: "Travel Photography Tips for Beginners",
    subtitle: "Master composition, natural lighting, and storytelling on your next journey.",
    category: "PHOTOGRAPHY",
    categoryColor: "bg-[#2D5A46]",
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Olivia James",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    date: "May 8, 2024",
    readTime: "6 min read",
    layout: "grid-bottom-right"
  }
];

// Popular destinations horizontal badges from the reference image bottom section
export const popularDestinationPills = [
  {
    id: "p-bali",
    name: "BALI",
    region: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
    icon: "Flower2",
    tag: "Tropical Sanctuary"
  },
  {
    id: "p-iceland",
    name: "ICELAND",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=500&q=80",
    icon: "Compass",
    tag: "Glacial Wonder"
  },
  {
    id: "p-japan",
    name: "JAPAN",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80",
    icon: "Mountain",
    tag: "Sacred Shrines"
  },
  {
    id: "p-switzerland",
    name: "SWITZERLAND",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=80",
    icon: "TreePine",
    tag: "Alpine Grandeur"
  },
  {
    id: "p-nz",
    name: "NEW ZEALAND",
    region: "Oceania",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80",
    icon: "Waves",
    tag: "Pristine Fjords"
  }
];

// Visual Travel Gallery
export const galleryItems = [
  {
    id: "g1",
    title: "Overwater Dreams in Maldives",
    country: "Maldives",
    category: "Tropical",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    description: "Endless azure horizon and private overwater ocean villas.",
    height: "tall"
  },
  {
    id: "g2",
    title: "Oia Cliffside Golden Hour",
    country: "Santorini, Greece",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
    description: "Sun setting behind Aegean blue-domed cliffside chapels.",
    height: "medium"
  },
  {
    id: "g3",
    title: "Cappadocia Sunrise Balloons",
    country: "Turkey",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
    description: "Surreal morning sky filled with floating colorful balloons.",
    height: "medium"
  },
  {
    id: "g4",
    title: "Bora Bora Lagoon Resort",
    country: "French Polynesia",
    category: "Tropical",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    description: "Crystal clear water bungalows facing Mount Otemanu.",
    height: "tall"
  },
  {
    id: "g5",
    title: "Swiss Alpine Glacier Rail",
    country: "Switzerland",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    description: "Panoramic train winding through snowcapped mountain peaks.",
    height: "tall"
  },
  {
    id: "g6",
    title: "Kyoto Bamboo Forest Walk",
    country: "Japan",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    description: "Sunlight filtering through the serene Arashiyama grove.",
    height: "medium"
  },
  {
    id: "g7",
    title: "Amalfi Coastal Serenity",
    country: "Italy",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    description: "Vibrant terraced villas overlooking the Mediterranean.",
    height: "medium"
  },
  {
    id: "g8",
    title: "Icelandic Northern Lights",
    country: "Iceland",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
    description: "Green aurora dancing over volcanic waterfalls.",
    height: "tall"
  }
];

// Why Choose Us
export const whyChooseUsFeatures = [
  {
    id: "planning",
    title: "Expert Travel Planning",
    description: "Bespoke itineraries handcrafted by regional specialists with insider access and seamless logistics.",
    icon: "Compass"
  },
  {
    id: "destinations",
    title: "Handpicked Destinations",
    description: "Personally inspected luxury villas, boutique heritage hotels, and authentic eco-lodges.",
    icon: "ShieldCheck"
  },
  {
    id: "experiences",
    title: "Premium VIP Experiences",
    description: "Private yacht charters, after-hours museum entries, and intimate culinary masterclasses.",
    icon: "Sparkles"
  },
  {
    id: "support",
    title: "24/7 Dedicated Concierge",
    description: "Round-the-clock personal assistance before, during, and after your journey worldwide.",
    icon: "Headphones"
  },
  {
    id: "price",
    title: "Best Value Guarantee",
    description: "Transparent pricing with no hidden fees, plus exclusive VIP upgrades and amenities.",
    icon: "Tag"
  },
  {
    id: "trusted",
    title: "Trusted Global Experts",
    description: "Over 15 years serving discerning explorers with a 98% five-star satisfaction record.",
    icon: "Award"
  }
];

// Customer Reviews (For Swiper.js)
export const customerReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "An unforgettable experience from start to finish. Every detail was perfectly organized. The private cliffside villa in Amalfi and our private boat tour to Capri were beyond anything we could have dreamed.",
    destination: "Amalfi Coast, Italy",
    date: "June 2024",
    tripType: "Romantic Honeymoon"
  },
  {
    id: 2,
    name: "Marcus Vance",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "The Bali luxury retreat organized by RoamStory was pure rejuvenation. From sunrise Mount Batur breakfasts to quiet Ubud jungle temple ceremonies, the local guides made us feel like family.",
    destination: "Bali, Indonesia",
    date: "May 2024",
    tripType: "Wellness Escape"
  },
  {
    id: 3,
    name: "Elena Rostova",
    country: "Switzerland",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "Kyoto during cherry blossom season with RoamStory was magical. Having private access to temples before crowds arrived and our private tea master masterclass was worth every single penny.",
    destination: "Kyoto, Japan",
    date: "April 2024",
    tripType: "Cultural Immersion"
  },
  {
    id: 4,
    name: "David & Claire Miller",
    country: "Australia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "The Maldives overwater bungalow package exceeded every high expectation. The marine biologist dive and private sandbank dinner made our 10th anniversary absolutely timeless.",
    destination: "Maldives Atolls",
    date: "March 2024",
    tripType: "Anniversary Celebration"
  },
  {
    id: 5,
    name: "Liam O'Connor",
    country: "Ireland",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "Flawless execution in the Swiss Alps! The Glacier Express first-class seats and luxury chalet in Zermatt facing the Matterhorn made this the best ski vacation of my life.",
    destination: "Swiss Alps, Switzerland",
    date: "February 2024",
    tripType: "Alpine Adventure"
  }
];

// Travel Packages
export const travelPackages = [
  {
    id: "pkg-luxury",
    name: "Signature Luxury Escapes",
    badge: "Most Popular",
    pricePerPerson: 1850,
    priceNote: "per person / week",
    description: "5-Star boutique hotels, private yacht charters, and curated fine dining.",
    features: [
      "5-Star Luxury Villa / Suite",
      "Private Chauffeur & VIP Transfers",
      "Personal 24/7 Dedicated Concierge",
      "Private Excursions & Yacht Charters",
      "Complimentary Spa Treatments"
    ]
  },
  {
    id: "pkg-adventure",
    name: "Bespoke Cultural Adventure",
    badge: "Explorer Choice",
    pricePerPerson: 1390,
    priceNote: "per person / week",
    description: "Authentic local immersion, scenic trails, culinary workshops, and heritage stays.",
    features: [
      "Boutique Heritage Lodges",
      "Expert Local Historian Guide",
      "Small Private Group (Max 8)",
      "Daily Experiential Activities",
      "Traditional Culinary Masterclasses"
    ]
  },
  {
    id: "pkg-wellness",
    name: "Holistic Wellness Retreat",
    badge: "Mind & Body",
    pricePerPerson: 1650,
    priceNote: "per person / week",
    description: "Rejuvenating spa sanctuaries, organic gastronomy, yoga, and meditation in nature.",
    features: [
      "Eco-Luxury Rainforest Pavilion",
      "Daily Private Yoga & Sound Baths",
      "Personalized Organic Meal Plans",
      "Full Ayurvedic Body Treatments",
      "Airport VIP Arrival & Departure"
    ]
  }
];

// Booking Options (Dropdown & Selection Data)
export const bookingOptions = {
  destinations: [
    { id: "amalfi", name: "Amalfi Coast, Italy", basePrice: 1850 },
    { id: "bali", name: "Bali, Indonesia", basePrice: 1299 },
    { id: "santorini", name: "Santorini, Greece", basePrice: 2150 },
    { id: "kyoto", name: "Kyoto, Japan", basePrice: 1980 },
    { id: "swiss", name: "Swiss Alps & Zermatt", basePrice: 2450 },
    { id: "nz", name: "South Island, New Zealand", basePrice: 2280 },
    { id: "maldives", name: "Maldives Atolls", basePrice: 3100 },
    { id: "cappadocia", name: "Cappadocia, Turkey", basePrice: 1450 },
    { id: "iceland", name: "Reykjavik, Iceland", basePrice: 2190 },
    { id: "phuket", name: "Phuket & Phi Phi, Thailand", basePrice: 1150 },
    { id: "paris", name: "Paris & French Riviera", basePrice: 2350 },
    { id: "dubai", name: "Dubai & Desert Oasis", basePrice: 1750 }
  ],
  accommodationTypes: [
    { id: "luxury-villa", name: "5-Star Luxury Villa / Suite", multiplier: 1.25, badge: "Premium" },
    { id: "boutique-hotel", name: "Boutique Heritage Hotel", multiplier: 1.0, badge: "Standard" },
    { id: "eco-resort", name: "Eco-Lodge & Glamping Pavilion", multiplier: 1.15, badge: "Eco" },
    { id: "overwater-bungalow", name: "Overwater Ocean Bungalow", multiplier: 1.5, badge: "Ultra-Luxury" }
  ],
  travelClasses: [
    { id: "first-class", name: "First Class / Private Jet Chauffeur", cost: 1200 },
    { id: "business-class", name: "Business Class VIP Transfer", cost: 650 },
    { id: "premium-economy", name: "Premium Executive Coach & Rail", cost: 250 },
    { id: "standard-transfer", name: "Standard Private Chauffeur", cost: 0 }
  ],
  budgetRanges: [
    "$1,000 - $2,500 per person",
    "$2,500 - $5,000 per person",
    "$5,000 - $10,000 per person",
    "$10,000+ Bespoke Ultra-Luxury"
  ],
  activitiesList: [
    "Private Yacht Charter",
    "Culinary & Wine Masterclass",
    "Helicopter & Balloon Flights",
    "Spa & Ayurvedic Wellness",
    "Historical Temple Access",
    "Scuba & Marine Safari",
    "Photography Expeditions"
  ]
};

// Navigation Links
export const navigationLinks = [
  { name: "Home", href: "#hero" },
  { name: "Destinations", href: "#destinations" },
  { name: "Travel Tips", href: "#stories" },
  { name: "Gallery", href: "#gallery" },
  { name: "About Me", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "Booking", href: "#booking" },
  { name: "Contact", href: "#contact" }
];

// Footer Links
export const footerLinks = {
  explore: [
    { name: "Destinations", href: "#destinations" },
    { name: "Travel Tips", href: "#stories" },
    { name: "Itineraries", href: "#booking" },
    { name: "Photography", href: "#gallery" },
    { name: "Resources", href: "#about" }
  ],
  quickLinks: [
    { name: "Featured Stories", href: "#stories" },
    { name: "Curated Destinations", href: "#destinations" },
    { name: "Bespoke Packages", href: "#booking" },
    { name: "Travel Gallery", href: "#gallery" },
    { name: "Traveler Reviews", href: "#reviews" }
  ],
  about: [
    { name: "About Me", href: "#about" },
    { name: "Work With Me", href: "#contact" },
    { name: "Press & Media", href: "#about" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" }
  ],
  support: [
    { name: "FAQ & Booking Guide", href: "#booking" },
    { name: "Concierge Inquiries", href: "#contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Safety & Sustainability", href: "#about" }
  ],
  shop: [
    { name: "Travel Guides", href: "#destinations" },
    { name: "E-books", href: "#stories" },
    { name: "Prints", href: "#gallery" },
    { name: "Travel Gear", href: "#booking" }
  ],
  contact: [
    { label: "Email", value: "hello@roamstory.com", href: "mailto:hello@roamstory.com" },
    { label: "Location", value: "Bali, Indonesia", href: "#" },
    { label: "Work With Me", value: "Partnerships & Press", href: "#contact" }
  ]
};

// Social Media Links
export const socialLinks = [
  { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
  { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
  { name: "Pinterest", icon: "Share2", url: "https://pinterest.com" },
  { name: "YouTube", icon: "Youtube", url: "https://youtube.com" },
  { name: "Twitter", icon: "Twitter", url: "https://twitter.com" }
];

// FAQs
export const faqs = [
  {
    question: "How do bespoke bookings work with RoamStory?",
    answer: "Once you submit your booking request with your preferred destination, travel dates, and luxury preferences, our dedicated travel specialist will craft an individualized itinerary within 24 hours and arrange a private consultation."
  },
  {
    question: "Can I customize the included experiences in my package?",
    answer: "Absolutely. Every journey is 100% customizable. You can swap private yacht charters for helicopter tours, extend your stay, upgrade villas, or request private dietary accommodations."
  },
  {
    question: "What is the cancellation and flexible booking policy?",
    answer: "We offer flexible cancellation up to 30 days before departure with full credit rollover, complimentary rebooking dates, and comprehensive travel insurance partnerships."
  },
  {
    question: "Are flights included in the package prices?",
    answer: "Our package prices include all in-destination private transport, luxury internal flights/transfers (such as Maldivian seaplanes or Swiss alpine rail), and VIP airport greeting. We can also coordinate international business or first-class airfare upon request."
  }
];
