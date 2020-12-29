import styled from 'styled-components'

export const Wrapper = styled.div`
    min-height: 100px;
    padding: 5px;
    border: 2px solid gray;
    border-radius: 4px;
    margin-bottom: 1rem;
    background-color: white;
    position: relative;
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