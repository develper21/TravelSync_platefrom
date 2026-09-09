import mongoose from 'mongoose';
import Hotel from '../models/Hotel.js';
import Destination from '../models/Destination.js';
import Blog from '../models/Blog.js';

export const seedHotels = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, skipping seedHotels.');
      return;
    }
    const existingHotels = await Hotel.countDocuments();
    if (existingHotels === 0) {
      const hotels = [
        {
          name: "Eco Resort Bali",
          location: {
            city: "Ubud",
            country: "Indonesia",
            address: "Jl. Raya Pengosekan, Ubud",
            coordinates: { lat: -8.5069, lng: 115.2624 }
          },
          rating: 4.8,
          price: { min: 120, max: 350, currency: "USD" },
          amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Yoga Classes"],
          images: ["/images/bali.png"],
          description: "A sustainable eco-resort nestled in the heart of Ubud's rice terraces, offering authentic Balinese experiences with modern comfort.",
          ecoFriendly: true,
          sustainability: {
            certifications: ["Green Globe", "EarthCheck"],
            practices: ["Solar Power", "Water Conservation", "Local Sourcing", "Waste Management"]
          },
          rooms: [
            {
              type: "Deluxe Garden View",
              capacity: 2,
              price: 180,
              amenities: ["Balcony", "Rain Shower", "Organic Toiletries"],
              available: true
            },
            {
              type: "Suite with Pool",
              capacity: 4,
              price: 320,
              amenities: ["Private Pool", "Living Area", "Kitchenette"],
              available: true
            }
          ]
        },
        {
          name: "Sustainable City Hotel",
          location: {
            city: "Tokyo",
            country: "Japan",
            address: "Shibuya 2-1-1, Tokyo",
            coordinates: { lat: 35.6580, lng: 139.7016 }
          },
          rating: 4.6,
          price: { min: 200, max: 450, currency: "USD" },
          amenities: ["Free WiFi", "Fitness Center", "Business Center", "Concierge"],
          images: ["/images/tokyo.png"],
          description: "Modern sustainable hotel in the heart of Shibuya, featuring energy-efficient design and locally sourced materials.",
          ecoFriendly: true,
          sustainability: {
            certifications: ["LEED Gold"],
            practices: ["Energy Efficiency", "Recycling Program", "Green Cleaning"]
          },
          rooms: [
            {
              type: "Compact Queen",
              capacity: 2,
              price: 220,
              amenities: ["Smart TV", "Air Purifier", "Eco Shower"],
              available: true
            }
          ]
        },
        {
          name: "Green Horizon Paris",
          location: {
            city: "Paris",
            country: "France",
            address: "Rue de Rivoli 14",
            coordinates: { lat: 48.8566, lng: 2.3522 }
          },
          rating: 4.7,
          price: { min: 180, max: 400, currency: "USD" },
          amenities: ["Free WiFi", "Organic Cafe", "Bicycle Rental", "Rooftop Garden"],
          images: ["/images/paris.png"],
          description: "Boutique eco-friendly hotel near the Louvre, powered by 100% renewable energy.",
          ecoFriendly: true,
          sustainability: {
            certifications: ["EU Ecolabel"],
            practices: ["100% Renewable Electricity", "Zero Single-use Plastic", "Organic Breakfast"]
          },
          rooms: [
            {
              type: "Classic Eco Room",
              capacity: 2,
              price: 190,
              amenities: ["Fair-trade Linens", "City View"],
              available: true
            }
          ]
        }
      ];

      await Hotel.insertMany(hotels);
      console.log('Hotels seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding hotels:', error);
  }
};

