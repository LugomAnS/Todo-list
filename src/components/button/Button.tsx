import React from "react"

type ButtonPropsType = {
  name: string,
  onClick: () => void,
  isDisabled?: boolean,
  classes?: string
}

export function Button(props: ButtonPropsType) {
  return (
    <button className={props.classes}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.name}
    </button>
  )
}