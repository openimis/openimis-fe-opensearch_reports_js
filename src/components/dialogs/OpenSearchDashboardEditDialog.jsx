import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bindActionCreators } from 'redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import {
  FormattedMessage,
  TextInput,
  formatMessageWithValues,
} from '@openimis/fe-core';
import {
  Grid, IconButton, Switch, FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchOpenSearchDashboard, updateOpenSearchDashboard } from '../../actions';

const StyledOpenSearchDashboardEditDialog = styled('div')(({ theme }) => ({
  '& .item': theme?.paper?.item ?? {},
}));

function OpenSearchDashboardEditDialog({
  intl,
  dashboard,
  setIsUpdated,
  updateOpenSearchDashboard,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardToEdit, setDashboardToEdit] = useState({
    id: dashboard.id,
    name: dashboard.name,
    url: dashboard.url,
    synchDisabled: dashboard.synchDisabled,
  });

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setDashboardToEdit({
      id: dashboard.id,
      name: dashboard.name,
      url: dashboard.url,
      synchDisabled: dashboard.synchDisabled,
    });
  };

  const handleSave = () => {
    updateOpenSearchDashboard(
      dashboardToEdit,
      formatMessageWithValues(intl, 'openSearchReports', '.create.mutationLabel', {
        name: dashboard?.name,
      }),
    ).then(() => {
      setIsUpdated(true);
    });
    handleClose();
  };

  const onAttributeChange = (attribute) => (value) => setDashboardToEdit({
    ...dashboardToEdit,
    [attribute]: value,
  });

  const canSave = !!dashboardToEdit?.url;

  return (
    <StyledOpenSearchDashboardEditDialog>
      <IconButton
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 900,
            maxWidth: 900,
          },
        }}
      >
        <DialogTitle>
          {formatMessageWithValues(intl, 'openSearchReports', 'dialog.title', { dashboardName: dashboard.name })}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" className="item">
            <Grid className="item">
              <TextInput
                module="openSearchReports"
                label="dashboard.name"
                value={dashboardToEdit?.name}
                readOnly
              />
            </Grid>
            <Grid className="item">
              <TextInput
                module="openSearchReports"
                label="dashboard.url"
                value={dashboardToEdit?.url}
                onChange={onAttributeChange('url')}
                required
              />
            </Grid>
            <Grid className="item">
              <FormControlLabel
                control={(
                  <Switch
                    checked={dashboardToEdit.synchDisabled}
                    onChange={(e) => setDashboardToEdit({
                      ...dashboardToEdit,
                      synchDisabled: e.target.checked,
                    })}
                    color="primary"
                  />
                )}
                label={
                  formatMessageWithValues(intl, 'openSearchReports', 'dashboard.synchStatus', {
                    status: dashboardToEdit.synchDisabled ? 'Disabled' : 'Enabled',
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            <FormattedMessage module="openSearchReports" id="dialog.cancel" />
          </Button>
          <Button onClick={handleSave} disabled={!canSave} variant="contained" color="primary" autoFocus>
            <FormattedMessage module="openSearchReports" id="dialog.save" />
          </Button>
        </DialogActions>
      </Dialog>
    </StyledOpenSearchDashboardEditDialog>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateOpenSearchDashboard,
  fetchOpenSearchDashboard,
}, dispatch);

export { StyledOpenSearchDashboardEditDialog };
export default injectIntl(
  connect(null, mapDispatchToProps)(OpenSearchDashboardEditDialog),
);
