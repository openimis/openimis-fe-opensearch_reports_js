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
