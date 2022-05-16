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
const sharp_1 = __importDefault(require("sharp"));
//process image in the range of it's dimensions
const processImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(image.imageFrom)
            .resize(image.width, image.height)
            .jpeg()
            .toFile(image.imageTo);
        return null;
    }
    catch (_a) {
        const dimensions = yield (0, sharp_1.default)(image.imageFrom).metadata();
        return `<p style ="font-size:2.5rem" >image can't be procced, please specify width between<strong> 1 and ${dimensions.width}</strong> and height between <strong>1 and ${dimensions.height}</strong></p>`;
    }
});
exports.default = processImage;
