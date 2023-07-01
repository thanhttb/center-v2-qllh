import React from 'react';
//material
import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
//theme
import { Theme, useTheme } from '@mui/material/styles';

import _without from "lodash/without";

function EntranceList({ handleAddressName, names, addressName, setAddressName }) {
  const theme = useTheme();
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    console.log("clicked delete");
    setAddressName((current) => _without(current, value));
  };

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
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} 
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                onDelete={(e) => handleDelete(e, value)}
                onClick={() => console.log("clicked chip")}
                />
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