export const seedDestinations = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, skipping seedDestinations.');
      return;
    }
    const existing = await Destination.countDocuments();
    if (existing === 0) {
      const destinations = [
        {
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
          reviews: [
            {
              name: "Rahul Verma",
              rating: 4,
              comment: "Mindblowing modern architecture and hospitality.",
              createdAt: new Date("2024-01-14")
            }
          ]
        },
        {
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
          highlights: ["Baa Atoll UNESCO Biosphere", "Private Sandbank Picnic", "Male Old Friday Mosque"],
          travelTips: ["Choose eco-certified resorts supporting marine biology", "November to April has clearest waters"],
          bestTimeToVisit: "November to April",
          mapEmbedUrl: "https://maps.google.com/maps?q=Maldives&t=&z=9&ie=UTF8&iwloc=&output=embed",
          reviews: [
            {
              name: "Jessica Taylor",
              rating: 5,
              comment: "Paradise on earth! The marine life is astounding and conservation efforts are inspiring.",
              createdAt: new Date("2024-03-05")
            }
          ]
        },
        {
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
          highlights: ["Tower of London", "British Museum", "Big Ben & Westminster", "Hyde Park"],
          travelTips: ["Tap in and out with contactless cards on the Underground", "Most major national museums are free entry"],
          bestTimeToVisit: "May to October",
          mapEmbedUrl: "https://maps.google.com/maps?q=London,%20UK&t=&z=11&ie=UTF8&iwloc=&output=embed",
          reviews: [
            {
              name: "Liam O'Connor",
              rating: 4,
              comment: "So much rich history and walkable green parks right in the city center.",
              createdAt: new Date("2024-02-19")
            }
          ]
        },
        {
          name: "Kyoto, Japan",
          location: "Japan",
          description: "Japan's cultural heartland home to thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional geisha culture.",
          images: ["/images/kyoto.png"],
          tags: ["Temples", "Culture", "Nature", "Eco-Friendly"],
          type: "Heritage & Nature",
          ecoFriendly: true,
          rating: 4.8,
          priceEstimate: "₹28,000",
          experiences: ["Arashiyama Bamboo Grove Walk", "Fushimi Inari Torii Gate Hike", "Traditional Zen Meditation Session"],
          highlights: ["Fushimi Inari Shrine", "Kinkaku-ji (Golden Pavilion)", "Gion District", "Kiyomizu-dera"],
          travelTips: ["Visit popular shrines early in the morning", "Rent a bicycle to explore quiet canal paths"],
          bestTimeToVisit: "March to May (Cherry Blossoms) & October to November (Fall Foliage)",
          mapEmbedUrl: "https://maps.google.com/maps?q=Kyoto,%20Japan&t=&z=11&ie=UTF8&iwloc=&output=embed",
          reviews: [
            {
              name: "Maya Patel",
              rating: 5,
              comment: "Peaceful, spiritual, and deeply restorative. The bamboo groves are magical.",
              createdAt: new Date("2024-03-02")
            }
          ]
        },
        {
          name: "Rome, Italy",
          location: "Italy",
          description: "The Eternal City boasts nearly 3,000 years of globally influential art, architecture and culture, filled with iconic ruins and world-class cuisine.",
          images: ["/images/rome.png"],
          tags: ["History", "Food", "Architecture", "Culture"],
          type: "Historic & Culinary",
          ecoFriendly: false,
          rating: 4.7,
          priceEstimate: "₹32,000",
          experiences: ["Colosseum Underground Access Tour", "Trastevere Artisan Pasta Walk", "Trevi Fountain at Dawn"],
          highlights: ["Colosseum & Roman Forum", "Vatican Museums & Sistine Chapel", "Pantheon", "Piazza Navona"],
          travelTips: ["Drink water from public 'nasoni' fountains for free", "Book Vatican and Colosseum tickets well in advance"],
          bestTimeToVisit: "April to June & September to October",
          mapEmbedUrl: "https://maps.google.com/maps?q=Rome,%20Italy&t=&z=11&ie=UTF8&iwloc=&output=embed",
          reviews: [
            {
              name: "Marco Rossi",
              rating: 5,
              comment: "Living history on every street corner and the best food imaginable.",
              createdAt: new Date("2024-01-29")
            }
          ]
        }
      ];

      await Destination.insertMany(destinations);
      console.log('Destinations seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding destinations:', error);
  }
};

