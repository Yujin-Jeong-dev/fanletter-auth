import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { MdHome, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/modules/authSlice';



export default function Navbar() {
    const accessToken = useSelector((state) => state.auth).accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(userLogout());
        navigate('/login');
    }

    return (
        <NavbarLayout>
            <Link to='/'><div><MdHome /></div></Link>
            <section>
                <Link to='profile'><div><CgProfile /></div></Link>
                {accessToken && <div onClick={logout}><MdLogout /></div>}
            </section>
        </NavbarLayout>
    );
}



const NavbarLayout = styled.nav`
    display: flex;
    justify-content: space-between;
    padding:1rem 2rem;
    background-color: #83bcff;

    div{
        font-size:1.5rem;
    }

    section{
        display: flex;
        gap:1rem;
    }
`



