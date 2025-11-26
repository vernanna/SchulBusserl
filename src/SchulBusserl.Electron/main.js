const { app, BrowserWindow } = require("electron");   // <-- missing before!
const { spawn } = require("child_process");
const path = require("path");

let backend;
let win;

function startBackend() {
    const backendPath = path.join(process.resourcesPath, "app", "backend", "SchulBusserl.exe");
    backend = spawn(backendPath);

    backend.stdout.on("data", data => console.log(data.toString()));
    backend.stderr.on("data", data => console.error(data.toString()));
}

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800
    });

    win.maximize();
    win.loadURL("http://localhost:5000");
}

app.whenReady().then(() => {
    startBackend();
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        if (backend) {
            backend.kill();
        }
        app.quit();
    }
});