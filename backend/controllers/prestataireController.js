import Prestataire from '../models/prestataire.js';

const updateServices = async (req, res) => {
  const { email, services } = req.body;

  if (!services || !Array.isArray(services) || services.length === 0) {
    return res.status(400).json({ message: 'Invalid services array.' });
  }

  try {
    const prestataire = await Prestataire.findOne({ email });

    if (!prestataire) {
      return res.status(404).json({ message: 'Prestataire not found.' });
    }

    prestataire.services = services;
    await prestataire.save();

    return res.status(200).json({
      message: 'Services updated successfully.',
      prestataire,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating services.' });
  }
};

export default { updateServices };
