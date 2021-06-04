FROM python:3.7-alpine
LABEL author="Sameh Ramadan"

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

RUN python3 -m pip install -r requirements.txt
COPY . /app/

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENV SECRET_KEY=secret
ENV MONGO_USERNAME=admin
ENV MONGO_PASSWORD=admin5123899
ENV MONGO_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.qmurp.mongodb.net/shorty?retryWrites=true&w=majority-
ENV MONGO_TEST_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.qmurp.mongodb.net/shorty_test?retryWrites=true&w=majority-
ENV DOMAIN=127.0.0.1:5000
ENV ACCESS_TOKEN=c0a816258e5e36f9558185f8c9b5c76a3aff1369

EXPOSE 5000
RUN python3 manage.py test

ENTRYPOINT ["python3"]
CMD ["manage.py","run"]