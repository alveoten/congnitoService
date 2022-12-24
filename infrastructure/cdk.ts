#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import {CognitoStack} from "./stacks/CognitoStack";

const app = new cdk.App()

new CognitoStack(app, 'cognito-test')