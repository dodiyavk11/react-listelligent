const { signIn, signUp } = require("../controllers/user.controller");
const { isLogin, isAdmin, isAgent } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.post("/agentSignUp", signUp);
  app.post("/login", signIn);
};
