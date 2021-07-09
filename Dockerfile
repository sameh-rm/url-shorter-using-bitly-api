FROM python:3.7-alpine
LABEL author="Sameh Ramadan"

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

# Environment variables

ENV SECRET_KEY=secret
ENV MONGO_USERNAME=admin
ENV MONGO_PASSWORD=testadmin
ENV MONGO_URI=${MONGO_URI}
# mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.qmurp.mongodb.net/shorty
ENV MONGO_TEST_URI=${MONGO_TEST_URI}
# mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.qmurp.mongodb.net/shorty_test
ENV DOMAIN=${DOMAIN}
ENV ACCESS_TOKEN=c0a816258e5e36f9558185f8c9b5c76a3aff1369
RUN make setup
RUN make install
RUN source ~/.devops/bin/activate
RUN python3 -m pip install -r requirements.txt
COPY . /app/


EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["manage.py","run"]