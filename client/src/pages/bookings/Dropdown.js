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

  console.log(Data)

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
      <MenuItem value={1}>Amanora City</MenuItem>
      <MenuItem value={2}>Prabhat Road</MenuItem>
      <MenuItem value={3}>Wanwadi</MenuItem>
      <MenuItem value={4}>Karve Nagar</MenuItem>
      <MenuItem value={5}>Hadapsar</MenuItem>
      <MenuItem value={6}>Bramhasun City</MenuItem>
      <MenuItem value={7}>Kharadi IT Park</MenuItem>
      <MenuItem value={8}>Magarpatta</MenuItem>
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


