import { db } from "../config/database";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class authController {

  //register new pharmacy (admin)

  static registerPharmacy(req, res) {

    const { name, code, password, confirmPassword, district, sector, address } = req.body;
    const { longitude, latitude } = req.query;
    let hashedPassword;

    if (confirmPassword !== password) {
      res.send({
        status: 202,
        message: "Passwords do not match"
      });
    }
    else {
      db.getConnection((err, connection) => {
        if (err) console.log("error", err);
        else {
          connection.query("SELECT * FROM pharmacies WHERE code=?", [code], async (err, result) => {
            if (err) console.log("error", err);
            else if (result.length > 0) {
              res.send({
                status: 205,
                message: "Pharmacy arleady in system"
              });
            }
            else {
              hashedPassword = await hash(password, 8);
              connection.query("INSERT INTO pharmacies SET? ", {
                code,
                password: hashedPassword,
                name,
                longitude,
                latitude,
                district, sector, address
              }, (err, results) => {
                if (err) console.log("error", err);
                else {
                  const token = sign({ code, name, longitude, latitude }, process.env.JWT_SECRET, { expiresIn: "2d" });
                  res.send({
                    status: 200,
                    token
                  });
                }
                connection.release();
              });
            }
          });
        }
      });
    }

  }

  // pharmacy login

  static pharmacyLogin(req, res) {
    const { code, password } = req.body;
    db.getConnection((err, connection) => {
      if (err) console.log("error", err);
      else {
        connection.query("SELECT * FROM pharmacies WHERE code=?", [code], async (err, result) => {
          if (err) console.log("error", err);
          else if (result.length === 0) {
            res.send({
              status: 205,
              message: "Pharmacy not found"
            });
          }
          else {
            if (!(await compare(password, result[0].password))) {
              res.send({
                status: 207,
                message: "Wrong password"
              });
            }
            else {
              const { code, name, longitude, latitude } = result[0];
              const token = sign({ code, name, latitude, longitude }, process.env.JWT_SECRET, { expiresIn: "2d" });
              res.send({
                status: 200,
                token
              });
            }
            connection.release();
          }
        });
      }
    });
  }



}


export default authController;