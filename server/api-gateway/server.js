require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log("=".repeat(50));
  console.log("📡 Services configured:");
  console.log(`   Auth:     ${process.env.AUTH_SERVICE_URL || "http://localhost:4001"}`);
  console.log(`   Product:  ${process.env.PRODUCT_SERVICE_URL || "http://localhost:4002"}`);
  console.log(`   Order:    ${process.env.ORDER_SERVICE_URL || "http://localhost:4003"}`);
  console.log(`   Message:  ${process.env.MESSAGE_SERVICE_URL || "http://localhost:4004"}`);
  console.log("=".repeat(50));
});