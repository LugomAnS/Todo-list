import Button, { ButtonProps } from "@mui/material/Button";
import { memo } from "react";

type MyButtonPropsType = {} & ButtonProps;

const MuiMemoButton = ({
  variant,
  onClick,
  title,
  ...rest
}: MyButtonPropsType) => {
  return (
    <Button variant={variant} onClick={onClick} {...rest}>
      {title}
    </Button>
  );
};

export default memo(MuiMemoButton);
