import Purchase from "../models/purchase.model.js";

export async function createNewPurchase(req, res) {
  try {
    const purchase = await Purchase.create(req.body);
    return res.status(201).json({
      success: true,
      data: purchase
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error!"
    })
  }
}

export async function retrievePurchases(req, res) {
  try {
    const purchase = await Purchase
      .find()
      .populate({ path: "requested_material", select: "_id name material_id" })
      .lean();
    return res.status(201).json({
      success: true,
      data: purchase
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error!"
    })
  }
}

export async function updatePurchase(req, res) {
  try {
    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!purchase) {
      return res.status(404).json({ success: false, error: 'Purchase not found' });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully updated the purchase!"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
}