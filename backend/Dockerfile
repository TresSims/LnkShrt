FROM python:latest

RUN pip install --upgrade pip poetry

RUN mkdir /code
WORKDIR /code

COPY poetry.lock pyproject.toml /code/
RUN poetry install --without dev --no-root

COPY . .

CMD poetry run python ./manage.py wait_for_db && poetry run python ./manage.py migrate && poetry run python ./manage.py createcachetable && poetry run gunicorn backend.wsgi
