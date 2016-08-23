'use strict';

// because chai isn't lint-friendly
/* jshint -W024 */
/* jshint expr:true */

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('Example Unit Test Structure', function(){

    it('should return true', function(){
        var result = {title:"testData", id:5, completed:true};
        expect(result.completed).to.be.true;
    });
});