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
exports.getCache = exports.setCache = void 0;
const redis_1 = __importDefault(require("redis"));
const util_1 = require("util");
const redisClient = redis_1.default.createClient();
const getAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
const setAsync = (0, util_1.promisify)(redisClient.set).bind(redisClient);
const setCache = (key, value, ttl) => __awaiter(void 0, void 0, void 0, function* () {
    yield setAsync(key, JSON.stringify(value), "EX", ttl);
});
exports.setCache = setCache;
const getCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAsync(key);
    return data ? JSON.parse(data) : null;
});
exports.getCache = getCache;
