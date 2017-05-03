#!/usr/bin/env bash

yarn install --ignore-optional
yarn run build-aws
yarn run server-aws

