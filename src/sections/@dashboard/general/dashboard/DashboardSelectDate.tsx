// @mui
import {
  Stack,
  Card,
  TextField,
  MenuItem,
  CardProps,
  Chip,
  FormControl,
  Box,
  Button,
  InputLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// components
import { alpha, styled } from '@mui/material/styles';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React,{ useState } from 'react';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  {id: 1, cs: 'Tất cả cơ sở'},
  {id: 2, cs: 'VietElite Trụ sở điều hành'},
  {id: 3, cs: 'VietElite Trần Duy Hưng'},
  {id: 4, cs: 'VietElite Phạm Tuấn Tài'},
  {id: 5, cs: 'VietElite Đỗ Quang'},
  {id: 6, cs: 'VietElite Đỗ Quang Tiểu Học'},
  {id: 7, cs: 'VietElite Văn Quán'},
];



const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  width: '100%',
  lineHeight: 1.5,
  backgroundColor: '#8bc34a',
  borderColor: '#8bc34a',
  fontWeight: 400,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '#8bc34a',
    boxShadow: 'none',
    color: '#8bc34a'
  },
  '&:active': {
    backgroundColor: '#8bc34a',
    borderColor: '#8bc34a',
    boxShadow: 'none',
    color: '#fffff'
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});
// ----------------------------------------------------------------------

interface Props extends CardProps {
  filterEndDate: Date | null;
  filterStartDate: Date | null;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DashboardSelectdate({
  filterEndDate,
  filterStartDate,
  onFilterEndDate,
  onFilterStartDate,
  sx,
  ...other
}: Props) {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>(['Tất cả cơ sở']);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1,
        ...sx,
        boxShadow: theme.customShadows.dropdown,
      }}
      {...other}
    >
      <Stack
        spacing={1}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{ width: '100%'}}
        {...other}
      >
        <DatePicker
          label="Từ ngày"
          value={filterStartDate}
          onChange={onFilterStartDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              // sx={{width: '100%'}}
            />
          )}
        />

        <DatePicker
          label="Đến ngày"
          value={filterEndDate}
          onChange={onFilterEndDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              // sx={{width: '100%' }}
            />
          )}
        />
      </Stack>

      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Cơ sở</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Cơ sở" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.id}
              value={name.cs}
              style={getStyles(name.cs, personName, theme)}
            >
              {name.cs}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

     

      <BootstrapButton variant="contained" disableRipple>
        LÀM MỚI
      </BootstrapButton>

     
    </Card>
  );
}
