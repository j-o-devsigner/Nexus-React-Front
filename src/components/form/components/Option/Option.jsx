import styled from "styled-components";

const Option = styled.option`
    color: #223254;
    outlined: none;

    &[disabled] {
        display: none;
    }

    &.no-data {
        display: block;
    }
`;

export default Option