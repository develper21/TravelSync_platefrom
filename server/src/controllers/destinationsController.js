import mongoose from 'mongoose';
import Destination from '../models/Destination.js';

// In-memory fallback dataset for offline/disconnected operation
let fallbackDestinations = [
  {
    _id: "6501a1111111111111111101",
    name: "Bali, Indonesia",
    location: "Indonesia",
    description: "Tropical paradise famous for forested volcanic mountains, iconic rice paddies, beaches and coral reefs with ancient temples.",
    images: ["/images/bali.png", "/images/bali-hotel.jpg"],
    tags: ["Beach", "Culture", "Adventure", "Eco-Friendly", "Spiritual"],
    type: "Tropical & Cultural",
    ecoFriendly: true,
    rating: 4.8,
    priceEstimate: "₹25,000",
    experiences: ["Sunrise Mount Batur Trek", "Ubud Organic Farm Tour", "Sacred Monkey Forest Exploration", "Traditional Batik Workshop"],
    highlights: ["Uluwatu Cliff Temple", "Tegallalang Rice Terraces", "Seminyak Sunsets", "Nusa Penida Day Trip"],
    travelTips: ["Best season: April to October", "Respect sacred temple dress codes", "Rent an EV scooter or bicycle in Ubud"],
    bestTimeToVisit: "April to October",
    mapEmbedUrl: "https://maps.google.com/maps?q=Bali,%20Indonesia&t=&z=10&ie=UTF8&iwloc=&output=embed",
    reviews: [
      {
        name: "Amit Sharma",
        rating: 5,
        comment: "Incredible sustainable resorts and friendly locals! The eco-tours in Ubud were unforgettable.",
        createdAt: new Date("2024-03-01")
      },
      {
        name: "Elena Rostova",
        rating: 4,
        comment: "Beautiful beaches and rich culture. Loved supporting community-run conservation programs.",
        createdAt: new Date("2024-03-10")
      }
    ]
  },
  {
    _id: "6501a1111111111111111102",
    name: "Paris, France",
    location: "France",
    description: "The City of Light captivates travelers with monumental landmarks, art collections, chic cafes, and world-class sustainable public transit.",
    images: ["/images/paris.png"],
    tags: ["Landmarks", "Romance", "Culture", "Food"],
    type: "Urban & Cultural",
    ecoFriendly: true,
    rating: 4.9,
    priceEstimate: "₹45,000",
    experiences: ["Seine River Electric Boat Cruise", "Louvre Guided Art Walk", "Montmartre Organic Bakery Crawl"],
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées"],
    travelTips: ["Use the Paris Metro or Velib bikes", "Book museum passes in advance to skip lines"],
    bestTimeToVisit: "May to September",
    mapEmbedUrl: "https://maps.google.com/maps?q=Paris,%20France&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: [
      {
        name: "Sophia Martinez",
        rating: 5,
        comment: "Paris exceeded all expectations. Cycling through the historic districts was super easy and scenic.",
        createdAt: new Date("2024-02-15")
      }
    ]
  },
  {
    _id: "6501a1111111111111111103",
    name: "Tokyo, Japan",
    location: "Japan",
    description: "A neon-lit metropolis seamlessly fusing ultra-modern innovation, centuries-old shrines, Michelin-star dining, and zero-waste initiatives.",
    images: ["/images/tokyo.png", "/images/tokyo-hotel.jpg"],
    tags: ["Technology", "Culture", "Food", "Eco-Friendly"],
    type: "Urban & Futuristic",
    ecoFriendly: true,
    rating: 4.7,
    priceEstimate: "₹35,000",
    experiences: ["Shibuya Crossing Photo Walk", "Tea Ceremony in Historic Asakusa", "Zero-Waste Cooking Masterclass"],
    highlights: ["Senso-ji Temple", "Tokyo Skytree", "Meiji Jingu Shrine", "Shinjuku Gyoen National Garden"],
    travelTips: ["Get an IC transit card (Suica/Pasmo)", "Carry your own reusable bag and bottle"],
    bestTimeToVisit: "March to May & September to November",
    mapEmbedUrl: "https://maps.google.com/maps?q=Tokyo,%20Japan&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: [
      {
        name: "Kenji Sato",
        rating: 5,
        comment: "Incredibly clean city with the best public transit network in the world.",
        createdAt: new Date("2024-01-20")
      }
    ]
  },
  {
    _id: "6501a1111111111111111104",
    name: "Santorini, Greece",
    location: "Greece",
    description: "Iconic whitewashed cubic houses clinging to caldera cliffs overlooking the Aegean Sea, bathed in world-renowned golden sunsets.",
    images: ["/images/santorini.png"],
    tags: ["Sunsets", "Architecture", "Romance", "Coast"],
    type: "Island & Coastal",
    ecoFriendly: false,
    rating: 4.9,
    priceEstimate: "₹40,000",
    experiences: ["Oia Caldera Sunset Watch", "Volcanic Vineyard Wine Tasting", "Catamaran Sailing across Red Beach"],
    highlights: ["Oia Village", "Fira Cliffs", "Akrotiri Archaeological Site", "Perissa Black Sand Beach"],
    travelTips: ["Stay on the caldera side for sunset views", "Wear comfortable shoes for stone stairways"],
    bestTimeToVisit: "Late April to early November",
    mapEmbedUrl: "https://maps.google.com/maps?q=Santorini,%20Greece&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: [
      {
        name: "Chloe Dupont",
        rating: 5,
        comment: "The most magical sunset on earth. Truly breathtaking views!",
        createdAt: new Date("2024-02-28")
      }
    ]
  },
  {
    _id: "6501a1111111111111111105",
    name: "Dubai, UAE",
    location: "United Arab Emirates",
    description: "Global hub of futuristic architecture, luxury retail, and expansive desert safaris now pioneering sustainable green city developments.",
    images: ["/images/dubai.png"],
    tags: ["Luxury", "Adventure", "Shopping", "Architecture"],
    type: "Luxury Metropolis",
    ecoFriendly: false,
    rating: 4.6,
    priceEstimate: "₹30,000",
    experiences: ["Desert Dune Conservation Safari", "Burj Khalifa Observation Deck", "Dhow Cruise Dinner in Marina"],
    highlights: ["Burj Khalifa", "The Dubai Mall", "Palm Jumeirah", "Museum of the Future"],
    travelTips: ["Visit between November and March for pleasant weather", "Metro connects major tourist hubs"],
    bestTimeToVisit: "November to March",
    mapEmbedUrl: "https://maps.google.com/maps?q=Dubai,%20UAE&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: []
  },
  {
    _id: "6501a1111111111111111106",
    name: "Maldives",
    location: "Maldives",
    description: "Pristine Indian Ocean archipelago with crystal-clear turquoise lagoons, protected coral reefs, and solar-powered overwater villas.",
    images: ["/images/maldives.png"],
    tags: ["Beaches", "Luxury", "Romance", "Eco-Friendly", "Diving"],
    type: "Island & Marine",
    ecoFriendly: true,
    rating: 4.9,
    priceEstimate: "₹60,000",
    experiences: ["Manta Ray Snorkeling Safari", "Coral Reef Restoration Workshop", "Undersea Restaurant Dining"],
    highlights: ["Baa Atoll UNESCO Biosphere", "Private Sandbank Picnic"],
    travelTips: ["Choose eco-certified resorts supporting marine biology", "November to April has clearest waters"],
    bestTimeToVisit: "November to April",
    mapEmbedUrl: "https://maps.google.com/maps?q=Maldives&t=&z=9&ie=UTF8&iwloc=&output=embed",
    reviews: []
  },
  {
    _id: "6501a1111111111111111107",
    name: "London, UK",
    location: "United Kingdom",
    description: "Historic global capital spanning two millennia of history, world-renowned West End theater, free national museums, and expansive royal parks.",
    images: ["/images/london.png"],
    tags: ["History", "Museums", "Culture", "Royal"],
    type: "Historic Metropolis",
    ecoFriendly: true,
    rating: 4.5,
    priceEstimate: "₹35,000",
    experiences: ["Thames Walk & Tower Bridge", "West End Musical Evening", "Borough Market Sustainable Food Tour"],
    highlights: ["Tower of London", "British Museum", "Big Ben & Westminster"],
    travelTips: ["Tap in and out with contactless cards on the Underground", "Most major national museums are free entry"],
    bestTimeToVisit: "May to October",
    mapEmbedUrl: "https://maps.google.com/maps?q=London,%20UK&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: []
  },
  {
    _id: "6501a1111111111111111108",
    name: "Kyoto, Japan",
    location: "Japan",
    description: "Japan's cultural heartland home to thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional geisha culture.",
    images: ["/images/kyoto.png"],
    tags: ["Temples", "Culture", "Nature", "Eco-Friendly"],
    type: "Heritage & Nature",
    ecoFriendly: true,
    rating: 4.8,
    priceEstimate: "₹28,000",
    experiences: ["Arashiyama Bamboo Grove Walk", "Fushimi Inari Torii Gate Hike"],
    highlights: ["Fushimi Inari Shrine", "Kinkaku-ji (Golden Pavilion)", "Gion District"],
    travelTips: ["Visit popular shrines early in the morning", "Rent a bicycle to explore quiet canal paths"],
    bestTimeToVisit: "March to May & October to November",
    mapEmbedUrl: "https://maps.google.com/maps?q=Kyoto,%20Japan&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: []
  },
  {
    _id: "6501a1111111111111111109",
    name: "Rome, Italy",
    location: "Italy",
    description: "The Eternal City boasts nearly 3,000 years of globally influential art, architecture and culture, filled with iconic ruins and world-class cuisine.",
    images: ["/images/rome.png"],
    tags: ["History", "Food", "Architecture", "Culture"],
    type: "Historic & Culinary",
    ecoFriendly: false,
    rating: 4.7,
    priceEstimate: "₹32,000",
    experiences: ["Colosseum Underground Access Tour", "Trastevere Artisan Pasta Walk"],
    highlights: ["Colosseum & Roman Forum", "Vatican Museums & Sistine Chapel"],
    travelTips: ["Drink water from public fountains for free", "Book Vatican tickets in advance"],
    bestTimeToVisit: "April to June & September to October",
    mapEmbedUrl: "https://maps.google.com/maps?q=Rome,%20Italy&t=&z=11&ie=UTF8&iwloc=&output=embed",
    reviews: []
  }
];

