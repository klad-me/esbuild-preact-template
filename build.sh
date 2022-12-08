#! /bin/bash

# Build for prod
npm run build:prod || exit

# Create single html file
cd build
inline-stylesheets index.html index+css.html || exit
inline-script-tags index+css.html index+css+js.html || exit

html-minifier \
	--collapse-inline-tag-whitespace	\
	--collapse-whitespace				\
	--minify-css true					\
	--minify-js true					\
	--remove-attribute-quotes			\
	--remove-comments					\
	--remove-empty-attributes			\
	--remove-optional-tags				\
	--remove-redundant-attributes		\
	--remove-script-type-attributes		\
	--remove-tag-whitespace				\
	--use-short-doctype					\
	-o ../webapp.html					\
	index+css+js.html || exit

# Remove temp files
rm -f index+css.html index+css+js.html

cd ..
