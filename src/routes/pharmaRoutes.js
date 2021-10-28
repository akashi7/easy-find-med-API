import { Router } from "express";
import pharmaController from "../controllers/pharma";
import helper from "../middleware/helper";
import isloggedIn from "../middleware/isLoggedIn";

const pharmaRoutes = Router();

pharmaRoutes.post("/newMed", isloggedIn.isloggedIn, helper.quantityVal, pharmaController.registerMedecine);
pharmaRoutes.get('/allMeds', isloggedIn.isloggedIn, pharmaController.allMeds);
pharmaRoutes.patch('/removeQty', isloggedIn.isloggedIn, helper.quantityVal, pharmaController.removeQuantity);
pharmaRoutes.patch("/addQty", isloggedIn.isloggedIn, helper.quantityVal, pharmaController.addQuantity);
pharmaRoutes.get("/viewMed", isloggedIn.isloggedIn, pharmaController.viewMed);



export default pharmaRoutes;