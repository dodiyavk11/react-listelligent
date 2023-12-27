const {
  addZipCode,
  getAllZipCode,
  zipCodeUpdateStatus,
  excelZipCodeAdd,
  updateZipCode,
  deleteZipCode,
  searchZipCode
} = require("../controllers/zipCode.controller");
const { isLogin, isAdmin } = require("../middleware/isAuthenticate");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app) => {
  app.post("/admin/add/zipcode", [isLogin, isAdmin], addZipCode);
  app.get("/admin/zipcode", [isLogin, isAdmin], getAllZipCode);
  app.get(
    "/admin/zipcode/:id/:status",
    [isLogin, isAdmin],
    zipCodeUpdateStatus
  );
  app.post(
    "/admin/excelZipCode/add",
    [isLogin, isAdmin],
    upload.single("csvFile"),
    excelZipCodeAdd
  );
  app.patch("/admin/zipcode/:id", [isLogin, isAdmin], updateZipCode);
  app.delete("/admin/zipcode/delete/:id", [isLogin, isAdmin], deleteZipCode);

  app.get("/zipcode/search",searchZipCode)
};
