import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js'; 



// Function to handle student registration
export async function St_register(req, res) {
  try {
    // Extract data from the request body
    const { username, email, password } = req.body;
    const role = "Student";

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Check if the username or email already exists in the database
    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: "Username or Email already exists." });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    return res.status(201).json({ msg: "Student registered successfully." });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during registration:", error);

    // Send a generic error message to the client
    return res.status(500).json({ msg: "Registration failed. Please try again." });
  }
}


export async function T_register(req, res) {
  try {
    const { username, email, password } = req.body;
    const role = 'trainer';

    if (!username || !email || !password) {
      return res.status(410).json({ msg: "All fields are required." });
    }
    const userExist = await User.findOne({ $or: [{ username }, { email }] });
    if (userExist) {
      return res.status(410).json({ msg: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({ msg: 'Trainer registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Registration failed' });
  }
}

export async function Ad_register(req, res) {
  try {
    const { username, email, password } = req.body;
    const role = 'admin';

    const userExist = await User.findOne({ $or: [{ username }, { email }] });
    if (userExist) {
      return res.status(400).json({ msg: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Registration failed' });
  }
}


export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Incorrect username or password' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Incorrect username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response with token and user details
    return res.status(200).json({
      msg: 'Login successful',
      token,
      role: user.role,
      data: { userId: user._id, username: user.username },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Login failed due to server error' });
  }
}