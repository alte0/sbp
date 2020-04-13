// import { task, src, dest } from 'gulp';
import bs from 'browser-sync';

bs.create();

export function bsTask() {
    bs.init({
        server: {
            baseDir: "./src",
            directory: true,
            logPrefix: "SBP => ",
            port: 3000,
            // Sync viewports to TOP position
            scrollProportionally: true,
            // index: "index.html",
            // Log information about changed files
            logFileChanges: true,
            // Stop the browser from automatically opening
            open: true,
            // Open the site in Chrome & Firefox
            // browser: ["google chrome", "firefox"],
            // Don't try to inject, just do a page refresh
            injectChanges: false,
            ui: {
                port: 3001
            },
            // Disable UI completely
            // ui: false
        }
    });
};
