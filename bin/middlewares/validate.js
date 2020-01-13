"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = (validations) => (async (req, res, next) => {
    try {
        for (let validate of validations) {
            await validate.run(req);
        }
        const errors = express_validator_1.validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(422).json({ message: errors.array()[0].msg });
    }
    catch (err) {
        console.log(err);
    }
});
