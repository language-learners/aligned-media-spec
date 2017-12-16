// This file is written using TypeScript, a set of open source JavaScript
// extensions maintained by Microsoft. It can be viewed conveniently on GitHub
// or in Visual Studio Code. Fields ending in `?` are optional.

/**
 * A single media file, typically an episode of a TV series, a film, an chapter
 * of an audiobook. It might also be something more exotic, like a PDF of a
 * graphic novel.
 */
type MediaFile = {
    /**
     * The primary media track for this `MediaFile`. This is used as the time
     * "base" for all `syncElements`. This may be omitted if no timed media is
     * available, as in the case of two texts aligned against each other.
     */
    base?: Track,
    /**
     * A list of synchronized sentences, subtitles, or other linguistic content.
     */
    syncElements: SyncElement[],
    /** Application-specific extension data. */
    extensions?: ExtensionData,
}

/**
 * The smallest unit of synchronization. This might be a subtitle, a sentence,
 * or perhaps multiple sentences if that's the best the aligning application can
 * do.
 */
type SyncElement = {
    /**
     * The time span associated with this sync element, relative to
     * `MediaFile.base`. If `MediaFile.base` was not specified, this element
     * must be omitted. If `MediaFile.base` is present, this must be specified.
     */
    span?: TimeSpan,
    /**
     * One or more representations of the `SyncElement`. For example, subtitle
     * text in one or more languages, or an image, or a short audio clip.
     *
     * Normally this does **not** include any version of the `MediaFile.base`
     * track, because we can already figure that out from `MediaFile.base` and
     * `SyncElement.span`.
     */
    tracks?: Track[],
    /** Application-specific extension data. */
    extensions?: ExtensionData,
}

/**
 * An individual "track" of context. This might be a single subtitle in a single
 * language, or a still image taken from a video
 */
type Track = {
    /** The kind of data stored in this track. */
    type: TrackType,
    /**
     * The language stored in this track, represented as a two-letter ISO 639-1
     * code when possible, and a three-letter 639-2 code for languages not
     * included in ISO 639-1.
     */
    lang?: string,
    /**
     * The actual underlying file on disk, if any. Either this or `html` should
     * be present, but not both.
     */
    file?: FileInfo,
    /**
     * Textual context, which should be valid HTML 5, optionally with embedded
     * tags like `<b>` and `<i>`.
     */
    html?: string,
    /** Application-specific extension data. */
    extensions?: ExtensionData,
}

/**
 * Possible types of tracks.
 *
 * TODO: This needs work.
 */
type TrackType = "media" | "subtitle"

/**
 * A period of time, measured in floating-point seconds. The first number is the
 * starting time (inclusive) and the second number is the end time (exclusive).
 * The second number must be greater than or equal to the first.
 */
type TimeSpan = [number, number]

/**
 * Information about a file on disk.
 */
type FileInfo = {
    /**
     * Path relative to the metadata file.
     *
     * TODO: We probably need to design a standard directory layout.
     */
    path: string,
    /** Application-specific extension data. */
    extensions?: ExtensionData,
}

/// Custom extension data which hasn't been standardized. All custom fields
/// **must** go in a block of this type, and should generally have names like
/// `myapp-attrname`, where `myapp` is the application that uses them.
///
/// This is a map with string keys and arbitrary JSON values.
type ExtensionData = { [key: string]: any }

