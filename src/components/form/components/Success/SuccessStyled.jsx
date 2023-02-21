import styled from "styled-components";

const SuccessMessage = styled.div`
    inline-block;
    position: absolute;
    width: 500px;
    height: 190px;
    top: 50%;
    left: 50%;
    padding: 1rem 2rem;
    transform: translate(-50%, -50%);
    background-color: var(--color-bg);
    color: var(--color-btn);
    border: 5px solid #98C1D9;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 1;

    transition: opacity 300ms ease-out;
`;

export default SuccessMessage