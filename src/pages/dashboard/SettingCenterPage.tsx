import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Tooltip, Slide, Dialog, makeStyles, useMediaQuery } from '@mui/material';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridRowParams,
  GridCellParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QueueIcon from '@mui/icons-material/Queue';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { TransitionProps } from '@mui/material/transitions';
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
  EditDashboardInfoLesson,
  NewDashboardInfoLesson,
  AttendanceDashboardLesson
} from '../../sections/@dashboard/general/dashboard';
// assets

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

interface CustomColumnProps {
  name: string;
  email: string;
  phone: string;
}

const rows = [
  {
    id: 1,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 2,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 3,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 4,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 5,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 6,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 7,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 8,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 9,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
  {
    id: 10,
    name: 'VietElite Trụ sở điều hành',
    code: 'HS',
    address: 'Số 33 ngõ 91 phố Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội',
    email: 'bqminh30@gmail.com',
    phone: '098124234',
    created_at: '2020-04-30 00:13:25',
    bank_code : 'ACB',
    bank_number: '26858668',
    bank_owner: 'Bui Huyen Nga',
  },
];

// ----------------------------------------------------------------------

export default function SettingCenterPage() {
  const { user } = useAuthContext();
  const dateNow = new Date();
  const theme = useTheme();

  const [showLesson, setShowLesson] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [editValue, setEditValue] = useState<Object | null | undefined>();

  const [responsiveFullWidth, setResponsiveFullWidth] = useState(false);
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setResponsiveFullWidth(!isFullScreen);
  }, [isFullScreen]);

  const { themeStretch } = useSettingsContext();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
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
      headerName: '',
      width: 100,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Tooltip title="Sửa ca học">
              <IconButton onClick={() => handleShowLesson(params.row)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Điểm danh ca học">
              <IconButton onClick={()=>handleAttendanceShow(params.row)}>
                <AccessibilityNewRoundedIcon />
              </IconButton>
            </Tooltip>
           
          </>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Tên cơ sở',
      width: 120,
    },
    { field: 'code', headerName: 'Mã', width: 60 },
    { field: 'address', headerName: 'Địa chỉ', width: 120 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Số điện thoại', width: 100 },
    { field: 'create_at', headerName: 'Ngày tạo', width: 120 },
    { field: 'bank_code', headerName: 'Ngân hàng', width: 100 },
    { field: 'bank_number', headerName: 'Tài khoản', width: 120 },
    { field: 'bank_owner', headerName: 'Chủ tài khoản', width: 120 },
  ];




  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Quản Lý Cơ Sở</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />
          <Tooltip title="Thêm mới" onClick={handleShowAddLesson}>
            <IconButton>
              <QueueIcon />
            </IconButton>
          </Tooltip>
        </div>
      </GridToolbarContainer>
    );
  }

 

  const handleShowLesson = (item: any) => {
    setShowLesson(true);
    setEditValue(JSON.stringify(item));
  };

  const handleCloseLesson = () => {
    setShowLesson(false);
  };

  const handleShowAddLesson = () => {
    setShowAddLesson(true)
  }

  const handleCloseAddlesson=() =>{
    setShowAddLesson(false);
  }

  const handleAttendanceShow = (item: any) => {
    setShowAttendance(true)
  }

  const handleCloseAttendance = () => {
    setShowAttendance(false)
  }

  return (
    <>
      <Helmet>
        <title> Trung tâm</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
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
              rows={rows}
              columns={columns}
              density={'comfortable'}
              loading={data.rows.length === 0}
              rowSelection={false}
              getRowHeight={() => 'auto'} 
              getEstimatedRowHeight={() => 200}
              initialState={{
                ...data.initialState,
                pagination: {
                  ...data.initialState?.pagination,
                  paginationModel: { pageSize: 5 },
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
         

        <EditDashboardInfoLesson open={showLesson} onClose={handleCloseLesson} />
        <NewDashboardInfoLesson open={showAddLesson} onClose={handleCloseAddlesson} />
        <AttendanceDashboardLesson open={showAttendance} onClose={handleCloseAttendance} />
      </Container>
    </>
  );
}
