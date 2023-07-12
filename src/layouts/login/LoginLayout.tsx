// @mui
import { Typography, Stack, Box, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/core';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------
const quotes = [
  ['"Anyone who has never made a mistake has never tried anything new."', 'Albert Einstein'],
  ['"He who opens a school door, closes a prison."', 'Victor Hugo'],
  [
    '"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."',
    'Malcolm X',
  ],
  [
    '"The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one."',
    'Mark Twain',
  ],
  [
    '"Education is what remains after one has forgotten what one has learned in school"',
    'Albert Einstein',
  ],
  [
    '"Education is what remains after one has forgotten what one has learned in school"',
    'Albert Einstein',
  ],
  [
    '"Education is what remains after one has forgotten what one has learned in school"',
    'Albert Einstein',
  ],
  [
    '"Education is what remains after one has forgotten what one has learned in school"',
    'Albert Einstein',
  ],
];

const useStyles = makeStyles((theme) =>
  createStyles({
    quoteText: {
      fontWeight: 300,
      color: "white"
    },
    name: {
      marginTop: theme.spacing(3),
      color: "white"
    },
  })
);
type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  const classes = useStyles();

  const getRdInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const rndQuote = getRdInteger(0, quotes.length);

  return (
    <StyledRoot>
      <Box
        sx={{
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          zIndex: 100,
          m: 'auto',
          position: 'absolute',
          boxShadow: (theme) => theme.customShadows.z8,
        }}
      >
        <Logo
          sx={{
            zIndex: 9,
            position: 'absolute',
            height: 60,
            ml: 4,
          }}
        />
      </Box>

      <StyledSection>
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h3" className={classes.quoteText}>
            {quotes[rndQuote][0]}
          </Typography>
          <Typography className={classes.name} variant="body1">
            {quotes[rndQuote][1]}
          </Typography>
          <StyledSectionBg />
        </Box>
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
