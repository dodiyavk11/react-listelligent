const {
  getAllAgentsList,
  addToCartZip,
  getAgentCart,
} = require("../controllers/agent.controller");
const { isLogin, isAdmin, isAgent } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.get("/agent/list", [isLogin], getAllAgentsList);
  app.get("/agent/zip/addtocart/:id", [isLogin, isAgent], addToCartZip);
  app.get("/agent/getcart", [isLogin, isAgent], getAgentCart);
};
