import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, Tooltip, Card, CardHeader, Box,Typography } from '@mui/material';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridFilterModel,
  GridToolbarDensitySelector,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QueueIcon from '@mui/icons-material/Queue';
import AutorenewIcon from '@mui/icons-material/Autorenew';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  DashboardWidgetSummary,
  DashboardSelectDate,
} from '../../../sections/@dashboard/general/dashboard';
// assets
import { SeoIllustration } from '../../../assets/illustrations';

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

interface CustomColumnProps {
  name: string;
  email: string;
  phone: string;
}
// ----------------------------------------------------------------------

export default function StudentList() {
  const { user } = useAuthContext();
  const dateNow = new Date();
  const theme = useTheme();

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(dateNow);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(dateNow);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 200,
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
      width: 120,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
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
    {
      field: 'desk',
      headerName: 'Lớp',
      width: 120,
    },
    { field: 'commodity', headerName: 'Cơ sở', width: 120 },
    { field: 'traderName', headerName: 'Thời gian', width: 120 },
    { field: 'traderEmail', headerName: 'Giáo viên', width: 180 },
    { field: 'email', headerName: 'Tài liệu', width: 100 },
    { field: 'quantity', headerName: 'Sĩ số', width: 120 },
    { field: 'filledQuantity', headerName: 'Có mặt', width: 120 },
    { field: 'unitPrice', headerName: 'Vắng', width: 120 },
  ];

 
  function MyToolbar() {
    return (
      <GridToolbarContainer title="Danh Sách Học Sinh" sx={{ justifyContent: 'space-between' }}>
        <div>
          <h2>Danh Sách Học Sinh</h2>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />
          <GridToolbarExport />
          <Tooltip title="Thêm mới ca học">
            <IconButton>
              <QueueIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Đồng bộ học sinh vào Teams">
            <IconButton>
              <AutorenewIcon />
            </IconButton>
          </Tooltip>
        </div>
      </GridToolbarContainer>
    );
  }


  return (
    <>
      <Helmet>
        <title>Lớp toán nâng cao 9.2</title>
      </Helmet>

        <Grid container spacing={1}>
          {/* Danh sách ca học  */}
          <Grid
            item
            md={12}
            sx={{
              boxShadow: theme.customShadows.dropdown,
              borderRadius: 2,
              mt: 2,
            }}
          >
            <DataGridPro
              {...data}
              rows={rowsData.rows}
              columns={columns}
              loading={data.rows.length === 0}
            //   rowSelection={false}
              checkboxSelection
              disableRowSelectionOnClick
              initialState={{
                ...data.initialState,
                pagination: {
                  ...data.initialState?.pagination,
                  paginationModel: { pageSize: 10 },
                },
              }}
              components={{
                Toolbar: MyToolbar,
                Row: MemoizedRow,
                ColumnHeaders: MemoizedColumnHeaders,
              }}
              pagination
              pageSizeOptions={[5, 10, 25, 50, 100]}
            />
          </Grid>
        </Grid>
    </>
  );
}