export const getDestinations = async (req, res) => {
  try {
    const { search, tag, ecoFriendly, page = 1, limit = 12 } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      if (tag && tag !== 'All') {
        query.tags = { $in: [tag] };
      }
      if (ecoFriendly === 'true') {
        query.ecoFriendly = true;
      }

      const skip = (Number(page) - 1) * Number(limit);
      const total = await Destination.countDocuments(query);
      const destinations = await Destination.find(query)
        .sort({ rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      return res.json({
        destinations,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit))
      });
    }

    // In-memory fallback
    let filtered = [...fallbackDestinations];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(s) ||
        d.location.toLowerCase().includes(s) ||
        d.description.toLowerCase().includes(s)
      );
    }
    if (tag && tag !== 'All') {
      filtered = filtered.filter(d => (d.tags || []).includes(tag));
    }
    if (ecoFriendly === 'true') {
      filtered = filtered.filter(d => d.ecoFriendly);
    }

    const total = filtered.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginated = filtered.slice(skip, skip + Number(limit));

    res.json({
      destinations: paginated,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const destination = await Destination.findById(req.params.id);
      if (destination) return res.json(destination);
    }

    const fallback = fallbackDestinations.find(d => d._id === req.params.id || d.name.toLowerCase().includes(req.params.id.toLowerCase()));
    if (!fallback) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(fallback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const destination = new Destination(req.body);
      await destination.save();
      return res.status(201).json(destination);
    }
    const newDest = { ...req.body, _id: "local_" + Date.now() };
    fallbackDestinations.unshift(newDest);
    res.status(201).json(newDest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const destination = await Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (destination) return res.json(destination);
    }
    const idx = fallbackDestinations.findIndex(d => d._id === req.params.id);
    if (idx !== -1) {
      fallbackDestinations[idx] = { ...fallbackDestinations[idx], ...req.body };
      return res.json(fallbackDestinations[idx]);
    }
    res.status(404).json({ error: 'Destination not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Destination.findByIdAndDelete(req.params.id);
    }
    fallbackDestinations = fallbackDestinations.filter(d => d._id !== req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = {
      user: req.user?._id,
      name: req.user?.fullName || req.body.name || 'Anonymous Traveler',
      rating: Number(rating) || 5,
      comment,
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const destination = await Destination.findById(req.params.id);
      if (destination) {
        destination.reviews.unshift(review);
        const totalRating = destination.reviews.reduce((acc, curr) => acc + curr.rating, 0);
        destination.rating = Number((totalRating / destination.reviews.length).toFixed(1));
        await destination.save();
        return res.status(201).json(destination);
      }
    }

    const dest = fallbackDestinations.find(d => d._id === req.params.id);
    if (dest) {
      if (!dest.reviews) dest.reviews = [];
      dest.reviews.unshift(review);
      const totalRating = dest.reviews.reduce((acc, curr) => acc + curr.rating, 0);
      dest.rating = Number((totalRating / dest.reviews.length).toFixed(1));
      return res.status(201).json(dest);
    }

    res.status(404).json({ error: 'Destination not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
