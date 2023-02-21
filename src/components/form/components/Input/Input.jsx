import styled from "styled-components";

const Input = styled.input`
    width: 300px;
    min-height: 50px;
    margin-bottom: 10px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    background: rgba(41, 50, 65, .165);
    padding: 0 1rem;
    border: none;
    outline: none;
    color: var(--color-text);

    border-radius: 5px;

    ::placeholder {
        color: rgba(41, 50, 65, .5);
    }

    &:focus {
        border: .5px solid var(--color-text);
    }

    &[readOnly] {
        background: rgba(41, 50, 65, .02);
        border: .5px solid var(--color-text);
        color: rgba(41, 50, 65, .8);
    }
`;

export default Input