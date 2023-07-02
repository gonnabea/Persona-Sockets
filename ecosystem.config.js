
const os = require('os');

module.exports = {
    apps: [{
        port: 5001,
        name: "persona-socket",
        script: "dist/server.js",
        watch: true,
        // instances: os.cpus().length,
        instances: 2,
        exec_mode: 'fork',
        // env: {
        //     DEBUG: "colyseus:errors",
        //     NODE_ENV: "production",
        // },
        
    }],
}
