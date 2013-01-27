#!/bin/sh

# Build script for NebraskaJS website
# Requires npm module yuicompressor

echo

echo "Compressing CSS...\c"

rm css/*-min.css
yuicompressor -o '.css$:-min.css' css/*.css

echo "done."

echo