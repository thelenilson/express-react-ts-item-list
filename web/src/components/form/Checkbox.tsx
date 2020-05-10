import React, {
  FunctionComponent,
  ChangeEvent,
  Fragment,
  ReactNode,
} from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input``;

interface CheckBoxProps {
  children?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const CheckBox: FunctionComponent<CheckBoxProps> = ({
  onChange,
  children,
  checked,
}) => (
  <Fragment>
    {children ? <label>{children}</label> : null}
    <StyledCheckbox type="checkbox" onChange={onChange} checked={checked} />
  </Fragment>
);

export default CheckBox;
