import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { letterFilters, onFilterChange } from '../redux/modules/filtersSlice';


export default function Members() {
    //필터들이 포함된 값
    const filters = letterFilters;
    //클릭할 때마다 변경되는 필터값
    const selectMember = useSelector((state) => state.filters.filter);
    const dispatch = useDispatch();


    return (
        <>
            {filters.map((member, idx) => (<StyleLi key={idx} $selectMember={selectMember} onClick={() => dispatch(onFilterChange(member))}>{member}</StyleLi>))}
        </>
    );
}

const StyleLi = styled.li`
    width:80px;
    height:40px;
    font-size:1.2rem;
    color:white;
    padding:0.6rem 0.3rem;
    border-radius:3rem;
    cursor:pointer;

    &:hover{
        transform:scale(1.1);
     }

    background-color: ${props => props.$selectMember === props.children ? '#8093f1' : '#83bcff'};
`;

