const User = require("../models/User");

const user = new User()

const userData = {
    username: 'Allexandre Cardoso Pereira',
    email: 'allecp.2002@gmail.com',
    created_at: 'NOW()'
};

// user.delete('user_id = 8')
// user.insert(userData)

user.update({username: "Marcelo"},"user_id = 10")