# Target Address Detection Agent

## Description

This agent detects transactions containing addresses in a hard-coded target list.

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- FORTA-3
  - Fired when a transaction contains an address in the hard-coded target list.
  - Severity is always set to "info" (mention any conditions where it could be something else)
  - Type is always set to "info" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert

## Installation

1. Navigate to the cloned directory in your terminal
2. Run `npm install` to install the required packages
3. Run `npm test` to run the unit tests
4. Run `npm start` to start the agent locally
