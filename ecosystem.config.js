
const os = require('os');

module.exports = {
    apps: [{
        port: 5002,
        name: "colyseus",
        script: "dist/server.js",
        watch: true,
        instance_var: 'INSTANCE_ID',
        // instances: os.cpus().length,
        instances: 2,
        exec_mode: 'fork',
        // env: {
        //     DEBUG: "colyseus:errors",
        //     NODE_ENV: "production",
        // },
        
    }],
}
