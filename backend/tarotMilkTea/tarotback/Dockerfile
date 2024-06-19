FROM python:3.12.3

# set environment variables

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# set work directory
# WORKDIR /app
WORKDIR /usr/src/app


# install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache --upgrade pip
RUN pip install --no-cache -r requirements.txt
RUN pip install --no-cache gunicorn

# copy django project
COPY . .
COPY .env ./server

# COPY ./entrypoint.sh .
# ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]