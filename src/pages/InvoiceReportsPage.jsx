import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Helmet, withModulesManager, formatMessage } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { styled } from '@mui/material/styles';
import OpenSearchDashboard from '../components/OpenSearchDashboard';
import { INVOICE_REPORTS } from '../constants';
import { fetchOpenSearchDashboard } from '../actions';

const StyledInvoiceReportsPages = styled('div')(({ theme }) => ({
  ...theme.page,
  '& .fab': theme.fab,
}));

function InvoiceReportsPages(props) {
  const { intl } = props;
  const dispatch = useDispatch();
  const {
    dashboard,
  } = useSelector((store) => store.openSearchReports);

  useEffect(() => {
    const params = [`name_Iexact: "${INVOICE_REPORTS}"`];
    dispatch(fetchOpenSearchDashboard(params));
  }, []);

  return (
    <StyledInvoiceReportsPages>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch')} />
      <OpenSearchDashboard
        dashboardUrl={dashboard?.url}
      />
    </StyledInvoiceReportsPages>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export { StyledInvoiceReportsPages };
export default injectIntl(
  withModulesManager(connect(mapStateToProps)(InvoiceReportsPages)),
);
