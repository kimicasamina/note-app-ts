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
const userService_1 = require("../../../src/services/userService");
const User_1 = __importDefault(require("../../../src/models/User"));
const customError_1 = require("../../utils/customError");
// Mock the User model
jest.mock('../../src/models/User');
describe.skip('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com',
            password: 'password',
        };
        User_1.default.create.mockResolvedValue(mockUser);
        const result = yield (0, userService_1.createUserInDB)('testUser', 'test@example.com', 'password');
        expect(result).toEqual(mockUser);
        expect(User_1.default.create).toHaveBeenCalledWith({
            username: 'testUser',
            email: 'test@example.com',
            password: 'password',
        });
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            {
                id: 1,
                username: 'user1',
                email: 'user1@example.com',
                password: 'password',
            },
            {
                id: 2,
                username: 'user2',
                email: 'user2@example.com',
                password: 'password',
            },
        ];
        User_1.default.findAll.mockResolvedValue(mockUsers);
        const result = yield (0, userService_1.getAllUsersFromDB)();
        expect(result).toEqual(mockUsers);
    }));
    it('should get a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com',
            password: 'password',
        };
        User_1.default.findOne.mockResolvedValue(mockUser);
        const result = yield (0, userService_1.getUserByEmail)('test@example.com');
        expect(result).toEqual(mockUser);
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com',
            password: 'password',
        };
        User_1.default.findByPk.mockResolvedValue(mockUser);
        User_1.default.prototype.save.mockResolvedValue(mockUser);
        const result = yield (0, userService_1.updateUserInDB)('1', 'newUsername', 'new@example.com', 'newpassword');
        expect(result.username).toEqual('newUsername');
        expect(result.email).toEqual('new@example.com');
    }));
    it('should throw an error if user to update does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findByPk.mockResolvedValue(null);
        yield expect((0, userService_1.updateUserInDB)('999', 'newUsername', 'new@example.com', 'newpassword')).rejects.toThrow(new customError_1.CustomError('User not found', 404));
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com',
            password: 'password',
        };
        User_1.default.findByPk.mockResolvedValue(mockUser);
        User_1.default.prototype.destroy.mockResolvedValue(undefined);
        const result = yield (0, userService_1.deleteUserFromDB)('1');
        expect(result).toBe(true);
    }));
    it('should throw an error if user to delete does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findByPk.mockResolvedValue(null);
        const result = yield (0, userService_1.deleteUserFromDB)('999');
        expect(result).toBe(false);
    }));
});
