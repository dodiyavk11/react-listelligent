const {
  getAllAgentsList,
  addToCartZip,
  getAgentCart,
  removeCartItem,
  cartPlaceOrder,
  getAgentActiveZipCode,
  getAgentLeads,
  showUserAgentList,
  viewAgentByUser,
  getAgentOrdersList,
  agentUpdateLeadStatus,
} = require("../controllers/agent.controller");
const {
  agentInvoidePdfGenerate,
} = require("../controllers/generateInvoicePdf.controller");

const { isLogin, isAdmin, isAgent } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.get("/agent/list", [isLogin], getAllAgentsList);
  app.get("/agent/zip/addtocart/:id", [isLogin, isAgent], addToCartZip);
  app.get("/agent/getcart", [isLogin, isAgent], getAgentCart);
  app.get("/agent/item-remove/:cart_id", [isLogin, isAgent], removeCartItem);
  app.get("/agent/cart/placeOrder", [isLogin, isAgent], cartPlaceOrder);
  app.get("/agent/active/zipCode", [isLogin, isAgent], getAgentActiveZipCode);
  app.get("/agent/leads", [isLogin, isAgent], getAgentLeads);
  app.get("/agent/list/:zipcode", showUserAgentList);
  app.get("/agent/view/:id", viewAgentByUser);
  app.get("/agent/orders", [isLogin, isAgent], getAgentOrdersList);
  app.get(
    "/agent/lead/update/:id/:status",
    [isLogin, isAgent],
    agentUpdateLeadStatus
  );
  app.get(
    "/agent/generateInvoice/:order_id",
    [isLogin, isAgent],
    agentInvoidePdfGenerate
  );
};
