import { useState } from 'react';
import Select from 'react-select';

export default function MyDropdown(props) {

    const [selection, setSelection] = useState(props.options[0])
    const handleChange = (newSelection) => {
        setSelection(newSelection)
        props.onChange(newSelection.value)
    }

    return <Select defaultValue={props.value ? selection : props.options[0]} onChange={handleChange} options={props.options} 
    theme={(theme) => ({
        ...theme,
        borderRadius: "5px",
        colors: {
          ...theme.colors,
          primary: '#667309',
          primary25: '#B7BF99',
          neutral80:'black'
        }
      })}
   styles={{
    control: (provided, state) => ({
        ...provided,
        borderRadius: "2px",
        border:"1px solid rgb(118, 118, 118)",
    }),
   }}
      />
}
