/** MYDISCORD-START */

mainWindow.webContents.on('dom-ready', function () {
    mainWindow.webContents.executeJavaScript(
`
(function() {
    let window = global;
    window._MYDISCORD = {
        _internalConfig: require(require('path').join(__dirname,'../../app/config-mydiscord.json')),
        _beautifulDiscordCSSHook: () => console.log("No BeautifulDiscord CSS hook installed.")
    };
    window.applyAndWatchCSS = _MYDISCORD._beautifulDiscordCSSHook;
    try {
        window._MYDISCORD.userScriptRoot = require(window._MYDISCORD._internalConfig.rootDir);
    }catch(e) {
        console.error(e);
    }
})();
`
    );
});

/** MYDISCORD-END */
