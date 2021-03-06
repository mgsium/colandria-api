import express from "express";
import pool from "../helpers/db";

const routes = (app: express.Application) => {

    app.post("/book/create", (req, res) => {
        const { name, author, img_url, goodreads_link, amazon_link } = req.body;
        const query: string = `INSERT INTO BOOK (NAME, AUTHOR, IMG_URL, GOODREADS_LINK, AMAZON_LINK) VALUES ("${name}", "${author}", "${img_url}", "${goodreads_link}", "${amazon_link}");`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({ 
                    success: true
                });
            }
        });
    });

    app.post("/book/create/:userid", (req, res) => {
        const { name, author, img_url, goodreads_link, amazon_link } = req.body;
        const query: string = `INSERT INTO BOOK (NAME, AUTHOR, IMG_URL, GOODREADS_LINK, AMAZON_LINK) VALUES ("${name}", "${author}", "${img_url}", "${goodreads_link}", "${amazon_link}");`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results.insertId);
                const query: string = `INSERT INTO JOURNAL_ENTRY (USER_ID, BOOK_ID) VALUES ("${req.params.userid}", ${results.insertId});`;
                pool.query(query, (err, results, fields) => {
                    if (err) console.log(err.message);
                })

                res.json({ 
                    success: true
                });
            }
        });
    });

    app.get("/book/get/:limit", (req, res) => {
        const query: string = `SELECT * FROM BOOK ORDER BY RAND() LIMIT ${req.params.limit}`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ 
                    success: false,
                    results: []
                });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    results: results
                });
            }
        })
    });

    app.get("/book/get/single/:id", (req, res) => {
        const query: string = `SELECT * FROM BOOK WHERE ID=${req.params.id}`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    results: results[0]
                });
            }
        })
    });

}

export default routes;