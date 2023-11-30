import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
})

instance.interceptors.request.use(
    //요청을 보내기 전 실행되는 함수
    function (config) {
        return config;
    },
    //오류 요청을 보내기 전 실행되는 함수
    function (error) {
        return Promise.reject(error);
    },
)

instance.interceptors.response.use(
    //응답을 내보내기 전 수행되는 함수  
    function (response) {
        //응답을 받으면 로그인 정보 저장 또는 회원가입 성공 메세지
        const { userId, nickname, accessToken, message } = response.data;
        if (!message) {
            localStorage.setItem('userId', userId);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('accessToken', accessToken);
        }
        else alert(message);
        return response;
    },
    //오류 응답을 내보내기 전 수행되는 함수
    function (error) {
        alert(error.response.data.message);
        return Promise.reject(error);
    },
)

export default instance;