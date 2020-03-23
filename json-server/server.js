const path = require("path");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const decodeJwt = require("jwt-decode");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8000;

server.db = router.db;
server.use(middlewares);
server.get("/user", (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	let { sub } = decodeJwt(token);
	sub = parseInt(sub);
	const { users } = require("./db.json");
	const user = users.filter(user => user.id == sub)[0];
	if (!user) res.status(404).send();

	res.status(200).json({ id: sub, userName: user.userName });
});
server.use(auth);
server.use(router);

server.listen(port, () => {
	console.log("Json server is listening on port ", port);
});
