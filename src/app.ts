import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import cookieParser from "cookie-parser";
import { SocketManager } from "./dependences/SocketManager";
import adminRoutes from "./layers/routes/admin.routes";
import scenaryRoutes from "./layers/routes/scenary.routes";
import studentRoutes from "./layers/routes/student.routes";
import filesRoutes from "./layers/routes/files.routes";
import authRoutes from "./layers/routes/auth.routes";
import path from "path";
import { Database } from "./dependences/Database";
import { GlobalLimiter } from "./middlewares/rateLimiter.middleware";

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

DBConnection.initialize();
socketManager.initialize();

// CORS
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin) || origin === "http://localhost:3000") {
            callback(null, true);
            console.log(origin);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
// app.use(GlobalLimiter);
app.use(cookieParser());

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
