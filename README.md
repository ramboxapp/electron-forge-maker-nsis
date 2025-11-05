# electron-forge-maker-nsis [![npm][npm_img]][npm_url]

An `electron-forge` maker for NSIS that supports `electron-forge` v6 and can be used as a
replacement for `electron-builder`. Supports code-signing and updates with `electron-updater` using both **GitHub** and **generic** providers.

This maker takes two configuration objects: `codesigning` for codesigning and `updater` for `electron-updater` support. Both of them are optional, the feature in question will simply be turned off if not provided.

- `codesigning` is passed directly to [@electron/windows-sign](https://github.com/electron/windows-sign) and supports all its options (except for `appDirectory`, which is provided directly by this maker).
- `updater`
  - `provider`: Update provider type: `'github'` or `'generic'`. Defaults to `'generic'`.
  - **For GitHub provider:**
    - `owner`: GitHub repository owner/organization (required).
    - `repo`: GitHub repository name (required).
  - **For Generic provider:**
    - `url`: URL to the location of yml files (required).
  - **Common options:**
    - `updaterCacheDirName`: Name of the local cache. By default `${name}-updater`.
    - `channel`: Name of the update channel. By default `latest`.
    - `publisherName`: Used to verify the code signature. Can be a string or array of strings. 

```ts
// forge.config.js with minimal configuration
makers: [
    {
      name: "@felixrieseberg/electron-forge-maker-nsis",
      config: {},
    }
  ]
```

```ts
// forge.config.js with GitHub provider
makers: [
  {
    name: "@felixrieseberg/electron-forge-maker-nsis",
    config: {
      codesigning: {
        certificateFile?: string;
        certificatePassword?: string;
      },
      updater: {
        provider: "github",
        owner: "ramboxapp",
        repo: "download",
        updaterCacheDirName: "rambox-updater",
        publisherName: ["Rambox LLC"]
      },
      getAdditionalConfig: () => {
        return {
          artifactName: "${productName} Setup ${version} ${arch}.${ext}"
        }
      }
    },
  }
]
```

```ts
// forge.config.js with generic provider (original behavior)
makers: [
  {
    name: "@felixrieseberg/electron-forge-maker-nsis",
    config: {
      codesigning: {
        certificateFile?: string;
        certificatePassword?: string;
      },
      updater: {
        provider: "generic", // optional, defaults to "generic"
        url: "https://s3-us-west-2.amazonaws.com/my-bucket",
        updaterCacheDirName: "my-updater",
        channel: "latest",
        publisherName: "My Company, Inc."
      },
      getAdditionalConfig: () => {
        return {
          artifactName: "${productName} Setup ${version} ${arch}.${ext}"
        }
      }
    },
  }
]
```

## Updating

This tool supports both **GitHub** and **generic** updates with `electron-updater`. 

- **GitHub provider**: Automatically fetches updates from GitHub Releases.
- **Generic provider**: Fetches updates from a custom server hosting yml files.

# License
MIT. Please see LICENSE for details.

[electron]: https://github.com/electron/electron
[npm_img]: https://img.shields.io/npm/v/@felixrieseberg/electron-forge-maker-nsis.svg
[npm_url]: https://npmjs.org/package/@felixrieseberg/electron-forge-maker-nsis
