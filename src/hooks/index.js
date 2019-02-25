import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')
  const placeholder = name

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = {
    value: () => { setValue('') },
    enumerable: false
  }

  return {
    type,
    value,
    name,
    placeholder,
    onChange,
    reset
  }
}