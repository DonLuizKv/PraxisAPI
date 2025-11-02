import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import { Server } from "socket.io";
import { SocketManager } from "./dependences/SocketManager";
import adminRoutes from "./layers/routes/admin.routes";
import scenaryRoutes from "./layers/routes/scenary.routes";
import studentRoutes from "./layers/routes/student.routes";
import filesRoutes from "./layers/routes/files.routes";
import authRoutes from "./layers/routes/auth.routes";
import path from "path";
import { Database } from "./dependences/Database";

dotenv.config();

// Environment Variables
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Server
const app = express();
const server = http.createServer(app);

// Dependences
const socketManager = SocketManager.getInstance(server);
const DBConnection = Database.getInstance();

DBConnection.initialize()
socketManager.initialize();

// // Rate Limit
// const limiter = rateLimit({
//     windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
//     max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
//     message: {
//         error: 'Demasiadas peticiones desde esta IP, por favor intente nuevamente más tarde.'
//     }
// });

// CORS
const corsOptions = {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes Use
app.use("/admin", adminRoutes);
app.use("/scenary", scenaryRoutes);
app.use("/student", studentRoutes);
app.use("/files", filesRoutes);
app.use("/auth", authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Welcome
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Praxis")
})

server.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
})
