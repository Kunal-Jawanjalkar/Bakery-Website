const Joi = require('joi');

// Function to validate registration
function registerValidation(data) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.required().required(),
        repeat_password: Joi.ref("password")
    })

    return schema.validate(data)
}

//  function to validate orders
function orderValidation(data){
    const schema = Joi.object({
        name:Joi.string().min(5).max(20).required(),
        phone:Joi.number().min(10).required(),
        address:Joi.string().max(50).required()
    })
    return schema.validate(data);
}

module.exports = {orderValidation, registerValidation};