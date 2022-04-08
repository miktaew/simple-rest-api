const Employee = require('../models/Employee');
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const {login, password} = req.body;
    const employee = await Employee.findOne({login: login});
    
    if(!employee) {
        throw new UnauthenticatedError('Authentication failed');
    }
    const isPasswordCorrect = await employee.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Authentication failed');
    }
    
    next();
}

module.exports = authenticationMiddleware;