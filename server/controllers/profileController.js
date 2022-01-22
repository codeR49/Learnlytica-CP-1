const displayProfile = (req, res) => {
    res.send(req.user);
}

module.exports = {
    displayProfile
}