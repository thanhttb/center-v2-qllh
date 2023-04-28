import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, Tooltip } from '@mui/material';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QueueIcon from '@mui/icons-material/Queue';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  DashboardWidgetSummary,
  DashboardSelectDate,
} from '../../sections/@dashboard/general/dashboard';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function GeneralDashboardPage() {
  const { user } = useAuthContext();
  const theme = useTheme();

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const { themeStretch } = useSettingsContext();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 10,
  });

  const rowsData = React.useMemo(() => {
    if (!data.rows || data.rows.length === 0) {
      return { rows: data.rows };
    }
    const [firstRow, secondRow, thirdRow, ...rows] = data.rows;
    return {
      rows,
      pinnedRows: {
        top: [firstRow],
        bottom: [secondRow, thirdRow],
      },
    };
  }, [data.rows]);

  const handleDelete = (id: any) => {
    console.log(`Xóa dòng có id ${id}`);
    // Xử lý xóa tại đây
  };
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: true,
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Sửa ca học">
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Điểm danh ca học">
              <IconButton>
                <AccessibilityNewRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mở khóa khoa học">
              <IconButton aria-label="Xóa" onClick={() => handleDelete(params.id)}>
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { field: 'desk', headerName: 'Desk', width: 100 },
    { field: 'commodity', headerName: 'Commodity', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 100 },
    { field: 'email', headerName: 'Email', width: 300 },
  ];
  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{justifyContent: 'flex-end'}}> 
        {/* <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector /> */}
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <Tooltip title="Thêm mới ca học">
              <IconButton aria-label="Xóa">
                <QueueIcon />
              </IconButton>
            </Tooltip>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title> Bảng điều khiển</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          {/* Header  */}
          <Grid item xs={12} md={4}>
            <DashboardSelectDate
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
          <Grid item xs={12} md={8} container spacing={2}>
            <Grid item xs={4} md={3}>
              <DashboardWidgetSummary
                title="Total Active Users"
                percent={2.6}
                total={18765}
                chart={{
                  colors: [theme.palette.primary.main],
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            sx={{
              boxShadow: theme.customShadows.dropdown,
              borderRadius: 2,
              m: 2,
            }}
          >
            <div style={{ width: '100%' }}>
              <DataGridPro
                {...data}
                rows={rowsData.rows}
                columns={columns}
                rowSelection={false}
                initialState={{
                  ...data.initialState,
                  pagination: {
                    ...data.initialState?.pagination,
                    paginationModel: { pageSize: 5 },
                  },
                }}
                components={{
                  Toolbar: MyToolbar,
                }}
                pagination
                pageSizeOptions={[5, 10, 25, 50, 100]}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
