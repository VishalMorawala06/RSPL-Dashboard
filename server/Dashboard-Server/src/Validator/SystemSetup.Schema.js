const Joi = require('@hapi/Joi');
const schema = {
    
    Sch_UserMaster_Add: Joi.object().keys({
        rid: Joi.number().min(0).default(0),
        userid: Joi.string().required(),
        userpassword: Joi.string().required(),
        username: Joi.string().required()
    }).options({ allowUnknown: true }),

    Sch_UserMasterId_Get: Joi.object().keys({
        rid: Joi.number().integer().required() 
    }).options({ allowUnknown: true }),

}

module.exports = schema;