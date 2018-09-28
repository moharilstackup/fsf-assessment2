//Step 1: load path and express
require('dotenv').config();
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var cors = require('cors')
//var request = require('request');
//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

const API_URI = "/api";

//Configure a connection pool to the database
console.log("process.env.DB_PORT => ", process.env.DB_PORT);


//Q2a :  Default list , limit 10 offset 0 ASC product name
const sqlFindDefaultBooks = "SELECT * FROM books ORDER BY title ASC LIMIT 10 OFFSET 0";
//Find by id
const sqlFindOneBook = "SELECT * FROM books WHERE id=?";
//Find books queries
const sqlFindAllBooks = "SELECT * FROM books WHERE (title LIKE ?) || (author_firstname LIKE ?) || ( author_lastname LIKE ?) ORDER BY title ASC LIMIT ? OFFSET ?"



//const sqlFindAllGroceries = "SELECT * FROM grocery_list WHERE (name LIKE ?) || (brand LIKE ?) LIMIT ? OFFSET ?";
// const sqlFindAllGroceriesUnsort = "SELECT * FROM grocery_list WHERE (name LIKE ?) || (brand LIKE ?) LIMIT ? OFFSET ?";
//const sqlFindAllGroceriesUnsort = "SELECT * FROM grocery_list WHERE (brand LIKE ?) || (name LIKE ?)";
//const sqlFindAllGroceriesSort = "SELECT * FROM grocery_list WHERE (brand LIKE ?) || (name LIKE ?) ORDER BY ? ? ";
//const sqlFindAllGroceriesSortNameDesc = "SELECT * FROM grocery_list WHERE (brand LIKE ?) || (name LIKE ?) ORDER BY name DESC ";
//const sqlFindAllGroceriesSortBrandDesc = "SELECT * FROM grocery_list WHERE (brand LIKE ?) || (name LIKE ?) ORDER BY brand DESC ";
//const sqlFindAllGroceriesSortNameAsc = "SELECT * FROM grocery_list WHERE (brand LIKE ?) || (name LIKE ?) ORDER BY name ASC ";
//const sqlFindAllGroceriesSortBrandAsc = "SELECT * FROM grocery_list WHERE (brand LIKE ?) || (name LIKE ?) ORDER BY brand ASC ";
//const sqlFindAllGroceries = "SELECT * FROM grocery_list limit 5";


const pool = mysql.createPool({
    host: process.env.DB_HOST, //"localhost",
    port: process.env.DB_PORT, //3306,
    user: process.env.DB_USER, //"root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, //"derby",
    connectionLimit: process.env.DB_CONLIMIT //4
    // debug: true
});

var makeQuery = (sql, pool) => {
    console.log("makeQuery sql", sql);

    return (args) => {
        let queryPromsie = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(args);

                connection.query(sql, args || [], (err, results) => {
                    connection.release();
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log(">>> " + results);
                    resolve(results);
                })
            });
        });
        return queryPromsie;
    }
}

// Books query variables
var findDefaultBooks = makeQuery(sqlFindDefaultBooks, pool);
var findOneBookById = makeQuery(sqlFindOneBook, pool);
var findAllBooks = makeQuery(sqlFindAllBooks, pool);


//var findAllGroceries = makeQuery(sqlFindAllGroceries, pool);
//var findAllGroceriesUnsort = makeQuery(sqlFindAllGroceriesUnsort, pool);
//var findAllGroceriesSort = makeQuery(sqlFindAllGroceriesSort, pool);
//var findAllGroceriesSortNameDesc = makeQuery(sqlFindAllGroceriesSortNameDesc, pool);
//var findAllGroceriesSortBrandDesc = makeQuery(sqlFindAllGroceriesSortBrandDesc, pool);
//var findAllGroceriesSortNameAsc = makeQuery(sqlFindAllGroceriesSortNameAsc, pool);
//var findAllGroceriesSortBrandAsc = makeQuery(sqlFindAllGroceriesSortBrandAsc, pool);

//Step 2: create an instance of the application
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get(API_URI + "/books/:bookId", (req, res) => {
    console.log("/books/:bookId params !");
    let bookId = req.params.bookId;
    console.log(bookId);
    findOneBookById([parseInt(bookId)]).then((results) => {
        console.log(results);
        res.json(results);
    }).catch((error) => {
        res.status(500).json(error);
    })
})


app.get(API_URI + '/books', (req, resp) => {
    console.log("/books query");
    var bookId = req.query.bookId;
    console.log(bookId);

    if (typeof (bookId) === 'undefined') {
        console.log(req.query);
        console.log(">>>" + bookId);
        var keyword = req.query.keyword;
        var selectionType = req.query.selectionType;
        //var orderBy = req.query.orderBy;
        console.log(keyword);
        console.log(selectionType);
        //console.log(orderBy);
        // Array contains [ <title>, <firstname>, <lastname>,  <limit>, <offset>]
        //   if title keyword, then [ keyword, '', '', limit, offset]
        //   if author keyword, then [ '', keyword, keyword, limit, offset]
        //   if both , then [ keyword, keyword, keyword, limit, offset]
        // since author firstname contain empty strings, forced to use special character '³' 
        let finalCriteriaFromType = ['%', '%', '%', parseInt(req.query.limit), parseInt(req.query.offset)];
        if (selectionType == 'title') {
            finalCriteriaFromType = ['%' + keyword + '%', '³', '³', parseInt(req.query.limit),parseInt(req.query.offset)];
        } else if (selectionType == 'name') {
            finalCriteriaFromType = ['³', '%' + keyword + '%', '%' + keyword + '%', parseInt(req.query.limit),parseInt(req.query.offset)];
        } else if (selectionType == 'both') {
            finalCriteriaFromType = ['%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', parseInt(req.query.limit),parseInt(req.query.offset)];
        }

        findAllBooks(finalCriteriaFromType)
        .then((results)=>{
            console.log(results);
            resp.json(results);
        }).catch((error)=>{
            resp.status(500).json(error);
        });
 

    } else {
        // resp.status(200);
        //resp.json({name:"fred"});
        findOneBookById([parseInt(bookId)]).then((results) => {
            resp.json(results);
        }).catch((error) => {
            console.log(error);
            resp.status(500).json(error);
        });
    }
});



//Serves from public the dist directory
app.use(express.static(__dirname + "/../src/app"));
console.log(__dirname);

//Step 4: start the server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
}
);