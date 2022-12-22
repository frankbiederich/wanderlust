function link($elem, href, cl) {
  const $link = document.createElement('a');
  
  $link.href = href;
  $link.className = cl;
  $link.tabIndex = 0;
  
  $elem.parentNode.insertBefore($link, $elem);
  $link.appendChild($elem);	
  return $link;
}

window.addEventListener('DOMContentLoaded', () => {
  window.gallery.observer.disconnect();

  document.querySelectorAll('.gallery').forEach(($gallery) => {
    // wrap thumbnails with links to the full version
    const $gallerySection = $gallery.closest('.gallery-wrapper');
    $gallery.querySelectorAll('picture').forEach(($pic) => {
      const $img = $pic.querySelector('img');
      const fullUrl = $img.src
        .replace(/\?width\=\d+/, '?width=2000') // increase width to 2000px
        .replace(/\&crop\=\d+:\d+/,''); // remove cropping
	  const $thumb = link($img, fullUrl,'thumb');
	  
      $pic.parentElement.appendChild($thumb);
      $pic.remove();
    });
    
/*
	const sections = Array.from(document.querySelectorAll('.gallery-wrapper'));
    const hasHeader = true sections[0] && sections[0].classList.contains('hero');
    if (hasHeader) {
      // add gallery below title if header section
      sections[0].appendChild($gallery);
    }

    // treat last section as epilog
    const $epilogSection = sections.pop();
    if ($epilogSection !== $gallerySection) {
      $epilogSection.classList.add('epilog');
    }
*/
    // find wall div and initialize lightgallery
    const $wall = $gallery.querySelector('.gallery > div > div');
    // remove everything but links from wall div
    $wall.querySelectorAll('a').forEach(($a) => $wall.append($a));
    $wall.querySelectorAll(':scope > *:not(a)').forEach(($el) => $el.remove());

    $wall.classList.add('gallery-wall');
    lightGallery($wall, {
      thumbnail: true,
    });
  });
});

if (document.head.querySelector('meta[name="template"]')) {
  document.documentElement.classList.add(document.head.querySelector('meta[name="template"]').content);
}