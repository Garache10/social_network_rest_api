import { model, Schema } from "mongoose";
import user_interface from "./user.interface";
import bcrypt from "bcrypt";

const user_schema = new Schema<user_interface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    premium: { type: Boolean, default: false }
  }, {
    timestamps: true,
  }
);

user_schema.methods.encrypt_password = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

user_schema.methods.validate_password = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

export default model<user_interface>("User", user_schema);
