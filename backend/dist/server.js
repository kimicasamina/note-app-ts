"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 9999;
// Test database connection and sync models
models_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected...');
    return models_1.sequelize.sync({ force: false });
})
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
