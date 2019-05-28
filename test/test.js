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

    }, {
        "name": "Bob Ross",
        "email": "Rossa@email.com"

    }];

    it("Should return error status 200 OK", (done) => {
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

    it("should return ONLY 1 record", (done) => {
        chai.request(server)
        .get("/users/1/1")
        .end((err, res)=>{
        res.body.data.should.have.length(1);
            console.log ("Got",res.body.data.length, " users")
            console.log ("Result Body:", res.body);
        });
        done()
    });

    it("should return a user named Bob", (done) => {
        chai.request(server)
            .get("/users?search=Bob Ross")
            .end((err, res)=>{
            res.body.data[0].should.have.nested.property('name', 'Bob Ross');
            console.log ("Got",res.body.data.length, " users")
            console.log ("Result Body:", res.body);
        });
        done()
    });

    it("should return ONLY one user named kamu", (done) => {
        chai.request(server)
        .get("/users/1/1?search=kamu nyambe")
        .end((err, res)=>{
        res.body.data[0].should.have.nested.property('name', 'Kamu Nyambe');
    res.body.data.should.have.length(1);
    console.log ("Got",res.body.data.length, " users")
    console.log ("Result Body:", res.body);
});
    done()
});
})