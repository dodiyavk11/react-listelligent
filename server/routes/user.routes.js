const {
  signIn,
  signUp,
  userAddLead,
  getUserProfile,
  userProfileUpdate,
  changeUserPassword,
} = require("../controllers/user.controller");
const { isLogin, isAdmin, isAgent } = require("../middleware/isAuthenticate");

module.exports = (app) => {
  app.post("/agentSignUp", signUp);
  app.post("/login", signIn);
  app.post("/user/addLead", userAddLead);
  app.get("/user/profile", [isLogin], getUserProfile);
  app.patch("/user/update/profile", [isLogin], userProfileUpdate);
  app.post("/user/password-change", [isLogin], changeUserPassword);
};
