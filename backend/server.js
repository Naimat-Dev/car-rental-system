import config from "./config/index.js";

import app from "./app.js";

// connectDB();

const port = config.port || 4000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
