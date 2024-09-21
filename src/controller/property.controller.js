
import { Address } from "../models/address.model.js";
import { Property } from "../models/property.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";

export const addProperty = async (req, res) => {
  const {
    name,
    type,
    about,
    size,
    cost,
    street,
    city,
    state,
    postal_code,
    country,
    status,
  } = req.body;
  const owner = req.user._id;

  
  if (
    !name ||!type || !about ||!size || !cost || !street || !city || !state || !postal_code || !country || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if property with same name already exists
  const existingProperty = await Property.findOne({ name });
  if (existingProperty) {
    return res.status(400).json({ message: "Property with this name already exists" });
  }


    // Create address
    const address = await Address.create({
      street,
      city,
      state,
      postal_code,
      country,
    });

    // Upload photos to Cloudinary
    const photoUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedPhoto = await UploadOnCloudinary(file.path);
        photoUrls.push(uploadedPhoto.url);
      }
    }

    // Create new property
    const newProperty = await Property.create({
      owner,
      name,
      type,
      about,
      size,
      cost,
      photos: photoUrls,
      address: address._id,
      status,
    });

    if (!newProperty) {
      return res.status(400).json({
        error: "Something went wrong while creating the property",
      });
    }

    res.status(201).json({
      message: "Property added successfully",
      property: newProperty,
    });
  
  
};

export const GetPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(400).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property found", property: property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching the property" });
  }
};

export const DeleteProperty = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const property = await Property.findByIdAndDelete(propertyId);
    if (!property) {
      return res.status(400).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while deleting the property" });
  }
};


export const GetAllProperties = async (req, res) => {
  const { type, size, minCost, maxCost, city, state, country } = req.query;

  try {
    // Build the filter query
    let propertyQuery = {};
    if (type) propertyQuery.type = type;
    if (size) propertyQuery.size = size;
    if (minCost || maxCost) {
      propertyQuery.cost = {};
      if (minCost) propertyQuery.cost.$gte = minCost;
      if (maxCost) propertyQuery.cost.$lte = maxCost;
    }

    // Include address filters
    let addressQuery = {};
    if (city) addressQuery.city = city;
    if (state) addressQuery.state = state;
    if (country) addressQuery.country = country;

    let addresses = [];
    if (Object.keys(addressQuery).length > 0) {
      addresses = await Address.find(addressQuery).select('_id');
      propertyQuery.address = { $in: addresses.map(address => address._id) };
    }

    const properties = await Property.find(propertyQuery).populate('address');
    if(properties.length == 0){
      return res.status(400).json({message : "no property found"})
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching properties" });
  }
};