import { Favorite } from "../models/favorite.model.js";

export const addFavorite = async (req, res) => {
  const { propertyId } = req.params;
  const owner = req.user._id;

  if (!propertyId) {
    return res.status(400).json({ error: "Property ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ error: "Invalid Property ID" });
  }

  try {
   
    const existingFavorite = await Favorite.findOne({ owner, property: propertyId });

    if (existingFavorite) {
      return res.status(400).json({ message: "Property is already in favorites" });
    }

    // Create a new favorite entry
    const favorite = await Favorite.create({
      owner,
      property: propertyId,
    });

    res.status(201).json({ message: "Property added to favorites", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while adding the property to favorites" });
  }
};
export const GetallFavProperty = async(req,res)=>  {
    const ownerId  = req.user._id

    const favProperty = await Favorite.find({owner : ownerId})

    if (!favProperty.length) {
        return res.status(404).json({ message: "No favorite properties found" });
      }

      res.status(200).json({message : "fav property found", favProperty})
}

export const RemovefromFavourite = async (req,res)=> {
  const  {propertyId } = req.params

  if (!propertyId) {
    return res.status(400).json({ error: "Property ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ error: "Invalid Property ID" });
  }

  const property = await Favorite.findByIdAndDelete(propertyId)

  if(!property){
    return res.status(400).json({error : " property not found"})
  }

  res.status(200).json({message : "property deleted sucessfully"})


}