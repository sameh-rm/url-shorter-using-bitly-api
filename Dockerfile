FROM python:3.7-alpine
LABEL author="Sameh Ramadan"

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

# Environment variables
ENV SECRET_KEY=SECRET_KEY
ENV MONGO_USERNAME=MONGO_USERNAME
ENV MONGO_PASSWORD=MONGO_PASSWORD
ENV MONGO_URI=MONGO_URI
ENV MONGO_TEST_URI=MONGO_TEST_URI
ENV DOMAIN=DOMAIN
ENV ACCESS_TOKEN=ACCESS_TOKEN

RUN python3 -m pip install -r requirements.txt
COPY . /app/


EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["manage.py","run"]