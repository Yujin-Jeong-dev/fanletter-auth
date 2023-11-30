import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdHome, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


export default function Navbar() {
    return (
        <NavbarLayout>
            <Link to='/'><div><MdHome /></div></Link>
            <section>
                <Link to='profile'><div><CgProfile /></div></Link>
                <div><MdLogout /></div>
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



