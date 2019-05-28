var User = require('./userModel');


// Listing
exports.index = async function(req, res) {
    const perPage = parseInt(req.params.perPage) || 5;
    const page = parseInt(req.params.page) || 1;


    if(req.query.search){
        try {
            const searchQuery = req.query.search;
            const resultSet = await User.find({ 'name' : { '$regex' : searchQuery , '$options' : 'i' } })
                .limit(perPage)
                .skip((perPage * page) - perPage);


            res.status(200).json({
                data: resultSet
            });
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }else{
        try {
            const resultSet = await User.find({})
                .limit(perPage)
                .skip((perPage * page) - perPage);

            res.status(200).json({
                data: resultSet
            });
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: err,
            });
        }
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