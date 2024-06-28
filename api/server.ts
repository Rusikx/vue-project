import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import api from './routers/index.routes.ts'
import migrations from "./migrations/index.ts"

dotenv.config()
const app = express()
app.use(cors())

// const corsOptions = {
//     // "origin": "*",
//     "origin": process.env.VITE_FRONT_HOST,
//     // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     // "preflightContinue": false,
//     "headers": "x-access-token, Origin, Content-Type, Accept",
//     // "optionsSuccessStatus": 204,
//     "credentials": true
// };

// app.use(cors(corsOptions));
// app.options('*', cors());
// app.use(cors());
//
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
//     // res.header(
//     //     'Access-Control-Allow-Headers',
//     //     'Origin, X-Requested-With, Content-Type, Accept'
//     // );
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// set port, listen for requests
const PORT = process.env.VITE_SERVER_PORT || 8081

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
app.use(api)
migrations()

export default app
