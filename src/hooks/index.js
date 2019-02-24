import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')
  const placeholder = name

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    name,
    placeholder,
    onChange
  }
}