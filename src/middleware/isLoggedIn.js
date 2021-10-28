import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

class isloggedIn {

  static isloggedIn(req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");
    verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
      if (err) {
        res.status(401).send({
          status: 401,
          message: 'login first'
        });
      }
      else {
        req.pharma = decoded;
        next();
      }
    });
  }

}

export default isloggedIn;