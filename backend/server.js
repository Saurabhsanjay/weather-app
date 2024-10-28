const app = require("./src/app");
const ENV = require("./src/config/env");

const PORT = ENV.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
});
