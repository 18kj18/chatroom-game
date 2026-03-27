import axios from "../utils/request"
import path from "./path"

const api = {
    //
    getChatroom() {
        return axios.get(path.baseUrl + path.chatroom)
    }
}

export default api