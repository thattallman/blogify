const { validateToken } = require("../service/auth");
function checkUser(cookie) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookie];
    if (!tokenCookieValue) {
    next();
      return;
    }
    try {
      const userPayLoad = validateToken(tokenCookieValue);
      req.user = userPayLoad;
      next();
    } catch (error) {
      console.log("token found does not match ");
     next()
      return;
    }
  };
}
module.exports = {checkUser}
