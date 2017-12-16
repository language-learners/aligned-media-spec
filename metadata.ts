// This file is written using TypeScript, a set of open source JavaScript
// extensions maintained by Microsoft. It can be viewed conveniently on GitHub
// or in Visual Studio Code. Fields ending in `?` are optional.

/**
 * A single media file, typically an episode of a TV series, a film, an chapter
 * of an audiobook. It might also be something more exotic, like a PDF of a
 * graphic novel.
 */
export type MediaFile = {
    /**
     * The primary media track for this `MediaFile`. This is used as the "time
     * base" for all `Alignment`s. This may be omitted if no timed media is
     * available, as would be in the case of two texts aligned against each
     * other.
     */
    baseTrack?: Track,

    /**
     * Optional other tracks associated with this file.
     */
    tracks?: Track[],

    /**
    * A list of synchronized sentences, subtitles, or other linguistic content.
    */
    alignments: Alignment[],

    /** Application-specific extension data. */
    ext?: ExtensionData,
}

/**
 * The smallest unit of alignment or synchronization. This might be a subtitle,
 * a sentence, or perhaps multiple sentences if that's the best the aligning
 * application can do.
 */
export type Alignment = {
    /**
     * The time span associated with this alignment, relative to
     * `MediaFile.baseTrack`. If `MediaFile.baseTrack` was not specified, this
     * element must be omitted.
     */
    span?: TimeSpan,

    /**
     * One or more representations of the `Alignment`. For example, subtitle
     * text in one or more languages, or an image, or a short audio clip.
     *
     * Normally this does **not** include any version of the
     * `MediaFile.baseTrack` track, because we can already use
     * `MediaFile.baseTrack` and `Alignment.span` to figure out what portion
     * of the base track corresponds to this alignment.
     */
    tracks?: Track[],

    /** Application-specific extension data. */
    ext?: ExtensionData,
}

/**
 * An individual "track" of context. This might be a single subtitle in a single
 * language, or a still image taken from a video
 */
export type Track = {
    /** The kind of data stored in this track. */
    type: TrackType,

    /**
     * The language stored in this track, represented as a two-letter ISO 639-1
     * code when possible, and a three-letter 639-2 code for languages not
     * included in ISO 639-1. If this is omitted, then programs may assume that
     * this track might be something like a still image from a video or an
     * illustration, that provides context but contains no linguistic data.
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
    ext?: ExtensionData,
}

/**
 * Possible types of tracks.
 *
 * - `html`: This track contains HTML-formatted data, stored in the
 *   `Track.html` field.
 * - `image`: This track contains an image.
 */
export type TrackType = "html" | "media" | "image"

/**
 * A period of time, measured in floating-point seconds. The first number is the
 * starting time (inclusive) and the second number is the end time (exclusive).
 * The second number must be greater than or equal to the first.
 */
export type TimeSpan = [number, number]

/**
 * Information about a file on disk.
 */
export type FileInfo = {
    /**
     * The relative path to the metadata file.
     *
     * TODO: We probably need to design a standard directory layout.
     */
    relPath: string,

    /** Application-specific extension data. */
    ext?: ExtensionData,
}

/**
 * Custom extension data which hasn't been standardized. All custom fields
 *  **must** go in a block of this type, and should generally have names like
 * `myapp-attrname`, where `myapp` is the application that uses them.
 * This is a map with string keys and arbitrary JSON values.
 */
export type ExtensionData = { [key: string]: any }
