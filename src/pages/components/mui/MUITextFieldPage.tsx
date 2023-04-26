import { useState } from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import Textfields from '../../../sections/_examples/mui/Textfields';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'outlined', label: 'Outlined', component: <Textfields variant="outlined" /> },
  { value: 'filled', label: 'Filled', component: <Textfields variant="filled" /> },
  { value: 'standard', label: 'Standard', component: <Textfields variant="standard" /> },
];

// ----------------------------------------------------------------------

export default function MUITextFieldPage() {
  const [currentTab, setCurrentTab] = useState('outlined');

  return (
    <>
      <Helmet>
        <title> MUI Components: Textfield | VietELite Eduction</title>
      </Helmet>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Textfield"
            links={[
              {
                name: 'Components',
                //href: PATH_PAGE.components,
              },
              { name: 'Textfield' },
            ]}
            moreLink={['https://mui.com/components/text-fields']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        <form noValidate autoComplete="off">
          {TABS.map(
            (tab) =>
              tab.value === currentTab && (
                <Box key={tab.value} sx={{ mt: 5 }}>
                  {tab.component}
                </Box>
              )
          )}
        </form>
      </Container>
    </>
  );
}
