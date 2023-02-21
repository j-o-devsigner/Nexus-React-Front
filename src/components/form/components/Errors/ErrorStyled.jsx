import styled from "styled-components";

const InputErrorMessage = styled.div`
    display: flex;
    position: absolute;
    width: 700px;
    height: 60px;
    top: 8%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg);
    color: #9e2a2b;
    border: 1px solid #9e2a2b;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 1;

    pointer-events: none;
    transition: opacity 300ms ease-out;
    z-index: 99;
`;

export default InputErrorMessage