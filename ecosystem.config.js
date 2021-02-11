module.exports = {
    apps : [{
    name : 'Backend',
    script : 'app.js',
    env: {
    user: 'postgres',
    password: 'postgressa',
    host: '192.168.88.32',
    port: 5432,
    database: 'Dzuk',
    secret: '39442051e92c051c27790d9552812efc88239532',
    captcha_secret_key: '6LecLQoaAAAAAD5uQQ37dD5n-xh76rhIU4HFwlMR',
    NODE_ENV: 'development'
    },
    env_production : {
    user: 'postgres',
    password: 'postgressa',
    host: '192.168.88.32',
    port: 5432,
    database: 'Dzuk',
    secret: '39442051e92c051c27790d9552812efc88239532',
    captcha_secret_key: '6LecLQoaAAAAAD5uQQ37dD5n-xh76rhIU4HFwlMR' , 
    NODE_ENV: 'production'
    }
    }],
    
    };