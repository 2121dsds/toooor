# Sara AI - Admin Dashboard System

## Overview

This is a comprehensive admin dashboard system for Sara AI, a multi-platform messaging management system. The application provides administrators with tools to manage stores, users, AI-powered replies, messaging across platforms (WhatsApp, Instagram, Facebook), analytics, and system configurations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables and glassmorphism effects
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured route handlers
- **Development**: Hot reloading with Vite integration

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Comprehensive schema covering users, stores, messages, AI replies, subscriptions, tickets, knowledge base, analytics, and notifications

## Key Components

### Dashboard Features
1. **KPI Dashboard**: Real-time metrics for stores, subscriptions, messages, and AI reply performance
2. **User Management**: Admin user creation, role assignment, and permission management
3. **Store Management**: Store registration, subscription management, and status monitoring
4. **Message Management**: Cross-platform message handling with AI-powered responses
5. **AI Reply System**: Smart response generation with confidence scoring and approval workflows
6. **Analytics**: Comprehensive reporting with charts and export capabilities
7. **Knowledge Base**: Content management for AI training and guidelines
8. **Ticket System**: Customer support and issue tracking
9. **Subscription Management**: Payment processing and plan management
10. **Notifications**: Real-time alerts and system notifications

### UI/UX Components
- **Glassmorphism Design**: Modern glass-effect cards and components
- **Responsive Layout**: Mobile-first design with adaptive layouts
- **Dark/Light Theme**: Theme switching with CSS custom properties
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: ARIA-compliant components from Radix UI

### Data Models
- **Users**: Authentication, roles, and permissions
- **Stores**: Business accounts with subscription tiers
- **Messages**: Multi-platform message handling
- **AI Replies**: Automated response system with learning capabilities
- **Subscriptions**: Payment and billing management
- **Analytics**: Performance metrics and reporting data

## Data Flow

1. **User Authentication**: Role-based access control with admin permissions
2. **Real-time Updates**: TanStack Query for efficient data fetching and caching
3. **API Communication**: RESTful endpoints with structured error handling
4. **Database Operations**: Drizzle ORM for type-safe database interactions
5. **State Management**: Client-side state through React Query with optimistic updates

## External Dependencies

### Core Dependencies
- **Drizzle ORM**: Database operations and migrations
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **TanStack React Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework

### Platform Integrations
- **WhatsApp Business API**: Message handling and automation
- **Instagram Graph API**: Social media message management
- **Facebook Messenger API**: Chat platform integration
- **Payment Processing**: Credit card and subscription management

### Development Tools
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast development and building
- **ESBuild**: Production bundling
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite development server with React Fast Refresh
- **Type Checking**: Real-time TypeScript validation
- **Database**: Local PostgreSQL with Drizzle migrations

### Production Build
- **Frontend**: Vite production build with code splitting
- **Backend**: ESBuild bundling for Node.js deployment
- **Database**: PostgreSQL with migration management
- **Assets**: Static asset optimization and caching

### Environment Configuration
- **Database**: Configurable via DATABASE_URL environment variable
- **API Endpoints**: RESTful structure under /api prefix
- **Static Serving**: Express static middleware for production builds

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with shared types between client and server
2. **Type Safety**: End-to-end TypeScript with shared schema definitions
3. **Component Architecture**: Reusable UI components with consistent styling
4. **State Management**: Server state via React Query, local state via React hooks
5. **Database Schema**: Normalized relational design with proper foreign key relationships
6. **API Design**: Resource-based URLs with consistent response structures
7. **Performance**: Optimistic updates, code splitting, and efficient re-rendering patterns