import Trip from '../models/Trip.js';

export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTrip = async (req, res) => {
  try {
    const tripData = {
      ...req.body,
      userId: req.user.id,
    };

    const trip = new Trip(tripData);
    await trip.save();

    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTripStats = async (req, res) => {
  try {
    const stats = await Trip.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalTrips: { $sum: 1 },
          totalBudget: { $sum: '$budget' },
          averageBudget: { $avg: '$budget' },
          upcomingTrips: {
            $sum: {
              $cond: [
                { $gte: ['$startDate', new Date()] },
                1,
                0
              ]
            }
          },
          completedTrips: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'completed'] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    res.json(stats[0] || {
      totalTrips: 0,
      totalBudget: 0,
      averageBudget: 0,
      upcomingTrips: 0,
      completedTrips: 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
