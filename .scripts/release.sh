#!/bin/bash

rm -rf _zip

mkdir -p _zip/hydejack-pro-8.0.0-beta.1/.ssh
cp ~/.ssh/hydejack_pro_customers _zip/hydejack-pro-8.0.0-beta.1/.ssh

mkdir -p _zip/hydejack-pro-8.0.0-beta.1/install
mkdir -p _zip/hydejack-pro-8.0.0-beta.1/upgrade

# Make install folder
cp -r \
  $(find . \
    ! -name .git \
    ! -name .sass-cache \
    ! -name .bundle \
    ! -name node_modules \
    ! -name vendor\
    ! -name _zip  \
    ! -name '*.gemspec'  \
    ! -name '*~' \
    ! -name '_site*' \
    -mindepth 1 \
    -maxdepth 1) \
  _zip/hydejack-pro-8.0.0-beta.1/install

# Make upgrade folder
cp -r \
  _includes \
  _layouts \
  _sass \
  assets \
  Gemfile* \
  package* \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade

rm -r \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade/assets/icomoon \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade/assets/icons \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade/assets/img \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade/assets/ieconfig.xml \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade/assets/manifest.json \
  _zip/hydejack-pro-8.0.0-beta.1/upgrade/assets/resume.json

find _zip/hydejack-pro-8.0.0-beta.1/upgrade/ -name 'my-*' -delete

# Generate PDFs.
# This assumes the next version is already online at qwtel.com
# This also assumes macOS with chrome installed...
function pdfprint {
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --print-to-pdf="_zip/hydejack-pro-8.0.0-beta.1/$1.pdf" $2
}

pdfprint "PRO License" "https://hydejack.com/licenses/PRO/"
pdfprint "PRO–hy-drawer License" "https://qwtel.com/hy-drawer/licenses/hydejack/"
pdfprint "PRO–hy-push-state License" "https://qwtel.com/hy-push-state/licenses/hydejack/"
pdfprint "PRO–hy-img License" "https://qwtel.com/hy-img/licenses/hydejack/"
pdfprint "Documentation" "https://hydejack.com/docs/8.0.0-beta.1/print/"
pdfprint "NOTICE" "https://hydejack.com/NOTICE/"
pdfprint "CHANGELOG" "https://hydejack.com/CHANGELOG/"

# Genrate git diffs
# TODO
# git diff pro/v8.0.0-beta.1 pro/v7.5.1 > v8.0.0-beta.1-to-v7.5.1.diff

# Generate the zip
cd _zip; zip -q -r hydejack-pro-8.0.0-beta.1.zip hydejack-pro-8.0.0-beta.1/
