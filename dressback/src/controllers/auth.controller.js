const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    res.status(201).json(user);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to register user",
    });
  }
};

const login =async (req, res) => {
  try {
    const { email,password } = req.body;

    const user =await prisma.user.findUnique({
      where: {
        email: email,
      }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ 
      message: "Login successful",
      token: token,
      user,
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      error: "failed to login user",
      
    })
  }
}

module.exports = {
  register,
  login
};