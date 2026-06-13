# Lynq

Lynq is a job-search platform built around the idea that finding a job shouldn't be a job of its own. It aims to streamline the experience for candidates by bringing the pieces of the search — identity, listings, applications, and tracking — under one roof.

This repository is the umbrella for all modules that make up the platform. Each subdirectory is an independent module with its own README and lifecycle.

> Lynq home page: https://lynqoficial.com/
> Trello board: https://trello.com/b/2inGRZwL/lyqn


## Modules

### lynq-iam &nbsp; [![CI](https://github.com/MatLock/UdeSA-lyqn/actions/workflows/lyqn-test-workflow.yaml/badge.svg)](https://github.com/MatLock/UdeSA-lyqn/actions/workflows/lyqn-test-workflow.yaml) [![Coverage](https://raw.githubusercontent.com/MatLock/UdeSA-lyqn/main/.github/badges/jacoco.svg)](https://github.com/MatLock/UdeSA-lyqn/actions/workflows/lyqn-test-workflow.yaml)

The identity and access management module for Lynq. It handles user accounts and sign-in, keeps sessions secure, and acts as the gatekeeper that lets the rest of the platform know who is making each request.
