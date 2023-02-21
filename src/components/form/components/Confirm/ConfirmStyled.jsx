import styled from "styled-components";

const ConfirmAction = styled.div`
    display: inline-block;
    position: absolute;
    width: 500px;
    height: 250px;
    padding: 1rem 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-bg);
    color: var(--color-text);
    border: 3px solid var(--color-btn);
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 1;
    z-index: 999;

    transition: opacity 300ms ease-out;
`;

export default ConfirmAction