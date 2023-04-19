const connectToMongo = require("./db");
const app = require("./app");

require("dotenv").config();
const port = process.env.PORT || 5000

connectToMongo()
    .then(() => {
        app.listen(port, () => {
            console.log(
                `NaiveBaker backend listening at http://localhost:${port}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });
