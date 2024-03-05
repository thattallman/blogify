const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../service/auth");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/avatar.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

const crypto = require("crypto");

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("user not found ");

    const salt = user.salt;
    const hashedPassword = user.password;

    // Make sure to handle asynchronous operation properly with await
    const userProvidedHash = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (userProvidedHash === hashedPassword) {
      // Returning user data with password and salt removed
      return createTokenForUser(user);
    } else {
      throw new Error("incorrect pasword ");
    }
  }
);

const USER = model("user", userSchema);
module.exports = USER;
