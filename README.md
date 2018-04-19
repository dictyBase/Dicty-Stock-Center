## Master branch

[![Build Status](https://travis-ci.org/dictyBase/Dicty-Stock-Center.svg?branch=master)](https://travis-ci.org/dictyBase/Dicty-Stock-Center)
[![Dependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/master.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/master)
[![devDependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/master/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/master?type=dev)

## Develop branch

[![Build Status](https://travis-ci.org/dictyBase/Dicty-Stock-Center.svg?branch=develop)](https://travis-ci.org/dictyBase/Dicty-Stock-Center)
[![Dependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/develop.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/develop)
[![devDependency Status](https://david-dm.org/dictybase/Dicty-Stock-Center/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/Dicty-Stock-Center/develop?type=dev)

# Dicty Stock Center

Dicty Stock Center application rebuilt with React and Redux!

* [Development](#development)
  * [Configuration](#configuration)
    * [Providers](#providers)
    * [Auth server](#auth-server)
    * [API server](#api-server)
  * [Running the application(dev version)](#running-the-applicationdev-version)
  * [Application Structure](#application-structure)
* [Deployment](#deployment)

# Development

* First clone this repository.
* Next configure the application as described below.

## Configuration

### Providers

* This is the most important part and it is absolutely needed to run the application.
* Copy the provided sample [clientConfig.sample.js](src/utils/clientConfig.sample.js) file
  to **clientConfig.js** in the same folder.
* Then add providers name and their corresponding client ids.
* All the providers should have a matching counterpart in the
  [oauthConfig.js](src/utils/oauthConfig.js) file. Fill up all the
  configuration parameters for every new provider in that file.
* For each of the provider name a corresponding login button will be shown up
  in the login route. The list of supported buttons are given
  [here](http://fontawesome.io/icons/#brand)

### Auth server

* By default, the application expect it to run on `http://localhost:9999`
* The url of the auth server can be configured by **REACT_APP_AUTH_SERVER** environmental variable.
* The binaries for the auth server could be downloaded from its release
  [page](https://github.com/dictyBase/authserver/releases). Download that is
  suitable for your OS and make sure you always use the latest one.
* The **REACT_APP_AUTH_SERVER** env variable can also be customize by modifying the
  global variable in the [env](.env.development) file.

### API server

* By default, the application expects it to run on `http://localhost:8080`
* The url of the auth server can be configured by **REACT_APP_API_SERVER** environmental variable.
* An API server to **test** the strain/plasmid catalog inside the application can be found [here](https://github.com/dictyBase/fake-dsc-server)
* The API server to manage data from the rich text editor frontend is available [here](https://github.com/dictyBase/modware-content).
* The **REACT_APP_API_SERVER** env variable can also be customize by modifying the
  global variable in the [env](.env.development) file.

## Running the application (dev version)

* `npm install`
* `npm start`

## Application Structure

This was reconfigured to use the [create-react-app](https://github.com/facebook/create-react-app) structure and philosophy. Please read their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) for more detailed information.

# Deployment

The application is deployed by [building a Docker
image](https://docs.docker.com/engine/reference/commandline/build/) and running
it through [Kubernetes](https://k8s.io).
