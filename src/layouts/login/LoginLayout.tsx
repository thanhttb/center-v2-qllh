// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      {/* <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      /> */}

      <Box
        sx={{
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          zIndex: 100,
          m: 'auto',
          // borderRadius: '50%',
          position: 'absolute',
          // width: `calc(100% - 48px)`,
          boxShadow: (theme) => theme.customShadows.z8,
          // ...sx,
        }}
      >
        <Logo
          sx={{
            zIndex: 9,
            position: 'absolute',
            height: 60,
            ml: 4
          }}
        />
      </Box>

      <StyledSection>
        {/* <Typography variant="h3" sx={{ mb: 10, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography> */}

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
