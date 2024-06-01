import Employees from "../model/Employees.js";

export const create = async (req, res) => {
    try {

        const employeeData = new Employees(req.body);

        if (!employeeData) {
            return res.status(404).json({ msg: "User data not found" });
        }

        const result = await employeeData.save();
        res.status(200).json({ msg: "User created successfully", result });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export const getAll = async (req, res) => {
    try {

        const employeeData = await Employees.find();
        if (!employeeData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(employeeData);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export const getOne = async (req, res) => {
    try {

        const id = req.params.id;
        const employeeExist = await Employees.findById(id);
        if (!employeeExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(employeeExist);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export const update = async (req, res) => {
    try {

        const id = req.params.id;
        const employeeExist = await Employees.findById(id);
        if (!employeeExist) {
            return res.status(401).json({ msg: "User not found" });
        }

        const updatedData = await Employees.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "User updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
        const employeeExist = await Employees.findById(id);
        if (!employeeExist) {
            return res.status(404).json({ msg: "User not exist" });
        }
        await Employees.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}