import { db } from "../config/database";



class pharmaController {

  static registerMedecine(req, res) {
    const { med_name, quantity } = req.body;
    const { name, code, longitude, latitude } = req.pharma;
    let pha_name = name;

    let Med_name = med_name.trim();


    db.getConnection((err, connection) => {
      if (err) console.log("error", err);
      else {
        connection.query("SELECT * FROM medecines WHERE med_name LIKE N? AND code=?", [`${Med_name}`, code], (err, result) => {
          if (err) console.log("error", err);
          else if (result.length > 0) {
            res.send({
              status: 205,
              message: "Medecine arleady in"
            });
          }
          else {
            connection.query("INSERT INTO medecines SET?", {
              code,
              pha_name,
              med_name: Med_name,
              quantity, longitude, latitude
            }, (err, results) => {
              if (err) console.log("error", err);
              else {
                res.send({
                  status: 200,
                  message: "Med inserted ok"
                });
              }
              connection.release();
            });
          }
        });
      }
    });
  }

  static allMeds(req, res) {
    const { code } = req.pharma;
    db.getConnection((err, connection) => {
      if (err) console.log("error", err);
      else {
        connection.query("SELECT * FROM medecines WHERE code=?", [code], (err, result) => {
          if (err) console.log("error", err);
          else {
            res.send({
              status: 200,
              data: { meds: result }
            });
          }
          connection.release();
        });
      }
    });
  }

  static removeQuantity(req, res) {
    const { quantity } = req.body;
    const { id } = req.query;

    let RemQuantity;

    db.getConnection((err, connection) => {
      if (err) console.log("error", err);
      else {
        connection.query("SELECT * FROM medecines WHERE id=?", [id], (err, result) => {
          if (err) console.log("error", err);
          else {
            let answer;
            (parseInt(result[0].quantity) - (parseInt(quantity))) < 0 ? answer = false : answer = true;
            if (answer === false) {
              res.send({
                status: 205,
                message: "Do not have enough quantity"
              });
            }
            else {
              RemQuantity = parseInt(result[0].quantity) - parseInt(quantity);
              connection.query("UPDATE medecine SET quantity=? WHERE id=?", [RemQuantity, id], (err, results) => {
                if (err) console.log("error", err);
                else {
                  res.send({
                    status: 200,

                  });
                }
                connection.release();
              });
            }
          }
        });
      }
    });

  }

  static addQuantity(req, res) {
    const { id } = req.query;
    const { quantity } = req.body;

    let newQuantity;

    db.getConnection((err, connection) => {
      if (err) console.log("error", err);
      else {
        connection.query("SELECT * FROM medecines WHERE id=?", [id], (err, result) => {
          if (err) console.log("error", err);
          else {
            newQuantity = parseInt(quantity) + parseInt(result[0].quantity);
            connection.query("UPDATE medecines SET quantity=? WHERE id=?", [newQuantity, id], (err, results) => {
              if (err) console.log("error", err);
              else {
                res.send({
                  status: 200
                });
              }
              connection.release();
            });
          }
        });
      }
    });
  }

  static viewMed(req, res) {
    const { id } = req.query;

    db.getConnection((err, connection) => {
      if (err) console.log("error", err);
      else {
        connection.query("SELECT * FROM medecines WHERE id=?", [id], (err, result) => {
          if (err) console.log("error", err);
          else {
            res.send({
              status: 200,
              data: { med: result }
            });
          }
          connection.release();
        });
      }
    });
  }
}



export default pharmaController;