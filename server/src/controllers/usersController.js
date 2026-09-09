import User from '../models/User.js';
import Destination from '../models/Destination.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedDestinations');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['fullName', 'phone', 'country', 'dob', 'avatarUrl', 'preferences'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password').populate('savedDestinations');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    res.json({ preferences: user.preferences || {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences: req.body },
      { new: true, runValidators: true }
    ).select('preferences');

    res.json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSavedDestinations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedDestinations');
    res.json(user.savedDestinations || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const user = await User.findById(req.user.id);

    if (!user.savedDestinations.includes(destinationId)) {
      user.savedDestinations.push(destinationId);
      await user.save();
    }

    const updatedUser = await User.findById(req.user.id).populate('savedDestinations');
    res.json(updatedUser.savedDestinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeSavedDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const user = await User.findById(req.user.id);

    user.savedDestinations = user.savedDestinations.filter(
      id => id.toString() !== destinationId
    );
    await user.save();

    const updatedUser = await User.findById(req.user.id).populate('savedDestinations');
    res.json(updatedUser.savedDestinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPaymentMethod = async (req, res) => {
  try {
    const { cardType, last4, expiry, cardHolderName, billingAddress } = req.body;
    const user = await User.findById(req.user.id);

    user.paymentMethods.push({
      cardType: cardType || 'Visa',
      last4: last4 || '4242',
      expiry: expiry || '12/28',
      cardHolderName: cardHolderName || user.fullName,
      billingAddress: billingAddress || ''
    });

    await user.save();
    res.status(201).json(user.paymentMethods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePaymentMethod = async (req, res) => {
  try {
    const methodId = req.params.id;
    const user = await User.findById(req.user.id);

    user.paymentMethods = user.paymentMethods.filter(
      method => method._id.toString() !== methodId
    );

    await user.save();
    res.json(user.paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
