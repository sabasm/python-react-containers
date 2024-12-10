# Python-React-Containers

A full-stack application combining a Python-based backend with a React frontend built using Next.js.

---

## Project Structure

```
python-react-containers/
├── frontend/              # Next.js React frontend
├── backend/               # Flask-based Python backend
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project overview and instructions
```

---

## Installation & Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (frontend)
- Python 3.12+ (backend)
- Virtualenv (optional)

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/python-react-containers.git
   cd python-react-containers
   ```

2. **Environment Variables**:
   - Create a `.env` file in both `frontend/` and `backend/` directories using `.env.example` as a reference.

3. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # For Linux/macOS
   venv\Scripts\activate     # For Windows
   pip install -r requirements.txt
   ```

4. **Frontend Setup**:
   ```bash
   cd frontend
   npm ci
   ```

### Running the Application

- **Using Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   Access the application at:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8000](http://localhost:8000)

- **Running Locally**:
   - **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   - **Backend**:
   ```bash
   cd backend
   python wsgi.py
   ```

### Deployment

- **Build Docker Images**:
   ```bash
   docker-compose build
   ```

- **Deploy Services**:
   ```bash
   docker-compose up -d
   ```

### Testing

- **Frontend Tests**:
   ```bash
   cd frontend
   npm run test
   ```

- **Backend Tests** (TBD if available).

### API Endpoints

- **Backend**:
  - `/stations` - List all stations
  - `/stations/<station_id>` - Fetch station details
  - `/health` - API health check

### Tech Stack

- **Frontend**: Next.js, TypeScript, React, CSS Modules, React Hooks
- **Backend**: Flask, Gunicorn

### Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.
