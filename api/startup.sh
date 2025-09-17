#!/bin/bash

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Make sure we're in the right directory
cd /home/site/wwwroot

# Print environment information for debugging
echo "PORT: $PORT"
echo "ASPNETCORE_URLS: $ASPNETCORE_URLS"
echo "DOTNET_RUNNING_IN_CONTAINER: $DOTNET_RUNNING_IN_CONTAINER"

# Set environment variables if needed
export ASPNETCORE_URLS="http://0.0.0.0:${PORT:-8080}"

# Start the app
dotnet api.dll