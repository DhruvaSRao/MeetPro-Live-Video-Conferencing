let IS_PROD = true;
const server = IS_PROD ?
    "https://meetpro-live-video-conferencing.onrender.com" :

    "http://localhost:8000"


export default server;