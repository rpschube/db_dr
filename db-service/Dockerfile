# Use Python 3.10 as the base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install ODBC drivers and dependencies, resolving conflicts
RUN apt-get update && apt-get install -y \
    curl \
    apt-transport-https \
    gnupg2 \
    unixodbc-dev \
    && apt-get remove -y libodbc2 libodbcinst2 unixodbc-common \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI app
COPY . .

# Expose port 8000 for the FastAPI app
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
