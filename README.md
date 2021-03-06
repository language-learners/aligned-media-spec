This is a proposed specification for sharing aligned text, video or audio between language-learning tools. Here are some good places to start reading:

- [`metadata.ts`](./metadata.ts) contains the actual specification for the format.
- [`examples.ts`](./examples.ts) contains example metadata with comments explaining how to represent different kinds media.
- [`examples/`](./examples/) contains actual example `*.aligned` directories, each with a `metadata.json` file generated from `examples.ts`. These are the files that a program implementing this standard should be able to read. Note that we haven't provided any sample media files yet!
- [The web-based validator][validator] will make sure that your `metadata.json` is valid.

GitHub "Pull Requests" with proposed changes are very welcome!

For the moment, this spec is dual-licensed under the [Apache 2.0 license][Apache] and [MPL 2.0 license][MPL]. These are fairly ordinary open source licenses, and the allow this code to be used with the GPL, LGPL or commercial software. But they include some patent-related provisions that are useful for standards.

[Apache]: https://www.apache.org/licenses/LICENSE-2.0
[MPL]: https://www.mozilla.org/en-US/MPL/2.0/
[validator]: https://language-learners.github.io/aligned-media-spec/

## Implementations

- The Rust [`aligned_media`][rust] crate.
- [An online validator][validator].

[rust]: https://crates.io/crates/aligned_media

## Verifying and regenerating example JSON

You'll need `node`, `npm` and `yarn` installed. Then run:

```sh
# Install all dependencies.
yarn

# Run index.ts, which verifies and regenerates everything.
yarn start
```
