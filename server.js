import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`🚀 API server running on port ${PORT}`);
});
