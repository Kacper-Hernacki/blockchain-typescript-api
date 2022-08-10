const getTimestamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
