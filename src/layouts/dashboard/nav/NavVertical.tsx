import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import navConfig from './config';
import NavAccount from './NavAccount';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        zIndex: theme.zIndex.appBar -1,
      }}
    >
      <Stack
        spacing={1}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Box sx={{ height: 60 }}></Box>
      </Stack>

      <NavSectionVertical data={navConfig} />
      <Stack
        spacing={1}
        sx={{
          // pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <NavAccount />
      </Stack>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_BASE },
        zIndex: theme.zIndex.appBar -1,
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV.W_BASE,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_BASE,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
