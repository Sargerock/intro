const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "posts.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
	console.log("Json server is listening on port ", port);
});
