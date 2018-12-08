"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testData = __importStar(require("../src/Test"));
const chai_1 = require("chai");
describe('Test chai', () => {
    it('should be true', () => {
        chai_1.expect(testData.result).to.be.equal(true);
    });
});
//# sourceMappingURL=chai.test.js.map