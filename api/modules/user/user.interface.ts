import { Document } from "mongoose";

interface user_interface extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  premium: boolean;
  encrypt_password(password: string): Promise<string>;
  validate_password(password: string): Promise<boolean>;
}

export default user_interface;
