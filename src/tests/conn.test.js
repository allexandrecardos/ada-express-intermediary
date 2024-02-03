const Connection = require("../database/Connection");
const db = new Connection()

db.connect()
db.disconnect()
