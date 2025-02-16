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
const database_1 = __importDefault(require("../../../config/database"));
const User_1 = __importDefault(require("../../../models/User"));
// Set up the database connection before running tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.sync({ force: true }); // Reset the database for each test
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.close(); // Close the database connection after tests
}));
describe.skip('User Routes', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users').send({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe('JohnDoe');
        expect(response.body.email).toBe('john.doe@example.com');
    }));
    it('should return 400 if missing required fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users').send({
            username: 'JohnDoe',
            password: 'password123',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing required fields: username, email, or password');
    }));
    it('should return 401 if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user first
        yield (0, supertest_1.default)(app_1.default).post('/api/users').send({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        // Try creating the same user again
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users').send({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User already exist.');
    }));
    it('should fetch all users', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user first
        yield (0, supertest_1.default)(app_1.default).post('/api/users').send({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/users').send();
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].username).toBe('JohnDoe');
    }));
    it('should handle internal server errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Force an error in the route handler
        jest
            .spyOn(User_1.default, 'findAll')
            .mockRejectedValueOnce(new Error('Database Error'));
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/users').send();
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal Server Error');
    }));
});
