import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, Tooltip } from '@mui/material';
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
import Typography from 'src/theme/overrides/Typography';

// ----------------------------------------------------------------------

export default function GeneralDashboardPage() {
  const { user } = useAuthContext();
  const dateNow = new Date();
  const theme = useTheme();

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(dateNow);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(dateNow);

  const { themeStretch } = useSettingsContext();

  const [filterModel, setFilterModel] = useState({ items: [] });

  const handleFilterChange = (params: any) => {
    setFilterModel(params.filterModel);
  };

  const handleHeaderFilterChange = (column: any, filterModel: any) => {
    const newFilterModel = { ...filterModel };
    const index = newFilterModel.items.findIndex((item: any) => item.columnField === column.field);

    if (index === -1) {
      newFilterModel.items.push({
        columnField: column.field,
        operatorValue: 'contains',
        value: '',
      });
    } else {
      newFilterModel.items[index] = {
        ...newFilterModel.items[index],
        ...filterModel,
      };
    }

    setFilterModel(newFilterModel);
  };

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
      <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
        <GridToolbarQuickFilter placeholder='Tìm kiếm'/>
       
        <GridToolbarDensitySelector />
        <GridToolbarExport/>
        <Tooltip title="Thêm mới ca học">
          <IconButton>
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
                title="Chưa điểm danh"
                percent={2.6}
                total={34}
                chart={{
                  colors: [theme.palette.primary.main],
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
          </Grid>

          <Grid
            item
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

interface ColumnHeaderProps {
  column: GridColDef;
  onFilterChange: (params: { columnField: string; operatorValue: string; value: any }) => void;
}

function ColumnHeader({ column, onFilterChange }: ColumnHeaderProps) {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFilterChange({
      columnField: column.field as string,
      operatorValue: 'contains',
      value,
    });
  };
  console.log('columnHeader', column);

  return (
    <div>
      <h1>{column?.headerName}</h1>
      <br />
      <input type="text" onChange={handleFilterChange} />
    </div>
  );
}
