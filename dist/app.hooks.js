"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./hooks/logger");
const loggerHook = new logger_1.default();
const appHooks = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [loggerHook.set()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    error: {
        all: [loggerHook.set()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
exports.default = appHooks;
