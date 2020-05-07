import React, { FunctionComponent, useState, ReactChildren } from "react";
import Button from "../form/Button";

interface DropdownProps {
  children?: ReactChildren | string;
}

const Dropdown: FunctionComponent<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Open</Button>
      {isOpen ? children : null}
    </div>
  );
};

export default Dropdown;
