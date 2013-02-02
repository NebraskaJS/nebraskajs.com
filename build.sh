#!/bin/sh

# Build script for NebraskaJS website
# Requires npm module yuicompressor

echo

echo "Compressing CSS...\n"

rm css/*-min.css
java -jar node_modules/yuicompressor/build/yuicompressor-2.4.7.jar -o '.css$:-min.css' css/*.css

echo "Running Jekyll...\n"

jekyll

echo "Done."

echo