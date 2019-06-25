const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:5000", changeOrigin: true }));
};

/* 
http://localhost:5000/api/users/register
-> proxy la
http://localhost:3000/api/users/register

React server có origin là http://localhost:3000
proxy :                   http://localhost:3000

nodeJs server :           http://localhost:5000
*/
