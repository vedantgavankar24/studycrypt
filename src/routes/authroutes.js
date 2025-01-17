const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

  // Logout Handle
  router.get('/logout', (req, res) => {
    req.logout(err => {
        res.redirect('/login');
      //});
    });
  });
  
  // Route to render the forgot password form
  router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
  });
  
  
  // Route to handle password reset request
  router.post('/forgot-password', authController.resetPasswordRequest);
  
  // Route to render the password reset form
  router.get('/reset-password/:username', authController.showResetPasswordForm);
  
  // Route to handle password reset form submission
  router.post('/reset-password/:userid', authController.resetPassword);
  
  module.exports = router;