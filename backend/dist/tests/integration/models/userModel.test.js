"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../models/User"));
const database_1 = __importDefault(require("../../../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
describe.skip('User Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.sync({ force: true });
    }));
    it('should create a new user and hash the password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.create({
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(user).toHaveProperty('id');
        expect(user.password).not.toBe('password123'); // Password should be hashed
        const isValid = yield bcryptjs_1.default.compare('password123', user.password);
        expect(isValid).toBe(true);
    }));
    it('should retrieve users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.default.findAll();
        expect(users.length).toBeGreaterThan(0);
        expect(Array.isArray(users)).toBe(true);
    }));
});
