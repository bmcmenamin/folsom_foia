// Initialize scroll text
var SCROLL = d3.select('#scroll').select('.scroll__text');
SCROLL.selectAll("div")
    .data(STORY.map(d => d.step))
    .text(String)
    .enter()
      .append("div")
      .attr("class", "step")
      .append("p")
      .html(String);

var STEP = SCROLL.selectAll('.step');


// Initialize intro
d3.select('#intro_headline')
  .selectAll('div')
  .data(STATIC_TEXT.headlines)
  .text(String)
  .enter()
    .append('div')
    .attr('class', 'intro__hed')
    .append('h1')
    .html(String);

d3.select('#intro_text')
  .selectAll('div')
  .data(STATIC_TEXT.intro_paras)
  .text(String)
  .enter()
    .append('div')
    .attr('class', 'intro__dek')
    .append('p')
    .html(String);

// Initialize outro
d3.select('#outro')
  .selectAll('div')
  .data(STATIC_TEXT.outro_paras)
  .text(String)
  .enter()
    .append('div')
    .attr('class', 'intro__dek')
    .append('p')
    .html(String);


var GRAPHIC = d3.select('#scroll').select('.scroll__graphic');
var CHART = GRAPHIC.select('.chart');
var CAPTION = GRAPHIC.select('.caption');

var SCROLLER = scrollama();


// generic window resize listener event
function handleResize() {

    // 1. update width/height of graphic element
    var bodyWidth = d3.select('body').node().offsetWidth;
    var bodyHeight = window.innerHeight;

    var scrollWidth = SCROLL.node().offsetWidth;
    var chartVerMargin = Math.floor(0.1 * bodyHeight);

    var graphicWidth = bodyWidth - scrollWidth - PARAMS.chart.hor_margin;
    var graphicLeft = scrollWidth + PARAMS.chart.hor_margin;

    STEP.style('height', Math.floor(window.innerHeight * 0.75) + 'px');

    STEP.selectAll('p')
        .style('width', Math.floor(window.innerHeight * 0.65) + 'px')
        .style('text-anchor', 'end')
        .style('transform', "rotate(-90deg) translate(-50%, 0%)")
        .style('left', (scrollWidth - Math.floor(window.innerHeight * 0.65)) / 2 +'px')

    GRAPHIC.style('left', graphicLeft + 'px')
           .style('top', PARAMS.chart.hor_margin + 'px')
           .attr('width', graphicWidth + 'px');

    CHART.select('img')
         .style('width', graphicWidth + 'px')     
         .style('height',  (Math.floor(0.8 * bodyHeight) - PARAMS.caption.vert_margin) + 'px')
         .style('object-fit', 'contain');

    if (CHART.select('img').style('display') === 'none') {
      CAPTION.style('top', chartVerMargin + PARAMS.caption.vert_margin + 'px')
             .attr('height', Math.floor(0.8 * bodyHeight) + 'px');
    } else {
      CAPTION.style('top', PARAMS.caption.vert_margin + 'px')
             .attr('height', Math.floor(0.14 * bodyHeight) + 'px');
    }

    SCROLLER.resize();
}


function calculateFadeOutOpacity(progress, scale) {
    var new_alpha = 1.0
    if (progress >= (1 - scale)) {
        new_alpha = (1.0 - progress) / scale
    }
    return new_alpha
}


function calculateFadeInOutOpacity(progress, scale) {
    var new_alpha = 1.0
    if (progress <= scale) {
        new_alpha = progress / scale
    }
    else if (progress >= (1 - scale)) {
        new_alpha = (1.0 - progress) / scale
    }
    return new_alpha
}


// scrollama event handlers
function handleStepProgress(response) {

    var text_rgba = 'rgba('
        + PARAMS.text.rgb_str
        + calculateFadeOutOpacity(response.progress, PARAMS.text.fade_position)
        + ')'

    var caption_rgba = 'rgba('
        + PARAMS.caption.rgb_str
        + calculateFadeInOutOpacity(response.progress, PARAMS.caption.fade_position)
        + ')'

    var chart_opcaity = calculateFadeInOutOpacity(response.progress, PARAMS.chart.fade_position)

    d3.select(response.element)
      .style('color', text_rgba)
      .style('border-color', text_rgba);

    CAPTION.select('p').style('color', caption_rgba);
    CHART.select('img').style('opacity', chart_opcaity);    
}

function handleStepEnter(response) {
    // response = { element, direction, index }

    // add color to current step only
    STEP.classed('is-active', function (d, i) {
        return i === response.index;
    });

    CAPTION.select('p')
           .style('color', 'rgba(' + PARAMS.caption.rgb_str + ', 0)')
           .style('display', 'inline-block')
           .text(STORY[response.index].caption);

    CHART.select('img')
         .attr('src', PARAMS.chart.path + STORY[response.index].chart)
         .attr('alt', STORY[response.index].alt)
         .attr('title', STORY[response.index].alt)
         .style('display', 'inline-block')
         .style('opacity', 0.0);

    if (STORY[response.index].caption !== "") {
      CAPTION.select('p').style('display', 'inline-block')
    } else {
      CAPTION.select('p').style('display', 'none')
    }

    if (STORY[response.index].chart !== "") {
      CHART.select('img').style('display', 'inline-block')
    } else {
      CHART.select('img').style('display', 'none')
    }

    handleResize()
}

function handleContainerEnter(response) {
    // response = { direction }
    GRAPHIC.classed('is-fixed', true);
    GRAPHIC.classed('is-bottom', false);
}

function handleContainerExit(response) {
    // response = { direction }
    GRAPHIC.classed('is-fixed', false);
    GRAPHIC.classed('is-bottom', response.direction === 'down');
}

function init() {
  handleResize();

  SCROLLER.setup({
      container: '#scroll',
      graphic: '.scroll__graphic',
      text: '.scroll__text',
      step: '.scroll__text .step',
      progress: true,
      debug: false,
      offset: 0.35,
  })
      .onStepProgress(handleStepProgress)
      .onStepEnter(handleStepEnter)
      .onContainerEnter(handleContainerEnter)
      .onContainerExit(handleContainerExit);

  // setup resize event
  window.addEventListener('resize', handleResize);

}

// kick things off
init();