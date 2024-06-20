# Project Documentation

## Overview

The CVA project is a comprehensive application designed to manage and deploy blockchain-based solutions. This project includes smart contracts, backend services, testing environments, and various utility scripts.

**Rahat (relief in Nepali)** is an open-source blockchain-based financial access platform designed to support vulnerable communities. It builds resilience against the impact of climate shocks through decentralized and transparent financial access.

### Our Mission

We aim to make humanitarian aid distribution efficient and transparent to support marginalized communities. Rahat strengthens financial inclusion for vulnerable community members and helps them receive cash transfers through local vendors in their communities.

## Features

- **Smart Contracts**: Includes various Solidity contracts for managing tokens, projects, claims, and donors.
- **Backend Services**: Node.js based services for interacting with the blockchain and managing data.
- **Testing**: Comprehensive end-to-end testing setup using Jest.
- **Scripts**: Utility scripts for deployment, seeding, and managing the project.

## Setup and Configuration

### Prerequisites

- Node.js (v14 or higher)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cva
   ```

2. Install dependencies and initialize the project:

   ```bash
   pnpm bootstrap
   ```

### Running the Application

1. Start the development server:

   ```bash
   pnpm start
   ```

2. To run the tests:

   ```bash
   pnpm test
   ```

## User Manual

### Directory Structure

- **apps/contracts**: Contains all Solidity contracts and related configurations.
- **apps/cva-e2e**: End-to-end testing setup.
- **libs/extensions**: Shared libraries and DTOs used across the project.
- **prisma**: Database schema and migrations.
- **tools/project-scripts**: Utility scripts for various project tasks.
- **tools/scripts**: Scripts for seeding and bootstrapping the project.

### Common Commands

- **Start the application**: `pnpm start`
- **Build all projects**: `pnpm build:all`
- **Bootstrap the project**: `pnpm bootstrap`
- **Reset the project**: `pnpm reset`
- **Clean the project**: `pnpm clean`
- **Build CVA**: `pnpm build:cva`
- **Seed CVA**: `pnpm seed:cva`
- **Seed project**: `pnpm seed:project`
- **Seed settings**: `pnpm seed:settings`
- **Fund project**: `pnpm fund:project`

### Configuration Files

- **.env**: Environment variables.
- **package.json**: Node.js project configurations.
- **tsconfig.base.json**: TypeScript configuration.
- **jest.config.ts**: Jest configuration for testing.

### Smart Contracts Overview

- **RahatClaim.sol**: Manages claims within the Rahat system.
- **RahatDonor.sol**: Handles donor-related functionality.
- **RahatToken.sol**: ERC20 token implementation for the Rahat system.
- **CVAProject.sol**: Manages projects within the CVA ecosystem.

For detailed explanations and further usage, please refer to the README files within each directory and the inline comments within the code.
