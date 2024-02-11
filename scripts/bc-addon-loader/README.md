# BC Addon Manager

One stop shop for addon installation for BC.

## Users

This provides you with a single interface to toggle addons developed by the community. [Installation instructions can be found here](https://sidiousious.gitlab.io/bc-addon-loader/).

## Developers

For addon developers this means you do not have to include the modding SDK or have your own instructions for users to install your addon; simply point them here.

To get your addon added, please contact Sidsel via [BC Scripting Community Discord](https://discord.gg/SHJMjEh9VH) or create a merge request for manifest.json. The following information is required:
- short name / ID, alphanumeric
- long name
- short description
- author name
- link to the script

You may optionally also provide:
- link to a source code repository
- link to a website for more information
- additional distributions (beta/dev versions)

### Developing an Addon for FUSAM

You need a [local HTTP server](https://gist.github.com/willurd/5720255) that serves your js file. Open the club and add `?fusam=http://localhost:<your_port>/<your_file>.js&fusamType=<module/script/eval>` replacing the `<placeholders>`, and you will be able to load your development addon as "Local Development by You" inside FUSAM.

### Contributing

If you'd like to see improvements in the loader itself, you can create an issue or discuss in the Discord linked above.
