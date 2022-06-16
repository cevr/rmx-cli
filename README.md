# rmx-cli

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

A CLI tool for Remix applications. Future versions will support adding external
commands.

## 🛠 Installation

```bash
npm install -D rmx-cli
```

## 📦 Current Commands

### eject-ras

Eject your Remix project from Remix App Server to Express

```bash
npx rmx eject-ras
```

### get-esm-packages

Scan for ESM package to add to _remix.config.js_ `serverDependenciesToBundle`

```bash
npx rmx get-esm-packages [package-name ...]
```

### new

Create a new remix route within your project.

```bash
npx rmx new route route-name
```

All of the arguments and flags to this command are optional.

- `--meta | -m`: Create a new route and include the meta function.
- `--links | -ls`: Create a new route and include the links function.
- `--loader | -l`: Create a new route and include the loader function.
- `--action | -a`: Create a new route and include the action function.
- `--catchBoundary | --cb`: Create a new route and include the catchBoundary function.
- `--errorBoundary | --eb`: Create a new route and include the errorBoundary function.
- `--handle | -h`: Create a new route and include the handle object.
- `--layout | --ly`: Create a layout route. This also includes the layout folder with an index.tsx file.
- `--pathless | --pl`: When used alongside the `--layout` flag, it will create a pathless layout route. Ignored otherwise.


## 😍 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kiliman.dev/"><img src="https://avatars.githubusercontent.com/u/47168?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kiliman</b></sub></a><br /><a href="https://github.com/Kiliman/rmx-cli/commits?author=kiliman" title="Code">💻</a> <a href="https://github.com/Kiliman/rmx-cli/commits?author=kiliman" title="Documentation">📖</a></td>
    <td align="center"><a href="https://codsen.com/os/"><img src="https://avatars.githubusercontent.com/u/8344688?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roy Revelt</b></sub></a><br /><a href="https://github.com/Kiliman/rmx-cli/commits?author=revelt" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/cevr"><img src="https://avatars.githubusercontent.com/u/34170625?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cristian Velasquez Ramos</b></sub></a><br /><a href="https://github.com/Kiliman/rmx-cli/commits?author=cevr" title="Code">💻</a> <a href="https://github.com/Kiliman/rmx-cli/commits?author=cevr" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
