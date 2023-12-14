import express, { response } from "express";
import { mongoDBURL } from "./config.js";
import { mongoose } from "mongoose";
// import Book from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json()); // Middleware
// Parsing is important as it converts raw data into data that can be easily understood by the server.
// In the case of express.json(), it specifically deals with parsing JSON data in the request body. Without parsing, the server would receive the raw JSON string as part of the request, but your server code wouldn't be able to interact with it as a JavaScript object.

// So what we have done is cancelled all these routes as it is very inefficient
// We have 5 routes for just one model
// If we had say 10 models and every model having 5 routes so we would have to make 50 routes so that is inefficient
// So to avoid that we create a routes folder and in that we create a file for respective collection or schema and paste everything there.

// ---- Option 1:
app.use(cors()); //Middleware

// ---- Option 2:
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/books", booksRoute);

// ----------------- Mongoose Connection ---------------- //
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(5555, () => {
      console.log("Everything is good");
    });
  })
  .catch((error) => {
    console.log(error);
  });
// ---------------------------------------------------- //
