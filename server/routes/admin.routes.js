const {
  adminApproveAgent,
  viewUserLead,
  userLeadList,
  viewAgentByAdmin,
} = require("../controllers/admin.controller");
const { isLogin, isAdmin } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.get(
    "/admin/approveAgent/:id/:status",
    [isLogin, isAdmin],
    adminApproveAgent
  );
  app.get("/lead/view/:id", [isLogin, isAdmin], viewUserLead);
  app.get("/admin/lead/list", [isLogin, isAdmin], userLeadList);
  app.get("/admin/view/agent/:id", [isLogin, isAdmin], viewAgentByAdmin);
};
