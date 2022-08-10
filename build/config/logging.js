"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimestamp = () => {
    return new Date().toISOString();
};
const info = (namespace, message, object) => {
    if (object) {
        console.log(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    }
    else {
        console.warn(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    }
    else {
        console.error(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.debug(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    }
    else {
        console.debug(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};
exports.default = {
    info,
    warn,
    error,
    debug
};
