import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";

const PLACEHOLDER = "../../../public/Homepage.png";

const DestinationCard = ({ img = PLACEHOLDER, title, rating, desc }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
    <img src={img} alt={title} className="w-full h-64 object-cover" />
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex items-center text-orange-500 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.371 2.449c-.784.57-1.838-.197-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.641 9.387c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.96z" />
          </svg>
          <strong>{rating}</strong>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4">{desc}</p>
      <div className="mt-auto">
        <button className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
          View More
        </button>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-lg font-semibold mb-2 text-slate-900">{title}</h4>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

const Testimonial = ({ avatar = PLACEHOLDER, name, location, text }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
    <img
      src={avatar}
      alt={name}
      className="w-16 h-16 rounded-full object-cover mb-4"
    />
    <div className="font-semibold">
      {name} <span className="text-sm text-slate-400">/ {location}</span>
    </div>
    <p className="text-sm text-slate-600 mt-3">{text}</p>
  </div>
);

const Homepage = () => {
  const features = [
    {
      icon: <div className="text-3xl">✈️</div>,
      title: "Smart Trip Planner",
      desc: "Personalized itineraries using AI & local insights.",
    },
    {
      icon: <div className="text-3xl">🏨</div>,
      title: "Eco-Friendly Hotels",
      desc: "Curated stays that care for the planet.",
    },
    {
      icon: <div className="text-3xl">📍</div>,
      title: "Local Experiences",
      desc: "Connect with authentic adventures and culture.",
    },
    {
      icon: <div className="text-3xl">📞</div>,
      title: "24/7 Support",
      desc: "We're here whenever you need us, day or night.",
    },
  ];

  const destinations = [
    {
      img: "/public/home1.png",
      title: "Santorini, Greece",
      rating: "4.8",
      desc: "Stunning white-washed villages perched above crystal blue seas.",
    },
    {
      img: "/public/home2.png",
      title: "Kyoto, Japan",
      rating: "4.9",
      desc: "Experience timeless temples and blooming cherry blossoms.",
    },
    {
      img: "/public/home3.png",
      title: "Banff, Canada",
      rating: "4.7",
      desc: "Majestic mountains and emerald lakes in a dreamlike landscape.",
    },
    {
      img: "/public/home4.png",
      title: "Marrakech, Morocco",
      rating: "4.6",
      desc: "Vivid souks, spicy aromas, and vibrant ancient streets.",
    },
    {
      img: "/public/home5.png",
      title: "Reykjavik, Iceland",
      rating: "4.8",
      desc: "Chase the Northern Lights and soak in geothermal lagoons.",
    },
    {
      img: "/public/home6.png",
      title: "Cape Town, S. Africa",
      rating: "4.7",
      desc: "A coastal city with iconic mountains and rich culture.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      <section className="relative overflow-hidden">
        <div
          className="relative flex items-center justify-center h-[760px] sm:h-[700px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/Homepage.png')" }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(60,130,246,0.8), rgba(60,130,246,0.4) 50%, rgba(0,0,0,0))",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              Explore the World Smarter with{" "}
              <span className="text-green-500">TravelSync</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/90 max-w-md">
              Discover, plan, and book eco-friendly trips with ease. Your
              adventure starts here.
            </p>

            <div className="mt-8 bg-white/95 shadow-lg rounded-xl p-4 w-full max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-slate-700">
                    Destination
                  </label>
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Where to?"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-medium text-slate-700">
                    Date
                  </label>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <label className="block text-sm font-medium text-slate-700">
                    Type
                  </label>
                  <select className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <option>Hotel</option>
                    <option>Flight + Hotel</option>
                    <option>Experiences</option>
                  </select>
                </div>
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-medium text-transparent">
                    button
                  </label>
                  <button className="mt-2 w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-2 font-semibold flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Plan My Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <DestinationCard key={i} img={d.img} {...d} />
          ))}
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-slate-50 to-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-6">
            Why TravelSync?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <FeatureCard
                key={idx}
                icon={
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow text-2xl">
                    {f.icon}
                  </div>
                }
                title={f.title}
                desc={f.desc}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="bg-slate-50 rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Sample Itinerary</h4>
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-white shadow flex items-center justify-center">
                    ✈️
                  </div>
                  <div>
                    <div className="font-medium">Travel</div>
                    <div className="text-sm text-slate-500">
                      Flight to Kyoto, Japan – 09:30 AM
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-white shadow flex items-center justify-center">
                    🏨
                  </div>
                  <div>
                    <div className="font-medium">Stay</div>
                    <div className="text-sm text-slate-500">
                      Eco-Friendly Ryokan – 2 Nights
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-white shadow flex items-center justify-center">
                    🎎
                  </div>
                  <div>
                    <div className="font-medium">Activities</div>
                    <div className="text-sm text-slate-500">
                      Guided Cherry Blossom Tour, Tea Ceremony
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-slate-900 mb-3">
              Your journey, visualized
            </h4>
            <p className="text-slate-600 mb-6">
              TravelSync's itinerary builder lets you preview your entire trip
              at a glance—flights, stays, and experiences, all in one place.
            </p>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Try Itinerary Builder
            </Button>
          </div>
        </div>
      </section>
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-6">
            What Our Travelers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              name="Alex Kim"
              location="Seoul"
              text={`"TravelSync's planner made my Japan trip effortless! Loved the eco-hotel suggestions."`}
            />
            <Testimonial
              name="Maria Lopez"
              location="Barcelona"
              text={`"The local guides and unique experiences were unforgettable. Highly recommended!"`}
            />
            <Testimonial
              name="Ethan Hall"
              location="London"
              text={`"24/7 support helped me when my flight got delayed. Fantastic service!"`}
            />
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-[#3c82f6] to-[#22c55e] h-100">
        <div className="relative">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl">
              <h4 className="text-2xl font-bold mb-2">
                Get the Best Travel Tips
              </h4>
              <p className="text-slate-600 mb-6">
                Sign up for our newsletter to receive exclusive tips,
                destination guides, and special offers straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2"
                  placeholder="Enter your email..."
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
