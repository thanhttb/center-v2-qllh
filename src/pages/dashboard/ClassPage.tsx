import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections

import {
  ClassSelectDate,
  StudentClassInformation,
  StudentLearnSituation,
  StudentList,
  StudentProactiveCare,
  StudentSchedule,
} from '../../sections/@dashboard/class';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();
  // const classes = useStyles();
  const dateNow = new Date();
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(dateNow);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(dateNow);

  const [currentTab, setCurrentTab] = useState('danh-sach-hoc-sinh');

  const TABS = [
    {
      value: 'thong-tin-lop-hoc',
      label: 'THÔNG TIN LỚP HỌC',
      icon: <Iconify icon="mdi:information-slab-box" />,
      component: <StudentClassInformation />,
    },
    {
      value: 'lich-hoc',
      label: 'LỊCH HỌC',
      icon: <Iconify icon="mdi:receipt-text-clock" />,
      component: <StudentSchedule />,
    },
    {
      value: 'danh-sach-hoc-sinh',
      label: 'DANH SÁCH HỌC SINH',
      icon: <Iconify icon="mdi:format-list-bulleted-square" />,
      component: <StudentList />,
    },
    {
      value: 'tinh-hinh-hoc-tap',
      label: 'TÌNH HÌNH HỌC TẬP',
      icon: <Iconify icon="mdi:school-outline" />,
      component: <StudentLearnSituation />,
    },
    {
      value: 'cham-soc-chu-dong',
      label: 'CHĂM SÓC CHỦ ĐỘNG',
      icon: <Iconify icon="mdi:face-agent" />,
      component: <StudentProactiveCare />,
    },
  ];

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  return (
    <>
      <Helmet>
        <title>Lớp Toán nâng cao TC9.2</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <Typography variant="h4">Lớp Toán nâng cao 9.2</Typography>

          <ClassSelectDate
            filterEndDate={filterEndDate}
            filterStartDate={filterStartDate}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />
        </Box>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{backgroundColor: '#1976d2', color: 'white !important',mt: 2,
          [`& .css-x6rykd-MuiButtonBase-root-MuiTab-root:not(.Mui-selected)`]: {
            color: 'white',
            opacity: 0.6
          },
        }}
          indicatorColor="primary"
          textColor="inherit"
          centered
          aria-label="full width tabs example"
        >
          {TABS.map((tab, index) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} sx={{color: 'white'}}/>
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 2 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
