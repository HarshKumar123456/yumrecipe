import User from "../models/userModel.js";

const registerController = async (req, res) => {

    try {
        // Extracting information from req.body
        const { name, email, password } = req.body;

        // Checking if all things are given 
        if (!name) {
            return res.send({ message: "Name is required...." });
        }
        if (!email) {
            return res.send({ message: "Email is required...." });
        }
        if (!password) {
            return res.send({ message: "Password is required...." });
        }
        

        // Checking if user is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {

            return res.status(200).json(
                {
                    success: true,
                    message: "User is already registered....",
                    user: {
                        name: existingUser.name,
                        email: existingUser.email,
                    },
                }
            )
        }

        // Register New User


        // Saving User Details in MongoDB Databasse
        const user = await new User({ name, email, password }).save();


        return res.status(201).json(
            {
                success: true,
                message: "User registered successfully....",
                user: {
                    name: user.name,
                    email: user.email,
                },
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Error registering user....",
                error
            }
        )
    }
};

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Invalid email or password....",
                    error,
                }
            );
        }

        // Finding User having the given email
        const user = await User.findOne({ email });

        // If user is not found with the given email then return
        if (!user) {
            return res.status(200).json(
                {
                    success: false,
                    message: "Email is not registered....",
                }
            );
        }

        // Checking if password is correct or not for user found with given email 
        const isRightPassword = password === user.password ? true : false;
        if (!isRightPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Invalid password....",
                }
            );
        }

       
        return res.status(200).json(
            {
                success: true,
                message: "Logged in Successfully....",
                user: {
                    name: user.name,
                    email: user.email,
                },
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Some Error occured....",
                error,
            }
        );
    }
};


export { registerController, loginController };