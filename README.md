# folsom_foia

This repo has the code for building an annotated timeline using [Scrollama](https://github.com/russellgoldenberg/scrollama).

If you want to drop your own story, just update the contents of `story.js`
* Place the text for the `title`, `headline`, `intro_paras`, and `outro_params` in the javascript object `STATIC_TEXT`
* Each section of the timeline should be an element in `STORY` with the following elements:
  * `step`: text to place for this step of the scrolling timeline
  * `chart` path to an image/chart to render
  * `alt: altext for the image
  * `caption`: text to render under the image
