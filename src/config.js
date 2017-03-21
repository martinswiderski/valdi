'use strict';

var rebuildVersion = process.argv[2] && process.argv[2] === '--update-version' ? true : false,
    fs = require('fs'),
    config = {
        version: '0.0.35',
        published: '2017-03-13',
        readme: 'README.md',
        package: 'package.json',
        runUpdate: updateVersion
    };

function updateVersion(pck, read, ver, rebuild) {
    var err = [];
    if (rebuild !== true) {
        return false;
    } else {
        var pckg = require(pck),
            readme = fs.readFileSync(read, 'utf8').toString().split(('\n'));
        if (!pckg.version) {
            err.push('Package info not found');
        } else {
            pckg.version = ver;
            fs.writeFileSync(pck, JSON.stringify(pckg, null, 2));
        }
        if (readme.length < 5) {
            err.push('Readme file too short');
        } else {
            for (var l in readme) {
                if (readme[l].indexOf('ver. **')> -1)  readme[l] = 'ver. **' + ver +'**';
            }
            fs.writeFileSync(read, readme.join('\n'), 'utf8');
        }
        return (err.length === 0) ? true : err;
    }
}

updateVersion(
    __dirname + '/../' + config.package,
    __dirname + '/../' + config.readme,
    config.version,
    rebuildVersion
);

module.exports = config;
