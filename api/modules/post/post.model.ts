import { model, Schema } from "mongoose";

const post_schema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    image: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default model("Post", post_schema);
