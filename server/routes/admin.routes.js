const { adminApproveAgent } = require("../controllers/admin.controller");
const { isLogin, isAdmin } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.get("/admin/approveAgent/:id/:status",[isLogin,isAdmin],adminApproveAgent)
};
