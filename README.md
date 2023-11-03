# GitHub OAuth Application

This project is a simple Node.js application demonstrating the integration of GitHub OAuth for user authentication. Users can log in using their GitHub credentials, and the app will display basic profile information.

## Features

- GitHub OAuth 2.0 Integration
- Express.js server setup
- EJS templating for views
- Profile view with user information from GitHub
- Error handling for login failure

## Installation

To run this application, you'll need Node.js and npm installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/TyTe108/GitHub-OAuth-Application.git

# Go into the repository
cd GitHub-OAuth-Application

# Install dependencies
npm install

# Start the server
npm start
```

## Usage

Before starting the server, you need to set up your GitHub OAuth credentials. Create a `.env` file in the root directory of the project and add the following:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
CALLBACK_URL=your_callback_url
```

Replace `your_client_id`, `your_client_secret`, and `your_callback_url` with your GitHub OAuth application credentials.

Once the server is running, open `http://localhost:3000` in your browser to view the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.