FROM python:3.7.11-buster
LABEL author="Sameh Ramadan"

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

# Environment variables

ENV SECRET_KEY=secret
ENV MONGO_USERNAME=admin
ENV MONGO_PASSWORD=p7S9czNlzz3kzpDi
ENV MONGO_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.qmurp.mongodb.net/shorty
ENV MONGO_TEST_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.qmurp.mongodb.net/shorty_test
ENV DOMAIN=localhost:5000
ENV ACCESS_TOKEN=c0a816258e5e36f9558185f8c9b5c76a3aff1369

RUN apt-get update && apt-get -y --no-install-recommends install make=4.3 && apt-get clean  && rm -rf /var/lib/apt/lists/*

COPY . /app/

RUN make setup
RUN make install
RUN make test

EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["manage.py","run"]