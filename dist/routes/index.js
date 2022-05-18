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
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./utilities/middleware");
const image_1 = require("./utilities/image");
const routes = express_1.default.Router();
routes.get('/api/image', middleware_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //try make the thumb image and response with it or send an error message
    try {
        const response = yield (0, image_1.createThumbedImage)(req.query);
        if (response.type === 'success') {
            const thumbName = `${req.query.filename}_${req.query.width}-${req.query.height}.jpg`;
            res.sendFile(`/${thumbName}`, { root: 'src/public/thumb' });
        }
        else if (response.type === 'error') {
            res.send(response.data);
        }
    }
    catch (_a) {
        res.send('what did you do dude :|');
    }
}));
exports.default = routes;
