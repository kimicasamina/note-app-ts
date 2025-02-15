"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.Category = exports.User = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Category_1 = __importDefault(require("./Category"));
exports.Category = Category_1.default;
const Note_1 = __importDefault(require("./Note"));
exports.Note = Note_1.default;
// Define associations
const defineAssociations = () => {
    User_1.default.hasMany(Note_1.default, { foreignKey: 'user_id', as: 'notes' });
    Note_1.default.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'user' });
    Category_1.default.hasMany(Note_1.default, { foreignKey: 'category_id', as: 'notes' });
    Note_1.default.belongsTo(Category_1.default, { foreignKey: 'category_id', as: 'category' });
    User_1.default.hasMany(Category_1.default, { foreignKey: 'user_id', as: 'categories' });
    Category_1.default.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'user' });
};
// Initialize associations
defineAssociations();
