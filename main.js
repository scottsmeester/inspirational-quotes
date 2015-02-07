// the Quote class
var Quote = function(author, quote, stars){
  this.author = author;
  this.quote = quote;
  this.stars = stars;
};

Quote.prototype.printQuote = function(){
  this.$el = $('<blockquote>')
    .append('<p>' + this.quote + '</p>')
    .append('<footer>' + this.author + '</footer>')
    .append(createStars(this.stars));

    return this.$el;
};
// todo: css on here?
Quote.prototype.animateBackground = function(){
  this.$el.animate({backgroundColor:'#fff'}, 2000);
};

var createStars = function(starsInt){

  var myStars = "";
    for (var i = 0; i < 5; i++) {
      if (starsInt <= i) {
        myStars += '<span class="glyphicon glyphicon-star headerRoom unlit"></span>';
      }
      else {
        myStars += '<span class="glyphicon glyphicon-star headerRoom"></span>';
      }
    }
    return myStars;
};

var myQuotes = [
  {
    author: 'Aristotle',
    quote: 'We are what we repeatedly do. Excellence, therefore, is not an act but a habit.',
    stars: 3
  },
  {
    author: 'George S. Patton',
    quote: 'Take calculated risks. That is quite different from being rash.',
    stars: 5
  },
  {
    author: 'Unknown',
    quote: 'Storms make oaks take roots.',
    stars: 1
  },
  {
    author: 'St. Clement of Alexandra',
    quote: 'If you do not hope, you will not find what is beyond your hopes.',
    stars: 2
  },
  {
    author: 'Norman Vaughan',
    quote: 'Dream big and dare to fail.',
    stars: 4
  },
  {
    author: 'Ralph Waldo Emerson',
    quote: 'We are all inventors, each sailing out on a voyage of discovery, guided each by a private chart, of which there is no duplicate. The world is all gates, all opportunities.',
    stars: 1
  },
  {
    author: 'Harriet Beecher Stowe',
    quote: 'When you get into a tight place and everything goes against you, till it seems you could not hang on a minute longer, never give up then, for that is just the place and time that the tide will turn.',
    stars: 3
  },
  {
    author: 'Thornton Wilder',
    quote: 'Seek the lofty by reading, hearing and seeing great work at some moment every day.',
    stars: 1
  },
  {
    author: 'Arthur C. Clarke',
    quote: 'The only way of finding the limits of the possible is by going beyond them into the impossible.',
    stars: 4
  },
  {
    author: 'John B. Gough',
    quote: 'If you want to succeed in the world must make your own opportunities as you go on. The man who waits for some seventh wave to toss him on dry land will find that the seventh wave is a long time a coming. You can commit no greater folly than to sit by the roadside until some one comes along and invites you to ride with him to wealth or influence.',
    stars: 3
  }
];

// Quote.prototype.updateStars = function(){

// }


for (var i = 0; i < myQuotes.length; i++) {
  var thisQuote = new Quote(myQuotes[i].author, myQuotes[i].quote, myQuotes[i].stars);
  $('.container.quotes').append(thisQuote.printQuote());
}
var annimationTime = 200;

$('#addItemBtn').click(function(){
  $('textarea[name="quote"]').val("");
  $('input[name="author"]').val("");
  $( '#stars option:selected' ).val();
  // $('.formOverlay').fadeIn(annimationTime);
  // $('.formPopup').fadeIn(annimationTime);
  $('#addItemBtn').fadeOut(annimationTime);
});

$('.btn-default').click(function(){
  // $('.formOverlay').fadeOut(annimationTime);
  // $('.formPopup').fadeOut(annimationTime);
  $('#addItemBtn').fadeIn(annimationTime);
});

$('.btn-primary').click(function(){

  var newQuote = $('textarea[name="quote"]').val();
  var newAuthor = $('input[name="author"]').val();
  
  if (newQuote === "" && newAuthor === "") {
    $('#quoteEntry').addClass('has-error');
    $('#authorEntry').addClass('has-error');
    return false;
  }
  else if (newQuote === "") {
    $('#quoteEntry').addClass('has-error');
    $('#authorEntry').removeClass('has-error');
    return false;
  }
  else if (newAuthor === "") {
    $('#quoteEntry').removeClass('has-error');
    $('#authorEntry').addClass('has-error');
    return false;
  }

  $('#quoteEntry').removeClass('has-error');
  $('#authorEntry').removeClass('has-error');

  $('#myModal').toggle();
  // $('.modal-dialog').fadeOut(annimationTime);
  $('#addItemBtn').toggle();

  var thisNewQuote = new Quote(newAuthor, newQuote, 0);

  $('blockquote').first().before(thisNewQuote.printQuote().addClass('newQuoteHighlight'));
    thisNewQuote.animateBackground();
});

$(document)
  .on('mouseenter', '.glyphicon', function(){
    // $(this).addClass('starLit');
    $(this).parent().find('.glyphicon:lt(' + ($(this).index() - 1) + ')').addClass('starLit');
    // console.log($(this).index());
  })
  .on('mouseleave', '.glyphicon', function(){
    $(this).parent().children().removeClass('starLit');

  })
  .on('click', '.glyphicon', function(){
    var parent = $(this).parent();
    var thisIndex = $(this).index() - 1;
    parent.children('.glyphicon').remove();
    parent.append(createStars(thisIndex));
  });


