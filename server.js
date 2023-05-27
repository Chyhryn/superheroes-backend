const app = require("./app");
const connection = require("./db/connections");
const PORT = process.env.PORT || 8080;

connection
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
