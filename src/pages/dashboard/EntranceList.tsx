import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
//material
import { Box, Grid, Typography, Card } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//theme
import { Theme, useTheme } from '@mui/material/styles';
// sections
import {
  EntranceListSection,
  EntranceDatetSection,
  EntranceSteptSection,
} from '../../sections/@dashboard/entrance';

const names = [
  { id: 2, cs: 'TDH' },
  { id: 3, cs: 'PTT' },
  { id: 4, cs: '17DQ' },
  { id: 5, cs: '11DQ' },
  { id: 1, cs: 'HS' },
  { id: 6, cs: 'VQ' },
  { id: -1, cs: 'all' },
];

const steps = [
  { id: 0, name: 'Khởi tạo' },
  { id: 1, name: 'Hẹn lịch KTDT' },
  { id: 2, name: 'KTDV' },
  { id: 3, name: 'Thông báo KQ' },
  { id: 4, name: 'Nhập học' },
];

const datas = [
  { id: 0, title: 'Tồn ngày đầu', data: 166 },
  { id: 1, title: 'Mới ngày đầu', data: 0 },
  { id: 2, title: 'Đã xử lý', data: 0 },
  { id: 3, title: 'Tồn cuối ngày', data: 166 },
  { id: 4, title: 'Danh sách chờ', data: 45 },
  { id: 5, title: 'Danh sách mất', data: 45 },
];

function EntranceList() {
  const theme = useTheme();
  // date
  const dateNow = new Date();
  var firstDay = new Date(dateNow.getFullYear() -1,0, 1);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(firstDay);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(dateNow);
  // address
  const [addressName, setAddressName] = useState<string[]>(['TDH', 'PTT', '17DQ', '11DQ']);
  // step
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleAddressName = (event: SelectChangeEvent<typeof addressName>) => {
    const {
      target: { value },
    } = event;
    setAddressName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <>
     <Helmet>
        <title>Danh sách ghi danh</title>
      </Helmet>
      <Box sx={{ boxShadow: theme.customShadows.dropdown, p: 2, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography sx={{ textAlign: 'center', pb: 1 }} variant="h5">
              CƠ SỞ GHI DANH
            </Typography>
            <EntranceListSection
              addressName={addressName}
              names={names}
              handleAddressName={handleAddressName}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography sx={{ textAlign: 'center', pb: 1 }} variant="h5">
              THỜI GIAN
            </Typography>
            <EntranceDatetSection
              filterEndDate={filterEndDate}
              filterStartDate={filterStartDate}
              onFilterStartDate={(newValue) => {
                setFilterStartDate(newValue);
              }}
              onFilterEndDate={(newValue) => {
                setFilterEndDate(newValue);
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography sx={{ textAlign: 'center', pb: 1 }} variant="h5">
              QUY TRÌNH
            </Typography>
            <EntranceSteptSection steps={steps} activeStep={activeStep} handleStep={handleStep} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2  }}>
        <Grid container spacing={2} >
          {datas.map((data) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              key={data.id}
            >
              <Box sx={{
                boxShadow: theme.customShadows.dropdown,
                borderRadius: 2,
                p:2
              }}>
                <Typography style={{ fontSize: 14 }}>{data.title}:</Typography>
                <Typography variant="h5">{data.data}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{mt: 2}}>
              
      </Box>
    </>
  );
}

export default EntranceList;
