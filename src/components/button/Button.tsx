import React from "react"

type ButtonPropsType = {
  name: string,
  onClick: () => void,
  isDisabled?: boolean
}

export function Button(props: ButtonPropsType) {
  return (
    <button onClick={props.onClick} disabled={props.isDisabled}>{props.name}</button>
  )
}