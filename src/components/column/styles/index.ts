import styled from 'styled-components'
import {IWrapper} from '../Column'

export const Wrapper = styled.div<IWrapper>`
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    align-items: stretch;
    justify-content: flex-start;
    height: 100vh;
    border: 2px dashed gray;
    background-color: ${({draggedOver}) => draggedOver ? '#1ecbe1' : '#4BD5E7'};
    & h2 {
        color: black;
    }
`
export const TaskList = styled.div`
    min-height: 20px;
`;
