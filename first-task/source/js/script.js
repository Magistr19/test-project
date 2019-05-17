'use strict';

// Global variables:
let data = [
  {
      img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/color/re-max-nexus-logo.png',
      title: 'RE/MAX Nexus',
      text: 'RE/MAX Nexus Innovates with Team Messaging and Collaboration',
      video: 'https://www.youtube.com/watch?v=7qUK9TRl02o'
  },
  {
      img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/color/msxi-logo.png',
      title: 'MSXI',
      text: 'A Platform for First-Class Customer Service',
      video: 'https://www.youtube.com/watch?v=Ej10mMruFP4'
  },
  {
      img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/brinker-page-logo.png',
      title: 'Brinker International',
      text: 'Brinker International has leveraged RingCentral platform data to help optimize the staffing at the restaurants',
      video: 'https://www.youtube.com/watch?v=ahm93twt0jU'
  },
  {
      img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/color/aseracare_card_logo.png',
      title: 'AseraCare',
      text: 'RingCentral Helps AseraCare Improve Customer Service Through Analytics-Driven Customer Engagement',
      video: 'https://www.youtube.com/watch?v=U6fmFoNo7WY'
  }
];

let videoFrame = document.querySelector('.modal-video__player');
let player = null;
let currentVideoId = null;
let isModalOpened = false;

renderPartners(data); // Render dom elements from data
revivePartnersCarousel(); // Make slider carouser alive for mobile sizes
reviveModalVideo(); // Make modal window interactive

/**
* Render dom elements from data
*
* @param {arr} - arr with objects data
*/
function renderPartners(data) {
  if (!data.length) {
    return console.error('No data for partners section!');
  }

  //DOM element:
  let partnersSection = document.querySelector('#partnersSection');

  if (!partnersSection) {
    return console.error('No partnersSection in HTML!');
  }

  //Recreating dom structure of partners section:
  let sectionTitle = createNodeElement('h2', 'screen-reader', 'Our partners:', partnersSection); // Section title

  let partnersWrapper = createNodeElement('div', 'partners__wrapper', null, partnersSection); // Partners wrapper
  let partnersContainer = createNodeElement('div', 'partners__container', null, partnersWrapper); // Partners container

  let partnersList = createNodeElement('ul', 'partners__list', null, partnersContainer); // Partners list
  let partnersSlider = createNodeElement('ul', ['slider-bullets', 'partners__slider-bullets'], null, partnersWrapper); // Partners slider

  for (let i = 0; i < data.length; i++) {
		if (!isValidData(data[i])) { // Check data
			continue;
		}

    let partnersListItem = createNodeElement('li', ['partner-card', 'partners__item'], null, partnersList); //Card item

    let partnerImageContainer = createNodeElement('div', 'partner-card__image-container', null, partnersListItem); // Card image container

    let partnerImage = createNodeElement('img', 'partner-card__image', null, partnerImageContainer); // Card image
    partnerImage.setAttribute('src', data[i].img);
    partnerImage.setAttribute('alt', data[i].title);

    let partnerCardTitle = createNodeElement('h3', 'partner-card__title', data[i].title, partnersListItem); // Card title
    let partnerCardDesc = createNodeElement('p', 'partner-card__description', data[i].text, partnersListItem); // Card description

    let partnerCardVideo = createNodeElement('a', 'partner-card__watch-video', 'Watch video', partnersListItem); // Card video link
    partnerCardVideo.setAttribute('href', data[i].video);

    let partnersSliderItem = createNodeElement('li', 'slider-bullets__item', null, partnersSlider); // Slider item

    let partnersSliderInput = createNodeElement('input', null, null, partnersSliderItem); // Slider radio
    partnersSliderInput.setAttribute('type', 'radio');
    partnersSliderInput.setAttribute('name', 'slider-bullets__radio');
    partnersSliderInput.setAttribute('id', `slider-bullets__radio-${i + 1}`);
    partnersSliderInput.setAttribute('value', `${i + 1}`);

    if (i === 0) {
      partnersSliderInput.setAttribute('checked', '');
    }

    let partnersSliderLabel = createNodeElement('label', null, null, partnersSliderItem); // Slider label
    partnersSliderLabel.setAttribute('for', `slider-bullets__radio-${i + 1}`);
  }

  partnersSection.appendChild(partnersWrapper); // Push all of this elements to section
}

/**
* Quick template of node element. Create new Element with tag name, class, textContent and in parent node
*
* @param {str} - tagName
* @param {str, arr} - class, not necessary
* @param {str} - text content, not necessary
* @param {node} - parent node, not necessary
* @return {node} - node element
*/
function createNodeElement(tagName = 'div', className, innerText, parentNode) {
  if (typeof tagName !== 'string') {
    console.error('invalid argument in function CreateElement');
    return null;
  }

  if (className && typeof className !== 'string' && !Array.isArray(className)) {
    console.error('invalid argument in function CreateElement');
    return null;
  }

  if (innerText && typeof innerText !== 'string') {
    console.error('invalid argument in function CreateElement');
    return null;
  }


  let newElement = document.createElement(tagName);

  if (className) {
    if (Array.isArray(className)) {
      className.forEach((classStr) => {
        newElement.classList.add(classStr);
      });
    } else {
      newElement.classList.add(className);
    }
  }

  if (innerText) {
    newElement.textContent = innerText;
  }

  if (parentNode) {
    parentNode.appendChild(newElement);
  }

  return newElement;
}

