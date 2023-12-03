import App from 'App';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Home from 'pages/Home';
import LetterDetail from 'pages/LetterDetail';
import ProtectedRoute from 'pages/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Banner from 'components/Banner';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<ProtectedRoute requireUser><Navbar /><Banner /><Home /></ProtectedRoute>} />
                    <Route path='letterDetail/:letterId' element={<ProtectedRoute requireUser><Navbar /><LetterDetail /></ProtectedRoute>} />
                    <Route path='profile' element={<ProtectedRoute requireUser><Navbar /><Profile /></ProtectedRoute>} />
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;