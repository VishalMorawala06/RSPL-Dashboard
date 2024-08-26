const Joi = require('@hapi/Joi');
const schema = {
    
    Sch_UserLogin_Get: Joi.object().keys({
        rid: Joi.number().min(0).default(0),
        userid: Joi.string().required(),
        pwd: Joi.string().required() 
    }).options({ allowUnknown: true }),

     
}

module.exports = schema;