import styled from "styled-components";

const TextArea = styled.textarea`
    width: 390px;
    min-height: 190px;
    margin-bottom: 10px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    background: rgba(41, 50, 65, .165);
    padding: 1rem 2rem;
    border: none;
    outline: none;
    color: var(--color-text);
    resize: none;
    overflow: auto;

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

export default TextArea