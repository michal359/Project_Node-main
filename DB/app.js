// const express = require('express');

// const app = express();
// app.use (express.json());
// app.use(express.urlencoded({ extended: true }));
// const port = 3000;

// const albumsRouter=require("./routes/albumsRoutes")
// app.use("/albums",albumsRouter);

// const postsRouter=require("./routes/postsRoutes")
// app.use("/posts",postsRouter);

// const todosRouter=require("./routes/todosRoutes")
// app.use("/todos",todosRouter);

// const commentsRouter=require("./routes/commentsRoutes")
// app.use("/comments",commentsRouter);

// const photosRouter=require("./routes/photosRoutes")
// app.use("/photos",photosRouter);

// const usersRouter=require("./routes/usersRoutes")
// app.use("/users",usersRouter);

// const passwordsRouter=require("./routes/passwordsRoutes")
// app.use("/passwords",passwordsRouter);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
const express = require('express');
const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const albumsRouter = require("./routes/albumsRoutes")
app.use("/albums", albumsRouter);

const postsRouter = require("./routes/postsRoutes")
app.use("/posts", postsRouter);

const todosRouter = require("./routes/todosRoutes")
app.use("/todos", todosRouter);

const commentsRouter = require("./routes/commentsRoutes")
app.use("/comments", commentsRouter);

const photosRouter = require("./routes/photosRoutes")
app.use("/photos", photosRouter);

const usersRouter = require("./routes/usersRoutes")
app.use("/users", usersRouter);

const passwordsRouter = require("./routes/passwordsRoutes")
app.use("/passwords", passwordsRouter);

const loginRouter = require("./routes/loginRoutes")
app.use("/login", loginRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
