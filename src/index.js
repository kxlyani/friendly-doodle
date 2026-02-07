import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/index.js";


const port = process.env.PORT || 3000;

console.log(
  "Loaded URI:",
  process.env.MONGO_URI?.slice(0, 15)
);


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });


