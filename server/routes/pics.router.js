const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
// options for file storage include:
// 1. local file system of app
// 2. disk of the local machine
// 3. memory of the local machine, TEMPORARILY before storing somewhere else
//    like a DB 

/**
 * POST route synchronous
 */
router.post("/", upload.single("image_to_upload"), (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).send("No file was uploaded.");
    }

    const queryString = `INSERT INTO image(name, data) VALUES($1, $2) RETURNING image.id;`;
    const queryParams = [file.originalname, file.buffer];
    pool.query(queryString, queryParams)
        .then((dbRes) => {
            console.log(dbRes.rows);
            res.status(201).send(
                `File uploaded successfully, File ID: ${dbRes.rows[0].id}`
            );
        })
        .catch((err) => {
            console.error("Error saving the file to the database", err);
            res.status(500).send("Error saving the file to the database");
        });
});

/**
 * POST route asynchronous
 */
// arg to 'upload.single()' must match the name of the input field that handled file upload
router.post("/", upload.single("image_to_upload"), async (req, res) => {
    const { file } = req; // 'file' is added to req obj by multer middleware

    // when using memory storage, the file obj will have a 'buffer' field.
    // this is the image data from memory that will be stored into the DB
    // as long as there are no references to the buffer stored in memory
    // following the execution of this route handler, the node.js garbage
    // collector will free up that space for us!

    if (!file) {
        return res.status(400).send("No file was uploaded.");
    }

    try {
        const queryString = `INSERT INTO image(name, data) VALUES($1, $2) RETURNING image.id;`;
        const queryParams = [file.originalname, file.buffer];
        const dbRes = await pool.query(queryString, queryParams);
        res.status(201).send(
            `File uploaded successfully, File ID: ${dbRes.rows[0].id}`
        );
    } catch (err) {
        console.error("Error saving the file to the database", err);
        res.status(500).send("Error saving the file to the database");
    }
});

module.exports = router;
