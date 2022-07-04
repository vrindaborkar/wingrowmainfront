import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({Data,handleClick}) {
  const [val, setVal] = React.useState('');

  const handleChange = (event) => {
    setVal(event.target.value);
  };


  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Market</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={val}
        label="Value"
        onChange={handleChange}
      >
        {
            Data.map((e,i)=>{
                return(
                    <MenuItem key={i} value={e.location} onClick={handleClick}>{e.location}</MenuItem>
                )
            })
        }
      </Select>
    </FormControl>
  );
}
