const logRequests = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url} [${ip}]`);
    next();
};

module.exports =  logRequests ;