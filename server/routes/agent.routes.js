const {
  getAllAgentsList,
  addToCartZip,
  getAgentCart,
  removeCartItem,
} = require("../controllers/agent.controller");
const { isLogin, isAdmin, isAgent } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.get("/agent/list", [isLogin], getAllAgentsList);
  app.get("/agent/zip/addtocart/:id", [isLogin, isAgent], addToCartZip);
  app.get("/agent/getcart", [isLogin, isAgent], getAgentCart);
  app.get("/agent/item-remove/:cart_id", [isLogin, isAgent], removeCartItem);
};
