const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./utils/Connect");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./routes/userRoute"));
app.use("/product", require("./routes/productRoute"));

app.use("/src/uploads", express.static("src/uploads"));

app.use(errorMiddleware);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server Running in http://localhost:${PORT}`);
});
