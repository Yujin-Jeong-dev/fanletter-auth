import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;


const instance = axios.create({
    baseURL: BASE_URL,
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
        console.log(response);



        if (response.data.message) {
            const { nickname, avatar } = response.data;
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('avatar', avatar);

        }
        else {
            //로그인 성공 시 액세스 토큰 로컬스토리지에 저장
            const { userId, nickname, accessToken } = response.data;
            localStorage.setItem('userId', userId);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('accessToken', accessToken);
        }
        //회원가입 성공 시 성공 메세지 알림
        if (response.status === 201) {
            const { message } = response.data;
            alert(message);
        }
        return response;
    },
    //오류 응답을 내보내기 전 수행되는 함수
    function (error) {
        alert(error.response.data.message);
        return Promise.reject(error);
    },
)

export default instance;