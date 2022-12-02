# Target Address Detection Agent

## Description

This agent is proof of concept implementation of the Endoament Event Listener and detects transactions (including those containing logs with ERC20 transfers) containing addresses in a hard-coded target list.

## Supported Chains

- Ethereum

## Alerts

In an Endaoment implementation.. the hard-coded list would be Endaoment Entity addresses
and when a match was found a POST would be done to an Endaoment API endpoint, and the post
would contain the transaction hash of the matching transaction.

## Installation

1. Navigate to the cloned directory in your terminal
2. Run `npm install` to install the required packages
3. Run `npm test` to run the unit tests
4. Run `npm start` to start the agent locally
