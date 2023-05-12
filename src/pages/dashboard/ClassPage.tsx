import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
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
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('danh-sach-hoc-sinh');

  const TABS = [
    {
      value: 'thong-tin-lop-hoc',
      label: 'THÔNG TIN LỚP HỌC',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    {
      value: 'lich-hoc',
      label: 'LỊCH HỌC',
      icon: <Iconify icon="eva:bell-fill" />,
      component: <AccountNotifications />,
    },
    {
      value: 'danh-sach-hoc-sinh',
      label: 'DANH SÁCH HỌC SINH',
      icon: <Iconify icon="eva:share-fill" />,
      component: <AccountSocialLinks socialLinks={_userAbout.socialLinks} />,
    },
    {
      value: 'tinh-hinh-hoc-tap',
      label: 'TÌNH HÌNH HỌC TẬP',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
    {
        value: 'cham-soc-chu-dong',
        label: 'CHĂM SÓC CHỦ ĐỘNG',
        icon: <Iconify icon="ic:round-vpn-key" />,
        component: <AccountChangePassword />,
      },
  ];

  return (
    <>
      <Helmet>
        <title>Lớp Toán nâng cao TC9.2</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
