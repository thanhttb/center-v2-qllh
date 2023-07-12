// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Box } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
//
import Searchbar from './Searchbar';
import YearToolBar from './YearToolBar';
import SearchStudents from './SearchStudents';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------
const year_options = [
  { id: 1, value: 2020, title: 'Năm học 2020 - 2021' },
  { id: 2, value: 2021, title: 'Năm học 2021 - 2022' },
  { id: 3, value: 2022, title: 'Năm học 2022 - 2023' },
  { id: 4, value: 2023, title: 'Năm học 2023 - 2024' },
];

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  let location = useLocation();
  let navigation = useNavigate();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const [year, setYear] = useState(2023);

  const handleChange = (value :  React.FormEvent<HTMLInputElement>) => {
    axios.post("", {})
    .then(res => {
      navigation("/")
    })
    .catch(err => {
    })
  }

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {isDesktop && (
        <Box
          component="img"
          src="/logo/logo_vee.png"
          sx={{ cursor: 'pointer', width: 180, height: 56, mr: 6 }}
        />
      )}

      {/* <Searchbar /> */}
      {isDesktop && <YearToolBar optionsRole={year_options} handleChange={handleChange} year={year}/>}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={0.5}
      >
        <SearchStudents />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: theme.customShadows.z4,
        // height: HEADER.H_MOBILE,
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.appBar ,
        // ...bgBlur({
        //   color: theme.palette.background.default,
        // }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          // width: `calc(100% - ${NAV.W_BASE + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
