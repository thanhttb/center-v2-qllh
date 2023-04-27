// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button,Chip, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../../components/iconify';
import { alpha } from '@mui/material/styles';

import FormProvider, {
    RHFAutocomplete,
  } from '../../../../components/hook-form';

const TAGS_OPTION = [
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
  ];
// mui
// import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------

const INPUT_WIDTH = 180;

type Props = {
  filterEndDate: Date | null;
  filterStartDate: Date | null;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

export default function DashboardSelectdate({
  filterEndDate,
  filterStartDate,
  onFilterEndDate,
  onFilterStartDate,
   ...other
}: Props) {
    // const theme = useTheme();
  return (
    <Stack
      spacing={1}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      
      sx={{ p:1, justifyContent: 'space-between',borderRadius: "16px" }}
      {...other}
    >
     
      <DatePicker
        label="Start date"
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <DatePicker
        label="End date"
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />
      {/* <FormControl>
       <RHFAutocomplete
                  name="tags"
                  multiple
                  freeSolo
                //   onChange={(event, newValue) => setValue('tags', newValue)}
                  options={TAGS_OPTION.map((option) => option)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                    ))
                  }
                  renderInput={(params) => <TextField label="Tags" {...params} />}
                />
                </FormControl> */}
    </Stack>
  );
}
