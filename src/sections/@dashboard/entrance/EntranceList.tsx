import React from 'react';
//material
import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from '@mui/material';
//theme
import { Theme, useTheme } from '@mui/material/styles';

function EntranceList({ handleAddressName, names, addressName }) {
  const theme = useTheme();
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label"></InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size="small"
          value={addressName}
          onChange={handleAddressName}
          defaultValue={[names[0]]}
          //   input={<OutlinedInput id="select-multiple-chip" label="Lịch học" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          //   MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name.id} value={name.cs} style={getStyles(name.cs, addressName, theme)}>
              {name.cs}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default EntranceList;
