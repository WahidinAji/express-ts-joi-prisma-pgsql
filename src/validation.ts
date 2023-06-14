import Joi from 'joi';

const userValidation = Joi.object({
    firstName: Joi.string().required().label('first_name'),
    lastName: Joi.string().required().label('last_name'),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    repeat_password: Joi.ref("password"),
}).options({convert: true, abortEarly: false});

export default userValidation;