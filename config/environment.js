

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'Something',
    db: 'major_project',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'suryamvishwakarma8@gmail.com',
            pass: 'dmdpsvwztchaubdv'  //the app password created using google to allow third party apps to access and send mails
        }
    },
    google_client_id: "243445071670-8p4sm70pg09a8je2l4qo40h3ha28n3je.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'Suryam'
}

const production = {
    name: 'production',
    asset_path: process.env.SOCIAL_ASSET_PATH,
    session_cookie_key: process.env.SOCIAL_SESSION_COOKIE_KEY,
    db: process.env.SOCIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIAL_SMTP_AUTH_USER,
            pass:  process.env.SOCIAL_SMTP_AUTH_PASS //the app password created using google to allow third party apps to access and send mails
        }
    },
    google_client_id: process.env.SOCIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.SOCIAL_JWT_SECRET
}

module.exports = (process.env.SOCIAL_ENVIRONMENT == undefined)?development: process.env.SOCIAL_ENVIRONMENT;