import React from "react"

type ButtonPropsType = {
  name: string,
}

export function Button({name}: ButtonPropsType) {
  return (
    <button>{name}</button>
  )
}