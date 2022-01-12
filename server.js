import express from "express"
import { DB_URL } from "./config/index.js"
import router from "./routes/index.js"
import path from "path"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { errorHandler } from "./middlewares/errorHandler.js"
import cors from "cors"
const app = express();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected to precily Database")
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router)

// Right before your app.listen(), add this:
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "precily/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "precily", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running")
    })
}

app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server started on: ${PORT}`)
})