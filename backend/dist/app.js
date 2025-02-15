"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware setup
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(helmet());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL, // Ensure this is the exact URL of your frontend app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header if needed
    credentials: true, // Allow cookies to be sent with the request
}));
app.use(express_1.default.json());
// API endpoints
app.use('/api/users', userRoutes_1.default);
app.use('/api/auths', authRoutes_1.default);
app.use('/api/notes', noteRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
// Error handling middleware
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