/**
* Data check
*
* @param {obj} - object of data
* @return {boolean} - true if obj params are strings
*/
function isValidData(obj) {
	if ((typeof obj.img) === 'string' && (typeof obj.title) === 'string' && (typeof obj.text) === 'string' && (typeof obj.video) === 'string') {
		return true;
	}

	return false;
}

/**
* Make partners slider interactive for mobile sizes
*
*/
function revivePartnersCarousel() {
 let partnersList = document.querySelector('.partners__list');

  if (!partnersList) {
    return console.error('no partners list!');
  }

  let sliderBullets = document.querySelector('.partners__slider-bullets');
  let radioBtns = sliderBullets.querySelectorAll('input[type="radio"]');
  let radioChecked = radioBtns[0];
  radioChecked.checked = true;


  [].forEach.call(radioBtns, radio => {
    radio.addEventListener('click', eventRadio); // Add event listener for all radio btns
  });

  //Callback for eventListener, move the partners list via transformX depending on what radio was activated
  function eventRadio(evt) {
    let previousRadioValue = radioChecked.value;

    radioChecked = this;
    let currentRadioValue = radioChecked.value;

    if (previousRadioValue === currentRadioValue) {
      return;
    }

    partnersList.style.transform = `translateX(${(currentRadioValue - 1) * -100}%)`;
  }
}

/**
* Make video links interactive in pop up
*
*/
function reviveModalVideo() {
  let modalVideo = document.querySelector('.modal-video');
  let closeModal = document.querySelector('.modal-video__close');
  let overlay = document.querySelector('.overlay');
  let videoLinks = document.querySelectorAll('.partner-card__watch-video');

  closeModal.addEventListener('click', eventCloseModal);

  [].forEach.call(videoLinks, videoLink => {
    videoLink.addEventListener('click', eventWatchVideo); // Add event listener for all video links in cards
  });

  function eventCloseModal(evt) {
    evt.preventDefault();

    //Close modal
    overlay.classList.toggle('overlay--show');
    modalVideo.classList.toggle('modal-video--show');

    sendVideoAnalytics();
    stopVideo();

    //Reset global variables:
    isModalOpened = false;
    currentVideoId = null;
  }

  function eventWatchVideo(evt) {
    evt.preventDefault();

    //Open modal
    overlay.classList.toggle('overlay--show');
    modalVideo.classList.toggle('modal-video--show');
    isModalOpened = true;

    //Get id from link
    let link = evt.target.href;
    currentVideoId = link.slice(link.indexOf('?v=') + 3);


    if (!player) { //If player has already loaded, start next video or load the api
      loadVideoPlayer();
    } else {
      player.loadVideoById(currentVideoId);
    }
  }
}


// Youtube API functions:

//Load script api
function loadVideoPlayer() {
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//Callback when api was loaded
function onYouTubeIframeAPIReady() {
  player = new YT.Player(videoFrame, {
    height: '100%',
    width: '100%',
    videoId: currentVideoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

//Callback when player was setted
function onPlayerReady(event) {
  event.target.playVideo();
}

//Youtube video states
function onPlayerStateChange(event) {
  console.log(event.data);
  if (event.data == YT.PlayerState.ENDED) { // If video ended, and after 10 seconds was not closed pop up, start next video
    setTimeout(() => {
      if (isModalOpened === false) {
        return;
      }

      sendVideoAnalytics();
      currentVideoId = getNextVideoId(currentVideoId);
      player.loadVideoById(currentVideoId);
    }, 10000);
  }
}

//Stop playing video
function stopVideo() {
  player.stopVideo();
}

/**
* Send video Analytics when video was watched or closed in format [title] - [youtube video id] - [progress]
*
*/
function sendVideoAnalytics() {
  let videoDuration = player.getDuration();
  let timeWatched = player.getCurrentTime();


  let videoId = currentVideoId; // Video id for analytics

  //Searching the title from what card was video
  let fullLink = `https://www.youtube.com/watch?v=${videoId}`;
  let neededCard = document.querySelector(`a[href='${fullLink}'`).parentNode;
  let cardTitle = neededCard.querySelector('h3').textContent;

  let percentageOfWatch = Math.round(timeWatched/videoDuration * 100);

  if (percentageOfWatch >= 0 && percentageOfWatch < 25) { // Rounding the percentageOfWatch
    percentageOfWatch = 0;
  } else if (percentageOfWatch >= 25 && percentageOfWatch < 50) {
    percentageOfWatch = 25;
  } else if (percentageOfWatch >=50 && percentageOfWatch < 75) {
    percentageOfWatch = 50;
  } else if (percentageOfWatch >= 75 && percentageOfWatch < 95) {
    percentageOfWatch = 75;
  } else {
    percentageOfWatch = 100;
  }

  console.info(`[${cardTitle}] - [${videoId}] - [${percentageOfWatch}]`);
}

/**
* Search next video id, or if it was last video, return first video id
*
* @param {str} - current videoId
* @return {str} - next videoId
*/
function getNextVideoId(videoId) {
  //Searching in data video link
  let fullLink = `https://www.youtube.com/watch?v=${videoId}`;
  let nextLink;

  for (let i = 0; i < data.length; i++) {
    if (data[i].video === fullLink) {
      if (i + 1 === data.length) {
        nextLink = data[0].video;
      } else {
        nextLink = data[i + 1].video;
      }
    }
  }

  nextLink = nextLink.slice(nextLink.indexOf('?v=') + 3);
  return nextLink;
}



