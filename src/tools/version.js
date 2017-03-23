'use strict';

var fs = require('fs'),
    rebuildVersion = process.argv[2] && process.argv[2] === '--update' ? true : false,
    config = require('./../config'),
    version = process.argv[2] && process.argv[2] === '--check' && process.argv[3] ? process.argv[3] : false,
    versionNpm = process.argv[2] && process.argv[2] === '--check' && process.argv[4] ? process.argv[4] : false;

function vaklidVersion(v) {
    var str = new String(v).valueOf(),
        blocks = str.split('.');
    if (blocks.length !== 3) {
        return false;
    } else {
        for (var i in blocks) {
            if (parseInt(blocks[i]) + '' !== '' + blocks[i]) {
                return false;
            }
        }
        return true;
    }
}

function versionMatch(npm, rc) {
    npm = npm.split('.');
    rc  = rc.split('.');
    return [
        (npm[0] === rc[0] || rc[0] > npm[0]) ? '1' : '',
        (npm[1] === rc[1] || rc[1] > npm[1]) ? '1' : '',
        (npm[0] < rc[0]) ? '1' : ''
    ].join('') === '111';
}

if (version !== false) {
    var rc = vaklidVersion(version) ? version : 'Invalid',
        npm = vaklidVersion(versionNpm) ? versionNpm : 'Invalid';
    if (rc.indexOf('Invalid')>-1 || npm.indexOf('Invalid')>-1) {
        console.log('Invalid version');
        process.exit(1);
    } else {
        var rct = 0, npmt = 0;
        rc  = rc.split('.');
        npm = npm.split('.');
        rct = (10000 + rc[0]) + '' + (10000 + rc[1]) + '' + (10000 + rc[2]);
        npmt = (10000 + npm[0]) + '' + (10000 + npm[1]) + '' + (10000 + npm[2]);
        if (rct > npmt) {
            console.log(version);
            process.exit(0);
        } else {
            console.log('Wrong version number');
            process.exit(1);
        }
    }
}

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
    __dirname + '/../../' + config.package,
    __dirname + '/../../' + config.readme,
    config.version,
    rebuildVersion
);

