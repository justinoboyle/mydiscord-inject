const fs = require('fs');
const path = require('path');

let self = {
    createPayload: function(config) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, './_inject.js'), (err, res) => {
                if(err)
                    return reject(err);
                res = res.toString();
                res = res.replace("${PAYLOAD}", new Buffer(JSON.stringify(config)).toString('base64'));
                return resolve(res);
            })
        })
    },
    getOldMyDiscordPayload: function() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, './_old/mydiscord.js'), (err, res) => {
                if(err)
                    return reject(err);
                    res = res.toString();
                return resolve(res);
            })
        })
    },
    getNewMyDiscordPayload: function() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, './_old/newmydiscord.js'), (err, res) => {
                if(err)
                    return reject(err);
                    res = res.toString();
                return resolve(res);
            })
        })
    },
    getCurrentMyDiscordPayload: function() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, './_old/currentmydiscord.js'), (err, res) => {
                if(err)
                    return reject(err);
                    res = res.toString();
                return resolve(res);
            })
        })
    },
    getOldBeautifulDiscordPayload: function() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, './_old/beautifuldiscord.js'), (err, res) => {
                if(err)
                    return reject(err);
                    res = res.toString();
                return resolve(res);
            })
        })
    },
    getStockPayload: function() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, './_old/stock.js'), (err, res) => {
                if(err)
                    return reject(err);
                    res = res.toString();
                return resolve(res);
            })
        })
    },
    getPayloads: function() {
        // wtf, why does this not work
        // return Promise.all(
        //     self.getOldMyDiscordPayload(), 
        //     self.getOldBeautifulDiscordPayload(), 
        //     self.getStockPayload()
        // );

        // this is REALLY bad and i will fix soon promise
        return new Promise((resolve, reject) => {
            self.getStockPayload().then(stock => 
                self.getOldMyDiscordPayload().then(mydiscordv1 => 
                    self.getOldBeautifulDiscordPayload().then(beautifuldiscord => 
                        self.getNewMyDiscordPayload().then(mydiscordv2 => 
                            self.getCurrentMyDiscordPayload().then(mydiscordv3 => 
                                resolve({stock, mydiscordv1, mydiscordv2, mydiscordv3, beautifuldiscord})
                            )
                        )
                     )
                )
            )
        });
    },
    identify: function(source) {
        return new Promise((resolve, reject) => {
            self.getPayloads().then(payloads => {
                for(let id in payloads) {
                    let payload = payloads[id];
                    // TODO ignore whitespace
                    if(source.includes(payload))
                        return resolve(id);
                }
                return resolve('stock'); // otherwise it's stock i guess
            }).catch(reject);
        })
    }
}

module.exports = self;