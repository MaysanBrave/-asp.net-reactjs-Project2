import axios from "axios";
export default axios.create({
    // baseURL:"https://time-table-server.herokuapp.com",
    baseURL:"http://localhost:8080",
    header:{
        "Content-type":"application/json"
    }
});