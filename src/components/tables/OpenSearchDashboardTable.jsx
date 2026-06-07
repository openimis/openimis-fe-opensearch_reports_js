import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper,
  Tooltip,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  useModulesManager,
  ProgressOrError,
  useTranslations,
  FormattedMessage,
} from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';
import { fetchOpenSearchDashboards } from '../../actions';
import OpenSearchDashboardEditDialog from '../dialogs/OpenSearchDashboardEditDialog';

const StyledOpenSearchDashboardTable = styled('div')(({ theme }) => ({
  '& .tableContainer': {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  '& .headerCell': {
    ...theme?.table?.title,
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '16px',
  },
  '& .row': {
    ...theme?.table?.row,
    '&:hover': {
      backgroundColor: theme?.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)',
    },
  },
  '& .cell': {
    padding: '16px',
    fontSize: '0.9rem',
  },
  '& .actionCell': {
    width: 250,
    textAlign: 'center',
    paddingLeft: '16px !important',
    paddingRight: '16px !important',
    whiteSpace: 'nowrap',
  },
}));

const DEDUPLICATION_SUMMARY_HEADERS = [
  'dashboard.name',
  'dashboard.url',
  'dashboard.synchDisabled',
];

function OpenSearchDashboardTable() {
  const dispatch = useDispatch();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);
  const { fetchingDashboards, dashboards, errorDashboards } = useSelector(
    (store) => store.openSearchReports,
  );

  const currentHostname = window.location.hostname;
  const openSearchBaseRootPath = process.env.OPENSEARCH_PROXY_ROOT ?? 'opensearch';

  useEffect(() => {
    dispatch(fetchOpenSearchDashboards({}));
  }, []);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(fetchOpenSearchDashboards({}));
    setIsUpdated(false);
  }, [isUpdated]);

  return (
    <StyledOpenSearchDashboardTable>
      <TableContainer component={Paper} className="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              {DEDUPLICATION_SUMMARY_HEADERS.map((header) => (
                <TableCell key={header} className="headerCell">
                  {formatMessage(header)}
                </TableCell>
              ))}
              <TableCell key="dashboard.edit" className="headerCell actionCell">
                {formatMessage('dashboard.edit')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(fetchingDashboards || errorDashboards) && (
              <TableRow>
                <TableCell colSpan={DEDUPLICATION_SUMMARY_HEADERS.length + 1}>
                  <ProgressOrError
                    progress={fetchingDashboards}
                    error={errorDashboards}
                  />
                </TableCell>
              </TableRow>
            )}
            {dashboards?.map((dashboard) => (
              <TableRow key={dashboard?.name} className="row">
                <TableCell className="cell">{dashboard?.name}</TableCell>
                <TableCell className="cell">
                  {`https://${currentHostname}/${openSearchBaseRootPath}/${dashboard?.url}`}
                </TableCell>
                <TableCell className="cell">
                  {dashboard?.url && (
                  <Chip
                    label={
                          dashboard.synchDisabled === false
                            ? formatMessage('dashboard.statusDisabled')
                            : formatMessage('dashboard.statusEnabled')
                        }
                    color={
                          dashboard.synchDisabled === false
                            ? 'error'
                            : 'success'
                        }
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: '500' }}
                  />
                  )}
                </TableCell>
                <TableCell className="cell actionCell">
                  <Tooltip title={formatMessage('editButtonTooltip')}>
                    <OpenSearchDashboardEditDialog
                      dashboard={dashboard}
                      setIsUpdated={setIsUpdated}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledOpenSearchDashboardTable>
  );
}

export default OpenSearchDashboardTable;
