// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
interface Film {
    title: string;
    year: number;
  }
type Props = {
//   filterName: string;
//   filterRole: string;
//   isFiltered: boolean;
  optionsRole: Film[];
//   onResetFilter: VoidFunction;
//   onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function YearToolbar({
//   isFiltered,
//   filterName,
//   filterRole,
  optionsRole,
//   onFilterName,
//   onFilterRole,
//   onResetFilter,
}: Props) {
  return (
    // <Stack
    //   spacing={1}
    //   alignItems="center"
    //   sx={{ px: 2.5, py: 3 }}
    // >
      <TextField
        fullWidth
        select
        label="Năm học"
        size="small"
        // value={filterRole}
        // onChange={onFilterRole}
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
            key={option.title}
            value={option.year}

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
