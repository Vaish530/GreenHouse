import mongoose from 'mongoose';
const userSignUpSchema=new mongoose.Schema(
  {
    fullName:
    {
      type:String,
      required:true,
    },
    email:
    {
      type:String,
      required:true,
      unique:true,
    },
    password:
    {
      type:String,
      required:true,
    },
    role:
    {
      type:String,
      required:true,
      default:"Normal",
    },
  },
  {timestamps:true}
);
// Middleware to hash password before saving the user to the database
userSignUpSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // If the password is not modified, just proceed
  }

  try {
    // Hash the password with 10 salt rounds
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // If an error occurs, pass it to the next middleware
  }
});

// Method to compare the entered password with the stored hashed password
userSignUpSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User=mongoose.model("User",userSignUpSchema);
export default  User;