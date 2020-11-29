    // Smooth Scrolling
    $('a[href*="#"]:not([href="#"])').click(function() {
      // if (this.hash == '#contactInfo') return true; //if drop down button -> do nothing
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
