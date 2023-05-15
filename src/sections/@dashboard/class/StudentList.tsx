import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Grid,
  Stack,
  Button,
  Tooltip,
  Card,
  CardHeader,
  Box,
  Typography,
} from '@mui/material';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import QueueIcon from '@mui/icons-material/Queue';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
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
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [toolbarIcon, setToolbarIcon] = useState(false);
  const theme = useTheme();

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

  const handleSelectionChange = (selection: any) => {
    setSelectedRowIds(selection);

    console.log('slect', selection.length);
    // Kiểm tra nếu có hàng được chọn
    if (selection.length > 0) {
      setToolbarIcon(true);
    } else {
      setToolbarIcon(false);
    }
  };

  const handleToolbarClick = () => {
    // Xử lý sự kiện khi toolbar được nhấp
    // ...
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
            <Tooltip title="Xóa học sinh">
              <IconButton>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mở khóa khóa học">
              <IconButton aria-label="Xóa" onClick={() => handleDelete(params.id)}>
                <AssignmentIndIcon />
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
      <GridToolbarContainer
        title="Danh Sách Học Sinh"
        sx={{
          justifyContent: 'space-between',
          backgroundColor: toolbarIcon ? 'rgb(222, 234, 255)' : 'white',
        }}
      >
         {toolbarIcon ? 
        <Typography variant="h5">{selectedRowIds.length} Hàng Được Chọn</Typography> :
        <Typography variant="h5">Danh Sách Học Sinh</Typography>
         }
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />

          {toolbarIcon ? (
            <>
              <Tooltip title="Chuyển lớp">
                <IconButton>
                  <DoubleArrowIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Nghỉ học">
                <IconButton>
                  <MeetingRoomIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
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
            </>
          )}
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
            onRowSelectionModelChange={handleSelectionChange}
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
