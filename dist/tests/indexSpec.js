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
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const endpoint = (0, supertest_1.default)(index_1.default);
describe('Test if the endpoints', () => {
    it('Test endpoint get / (not found page)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/');
        expect(response.status).toBe(404);
    }));
    it('Test endpoint get /api/image (no parameters)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image');
        //first time get 200 status code and if re-request will get redirect 304 code status
        expect([200, 304]).toContain(response.status);
    }));
    it('Test endpoint get /api/image/?filename=image1 (image already exist)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image1');
        expect(response.status).toBe(200);
    }));
    it('Test endpoint get /api/image/?filename=image20 (image not exist)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image20');
        expect(response.status).toBe(200);
    }));
    it('Test endpoint get /api/image/?filename=image1&width=600&height=600 (thumb already exist)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image1&width=600&height=600');
        expect(response.status).toBe(200);
    }));
    it('Test endpoint get /api/image?filename=image5&width=600&height=600 (thumb created)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image5&width=600&height=600');
        expect(response.status).toBe(200);
    }));
    it('Test endpoint get /api/image/?filename=image1&width=-600&height=600 (invalid width less than 1)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image1&width=-600&height=600');
        expect(response.status).toBe(200);
    }));
    it('Test endpoint get /api/image/?filename=image1&width=600&height=-600 (invalid height less than 1)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image1&width=600&-height=600');
        expect(response.status).toBe(200);
    }));
    it('Test endpoint get /api/image/?filename=image1&width=123456789&height=123456789 (very big width and height)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield endpoint.get('/api/image/?filename=image1&width=123456789&height=123456789');
        expect(response.status).toBe(200);
    }));
    //delete the new file created by test
    afterAll(() => {
        const path = 'src/public/thumb/image5_600-600.jpg';
        try {
            fs_1.default.accessSync(path);
            fs_1.default.unlinkSync(path);
        }
        catch (_a) {
            console.log('something went wrong in deleting the test image :(');
        }
    });
});
