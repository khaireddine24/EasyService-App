import Prestataire from '../models/prestataire.js';

const updateServices = async (req, res) => {
  const { email, services } = req.body;

  // Convertir les services en tableau s'il s'agit d'une chaîne JSON
  let servicesArray = services;
  if (typeof services === 'string') {
    try {
      servicesArray = JSON.parse(services);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid services format.' });
    }
  }

  if (!servicesArray || !Array.isArray(servicesArray) || servicesArray.length === 0) {
    return res.status(400).json({ message: 'Invalid services array.' });
  }

  try {
    const prestataire = await Prestataire.findOne({ email });

    if (!prestataire) {
      return res.status(404).json({ message: 'Prestataire not found.' });
    }

    prestataire.services = servicesArray;
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
