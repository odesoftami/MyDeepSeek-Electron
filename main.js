const { app, BrowserWindow, shell, nativeTheme } = require("electron");
const path = require("path");

const APP_URL = new URL("https://chat.deepseek.com/");
const APP_ORIGIN = APP_URL.origin;
const APP_TITLE = "MyDeepSeek";
const APP_ICON = path.join(__dirname, "MyDeepSeek.icns");
const OAUTH_HOSTS = new Set([
    "accounts.google.com",
    "login.microsoftonline.com",
    "appleid.apple.com"
]);

function isTrustedOAuthUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" && OAUTH_HOSTS.has(url.hostname);
    } catch {
        return false;
    }
}

function isDeepSeekUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" && url.origin === APP_ORIGIN;
    } catch {
        return false;
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        title: APP_TITLE,
        autoHideMenuBar: true,
        backgroundColor: "#000000",
        icon: APP_ICON,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    win.removeMenu();

    // Keep the existing User-Agent override for compatibility with the current setup.
    win.webContents.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
    "AppleWebKit/605.1.15 (KHTML, like Gecko) " +
    "Version/18.0 Safari/605.1.15"
);

    win.webContents.setWindowOpenHandler(({ url }) => {
        // Allow only explicitly trusted OAuth hosts in separate windows.
        if (isTrustedOAuthUrl(url)) {
            return {
                action: "allow",
                overrideBrowserWindowOptions: {
                    autoHideMenuBar: true,
                    parent: win,
                    modal: false,
                    webPreferences: {
                        nodeIntegration: false,
                        contextIsolation: true,
                        sandbox: true
                    }
                }
            };
        }

        // Keep DeepSeek links inside the app, checking the parsed origin.
        if (isDeepSeekUrl(url)) {
            win.loadURL(url);
            return { action: "deny" };
        }

        // Open only safe external URL schemes in the system browser.
        try {
            const externalUrl = new URL(url);
            if (["https:", "http:", "mailto:"].includes(externalUrl.protocol)) {
                shell.openExternal(url);
            }
        } catch {
            // Ignore malformed URLs.
        }

        return { action: "deny" };
    });

    win.loadURL(APP_URL.href);

    win.on("page-title-updated", (event) => {
        event.preventDefault();
        win.setTitle(APP_TITLE);
    });

    nativeTheme.themeSource = "dark";
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
