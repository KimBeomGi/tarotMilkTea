FROM python:3.12

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

COPY .env /app/.env

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]