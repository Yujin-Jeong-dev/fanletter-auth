import App from 'App';
import Login from 'components/Login';
import Profile from 'components/Profile';
import Home from 'pages/Home';
import LetterDetail from 'pages/LetterDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='letterDetail/:letterId' element={<LetterDetail />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;