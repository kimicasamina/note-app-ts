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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const User_1 = __importDefault(require("../../../models/User"));
describe.skip('User Controller', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.sync({ force: true }); // Sync the database for tests
    }));
    it('should create a new user and hash the password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users').send({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(201);
        expect(response.body.username).toBe('JohnDoe');
        expect(response.body.password).not.toBe('password123'); // password should be hashed
    }));
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.create({
            username: 'JaneDoe',
            email: 'jane.doe@example.com',
            password: 'password123',
        });
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2); // Should return the two users
    }));
});
