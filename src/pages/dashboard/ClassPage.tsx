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
  StudentClassInformation,
  StudentLearnSituation,
  StudentList,
  StudentProactiveCare,
  StudentSchedule
} from '../../sections/@dashboard/class';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

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

  return (
    <>
      <Helmet>
        <title>Lớp Toán nâng cao TC9.2</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{}}>
          <Typography>Lớp Toán nâng cao 9.2</Typography>
          
        </Box>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
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
