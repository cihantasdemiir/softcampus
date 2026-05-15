const userModel = require('../model/userModel');

// Rol güncelle
exports.updateRole = async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;

    // Geçerli roller
    const validRoles = ['user', 'moderator', 'admin'];
    if (!validRoles.includes(role)) return res.redirect('/admin');

    await userModel.updateRole(id, role);
    res.redirect('/admin');
};