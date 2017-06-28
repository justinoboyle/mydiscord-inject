/** MYDISCORD-START */
(function() {
    if(!window)
        window = global;
    window._MYDISCORD = {
        _internalConfig: MYDISCORD_TEMP_CONFIG,
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