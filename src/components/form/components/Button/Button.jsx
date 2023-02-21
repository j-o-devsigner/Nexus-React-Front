import styled from "styled-components";

const Button = styled.button`
    padding: 0.5rem 1rem;
    margin: 20px 10px;
    color: var(--color-text);
    background: var(--color-btn);
    font-family: var(--font-family);
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 25px;
    border-radius: 5px;
    border: 0;
    outline: none;
    cursor: pointer;
    transition: 300ms all;

    &:hover {
    scale: 1.1;
    opacity: .95;
    }
`;

export default Button