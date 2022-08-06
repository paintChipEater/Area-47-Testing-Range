const User = require('../model/User');

const handleLogout = async (req, res) => {
    // on client, also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content to send back
    const refreshToken = cookies.jwt;

    // is refresh token in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    
    //Delete the refresh token in the DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
}
module.exports = { handleLogout }