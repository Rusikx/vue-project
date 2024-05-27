import axios from "axios"
// import instance from "./services/api/index.ts";

export default axios.create({
    baseURL: import.meta.env.VITE_SERVER_HOST + "/api",
    headers: {
        "Content-type": "application/json"
    }
});

// export default instance;