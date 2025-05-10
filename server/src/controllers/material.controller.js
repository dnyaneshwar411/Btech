import Material from '../models/material.model.js';
import { generateMaterialId } from '../utils/material.utils.js';

// Create a new material
export const createMaterial = async (req, res) => {
  try {
    const materialData = {
      ...req.body,
      material_id: await generateMaterialId()
    };
    const material = await Material.create(materialData);
    res.status(201).json({ success: true, data: material });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all materials
export const getMaterials = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const materials = await Material.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: materials });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get material by ID
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, error: 'Material not found' });
    }
    res.status(200).json({ success: true, data: material });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update material
export const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!material) {
      return res.status(404).json({ success: false, error: 'Material not found' });
    }
    res.status(200).json({ success: true, data: material });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, error: 'Material not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};