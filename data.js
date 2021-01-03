var bcrypt = require('bcryptjs');

const data = {
    users: [
        {
            name: 'Vu Boi',
            email: 'vuboiabc@gmail.com',
            password: bcrypt.hashSync('12345', 8),
            phone: '0974336741',
            isAdmin: true,
            isStaff: true,
        },
    ],
};

module.exports = data;
