# openIMIS Frontend OpenSearch reports module
This repository holds the files of the openIMIS Frontend OpenSearch Reports module.
It is dedicated to be bootstrap development of [openimis-fe_js](https://github.com/openimis/openimis-fe_js) modules, providing an empty (yet deployable) module.

Please refer to [openimis-fe_js](https://github.com/openimis/openimis-fe_js) to see how to build and and deploy (in developement or server mode).

The module is built with [rollup](https://rollupjs.org/).
In development mode, you can use `npm link` and `npm start` to continuously scan for changes and automatically update your development server.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/openimis/openimis-fe-opensearch_reports_js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/openimis/openimis-fe-opensearch_reports_js/alerts/)

## OpenSearch Dashboards setup 

### How to run on dockerized instance (db, backend, frontend of openIMIS):
  * Add the following value to the environment file in openimis-dist_dkr  `OPENSEARCH_BASIC_TOKEN` (based on admin and password credentials to OpenSearch).
  * Use the following environment variables in the .env file in openimis-fe_js:
    - `ENV OPENSEARCH_PROXY_ROOT="opensearch"`
  * Run the backend and frontend services with opensearch and opensearch-dashboards services.

### How to Log in as an Admin to OpenSearch?
* Enter the `<host-url>/opensearch` path in your web browser's URL bar, where host-url corresponds to the host where your server is deployed.
* Provide your admin credentials.
* You can now make modifications to dashboards and visualizations.

## Main Menu Contributions
**Open Search Reports** (openSearchReports.openSearch key)
* Open Search Reports (openSearchReports.openSearch key) 

## Other Contributions
core.Router: registering openSearchReports, route in openIMIS client-side router


## Available Contribution Points

## Dispatched Redux Actions

## Other Modules Listened Redux Actions

state.core.user, to access user info (rights,...)

## Other Modules Redux State Bindings

## Configurations Options

## Updating Dashboard Path in OpenSearch

### Steps:

1. **Navigate to Dashboards -> Configure Dashboards.**

2. In the displayed table, find the list of available dashboards.

3. Click on the 'Edit' option for the specific dashboard you wish to modify.

4. **Edit Path:**
    - Go to the OpenSearch dashboard you want to link, e.g., [Example Dashboard Link](https://coremis.s1.openimis.org/opensearch/app/dashboards#/view/0339e180-5e9f-11ee-a1ac-3fafee93e8af?[...]).
    - Click on the 'Share' button at the top-right menu and select the 'short' link option.
    - In the small modal, choose the 'short' link option and click 'Copy Link'.
    - Paste the link obtained from the 'Share' button into a text editor or directly into the 'Edit Link' modal.

5. From the link obtained in the previous step, e.g. 'https://coremis.s1.openimis.org/opensearch/goto/6084fcd3b4d8c75cabd17a03a62d6bcb?security_tenant=private', extract the path from 'goto', for example, 'goto/6084fcd3b4d8c75cabd17a03a62d6bcb?security_tenant=private'.

6. Edit the path in the modal form and click 'Save'.

7. The table is now updated. Navigate to, for example, Beneficiary Reports, to view the new dashboard in the respective report page.
