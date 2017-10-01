"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middleware {
    set(app) {
        app.use((req, res, next) => {
            console.log('middleware setup works');
            next();
        });
    }
}
exports.default = Middleware;
