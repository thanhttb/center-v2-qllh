import React from 'react';
import { Stack, TextField, CardProps, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface Props extends CardProps {
  filterEndDate: Date | null;
  filterStartDate: Date | null;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
}

function EntranceDate({
  filterEndDate,
  filterStartDate,
  onFilterEndDate,
  onFilterStartDate,
  sx,
  ...other
}: Props) {
  return (
    <>
      <Stack
        spacing={1}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{ width: '100%' }}
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
              size="small"
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
              size="small"
              // sx={{width: '100%' }}
            />
          )}
        />
      </Stack>
      <Stack
        spacing={1}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{ width: '100%', mt:1 }}
        {...other}
      >
        <Button variant="outlined" fullWidth>BÁO CÁO MKT-TGD1</Button>
        <Button variant="outlined" fullWidth>BÁO CÁO QUẢN LÝ</Button>
      </Stack>
    </>
  );
}

export default EntranceDate;
