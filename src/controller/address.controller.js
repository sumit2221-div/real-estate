import { Address } from "../models/address.model.js";
import mongoose from "mongoose";

export const getAddressById = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid address ID" });
  }

  try {
   
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the address" });
  }
};
