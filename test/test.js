var assert = require("assert");
var chai = require("chai");
var chaiHttp = require("chai-http");
var server=require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe ("Adding a User", function(){

    var users = [{
        "name": "Kamu Nyambe",
        "email": "kamu@email.com"

    }, {
        "name": "Nyambe Kamu",
        "email": "nyambe@email.com"

    }];

    it("Should add Users in DB", (done) => {
        for (user in users) {
        chai.request(server)
            .post("/users")
            .send(users[user])
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", res.body);
            });
        }
        done()
    })
    //...
});

describe("Retriving User Records", function(){
    it("should return all record", (done) => {
        chai.request(server)
        .get("/users/")
        .end((err, res)=>{
        res.should.have.status(200);
            console.log ("Got",result.body.data.length, " users")
            console.log ("Result Body:", res.body);
        });
        done()
    });
})