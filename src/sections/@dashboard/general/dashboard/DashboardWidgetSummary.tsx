import { ApexOptions } from 'apexcharts';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Stack, CardProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import Chart from '../../../../components/chart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  percent: number;
  chart: {
    colors?: string[];
    series: number[];
    options?: ApexOptions;
  };
}

export default function DashboardWidgetSummary({ title, percent, total, chart, sx, ...other }: Props) {
  const { colors, series, options } = chart;
  const theme = useTheme();
 
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 1, ...sx, boxShadow: theme.customShadows.dropdown,  }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>{title}:</Typography>
        <Typography variant="h5">{fNumber(total)}</Typography>
      </Box>

    </Card>
  );
}

// ----------------------------------------------------------------------

type TrendingInfoProps = {
  percent: number;
};
