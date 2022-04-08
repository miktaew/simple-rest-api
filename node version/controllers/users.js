const Employee = require('../models/Employee');

const register = async (req, res) => {
    const {login, password, employee_data} = req.body;

    if(!login || !password) {
        throw {message: "Please provide login and password", statusCode: 400};
    }

    const employee = await Employee.findOne({login: login});

    if(!employee.is_admin) {
        throw {message: "Unathorized", statusCode: 401};
    }

    const newEmployee = await Employee.create({...employee_data});
    res.status(201).json({employee: newEmployee.login});
}

const updatePassword = async (req, res) => {
    const {login, password, newPassword} = req.body;

    if(!login || !password || !newPassword) {
        throw {message: "Please provide login, password and a new password", statusCode: 400};
    }
    if(newPassword.length < 8) {
        throw {message: "Password needs to be at least 8 characters long!", statusCode: 400};
    }

    const employee = await Employee.findOne({login: login});

    employee.password = newPassword;
    employee.save();

    res.status(200).json({employee: employee.login});
}

module.exports = {
    register,
    updatePassword,
};