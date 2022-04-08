const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name of the employee'],
    },
    login: {
        type: String,
        required: [true, 'Please choose a login'],
        unique: true,
        maxlength:20,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Please provide a strong password'],
        minlength: 8,
    }
});

EmployeeSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

EmployeeSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('Employee', EmployeeSchema);
