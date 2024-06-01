import Users from '../model/Users.js';

export const userRegister = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            status: false,
            msg: "User Data not found"
        })
    }

    const Alreadyexist = await Users.findOne({ email: email });

    if (Alreadyexist) {
        return res.status(404).json({
            status: false,
            msg: "User already exist"
        })
    }

    const user = {
        email, password
    }
    const newUser = new Users(user);
    const result = await newUser.save();
    res.json({
        msg: "User successfully register",
        result
    })
}

export const userLogin = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            status: false
        })
    }
    const user = await Users.findOne({ email: email });
    if(!user){
        return res.status(401).json({
            status: false,
            msg: "User is incorrect"
        })
    }
    if (user.password !== password) {
        return res.status(401).json({
            status: false,
            msg: "Password is incorrect"
        })
    }
    res.json({
        status: true,
        msg: "User Login successfully"
    })
}