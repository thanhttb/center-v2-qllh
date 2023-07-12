// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { ChangeEvent } from 'react';

// ----------------------------------------------------------------------
interface Film {
  id: number;
  title: string;
  value: number;
}
type Props = {
  optionsRole: Film[];
  handleChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
  year: number;
};

export default function YearToolbar({ optionsRole, year, handleChange }: Props) {
  return (
    <TextField
      fullWidth
      select
      label="Năm học"
      size="small"
      value={year}
      onChange={handleChange}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: 260,
            },
          },
        },
      }}
      sx={{
        maxWidth: { sm: 240 },
        textTransform: 'capitalize',
      }}
    >
      {optionsRole.map((option) => (
        <MenuItem
          key={option.id}
          value={option.value}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
            '&:first-of-type': { mt: 0 },
            '&:last-of-type': { mb: 0 },
          }}
        >
          {option.title}
        </MenuItem>
      ))}
    </TextField>

    // </Stack>
  );
}
