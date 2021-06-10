import http from "../http-common";

const getAll = () => {
    return http.get("/market");
}

export default {
    getAll
};