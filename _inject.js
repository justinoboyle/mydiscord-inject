global.MYDISCORD_TEMP_CONFIG = JSON.parse(new Buffer(`${PAYLOAD}` || '', 'base64').toString('utf8'));

/** MYDISCORD-START */
(function() {
    if(!window)
        window = global;
    window._MYDISCORD = {
        _internalConfig: global.MYDISCORD_TEMP_CONFIG,
        _beautifulDiscordCSSHook: () => console.log("No BeautifulDiscord CSS hook installed.")
    };
    window.applyAndWatchCSS = _MYDISCORD._beautifulDiscordCSSHook;
    try {
        window._MYDISCORD.userScriptRoot = require(config.rootDir);
    }catch(e) {
        console.error(e);
    }
})();
/** MYDISCORD-END */