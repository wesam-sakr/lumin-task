// dir
var bodyDir = $('body').css('direction')
var dirAr
if(bodyDir == "rtl"){
  dirAr= true
}
else{
  dirAr = false
}

// loader
$('#loading').fadeOut(500);

// nav dropdown menu
var dropdown = document.querySelectorAll('.dropdown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);
dropdownArray.forEach(function(el ,ind ){
    var button = el.querySelector('a[data-toggle="dropdown"]'),
    menu = el.querySelector('.dropdown-menu'),
    arrow = button.querySelector('i.icon-arrow');
    button.onclick = function(event) {
        if(!menu.hasClass('show')) {
            menu.classList.add('show');
            menu.classList.remove('hide');
            arrow.classList.add('open');
            arrow.classList.remove('close');
            event.preventDefault();
            $('.dropdown-menu').each( function(indx){
                if(indx != ind) {
                    this.classList.remove('show');
                    this.classList.add('hide');
                    var link =  $(this).prev()[0];
                    var chevron = $(link).find('i')[0];
                    chevron.classList.remove('open');
                }
            })
        }
        else {
            menu.classList.remove('show');
            menu.classList.add('hide');
            arrow.classList.remove('open');
            arrow.classList.add('close');
            event.preventDefault();
        }
	};
})

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

$('.navbar-toggler').click(function(){
    this.toggleClass('closed');
})

$(".play-icon").click(function(){
    document.querySelector(".vid-wrapper video").play();
    $(this).addClass("d-none");
    $(".pause-icon").removeClass("d-none");
    $('.video-cover-img').slideUp("slow")
})

$(".pause-icon").click(function(){
    document.querySelector(".vid-wrapper video").pause();
    $(this).addClass("d-none");
    $(".play-icon").removeClass("d-none");
    $('.video-cover-img').slideDown( "slow" )
})

var clients = $('.happy_clients_imgs').children()
$(clients).each(function(ind){
    $(this).css({
        '--zindex' : `${ind}`,
    })
})

// toggle nav
$('.toggle-nav-btn').click(function(){
    $('.profile-nav').toggleClass('open');
})


// Get all sections that have an ID defined
const sections = document.querySelectorAll(".single-article [id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter(){
  // Get current scroll position
  let scrollY = window.pageYOffset;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 230;
    sectionId = current.getAttribute("id");
    var section = $(".sticky_nav a[href*=" + sectionId + "]")

    /*
  - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
  - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
  */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      section.addClass("active");
    } else {
      section.removeClass("active");
    }
  });
}

const inputElements = [...document.querySelectorAll('input.code')]

inputElements.forEach((ele,index)=>{
  ele.addEventListener('keydown',(e)=>{
    // if the keycode is backspace & the current field is empty
    // focus the input before the current. Then the event happens
    // which will clear the "before" input box.
    if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
  })
  ele.addEventListener('input',(e)=>{
      inputElements[index].focus()
    // take the first character of the input
    // this actually breaks if you input an emoji like ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦....
    // but I'm willing to overlook insane security code practices.
    const [first,...rest] = e.target.value
    e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
    const lastInputBox = index===inputElements.length-1
    const didInsertContent = first!==undefined
    if(didInsertContent && !lastInputBox) {
      // continue to input the rest of the string
      inputElements[index+1].focus()
      inputElements[index+1].value = rest.join('')
      inputElements[index+1].dispatchEvent(new Event('input'))
    }
  })
})


// mini example on how to pull the data on submit of the form
function onSubmit(e){
  e.preventDefault()
  const code = inputElements.map(({value})=>value).join('')
  console.log(code)
}

/* -------------- upload profile pic ---------------- */
if($('.profile-pic').length > 0){
    const imgDiv = document.querySelector('.profile-pic');
    const img = document.querySelector('#photo');
    const file = document.querySelector('#file');
    const uploadBtn = document.querySelector('#uploadBtn');
    
    //when we choose a pic to upload
    
    file.addEventListener('change', function(){
      const choosedFile = this.files[0];
      if (choosedFile) {
        const reader = new FileReader(); 
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
      }
    });

}
// owl carousel
$(document).ready(function(){
    $("header .owl-carousel").owlCarousel({
        nav: false,
        autoplay: false,
        autoplayHoverPause: true,
        responsiveClass: true,
        items: 1,
        rtl: dirAr,
        dots: true,
        margin: 20
    });
    
    $(".membership .owl-carousel").owlCarousel({
        autoplay: true,
        margin:10,
        rtl:dirAr,
        dots: false,
        nav: true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3.2,
            }
        }
    });

    $('.article .owl-carousel').owlCarousel({
        margin:20,
        rtl:dirAr,
        nav :true,
        dots: false,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    });

    $('.partners .owl-carousel').owlCarousel({
        loop:true,
        margin:15,
        responsiveClass:true,
        rtl:dirAr,
        autoplay:true,
        nav:false,
        dots: false,
        responsive:{
            0:{
                items:3,
                margin: 8,
            },
            600:{
                items:5,
            },
            1000:{
                items:5,
            },
            function(){

                
            }
        }
    });
    // Listen to owl events:
    var owl = $('.partners .owl-carousel');
    owl.owlCarousel();
    owl.on('changed.owl.carousel', function(event) {
        var n = Math.ceil($('.partners .owl-item.active').length/2) ;
        $('.partners .owl-item.active').each(function (){
            if(this.hasClass('partner')) {
                this.classList.remove('partner');
            }    
        })
        
        var aAitem = $('.partners .owl-item.active')[n]
        $(aAitem).toggleClass("partner")
    })
});

// services responsive
$('.op-pro-filter').click(function () {
    $(this).toggleClass('active');
    $('.services-nav').slideToggle();
});