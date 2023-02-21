import styled from "styled-components";

const DeleteConfirmAction = styled.div`
    display: inline-block;
    position: absolute;
    width: 580px;
    height: 390px;
    padding: 1rem 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-bg);
    color: var(--color-text);
    border: 3px solid #9e2a2b;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 1;

    transition: opacity 300ms ease-out;
`;

export default DeleteConfirmAction