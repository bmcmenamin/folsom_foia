
// load the story data

const story = [
    {
        "date": "June\n1955",
        "image": "./bab.jpg",
        "caption": "Lorem ipsum dolor sit amet, ex stet dissentiet reprehendunt cum. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti."
    },
    {
        "date": "July\n1955",
        "image": "./bab2.jpg",
        "caption": "Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti."
    },
    {
        "date": "August\n1955",
        "image": "./bab.jpg",
        "caption": "Lorem ipsum dolor sit amet, ex stet dissentiet reprehendunt cum. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti."
    },
    {
        "date": "Septembruary\n1955",
        "image": "./bab2.jpg",
        "caption": "Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti."
    },
    {
        "date": "Thermidor\n1955",
        "image": "./bab.jpg",
        "caption": "Lorem ipsum dolor sit amet, ex stet dissentiet reprehendunt cum. Vis prima similique contentiones ut, est legere vivendum at, te elitr apeirian interpretaris sea. Vel postea fierent te, quo prima copiosae suavitate ad. Populo postea at eum, quo ex inimicus accusamus. Sit scripserit persequeris consequuntur no. Impedit lucilius eu nam, ex sea justo oporteat, te eam labore doctus deleniti."
    }
]


// using d3 for convenience
var container = d3.select('#scroll');

// Populate all the timeline entries on the left
var text = container.select('.scroll__text');
text.selectAll("div")
    .data(story.map(d => d.date))
    .text(String)
    .enter()
      .append("div")
      .attr("class", "step")
      .append("p")
      .text(String);

var step = text.selectAll('.step');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var caption = graphic.select('.caption');

// initialize the scrollama
var scroller = scrollama();


// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepHeight = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepHeight + 'px');

    // 2. update width/height of graphic element
    var bodyWidth = d3.select('body').node().offsetWidth;
    var bodyHeight = window.innerHeight;
    var textWidth = text.node().offsetWidth;

    var chartVerMargin = Math.floor(0.1 * bodyHeight);
    var chartHorMargin = 8;
    var captionVerMargin = 4;

    var graphicWidth = bodyWidth - textWidth - chartHorMargin;
    var graphicLeft = textWidth + chartHorMargin;

    graphic.style('left', graphicLeft + 'px')
           .style('top', chartVerMargin + 'px')
           .attr('width', (bodyWidth - textWidth - chartHorMargin) + 'px')

    chart.select('img')
         .style('width', graphicWidth + 'px')     
         .style('height',  (Math.floor(0.5 * bodyHeight) - chartVerMargin) + 'px')
         .style('object-fit', 'contain')

    caption.style('top', captionVerMargin + 'px')
           .style('left', '25px')
           .attr('height', Math.floor(0.4 * bodyHeight) + 'px')

    scroller.resize();
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

    var el = d3.select(response.element);

    // update text transparency
    var text_rgba = 'rgba(255,255,255, ' + calculateFadeOutOpacity(response.progress, 0.85) + ')'
    el.style('color', text_rgba)
      .style('border-color', text_rgba);

    // update graphic transparency
    var caption_rgba = 'rgba(255,255,255, ' + calculateFadeInOutOpacity(response.progress, 0.15) + ')'
    caption.select('p').style('color', caption_rgba);
    chart.select('img').style('opacity', calculateFadeInOutOpacity(response.progress, 0.08));    
}

function handleStepEnter(response) {
    // response = { element, direction, index }

    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })

    // update graphic based on step
    caption.select('p')
           .style('color', 'rgba(255, 255, 255, 0)')
           .text(story[response.index].caption);

    chart.select('img')
         .attr('src', story[response.index].image)
         .style('opacity', 0.0)
}

function handleContainerEnter(response) {
    // response = { direction }

    // sticky the graphic
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
    // response = { direction }

    // un-sticky the graphic, and pin to top/bottom of container
    graphic.classed('is-fixed', false);
    graphic.classed('is-bottom', response.direction === 'down');
}

function init() {
    handleResize();

    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        progress: true,
        debug: true,
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