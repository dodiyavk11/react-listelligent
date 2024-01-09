const {
  adminApproveAgent,
  viewUserLead,
  userLeadList,
  viewAgentByAdmin,
  getAdminOrders,
  getAdminLeads,
  updateOrderStatus,
} = require("../controllers/admin.controller");
const {
  addFaqs,
  listFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  addPromoCode,
  listPromoCode,
  getPromoCode,
  updatePromoCode,
  deletePromoCode,
} = require("../controllers/common.controller");
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
  app.get("/admin/orders", [isLogin, isAdmin], getAdminOrders);
  app.get("/admin/leads", [isLogin, isAdmin], getAdminLeads);
  app.get(
    "/admin/status/order/:id/:status",
    [isLogin, isAdmin],
    updateOrderStatus
  );

  app.post("/admin/add/promocode", [isLogin, isAdmin], addPromoCode);
  app.get("/admin/promocode", listPromoCode);
  // app.get("/admin/promocode/:id", [isLogin, isAdmin], getPromoCode);
  app.patch("/admin/promocode/:id", [isLogin, isAdmin], updatePromoCode);
  app.delete("/admin/promocode/:id", [isLogin, isAdmin], deletePromoCode);

  app.post("/admin/add/faqs", [isLogin, isAdmin], addFaqs);
  app.get("/admin/faqs", listFaq);
  // app.get("/admin/faqs/:id", [isLogin, isAdmin], getFaq);
  app.patch("/admin/faqs/:id", [isLogin, isAdmin], updateFaq);
  app.delete("/admin/faqs/:id", [isLogin, isAdmin], deleteFaq);
};