export const seedBlogs = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, skipping seedBlogs.');
      return;
    }
    const existing = await Blog.countDocuments();
    if (existing === 0) {
      const blogs = [
        {
          title: "10 Essential Tips for Eco-Friendly Travel in 2025",
          slug: "10-essential-tips-for-eco-friendly-travel-in-2025",
          author: "Sarah Green",
          authorAvatar: "",
          readTime: "5 min read",
          image: "/images/blog1.png",
          excerpt: "Discover how to minimize your carbon footprint and environmental impact while deeply experiencing world cultures.",
          content: `Sustainable tourism is no longer a niche preference—it's an essential responsibility for every global citizen. In this comprehensive guide, we unpack ten practical habits you can adopt today:

1. **Pack Light, Fly Direct**: Fuel efficiency increases dramatically with less aircraft weight. Whenever possible, choose non-stop routes which reduce takeoff and landing emissions.
2. **Prioritize Eco-Certified Accommodations**: Look for properties certified by Green Globe, EarthCheck, or LEED. These hotels monitor their water consumption, solar power usage, and organic local sourcing.
3. **Carry a Reusable Toolkit**: A durable insulated water bottle, stainless steel straw, and lightweight tote bag save hundreds of single-use plastics on every getaway.
4. **Support Local Food Ecosystems**: Skip multinational chain restaurants and dine at farmers markets and family-run trattorias or warungs. You reduce food transport miles and directly uplift resident entrepreneurs.
5. **Use Green Mobility**: Explore cities by electric bike, commuter rail, or by foot. Not only do you cut emissions, but you also discover hidden architectural details no highway tourist ever sees.
6. **Respect Wildlife & Coral Reefs**: Use mineral-based, reef-safe sunscreen (free of oxybenzone) when swimming near reefs. Never support exploitative captive animal rides.
7. **Conserve Hotel Resources**: Decline daily towel and linen replacement. It saves thousands of liters of clean water and harsh detergents.
8. **Honor Indigenous Heritage**: Always adhere to dress codes at sacred shrines, ask permission before photographing people, and purchase authentic crafts directly from artisans.
9. **Opt for Off-Peak Seasons**: Over-tourism stresses delicate municipal infrastructures. Visiting shoulder seasons balances the local economy and provides a serene journey for you.
10. **Leave No Trace**: Always carry trash back to municipal recycling bins, even on remote jungle hikes and sand dunes.`,
          tags: ["Eco-Travel", "Sustainability", "Guides", "Tips"],
          comments: [
            {
              name: "David Miller",
              comment: "Super practical tips! Using reef-safe sunscreen is so important and overlooked.",
              createdAt: new Date("2024-03-12")
            }
          ]
        },
        {
          title: "Hidden Gems in Southeast Asia: Off The Beaten Path",
          slug: "hidden-gems-in-southeast-asia",
          author: "Mike Explorer",
          authorAvatar: "",
          readTime: "7 min read",
          image: "/images/blog2.png",
          excerpt: "Escape crowded tourist hubs and explore pristine landscapes, quiet fishing villages, and authentic heritage.",
          content: `Southeast Asia is celebrated worldwide, yet most itineraries funnel travelers into identical bucket-list checkpoints. Beyond the bustling streets of Bangkok and Bali lies a serene world of emerald rivers, limestone peaks, and heartwarming homestays:

- **Munduk & Sidemen, Bali**: While southern beach clubs thrive with music, Sidemen offers mist-shrouded valleys, organic coffee plantations, and authentic artisan weaving.
- **Nong Khiaw, Laos**: Tucked away between dramatic karst mountains, this riverside haven invites you to kayak along the Nam Ou River and hike to panoramic viewpoints.
- **Koh Rong Sanloem, Cambodia**: Phosphorescent plankton light up the tranquil bays at night, offering a peaceful sanctuary far removed from motorized traffic.

Traveling sustainably in these delicate ecosystems means leaving minimal plastic waste, staying in community-owned guest lodges, and learning words of gratitude in the local language.`,
          tags: ["Adventure", "Southeast Asia", "Hidden Gems", "Culture"],
          comments: [
            {
              name: "Ananya Roy",
              comment: "Sidemen was the absolute highlight of my trip to Indonesia. Great recommendation!",
              createdAt: new Date("2024-03-14")
            }
          ]
        },
        {
          title: "Sustainable Hotel Guide: What Really Makes a Stay Eco-Friendly?",
          slug: "sustainable-hotel-guide",
          author: "Emma Sustainable",
          authorAvatar: "",
          readTime: "6 min read",
          image: "/images/blog3.png",
          excerpt: "Learn how to look past greenwashing and recognize genuine ecological commitments in modern hospitality.",
          content: `Many hotels claim to be 'green' simply by asking guests to reuse bath towels. But authentic eco-hospitality goes far deeper:

### 1. Energy Independence
True eco-resorts produce their own clean energy using rooftop solar panels, geothermal heat pumps, or micro-hydro generators.

### 2. Water Harvesting & Greywater Recycling
Advanced properties collect rainwater during monsoon seasons and filter sink water for botanical garden irrigation.

### 3. Circular Waste Management
The best hotels maintain on-site organic composting, partner with local pig and poultry farms for food scraps, and completely eliminate plastic packaging in guest amenities.

Next time you book your stay on TravelSync, look for our verified **Eco-Friendly** badge for guaranteed sustainability standards!`,
          tags: ["Hotels", "Green Living", "Eco-Friendly"],
          comments: []
        }
      ];

      await Blog.insertMany(blogs);
      console.log('Blogs seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding blogs:', error);
  }
};

