const express = require('express');
const app = express();
const mongoose = require("mongoose");
var cors = require('cors');

 

app.use(express.json());
app.use(cors()); 

const taskRouter = require("./routes/taskRoutes");
const userRouter= require("./routes/userRoutes");

app.get("/", (req, res) => res.send("<h1>It's working</h1> go to <a href='/tasks'>tasks</a>"));

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

mongoose.connect(
    "mongodb+srv://mihailhanga:ParolaCrystal@cluster0.mjivone.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
).then(() => {
    const { createProxyMiddleware } = require('http-proxy-middleware');
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8080/', //original url
        changeOrigin: true,
        //secure: false,
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    }));
    app.listen(4000);
});