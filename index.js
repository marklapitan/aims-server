import app from "./app.js";
import config from "./utils/config.js";

const PORT = config.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
