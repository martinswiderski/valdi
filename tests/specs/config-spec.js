var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    Config = require('./../../src/config'),
    shortid = require('shortid');

console.log('MD5: ' + md5(fs.readFileSync(__filename)) + ' File: ' + path.basename(__filename));

describe('Config', function () {
    it('Structure', function () {
        expect(typeof Config).toBe('object');
        expect(typeof Config.version).toBe('string');
        expect(typeof Config.published).toBe('string');
        expect(typeof Config.readme).toBe('string');
        expect(typeof Config.package).toBe('string');
        expect(typeof Config.runUpdate).toBe('function');
    });
});

var fakeVersion     = shortid.generate(),
    fakePackageJson = __dirname + '/../props/dummie.json',
    fakeReadmeFile  = __dirname + '/../props/version.txt',
    errPackageJson = __dirname + '/../props/noversion.json',
    errReadmeFile  = __dirname + '/../props/empty.txt',
    err = [];

Config.runUpdate(fakePackageJson, fakeReadmeFile, fakeVersion, true);

var afterPackage = require(fakePackageJson),
    afterReadme  = fs.readFileSync(fakeReadmeFile, 'utf8').toString().split(('**'));

describe('Config files updated with new version', function () {
    it('Structure match', function () {
        expect(afterPackage.version).toBe(fakeVersion);
        expect(afterReadme[1]).toBe(fakeVersion);
    });
});

err = Config.runUpdate(errPackageJson, errReadmeFile, fakeVersion, true);

var afterErrPackage = require(errPackageJson),
    afterErrReadme  = fs.readFileSync(errReadmeFile, 'utf8').toString().split(('**'));

describe('Config files not updated with new version', function () {
    it('Structure mismatch', function () {
        expect(afterErrPackage.version === fakeVersion).toBe(false);
        expect(afterErrReadme[1] === fakeVersion).toBe(false);
    });
    it('Errors returned', function () {
        expect(err.length).toBe(2);
        expect(err[0]).toBe('Package info not found');
        expect(err[1]).toBe('Readme file too short');
    });
});