export const seedDemoUserAndActivity = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, skipping seedDemoUserAndActivity.');
      return;
    }

    const User = (await import('../models/User.js')).default;
    const Trip = (await import('../models/Trip.js')).default;
    const Booking = (await import('../models/Booking.js')).default;
    const Payment = (await import('../models/Payment.js')).default;

    let demoUser = await User.findOne({ email: 'demo@travelsync.com' });
    if (!demoUser) {
      // Find Bali & Paris destinations for wishlist
      const bali = await Destination.findOne({ name: /Bali/i });
      const paris = await Destination.findOne({ name: /Paris/i });

      demoUser = new User({
        fullName: 'Demo Traveler',
        email: 'demo@travelsync.com',
        password: 'TravelSync@123',
        phone: '+91 9876543210',
        country: 'India',
        savedDestinations: [bali?._id, paris?._id].filter(Boolean),
        preferences: {
          emailNotifications: true,
          tripReminders: true,
          ecoFriendlySuggestions: true,
          language: 'en'
        },
        paymentMethods: [
          {
            cardType: 'Visa',
            last4: '4242',
            expiry: '12/28',
            cardHolderName: 'Demo Traveler',
            billingAddress: 'MG Road, Bengaluru, India'
          }
        ]
      });

      await demoUser.save();
      console.log('Demo user seeded: demo@travelsync.com / TravelSync@123');

      // Create a confirmed trip
      const trip1 = new Trip({
        userId: demoUser._id,
        title: 'Trip to Bali, Indonesia',
        destination: 'Bali, Indonesia',
        destinationId: bali?._id,
        startDate: new Date('2025-05-10'),
        endDate: new Date('2025-05-18'),
        travelers: 2,
        budget: 35000,
        estimatedCost: 35000,
        status: 'confirmed',
        selectedHotel: { name: 'Eco Resort Bali', price: '$180 / night' },
        activities: [
          { day: 1, activity: 'Ubud Rice Terrace Trek', price: 2500 },
          { day: 2, activity: 'Organic Cooking Class', price: 3000 }
        ]
      });
      await trip1.save();

      // Create a planning trip
      const trip2 = new Trip({
        userId: demoUser._id,
        title: 'Trip to Kyoto, Japan',
        destination: 'Kyoto, Japan',
        startDate: new Date('2025-10-01'),
        endDate: new Date('2025-10-08'),
        travelers: 1,
        budget: 28000,
        estimatedCost: 28000,
        status: 'planning'
      });
      await trip2.save();

      // Create confirmed Booking
      const booking = new Booking({
        userId: demoUser._id,
        tripId: trip1._id,
        type: 'package',
        title: 'Vacation Package: Bali, Indonesia',
        location: 'Bali, Indonesia',
        checkInDate: new Date('2025-05-10'),
        checkOutDate: new Date('2025-05-18'),
        price: 35000,
        amount: 35000,
        status: 'confirmed',
        paymentStatus: 'Paid',
        paymentMethod: 'Credit Card',
        details: { hotel: 'Eco Resort Bali', travelers: 2 }
      });
      await booking.save();

      // Create Payment
      const payment = new Payment({
        userId: demoUser._id,
        tripId: trip1._id,
        bookingId: booking._id,
        amount: 35000,
        currency: 'INR',
        paymentMethod: 'Card',
        status: 'completed',
        transactionId: 'TXN_' + Date.now()
      });
      await payment.save();

      console.log('Demo user trips, bookings, and payments seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding demo user activity:', error);
  }
};

export const seedAllData = async () => {
  await seedHotels();
  await seedDestinations();
  await seedBlogs();
  await seedDemoUserAndActivity();
};

export default seedAllData;
