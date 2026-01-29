#!/bin/bash

echo "=== Blog Security & Admin UI Setup ==="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "⚠️  .env file not found!"
  echo "Please create .env file with the following:"
  echo ""
  cat <<EOF
# Server Configuration
PORT=3000
NODE_ENV=development

# Admin Authentication
ADMIN_PASSWORD=your_secure_password_here_min_8_chars
SESSION_SECRET=your_random_secret_string_here_min_32_chars

# Database
DATABASE_PATH=./blog.db

# CORS (comma-separated, no spaces)
ALLOWED_ORIGINS=http://localhost:5173,https://blog.justin-chae.org

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Backup
BACKUP_RETENTION_DAYS=30
BACKUP_INTERVAL_DAYS=7

# File Upload
MAX_FILE_SIZE_MB=5
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
EOF
  echo ""
  exit 1
fi

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
echo "✅ Server dependencies installed"

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd ../client
npm install
echo "✅ Client dependencies installed"

cd ..

# Run database migrations
echo ""
echo "🗄️  Running database migrations..."
cd server
node setup-database.js
echo "✅ Database migrations complete"

# Seed admin user
echo ""
echo "👤 Seeding admin user..."
node scripts/seed-admin.js
echo "✅ Admin user seeded"

cd ..

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Next steps:"
echo "1. Start the server: cd server && npm start"
echo "2. Start the client: cd client && npm run dev"
echo "3. Login to admin: http://localhost:5173/admin/login"
echo ""
echo "Admin password is set in .env file (ADMIN_PASSWORD)"
echo ""