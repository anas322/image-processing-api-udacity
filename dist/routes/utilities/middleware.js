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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const image_1 = require("../utilities/image");
const validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //check if filename exist
    if (!filename) {
        return res.send('<p style="font-size:2.5rem">please select a filename, width and height of the image appropriately\n example: <strong>http://localhost:3000/api/image/?filename=image1.jpg&width=500&height=500</strong></p>');
    }
    //check if image not exit
    if (!(0, image_1.checkIfImageExist)(filename)) {
        const names = (0, image_1.getAllImagesNames)().join(' - ');
        return res.send(`please select filename of one of these names: <strong>${names}</strong> `);
    }
    //display original image if no dimensions available
    if (!width && !height) {
        return res.sendFile(`public/full/${filename}.jpg`, { root: 'src' });
    }
    //check width validation
    if (width < 1 || isNaN(width)) {
        return res.send('please specify a valid width greater than 1');
    }
    //check height validation
    if (height < 1 || isNaN(height)) {
        return res.send('please specify a valid height greater than 1');
    }
    //check if thumb exist
    if ((0, image_1.checkIfThumbExist)(req.query)) {
        return res.sendFile(`public/thumb/${(0, image_1.checkIfThumbExist)(req.query)}.jpg`, {
            root: 'src',
        });
    }
    next();
});
exports.validate = validate;
