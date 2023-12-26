const { getAllAgentsList } = require("../controllers/agent.controller");
const { isLogin, isAdmin,isAgent } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.get("/agent/list",[isLogin],getAllAgentsList)
};
