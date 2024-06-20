FROM python:3.12.3

WORKDIR /code

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .

RUN pip install -r requirements.txt

COPY .env .env

CMD ["./entrypoint.sh"]
