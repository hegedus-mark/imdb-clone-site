import app from "./app.js";
import { config } from "./config/config.js";

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
