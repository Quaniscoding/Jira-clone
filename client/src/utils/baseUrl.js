import axios from "axios";
import { getStringLocal } from "./config";
import { DOMAIN_BE, USER_LOGIN } from "./constant";

export const http = axios.create({
    baseURL: DOMAIN_BE,
    timeout: 5000
})
http.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2NWIwNDU0ZjA4MzhiMThjNTI4MjYxMyIsInVzZXJuYW1lIjoiTmdvVmFuUXVhbiIsImVtYWlsIjoidnEuMjUwOS4yMDAzQGdtYWlsLmNvbSIsInBob25lIjo5NDU3OTcxMzMsImJpcnRoX2RheSI6IjIwMDMtMDktMjRUMTc6MDA6MDAuMDAwWiIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoidXNlciIsImF2YXRhciI6Imh0dHBzOi8vdWktYXZhdGFycy5jb20vYXBpLz9uYW1lPU5nb1ZhblF1YW4ifSwiaWF0IjoxNzE3NTQ2Njc0LCJleHAiOjE3MTg0MTA2NzR9.kU2HwfKm1M3EIwesSehTy5sc5EfbUlDSoea8kqq9Vp8",
            Authorization: `Bearer ${getStringLocal(USER_LOGIN)}`
        }
    }
}, err => { console.log(err) })
