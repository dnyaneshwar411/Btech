 import Material from "../models/material.model.js";

 export const generateMaterialId = async () => {
   const date = new Date();
   const year = date.getFullYear().toString().slice(-2);
   const month = (date.getMonth() + 1).toString().padStart(2, "0");

   // Get the last material ID for the current month
   const lastMaterial = await Material.findOne({
     material_id: new RegExp(`^MAT${year}${month}`),
   }).sort({ material_id: -1 });

   let sequence = "0001";
   if (lastMaterial) {
     const lastSequence = parseInt(lastMaterial.material_id.slice(-4));
     sequence = (lastSequence + 1).toString().padStart(4, "0");
   }

   return `MAT${year}${month}${sequence}`;
 };