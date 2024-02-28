const express = require('express');
const app = express();
const PORT = 5001;

//Middleware imports below

//Routes imports
const picsRouter = require("./routes/pics.router");

//Middleware usage
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes below
app.use("/api/pics", picsRouter);

// Server listen/port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});