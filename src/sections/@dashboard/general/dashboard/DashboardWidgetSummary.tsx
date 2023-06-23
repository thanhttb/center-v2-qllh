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
  
}

export default function DashboardWidgetSummary({ title, total, sx, ...other }: Props) {
  const theme = useTheme();
 
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 1, ...sx, boxShadow: theme.customShadows.dropdown,  }} {...other}>
      <Box sx={{ flexGrow: 0.5 }}>
        <Typography style={{fontSize: 12, color: "text.secondary"}}>{title}:</Typography>
        <Typography variant="h5">{fNumber(total)}</Typography>
      </Box>

    </Card>
  );
}

