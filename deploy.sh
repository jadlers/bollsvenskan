#!/bin/sh

rsync \
  --recursive --progress \
  build/* \
  inleed:domains/jacobadlers.com/public_html/bollsvenskan
  
