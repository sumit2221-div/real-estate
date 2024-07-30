import mongoose, {Schema} from "mongoose";

const addressSchema  = new Schema(
    {
        street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true }

    },
    {
        Timestamp : true
    }
)

export const Address = mongoose.model("Address", addressSchema)