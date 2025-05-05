import {validationResult } from 'express-validator';
import { AppError } from '../../middleware/errorHandler.js';

export  const validate = (schema)=>{
    return async (req, res, next) => {

        await Promise.all(Object.values(schema).map((validation) => validation.run(req)));
        const error =validationResult(req);
        if(error.isEmpty()){
            return next();
        }
        const errorMessages = error.array().map((err) => err.msg);
        next(new AppError(`${errorMessages.join(', ')}`, 400));
    };
};

