import Hotel from '../models/Hotel.js';

export const getHotels = async (req, res) => {
  try {
    const {
      city,
      country,
      minRating,
      maxPrice,
      amenities,
      ecoFriendly,
      limit = 20,
      skip = 0
    } = req.query;

    let query = {};

    if (city) query['location.city'] = { $regex: city, $options: 'i' };
    if (country) query['location.country'] = { $regex: country, $options: 'i' };
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (maxPrice) query['price.max'] = { $lte: parseFloat(maxPrice) };
    if (amenities) query.amenities = { $in: amenities.split(',') };
    if (ecoFriendly === 'true') query.ecoFriendly = true;

    const hotels = await Hotel.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ rating: -1 });

    const total = await Hotel.countDocuments(query);

    res.json({
      hotels,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchHotels = async (req, res) => {
  try {
    const { q, city, country } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { 'location.city': { $regex: q, $options: 'i' } },
        { 'location.country': { $regex: q, $options: 'i' } },
      ];
    }

    if (city) query['location.city'] = { $regex: city, $options: 'i' };
    if (country) query['location.country'] = { $regex: country, $options: 'i' };

    const hotels = await Hotel.find(query)
      .limit(10)
      .sort({ rating: -1 });

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEcoFriendlyHotels = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const hotels = await Hotel.find({ ecoFriendly: true })
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();

    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
