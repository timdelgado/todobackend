'use strict'

var request = require("supertest");
var server = require("../server");
var app = server.getApp;

describe('GET /', function(){
    it('expects HTTP response 200', function(done){
        request(app)
            .get('/api/todos')
            .expect(200, done);
    });
});