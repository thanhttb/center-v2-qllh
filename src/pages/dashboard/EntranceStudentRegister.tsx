import React, { useMemo } from 'react';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Typography, Stack, Divider, MenuItem, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
//theme
import { Theme, useTheme } from '@mui/material/styles';
//component
import Iconify from '../../components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const SERVICE_OPTIONS = [
    { id: 1, name: 'full stack development', price: 90.99 },
    { id: 2, name: 'backend development', price: 80.99 },
    { id: 3, name: 'ui design', price: 70.99 },
    { id: 4, name: 'ui/ux design', price: 60.99 },
    { id: 5, name: 'front end development', price: 40.99 },
  ];


export default function StudentRegister() {
  const theme = useTheme();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    // defaultValues,
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      phoneNumber: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      //   navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Danh sách lớp học</title>
      </Helmet>
      <Box sx={{ boxShadow: theme.customShadows.dropdown, p: 2, borderRadius: 2 }}>
        <Typography variant="h4">Ghi Danh Học Sinh</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ color: 'text.disabled', marginY: 3 }}>
            Thông tin học sinh
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <RHFTextField size="small" name="name" label="Tìm kiếm tên HS, SĐT hoặc EMAIL PH" />
            <Controller
              name="createDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                //   label="Date create"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size='small' {...params} fullWidth error={!!error} helperText={error?.message} />
                  )}
                />
              )}
            />
            <RHFSelect
                name={`school`}
                size="small"
                label="Trường học"
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                  native: false,
                  MenuProps: {
                    // PaperProps: {
                    //   sx: { maxHeight: 220 },
                    // },
                  },
                  sx: { textTransform: 'capitalize' },
                }}
               
              >
                <MenuItem
                  value=""
                //   onClick={() => handleClearService(index)}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>

                <Divider />

                {SERVICE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    // onClick={() => handleSelectService(index, option.name)}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                      '&:first-of-type': { mt: 0 },
                      '&:last-of-type': { mb: 0 },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </RHFSelect>
          </Stack>
          <Divider light />

          <Typography variant="h6" sx={{ color: 'text.disabled', marginY: 3 }}>
            Thông tin phụ huynh
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <RHFTextField size="small" name="name" label="Họ tên phụ huynh" />
            <RHFTextField size="small" name="email" label="Số điện thoại phụ huynh(*)" />
            <RHFTextField size="small" name="phoneNumber" label="Email" />
          </Stack>
          <Divider light />
          <Typography variant="h6" sx={{ color: 'text.disabled', marginY: 3 }}>
            Nguyện vọng đăng ký
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <RHFTextField size="small" name="name" label="Cơ sở" />
            <RHFTextField size="small" name="email" label="Nguyện vọng" />
            <RHFTextField size="small" name="phoneNumber" label="Phân nguồn" />
            <RHFTextField size="small" name="phoneNumber" label="Nguồn" />
          </Stack>
          <Divider light />
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              TẠO MỚI GHI DANH
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </>
  );
}
