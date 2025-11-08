import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'ID no válido' });
  }

  next(); // Si es válido, continúa al controlador
};
