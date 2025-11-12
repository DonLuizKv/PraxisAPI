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
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin) || origin === "http://localhost:3000") {
            callback(null, true);
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
app.use(cookieParser())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
//     next();
// });

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
