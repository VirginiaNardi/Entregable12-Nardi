import logger from '../logger.js'

export const viewsUserRegisterController = (req, res) => {
    if (req.session.user) {
        // Si el usuario ya está autenticado, redireccionar al perfil
        res.redirect('/profile');
    } else {
        res.render('register');
    }
}

export const viewsUserLoginController = (req, res) => {
    if (req.session.user) {
        // Si el usuario ya está autenticado, redireccionar al perfil
        res.redirect('/products');
    } else {
        res.render('login');
    }
}

export const viewsUserProfileController = (req, res) => {
    // Obtener la información del usuario desde la sesión
    const userInfo = {
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        email: req.session.user.email,
        age: req.session.user.age,
        cart: req.session.user.cart,
    };
    logger.debug('UserInfo:', userInfo);
    res.render('profile', userInfo);
}

export const viewsUserLogoutController = (req, res) => {
    // Destruir la sesión actual del usuario
    req.session.destroy((err) => {
        if (err) {
            logger.error(err.message);
        }
        // Redireccionar a la vista de inicio de sesión
        res.redirect('/login');
    });
}

export const viewsUserForgetPasswordController = (req, res) => {

    res.render('forget-password');
}


