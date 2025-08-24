# Use Ruby 3.4 for Jekyll 3.9 compatibility
FROM docker.io/library/ruby:3.4

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock for proper cache invalidation
COPY Gemfile ./
COPY Gemfile.lock ./

# Install bundler and gems
RUN gem install bundler && \
    bundle install

# Expose port 4000 for Jekyll development server
EXPOSE 4000

# Default command for development server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload"]