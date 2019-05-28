var User = require('./userModel');


// Listing
exports.index = function (req, res) {
    const perPage = req.params.perPage || 5;
    const page = req.params.page || 1;


    if(req.query.search){
        try {
            const searchQuery = req.query.search;
            const resultSet = User.find({name: searchQuery})
                .skip((perPage * page) - perPage)
                .limit(perPage);

            res.status(200).json({
                data: resultSet
            });
        }
        catch(err)
        {
            res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }else{
        User.get(function (err, users) {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: err,
                });
            }
            res.status(200).json({
                status: "success",
                data: users
            });
        });
    }

};

// New user
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;

    user.save(function (err) {
         if (err){
             res.status(500).json({
                 status: "error",
                 message: err.message(),
             });
         }

        res.status(200).json({
            status: "OK",
            message: "OK",
        });
    });
};