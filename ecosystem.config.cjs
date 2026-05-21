/** @type {import('pm2').StartOptions} */
module.exports = {
    apps: [
        {
            name: 'kaantanis',
            script: './dist/server/entry.mjs',
            instances: 1,
            exec_mode: 'fork',
            env_file: '.env',
            env: {
                NODE_ENV: 'production',
                HOST: '0.0.0.0',
                PORT: 3000,
            },
            max_memory_restart: '300M',
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            merge_logs: true,
            time: true,
        },
    ],
};
