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
const fs_1 = __importDefault(require("fs"));
const image_1 = require("../../routes/utilities/image");
describe('Test all image functions', () => {
    const filename = 'image1'; //check full folder
    const fakeFile = 'fakeName';
    const query = { filename: 'image1', width: '150', height: '150' }; //check thumb folder
    const fakeQuery = { filename: 'FakeName', width: '150', height: '150' }; //check thumb folder
    it('Test image existence in full folder (TRUE FILE)', () => {
        const result = (0, image_1.checkIfImageExist)(filename);
        expect(result).toBeTruthy();
    });
    it('Test image existence in full folder (FAKE FILE)', () => {
        const result = (0, image_1.checkIfImageExist)(fakeFile);
        expect(result).toBeFalsy();
    });
    it('Test thumb existence in thumb folder (TRUE FILE)', () => {
        const result = (0, image_1.checkIfThumbExist)(query);
        expect(result).toBeTruthy();
    });
    it('Test image existence in thumb folder (FAKE FILE)', () => {
        const result = (0, image_1.checkIfThumbExist)(fakeQuery);
        expect(result).toBeFalsy();
    });
    it('Test to get all the images in full foler', () => {
        const results = (0, image_1.getAllImagesNames)();
        expect(results).toEqual(['image1', 'image2', 'image3', 'image4', 'image5']);
    });
    it('Test if the thumb will be created', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, image_1.createThumbedImage)({
            filename: 'image5',
            width: '600',
            height: '600',
        });
        expect(result.type).toBe('success');
    }));
    it('Test if the thumb will (NOT) be created if the width or heigh are very big', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, image_1.createThumbedImage)({
            filename: 'image5',
            width: '60000000',
            height: '60000000',
        });
        expect(result.type).toBe('error');
    }));
});
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
