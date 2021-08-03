#!/bin/sh

cd /detox
bin/rails db:create db:migrate data:migrate db:seed

exec bin/foreman start