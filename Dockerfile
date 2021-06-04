FROM python:3.7-alpine
LABEL author="Sameh Ramadan"

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

RUN python3 -m pip install -r requirements.txt
COPY . /app/

EXPOSE 5000
RUN python3 manage.py test

ENTRYPOINT ["python3"]
CMD ["manage.py","run"]