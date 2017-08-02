/* bs_random_thumbs.js

random thumbs patterns with bootstrap

Author : free.malikbenkirane@gmail.com
Licence : GPL v3.0

*/

var bs_row_config = [
    ['col-md-4', 'col-md-8'],
    ['col-md-8', 'col-md-4'],
    ['col-md-4', 'col-md-4', 'col-md-4']
];

var color_palette = [
  '#256F5B',
  '#29506D',
  '#AA7939',
  '#AA6239'
];

var color_palette = [
  '#96A537',
  '#7A9E35',
  '#8A2E60',
  '#68266F'
]

function random_pattern(pattern_config) {
  var p = pattern_config.length;
  var choice = Math.floor(Math.random() * p);
  return pattern_config[choice];
}

function random_pattern_loc(pattern_config) {
  var p = pattern_config.length;
  return Math.floor(Math.random() * p);
}

function random_color(colors_palette) {
  var n = colors_palette.length;
  var choice = Math.floor(Math.random() * n);
  return colors_palette[choice];
}

var config = bs_row_config;

function dad_random_patterns(n, pattern_config) {
  var buffer = [random_pattern_loc(pattern_config)];
  for ( var i = 1 ; i <  n ; i++ ) {
    var try_pattern = random_pattern_loc(pattern_config);
    while( buffer[i-1] == try_pattern )
      try_pattern = random_pattern_loc(pattern_config);
    buffer[i] = try_pattern;
    buffer[i-1] = pattern_config[buffer[i-1]];
  }
  buffer[n-1] = pattern_config[buffer[n-1]];
  return buffer;
}

function random_colors(n, colors_palette) {
  var nc = color_palette.length;
  var colors = [random_color(colors_palette)];
  var buffer = [colors[0]];
  var i = 1;
  while ( buffer.length < n ) {
    while ( colors.length < nc && buffer.length < n ) {
      var try_color = random_color(colors_palette);
      if (colors.indexOf(try_color) < 0) {  // compatibilty ?
        colors[i++] = try_color;
        buffer[buffer.length] = try_color;
      }
    }
    colors = [random_color(colors_palette)];
    i = 1;
  }
  return buffer;
}

function random_colors_kernel(n, k, colors_palette) {
  if ( k > colors_palette.length ) {
    console.log('no kernel ! calling colors palette');
    var colors = random_colors(n, colors_palette);
      return random_colors(n, colors_palette);
  }
  var kernel = random_colors(k, colors_palette);
  var buffer = kernel;
  while ( buffer.length < n ) {
    console.log('(' + buffer.length + ')', kernel);
    var try_color = random_color(colors_palette);
    while ( kernel.indexOf(try_color) >= 0 ) {
      try_color = random_color(colors_palette)
    }
    var kernel_translation = [];
    for ( var i = 1 ; i < k ; i++ ) {
      kernel_translation[i-1] = kernel[i];
    }
    kernel = kernel_translation.concat([try_color]);
    console.log(kernel);
    buffer[buffer.length] = try_color;
  }
  return buffer;
}

function thumbnail(parent_div, color) {
  var thumb = document.createElement('DIV');
  thumb.style.backgroundColor = color;
  thumb.className = 'custom-thumbnail';
  parent_div.appendChild(thumb);
}

function inject_patterns(n, parent, patterns_config, colors_palette) {
  var patterns = dad_random_patterns(n, patterns_config);
  var s = 0;
  for ( var i = 0 ; i < n ; i++ ) {
    s += patterns[i].length;
  }
  //var colors = random_colors(s+1, colors_palette);
  var colors = random_colors_kernel(s+1, colors_palette.length - 1, colors_palette);
  console.log('patterns', patterns);
  console.log('colors', colors);
  var cum = 0;
  for ( var row = 0 ; row < patterns.length ; row++ ) {
    var pattern = patterns[row];
    for ( var col = 0 ; col < pattern.length ; col++ ) {
      var element = document.createElement("DIV");
      element.className = pattern[col];
      //console.log('cum '+cum, colors[cum]);
      thumbnail(element, colors[++cum]);
      parent.appendChild(element);
    }
  }
}

var palette = document.getElementById('palette');
color_palette.forEach(function(color) {
  var e = document.createElement("DIV");
  e.className = "col-md-3";
  e.style.backgroundColor = color;
  e.style.height = '10vh';
  e.style.marginBottom = '5vh';
  palette.appendChild(e);
});

var test = document.getElementById('test');
inject_patterns(10, test, bs_row_config, color_palette);
