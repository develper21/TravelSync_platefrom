import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

let fallbackBlogs = [
  {
    _id: "6501b1111111111111111101",
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
    _id: "6501b1111111111111111102",
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
    _id: "6501b1111111111111111103",
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

export const getBlogs = async (req, res) => {
  try {
    const { search, tag, page = 1, limit = 9 } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ];
      }
      if (tag && tag !== 'All') {
        query.tags = { $in: [tag] };
      }

      const skip = (Number(page) - 1) * Number(limit);
      const total = await Blog.countDocuments(query);
      const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      return res.json({
        blogs,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit))
      });
    }

    // In-memory fallback
    let filtered = [...fallbackBlogs];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(s) ||
        b.excerpt.toLowerCase().includes(s) ||
        b.content.toLowerCase().includes(s)
      );
    }
    if (tag && tag !== 'All') {
      filtered = filtered.filter(b => (b.tags || []).includes(tag));
    }

    const total = filtered.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginated = filtered.slice(skip, skip + Number(limit));

    res.json({
      blogs: paginated,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.findById(req.params.id);
      if (blog) return res.json(blog);
    }

    const fallback = fallbackBlogs.find(b => b._id === req.params.id || b.slug === req.params.id);
    if (!fallback) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(fallback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blog = new Blog(req.body);
      await blog.save();
      return res.status(201).json(blog);
    }
    const newBlog = { ...req.body, _id: "local_blog_" + Date.now(), createdAt: new Date() };
    fallbackBlogs.unshift(newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (blog) return res.json(blog);
    }
    const idx = fallbackBlogs.findIndex(b => b._id === req.params.id);
    if (idx !== -1) {
      fallbackBlogs[idx] = { ...fallbackBlogs[idx], ...req.body };
      return res.json(fallbackBlogs[idx]);
    }
    res.status(404).json({ error: 'Blog post not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Blog.findByIdAndDelete(req.params.id);
    }
    fallbackBlogs = fallbackBlogs.filter(b => b._id !== req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const newComment = {
      user: req.user?._id,
      name: req.user?.fullName || req.body.name || 'Fellow Traveler',
      comment: comment.trim(),
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.findById(req.params.id);
      if (blog) {
        blog.comments.unshift(newComment);
        await blog.save();
        return res.status(201).json(blog);
      }
    }

    const b = fallbackBlogs.find(item => item._id === req.params.id);
    if (b) {
      if (!b.comments) b.comments = [];
      b.comments.unshift(newComment);
      return res.status(201).json(b);
    }

    res.status(404).json({ error: 'Blog post not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
