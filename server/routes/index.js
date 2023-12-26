module.exports = (app) => {
  require("./user.routes")(app)
  require("./admin.routes")(app)
  require("./agent.routes")(app)
  require("./zipCode.routes")(app)
}