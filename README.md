## Master branch

[![Build Status](https://travis-ci.org/dictyBase/Dicty-Stock-Center.svg?branch=master)](https://travis-ci.org/dictyBase/Dicty-Stock-Center)
[![Dependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/master.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/master)
[![devDependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/master/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/master?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Develop branch

[![Build Status](https://travis-ci.org/dictyBase/Dicty-Stock-Center.svg?branch=develop)](https://travis-ci.org/dictyBase/Dicty-Stock-Center)
[![Dependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/develop.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/develop)
[![devDependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/develop?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Dicty Stock Center

Dicty Stock Center application rebuilt with React and Redux!

- [Development](#development)
  - [Configuration](#configuration)
    - [Providers](#providers)
    - [Auth server](#auth-server)
    - [API server](#api-server)
    - [Navbar and footer](#navbar-and-footer)
  - [Running the application(dev version)](#running-the-application-dev-version)
  - [Application Structure](#application-structure)
- [Deployment](#deployment)

# Development

- First clone this repository.
- Next configure the application as described below.

## Configuration

### Providers

- This is the most important part and it is absolutely needed to run the application.
- Copy the provided sample [clientConfig.sample.js](src/utils/clientConfig.sample.js) file
  to **clientConfig.js** in the same folder.
- Then add providers name and their corresponding client ids.
- All the providers should have a matching counterpart in the
  [oauthConfig.js](src/utils/oauthConfig.js) file. Fill up all the
  configuration parameters for every new provider in that file.
- For each of the provider name a corresponding login button will be shown up
  in the login route. The list of supported buttons are given
  [here](http://fontawesome.io/icons/#brand)

### Auth server

- By default, the application expect it to run on `https://betatoken.dictybase.local`
- The url of the auth server can be configured by **REACT_APP_AUTH_SERVER** environmental variable.
- The binaries for the auth server could be downloaded from its release
  [page](https://github.com/dictyBase/authserver/releases). Download that is
  suitable for your OS and make sure you always use the latest one.
- The **REACT_APP_AUTH_SERVER** env variable can also be customize by modifying the
  global variable in the [env](.env.development) file.

### API server

- By default, the application expects it to run on `https://betaapi.dictybase.local`
- The url of the auth server can be configured by **REACT_APP_API_SERVER** environmental variable.
- An API server to **test** the strain/plasmid catalog inside the application can be found [here](https://github.com/dictyBase/fake-dsc-server)
- The API server to manage data from the rich text editor frontend is available [here](https://github.com/dictyBase/modware-content).
- The **REACT_APP_API_SERVER** env variable can also be customize by modifying the
  global variable in the [env](.env.development) file.

### Navbar and Footer

- The application has env variables for `REACT_APP_NAVBAR_JSON` and `REACT_APP_FOOTER_JSON` that are set to
  the corresponding URLs where the JSON data is stored on GitHub.

## Semantic Versioning

This app has been set up to use [semantic-release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli). After adding a new commit (`git add .`), use `npm run cz` and follow the prompts to categorize and provide more details about your commit. Once complete, push your changes to whatever branch you are working on.

When you are ready to push to prod, you can use `semantic-release` to automate the release process:

- Merge your changes into `master`
- Run `npx semantic-release`

**Important:** you MUST have an env variable stored for `GH_TOKEN` or `GITHUB_TOKEN` that contains a GitHub [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You can either pass this in manually when you run the script (i.e. `GH_TOKEN=XXX npx semantic-release`) or you can [store your env variable locally](https://www.schrodinger.com/kb/1842).

This will look at your most recent commits since the last `git tag` and automatically determine the appropriate version number for your release. It also updates the [CHANGELOG](./CHANGELOD.md) documentation.

## Running the application (dev version)

- `npm install`
- `npm start`

## Application Structure

This was reconfigured to use the [create-react-app](https://github.com/facebook/create-react-app) structure and philosophy. Please read their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) for more detailed information.

# Deployment

The application is deployed by [building a Docker
image](https://docs.docker.com/engine/reference/commandline/build/) and running
it through [Kubernetes](https://k8s.io). More detailed information about the deployment process for DSC and all dicty software can be found [here](https://github.com/dictyBase/Migration/blob/master/deploy.md).
