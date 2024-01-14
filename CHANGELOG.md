# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.4.0] - 2024-01-14

### Changed

- The application was moved to kubernetes.

## [2.3.1] - 2023-01-09

- The client now invalidates the session when receiving a 401 from the backend due to using an expired access token during authentication.

## [2.3.0] - 2023-01-06

- The client now sends error data to the backend

## [2.2.1] - 2022-12-21

### Added

- App now uses localStorage instead of cookies to store client-side data.

### Fixed

- Latest encounted version is now stored correctly

## [2.2.0] - 2022-12-12

### Added

- Application now stores the latest encountered version and informs the user about updates
- List entries can now be edited

## [2.1.0] - 2022-12-09

### Added

- New list entries can now be created with a set amount if amounts are enabled

### Fixed

- App now redirects to login page in case setting up the session fails

## [2.0.1] - 2022-11-12

### Fixed

- List entries are now being displayed in alphabetical order and sorted by their checked state
- Lists are now being displayed in alphabetical order in the sidebar menu
- Login route now redirects to the index route if user is already signed in

## [2.0.0] - 2022-10-18

### What's new compared to the original application?

- 'Pings': Users can now 'ping' a loved one to show them that they had just thought of them!
- Web Push Notifications: Users can opt into Push Notifications to receive notifications for certain events
- Offline Mode: Lists now continue to work when internet connection is lost temporarily
- Users now belong to a 'Family'
- Accounts are now secured with proper credentials
- Lists allow more customization
- Implemented ember-data
