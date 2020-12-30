import styled from 'styled-components'
import {IWrapper} from '../Task'

export const Wrapper = styled.div<IWrapper>`
    min-height: 100px;
    padding: 5px;
    border: 1px solid black;
    box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
    border-radius: 8px;
    margin-bottom: 1rem;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({dragged}) => dragged? '#C2DFE3' : '#E0FBFC'}
`

export const CloseButton = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    background-color: red;
    border-radius: 50%;
    color: white;
    font-weight: 700;
    line-height: 17px;
    text-align: center;
    vertical-align: middle;
`

export const TaskId = styled.p`
    position: absolute;
    opacity: 0.5;
    bottom: 0px;
    right: 5px;
    font-size: 0.7rem;
`

export const TaskText = styled.p`
    min-height: 50px;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`