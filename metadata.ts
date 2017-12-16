/**
 * A single media file, typically an episode of a TV series, a film, an chapter
 * of an audiobook, or perhaps something more exotic, like a PDF of a graphic
 * novel.
 */
type MediaFile = {
    tracks: Track[],
    syncElements: SyncElement[],
    extensions?: ExtensionData,
}

/**
 * 
 */
type SyncElement = {
    span?: TimeSpan,
    tracks?: Track[],
    extensions?: ExtensionData,
}

type Track = {
    type: TrackType,
    lang?: string,
    file?: File,
    extensions?: ExtensionData,
}

type TrackType = "media" | "subtitle"

/**
 * A period of time, measured in floating-point seconds. The first number is the
 * starting time (inclusive) and the second number is the end time (exclusive).
 * The second number must be greater than or equal to the first.
 */
type TimeSpan = [number, number]


type FileInfo = {
    path: string,
    extensions?: ExtensionData,
}

/// Custom extension data which hasn't been standardized. All custom fields
/// **must** go in a block of this type, and should generally have names like
/// `myapp-attrname`, where `myapp` is the application that uses them.
type ExtensionData = { [key: string]: any }

