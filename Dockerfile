FROM ruby:3.0.0-alpine

ENV RAILS_MAX_THREADS 100
ENV RAILS_ENV production
ENV NODE_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RACK_TIMEOUT_SERVICE_TIMEOUT 60
ENV RAILS_LOG_TO_STDOUT true
ENV UID=8877
ENV GID=8877

RUN addgroup -g $GID -S detox 
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/detox" \
    --ingroup "detox" \
    --no-create-home \
    --uid "$UID" \
    "detox"

RUN gem install bundler:2.1.4

RUN apk add --no-cache --update build-base \
    postgresql-dev \
    nodejs \
    ffmpeg \
    yarn \
    ffmpeg \
    tzdata \
    imagemagick \
    imagemagick6 \
    imagemagick6-c++ \
    imagemagick6-dev \
    imagemagick6-libs \
    build-base \
    postgresql-client \
    git \
    && rm -f /var/cache/apk/*

RUN convert --version

# 14.15.4
RUN node --version 
RUN yarn --version

RUN mkdir -p /detox

WORKDIR /detox

COPY . /detox

RUN chown -R detox:detox /detox

ADD docker/supervisor/entrypoint.sh /
RUN chmod +x /entrypoint.sh

RUN chown detox:detox /entrypoint.sh

USER detox

WORKDIR /detox

RUN bundle config set without 'test development' \
    && bundle install --path=vendor/bundle \
    && rm -rf vendor/bundle/ruby/3.0.0/cache/*.gem \
    && find vendor/bundle/ruby/3.0.0/gems/ -name "*.c" -delete \
    && find vendor/bundle/ruby/3.0.0/gems/ -name "*.o" -delete

WORKDIR /detox/app/javascript/client

RUN yarn install \ 
    && yarn cache clean \
    && yarn autoclean --force

WORKDIR /detox

RUN mkdir -p tmp/pids
RUN mkdir -p tmp/cache

EXPOSE 4000
EXPOSE 4001

CMD ["/entrypoint.sh"]