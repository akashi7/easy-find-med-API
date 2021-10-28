import { appSchema } from "../models/appModel";

class helper {

  static registerVal(req, res, next) {
    const { name, code, password, district, sector, address } = req.body;
    const { error } = appSchema.registerPharmacy.validate({ name, code, password, district, sector, address });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

  static loginVal(req, res, next) {
    const { code, password } = req.body;
    const { error } = appSchema.pharmaLogin.validate({ code, password });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

  static quantityVal(req, res, next) {
    const { quantity } = req.body;
    const { error } = appSchema.Quantity.validate({ quantity });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

}

export default helper;

