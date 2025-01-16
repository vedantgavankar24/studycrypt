const User = require('../models/User');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const { sendVerificationEmail } = require('../utils/email');
const { sendPasswordResetEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const {username, email, password} = req.body;
  try {
    const existingUsernorem = await User.findOne({ $or: [{ username }, { email }] });
    if(existingUsernorem) {
      const existingUser = await User.findOne({ username , email });

      if(existingUser) {
        res.render('alreadyExists');
      } else {
        const existingUser1 = await User.findOne({ username });
        const existingUser2 = await User.findOne({ email });
        if(existingUser1) {
          res.render('unExists');
        } else if(existingUser2) {
          res.render('eExists');
        }
      } 
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.render('registrationSuccess');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.registerpatient = async (req, res) => {
  const {
    regid,
    name, 
    age,
    gender,
    bloodgroup,
    roomNumber,
    floorNumber,
    bedNumber,
    diseases,
    allergies,
    contact,
    emergencyContact, } = req.body;
  try {
    const existingUsernorem = await Patient.findOne({ regid });
    if(existingUsernorem) {
        res.render('alreadyExists');
    } else {
      const newPatient = new Patient({
        regid,
        name, 
        age,
        gender,
        bloodgroup,
        roomNumber,
        floorNumber,
        bedNumber,
        diseases,
        allergies,
        contact,
        emergencyContact,
      });

      await newPatient.save();

      res.render('registrationSuccess');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

exports.removepatient = async (req, res) => {
  const { regid } = req.body;
  try {
    const existingUsernorem = await Patient.findOne({ regid });
    if(existingUsernorem) {
        await existingUsernorem.deleteOne();
    } else {
      res.render('registrationSuccess');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

      res.render('dashboard', {
        _id: user._id,
        username: user.username,
        role: user.role,
      });
  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const { identifier } = req.body;

  try {
      // Find user by username or email
      const user = await User.findOne({
          $or: [{ username: identifier }, { email: identifier }]
      });

      if (!user) {
        res.render('userdnexist');
      } else {
          await sendPasswordResetEmail(user.email, user.username);
          res.render('passresetmailsent');
      }
  } catch (err) {
      console.error('Password reset error:', err);
      res.status(500).json({ error: err.message });
      //return res.status(500).json({ error: 'Internal server error' });
    
  }
};

exports.showResetPasswordForm = async (req, res) => {
  const { username } = req.params;
  try {
    const userid = await User.findOne({ username: username});
    if(!userid) {
      res.render('userdnexist');
    } else {
      res.render('reset-password', { userid });
    }
  } catch (error) {
      console.error('Error rendering password reset form:', error);
      res.status(500).send('Internal server error');
  }
};

exports.resetPassword = async (req, res) => {
  const { userid } = req.params;
  const { password, confirmPassword } = req.body;

  try {
      const user = await User.findOne({ id: userid  });

      if (!user) {
        res.render('userdnexist');
      } else {

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        res.render('password-reset-success');
      }
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send('Internal server error');
  }
};

exports.dashboard = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.render('dashboard', { username: req.user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.logoutUser = (req, res) => {
  req.logout(err => {
      if (err) {
          console.error(err);
      }
      res.redirect('/');
  });
};

