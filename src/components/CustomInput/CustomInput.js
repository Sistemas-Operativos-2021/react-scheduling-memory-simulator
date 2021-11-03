import * as React from "react";
import InputUnstyled from "@mui/core/InputUnstyled";
import { styled } from "@mui/system";

const StyledInputElement = styled("input")`
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  text-align: center;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

export default function UnstyledInput({ placeholder, value }) {
  return (
    <CustomInput
      aria-label="Demo input"
      placeholder={placeholder}
      value={value}
    />
  );
}
