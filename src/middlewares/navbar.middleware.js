const currentUrl = (req, res, next) => {
    if(req.originalUrl == '/login'){
        res.locals.currentUrl = '/alerts'
    }else{
        res.locals.currentUrl = req.originalUrl;
    }
    next();
}

module.exports = {
    currentUrl
}
  