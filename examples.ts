import { writeFileSync } from "fs"
import { MediaFile } from "./metadata"

// A simple example that might be generated from an MP4 video and two SRT
// subtitle files.
const subtitleExample: MediaFile = {
    baseTrack: {
        type: "media",
        lang: "fr",
        file: {
            relPath: "episode1.mp4",
        },
    },
    alignments: [
        {
            span: [10, 15.5],
            tracks: [
                {
                    type: "html",
                    lang: "fr",
                    html: "<i>Jean &amp; Luc:</i> On y va !"
                },
                {
                    type: "html",
                    lang: "en",
                    html: "<i>Jean &amp; Luc:</i> Let's go!"
                },
            ],
        },
    ],
};

// A version of `subtitle_example`, except that now we've extracted PNG images
// and MP3 audio for each subtitle.
const subtitleExtractedExample: MediaFile = {
    baseTrack: {
        type: "media",
        lang: "fr",
        file: {
            relPath: "episode1.mp4",
        },
    },
    alignments: [
        {
            span: [10, 15.5],
            tracks: [
                {
                    type: "html",
                    lang: "fr",
                    html: "<i>Jean &amp; Luc:</i> On y va !"
                },
                {
                    type: "html",
                    lang: "en",
                    html: "<i>Jean &amp; Luc:</i> Let's go!"
                },
                {
                    type: "image",
                    // This is just an image from the video, so it has no
                    // `lang` element.
                    file: {
                        relPath: "episode1_12_75.jpg",
                    },
                },
                {
                    type: "media",
                    lang: "fr",
                    file: {
                        relPath: "episode1_9_00_16_50.mp3",
                    },
                },
            ],
        },
    ],
}

// And now for something different: Parallel texts with no media file.
const bookExample: MediaFile = {
    // No `baseTrack` element because we have no input media file.
    alignments: [
        {
            tracks: [
                {
                    type: "html",
                    lang: "fr",
                    html: "<i>Jean &amp; Luc:</i> On y va !"
                },
                {
                    type: "html",
                    lang: "en",
                    html: "<i>Jean &amp; Luc:</i> Let's go!"
                },
            ],
        },
    ],
}

/**
 * Write out an example as an actual JSON file.
 *
 * @param name The base name of the example directory.
 * @param metadata The metadata to write as JSON.
 */
function writeExampleSync(name: string, metadata: MediaFile) {
    const json = JSON.stringify(metadata, null, 2)
    writeFileSync(`examples/${name}.llmedia/metadata.json`, json)
}

// Write our our examples as JSON.
writeExampleSync("subtitle_example", subtitleExample)
writeExampleSync("subtitle_extracted_example", subtitleExtractedExample)
writeExampleSync("book_example", bookExample)
