import React, {
  ReactChildren,
  FunctionComponent,
  ChangeEvent,
  Fragment,
} from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input``;

interface CheckBoxProps {
  children?: ReactChildren | string;
  onChange?: (event: ChangeEvent<HTMLElement>) => void;
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
