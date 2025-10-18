import Hotel from '../models/Hotel.js';

export const seedHotels = async () => {
  try {
    // Check if hotels already exist
    const existingHotels = await Hotel.countDocuments();
    if (existingHotels > 0) {
      console.log('Hotels already exist in database');
      return;
    }

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
        images: ["/images/bali-hotel.jpg"],
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
        images: ["/images/tokyo-hotel.jpg"],
        description: "Modern sustainable hotel in the heart of Shibuya, featuring energy-efficient design and locally sourced materials.",
        ecoFriendly: true,
        sustainability: {
          certifications: ["LEED Gold"],
          practices: ["Energy Efficient", "Recycling Program", "Green Transportation"]
        },
        rooms: [
          {
            type: "Standard Room",
            capacity: 2,
            price: 220,
            amenities: ["City View", "Work Desk", "Smart TV"],
            available: true
          },
          {
            type: "Executive Suite",
            capacity: 3,
            price: 380,
            amenities: ["Living Area", "Kitchen", "Balcony"],
            available: true
          }
        ]
      },
      {
        name: "Historic Eco Lodge",
        location: {
          city: "Kyoto",
          country: "Japan",
          address: "Gion District, Kyoto",
          coordinates: { lat: 35.0038, lng: 135.7680 }
        },
        rating: 4.9,
        price: { min: 150, max: 400, currency: "USD" },
        amenities: ["Traditional Onsen", "Tea Ceremony", "Garden", "Restaurant"],
        images: ["/images/kyoto-hotel.jpg"],
        description: "Traditional Japanese ryokan renovated with sustainable practices, preserving cultural heritage while embracing modern eco-standards.",
        ecoFriendly: true,
        sustainability: {
          certifications: ["Japan Eco Mark"],
          practices: ["Traditional Architecture", "Local Crafts", "Seasonal Ingredients"]
        },
        rooms: [
          {
            type: "Traditional Room",
            capacity: 2,
            price: 180,
            amenities: ["Tatami Mats", "Futon Bedding", "Garden View"],
            available: true
          },
          {
            type: "Deluxe Suite",
            capacity: 4,
            price: 350,
            amenities: ["Private Onsen", "Living Area", "Balcony"],
            available: true
          }
        ]
      },
      {
        name: "Coastal Eco Retreat",
        location: {
          city: "Santorini",
          country: "Greece",
          address: "Oia Village, Santorini",
          coordinates: { lat: 36.4618, lng: 25.3764 }
        },
        rating: 4.7,
        price: { min: 250, max: 600, currency: "USD" },
        amenities: ["Infinity Pool", "Sea View", "Restaurant", "Spa", "Private Beach"],
        images: ["/images/santorini-hotel.jpg"],
        description: "Luxurious eco-retreat perched on Santorini's cliffs, combining breathtaking views with sustainable luxury.",
        ecoFriendly: true,
        sustainability: {
          certifications: ["Green Key"],
          practices: ["Solar Power", "Water Desalination", "Organic Farming"]
        },
        rooms: [
          {
            type: "Sea View Room",
            capacity: 2,
            price: 280,
            amenities: ["Balcony", "Jacuzzi", "Sunset View"],
            available: true
          },
          {
            type: "Villa with Pool",
            capacity: 6,
            price: 550,
            amenities: ["Private Pool", "Terrace", "Kitchen"],
            available: true
          }
        ]
      },
      {
        name: "Urban Green Hotel",
        location: {
          city: "Paris",
          country: "France",
          address: "Champs-Élysées, Paris",
          coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        rating: 4.5,
        price: { min: 300, max: 800, currency: "USD" },
        amenities: ["Rooftop Garden", "Fitness Center", "Fine Dining", "Concierge"],
        images: ["/images/paris-hotel.jpg"],
        description: "Elegant hotel in the heart of Paris featuring vertical gardens and sustainable urban design.",
        ecoFriendly: true,
        sustainability: {
          certifications: ["EU Ecolabel"],
          practices: ["Vertical Gardens", "Energy Management", "Local Partnerships"]
        },
        rooms: [
          {
            type: "Classic Room",
            capacity: 2,
            price: 320,
            amenities: ["City View", "Marble Bathroom", "Work Desk"],
            available: true
          },
          {
            type: "Executive Suite",
            capacity: 4,
            price: 650,
            amenities: ["Balcony", "Living Area", "Premium Amenities"],
            available: true
          }
        ]
      }
    ];

    await Hotel.insertMany(hotels);
    console.log('✅ Sample hotels seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding hotels:', error);
  }
};

export default seedHotels;
