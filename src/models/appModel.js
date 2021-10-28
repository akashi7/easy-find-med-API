import Joi from "joi";

let string = Joi.string().required();

const appSchema = {
  registerPharmacy: Joi.object({
    name: string.error(new Error("Pharmacy name is required")),
    code: string.regex(/^[0-9]+$/).error(new Error("Company code is required and must be numbers only")),
    password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number')),
    district: string.error(new Error("District is required")),
    sector: string.error(new Error("Sector is required")),
    address: string.error(new Error("Address is required"))
  }),

  pharmaLogin: Joi.object({
    code: string.regex(/^[0-9]+$/).error(new Error("Company code is required and must be numbers only")),
    password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number'))
  }),

  Quantity: Joi.object({
    quantity: string.regex(/^[0-9]+$/).error(new Error('Quantity must be numbers only'))
  })

};


export { appSchema };