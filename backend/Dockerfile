FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["gunicorn", "wsgi:app", "-b", "0.0.0.0:8000", "--reload", "--timeout", "120", "--workers", "2"]