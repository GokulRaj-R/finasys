const routes = require("next-routes")();

routes
  .add("/lend/all", "/lend/all")
  .add("/lend/:address", "/lend/showLoan")
  .add("/auction/all", "/auction/loan")
  .add("/auction/:address", "/auction/showAuction");
module.exports = routes;
