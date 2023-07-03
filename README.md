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
  * Use the following environment variables in the .env file in openimis-dist_dkr:
    - `DOCKERFILE_NAME=Dockerfile-nginx-`
    - `NGINX_CONF_VOLUME=nginx.conf.template`
    These variables are used to switch into the Dockerized context.
  * Use the following environment variables in the .env file in openimis-fe_js:
    - `ENV OPENSEARCH_PROXY_ROOT="opensearch"`
    - `ENV OPENSEARCH_PROXY_HOST="172.20.20.98"`
    - `ENV PROXY_HOST="172.20.20.13"`
  * Run the backend and frontend services.

### How to run on local development mode (only for development purposes): 
  * Add the following value to the environment file in openimis-dist_dkr `OPENSEARCH_BASIC_TOKEN` (based on admin and password credentials to OpenSearch).
  * Use the following environment variables in the file in openimis-dist_dkr:
    - `DOCKERFILE_NAME=Dockerfile-nginx-dev-`
    - `NGINX_CONF_VOLUME=nginx-dev.conf.template`
    These variables are used to switch into the local context.
  * Add the following section to the `docker-compose.openSearch.yml` file:
    ```yaml
    extra_hosts:
    - ${FRONTEND_HOST:-host.docker.internal:host-gateway}
    ```
    This ensures proper communication between the dockerized openSearch Dashboard and frontend of the openIMIS app.
  * Use the following environment variables in the .env file in openimis-fe_js:
    - `ENV OPENSEARCH_PROXY_ROOT=""`
    - `ENV PROXY_HOST="172.20.20.98"`
  * Run the backend and frontend of the openIMIS app locally without using Docker (the openIMIS database can be Dockerized).
  * Please note that this setup is for development purposes only. DO NOT use this context in a production environment.

## Main Menu Contributions

## Other Contributions

## Available Contribution Points

## Dispatched Redux Actions

## Other Modules Listened Redux Actions

## Other Modules Redux State Bindings

## Configurations Options