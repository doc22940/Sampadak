

var myCodeMirror = CodeMirror(document.getElementById('editor_section'), {
			lineNumbers: true,
			lineWrapping: true,
			spellcheck: true,
		 	mode:  "markdown",
		    highlightFormatting: true,
		    styleActiveLine: true,
		    autoCloseBrackets: true,
		    highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
		    extraKeys: {
		        "F11": function(cm) {
		          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
		        },
		        "Esc": function(cm) {
		          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
		        }
		      }
		});


function markdown_to_html() {
	showdown.setOption('noHeaderId' , true);
  	var text =  myCodeMirror.getValue(),
      
	converter = new showdown.Converter({
					tables: true, 
					strikethrough: true,
					ghCodeBlocks: true,
					simplifiedAutoLink: true,
					smoothLivePreview: true,
					simpleLineBreaks: true,
					requireSpaceBeforeHeadingText: true,
				}),
	html = converter.makeHtml(text);
    
    return html;
}


$(document).ready(function(){
	$('#editor_section').keyup(function(){
		$('#preview_section').html(markdown_to_html());
	})
})


var input = document.getElementById("select");
function selectTheme() {
    var theme = input.value;
    myCodeMirror.setOption("theme", theme);
    
  }
  var choice = (location.hash && location.hash.slice(1)) ||
               (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
  if (choice) {
    input.value = choice;
    myCodeMirror.setOption("theme", choice);
  }
  CodeMirror.on(window, "hashchange", function() {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
  });