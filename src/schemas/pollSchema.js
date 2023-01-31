import joi from 'joi';

export const pollSchema = joi.object({
    title: joi.string().min(5).required(),
    expireAt: joi.string().allow('', null).required()
  });