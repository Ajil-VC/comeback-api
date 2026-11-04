

const logger = (req, res, next) => {

    const date = new Date();
    console.log(`Method : ${req.method} \n URL : ${req.url} \n Time : ${date}`);
    next();
}

module.exports = logger;