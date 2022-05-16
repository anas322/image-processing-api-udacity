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
exports.createThumbedImage = exports.checkIfThumbExist = exports.getAllImagesNames = exports.checkIfImageExist = void 0;
const fs_1 = __importDefault(require("fs"));
const processImage_1 = __importDefault(require("./processImage"));
const imageFilePath = 'src/public/full';
const imageThumbPath = 'src/public/thumb';
const checkIfImageExist = (filename) => {
    return fs_1.default.existsSync(`${imageFilePath}/${filename}.jpg`);
};
exports.checkIfImageExist = checkIfImageExist;
const checkIfThumbExist = (query) => {
    const filename = query.filename;
    const width = query.width;
    const height = query.height;
    const fullName = `${filename}_${width}-${height}`; //image full name
    return fs_1.default.existsSync(`${imageThumbPath}/${fullName}.jpg`) ? fullName : false;
};
exports.checkIfThumbExist = checkIfThumbExist;
const getAllImagesNames = () => {
    const names = fs_1.default.readdirSync(imageFilePath).map((item) => {
        const indexOfDotSymbol = item.lastIndexOf('.');
        return item.substring(0, indexOfDotSymbol);
    });
    return names;
};
exports.getAllImagesNames = getAllImagesNames;
const createThumbedImage = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const imageFrom = `${imageFilePath}/${query.filename}.jpg`;
    const thumbName = `${query.filename}_${query.width}-${query.height}.jpg`;
    const imageTo = `${imageThumbPath}/${thumbName}`;
    return yield (0, processImage_1.default)({
        imageFrom,
        imageTo,
        width: parseInt(query.width),
        height: parseInt(query.height),
    });
});
exports.createThumbedImage = createThumbedImage;
