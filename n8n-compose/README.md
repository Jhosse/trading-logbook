# n8n FTMO Trade Import Workflow

This n8n workflow automates the import of trading data from FTMO CSV exports into your trading logbook database.

## What This Does

The workflow:
1. Downloads a CSV file from Google Drive containing FTMO trade history
2. Fixes duplicate column headers in the CSV (two "Precio" columns → "Precio_Entrada" and "Precio_Salida")
3. Parses the CSV and transforms the data to match the application's database schema
4. Populates database

## Files in This Directory

- `docker-compose.yml` - n8n Docker setup with PostgreSQL storage
- `.env` - Environment variable template
- `FTMO_Export.json` - The n8n workflow (export/import this in n8n UI)

## Prerequisites

- Docker and Docker Compose installed
- Google account with access to Google Drive
- Google Cloud project with Google Drive API enabled (see setup below)
- Trading logbook application running locally or deployed

## Setup Instructions

### 1. Google Cloud Setup (for Google Drive access)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "n8n-ftmo")
3. Enable the **Google Drive API**:
   - Search for "Google Drive API" → Enable
4. Create OAuth credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Configure consent screen if prompted:
     - User Type: **External**
     - App name: `n8n FTMO`
     - Add your email as developer contact
     - Add yourself as a test user
   - Create OAuth Client ID:
     - Application type: **Web application**
     - Name: `n8n`
     - Authorized redirect URIs: `http://localhost:5678/rest/oauth2-credential/callback`
   - **Save the Client ID and Client Secret** - you'll need these in n8n

### 2. Start n8n with Docker

1. **Edit `.env` with your values:**
```env
   N8N_USER=admin
   N8N_PASSWORD=your-secure-password
   PRISMA_USER_ID=your-user-id-from-database
   API_KEY=your-api-key-for-nextjs-api
```

2. **Start n8n:**
```bash
   docker compose up -d
```

3. **Access n8n:**
   - Open `http://localhost:5678`
   - Login with credentials from `.env`

### 3. Import and Configure the Workflow

1. **Import the workflow:**
   - In n8n, click **Workflows** → **Import from File**
   - Select `ftmo-import-workflow.json`

2. **Add Google Drive credentials:**
   - Open the workflow
   - Click on any **Google Drive** node
   - Click **Create New Credential**
   - Select **Google Drive OAuth2 API**
   - Enter your Client ID and Client Secret from Google Cloud setup
   - Click **Connect my account**
   - Sign in with Google and grant permissions
   - **Apply this credential to all Google Drive nodes in the workflow**

3. **Configure Google Drive folder:**
   - Create a folder in your Google Drive for FTMO exports
   - Right-click folder → Share → Get link
   - Extract folder ID from URL: `https://drive.google.com/drive/folders/FOLDER_ID`
   - In the **Google Drive - Download** node, update the file name or folder ID as needed

4. **Update API endpoint (if needed):**
   - In the **HTTP Request** node at the end of the workflow
   - Update the URL if your Next.js app is not running on `http://host.docker.internal:3000`
   - For deployed apps, use the full URL: `https://your-app.vercel.app/api/trades/import`

5. **Activate the workflow:**
   - Click **Active** toggle in the top right

## Usage

### Manual Trigger (Testing)

1. Upload a FTMO CSV export to your Google Drive folder
2. In n8n, open the workflow
3. Click **Execute Workflow** button
4. Check the execution results in each node
5. Verify trades were imported in your database

## Data Mapping

FTMO CSV → Database Schema:

| FTMO Column | Database Field | Type | Notes |
|------------|---------------|------|-------|
| Símbolo | asset | String | Trading symbol (e.g., "GER40.cash") |
| Tipo | tradeType | String | "buy" or "sell" |
| Precio_Entrada | price | Float | Entry price |
| Volumen | lots | Float | Position size |
| SL | sl | Float | Stop loss |
| TP | tp | Float | Take profit |
| Abrir | date | DateTime | Trade opening time |
| Precio_Salida | closedAt | Float | Exit price |
| Ticket | notes | String | Stored in notes field with other metadata |

## Stopping n8n
```bash
# Stop containers
docker compose down

# Stop and remove volumes (⚠️ deletes all workflows!)
docker compose down -v
```
