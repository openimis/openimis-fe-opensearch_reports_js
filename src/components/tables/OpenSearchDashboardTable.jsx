import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  TableContainer, TableHead, TableBody, Table,
  TableCell, TableRow, Paper, Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useModulesManager, ProgressOrError, useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';
import { fetchOpenSearchDashboards } from '../../actions';
import OpenSearchDashboardEditDialog from '../dialogs/OpenSearchDashboardEditDialog';

const StyledOpenSearchDashboardTable = styled('div')(({ theme }) => ({
  '& .footer': {
    marginInline: 16,
    marginBlock: 12,
  },
  '& .headerTitle': theme?.table?.title ?? {},
  '& .actionCell': {
    width: 60,
  },
  '& .header': theme?.table?.header ?? {},
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
  const {
    fetchingDashboards, dashboards, errorDashboards,
  } = useSelector((store) => store.openSearchReports);

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
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead className="header">
            <TableRow className="headerTitle">
              {DEDUPLICATION_SUMMARY_HEADERS.map((header) => (
                <TableCell key={header}>
                  {' '}
                  {formatMessage(header)}
                  {' '}
                </TableCell>
              ))}
              <TableCell key="dashboard.edit">
                {' '}
                {formatMessage('dashboard.edit')}
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(fetchingDashboards || errorDashboards) && (
              <TableRow>
                <TableCell colSpan={DEDUPLICATION_SUMMARY_HEADERS.length + 1}>
                  <ProgressOrError progress={fetchingDashboards} error={errorDashboards} />
                </TableCell>
              </TableRow>
            )}
            {dashboards?.map((dashboard) => (
              <TableRow key={dashboard?.name}>
                <TableCell>
                  {' '}
                  {dashboard?.name}
                  {' '}
                </TableCell>
                <TableCell>
                  {' '}
                  {`https://${currentHostname}/${openSearchBaseRootPath}/${dashboard?.url}`}
                  {' '}
                </TableCell>
                <TableCell>
                  {' '}
                  {`${dashboard?.synchDisabled}`}
                  {' '}
                </TableCell>
                <TableCell>
                  {' '}
                  <Tooltip title={formatMessage('editButtonTooltip')}>
                    <OpenSearchDashboardEditDialog
                      dashboard={dashboard}
                      setIsUpdated={setIsUpdated}
                    />
                  </Tooltip>
                  {' '}
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
