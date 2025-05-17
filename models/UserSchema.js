import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: [true, "This Email Already Exists"] },
    WebsiteName: { type: String, required: true },
    Password: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("Users", UserSchema);
export default User;
