# BorgBase Know-How

Has the content of [docs.borgbase.com](https://docs.borgbase.com). Feel free to open a pull request if you notice any mistake or would like to add something.

## Setup
- Install dependencies: `gem install --user-install jekyll bundler`
- Run in project dir: `bundler install`

## Run
- `bundle exec jekyll serve`

## Build/Deploy
Workaround for Netlify Ruby issue. In `Gemfile.lock`:

```
 BUNDLED WITH
-   2.0.1
+   1.16.0
```

## Update
- `bundle update`
- For tables: https://www.tablesgenerator.com/markdown_tables

## Credits
- Theme: [https://github.com/pmarsceill/just-the-docs]
- Colors: [https://vuetifyjs.com/en/framework/colors#colors]