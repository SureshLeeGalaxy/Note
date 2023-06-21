// Get the sub-sections container
const subSectionsList = document.querySelector('.sub-sections-list');

// Get the topic content container
const topicContent = document.getElementById('topicContent');

// Add event listener to the section links
const sectionLinks = document.querySelectorAll('.section-link');
sectionLinks.forEach(function(sectionLink) {
  sectionLink.addEventListener('click', function(event) {
    event.preventDefault();
    const section = sectionLink.textContent;
    loadSubSections(section);
  });
});

// Function to load the sub-sections for a section
function loadSubSections(section) {
  // Array of sub-sections for each section
  const subSections = {
    MATLAB: [
      {
        name: 'Basics',
        topics: [
          { title: 'Topic 1', url: 'matlab/basics/topic1.html' },
          { title: 'Topic 2', url: 'matlab/basics/topic2.html' }
        ]
      },
      {
        name: 'Advanced',
        topics: [
          { title: 'Topic 3', url: 'matlab/advanced/topic3.html' },
          { title: 'Topic 4', url: 'matlab/advanced/topic4.html' }
        ]
      }
    ],
    Python: [
      {
        name: 'Introduction',
        topics: [
          { title: 'Topic 1', url: 'python/introduction/topic1.html' },
          { title: 'Topic 2', url: 'python/introduction/topic2.html' }
        ]
      },
      {
        name: 'Data Types',
        topics: [
          { title: 'Topic 3', url: 'python/data-types/topic3.html' },
          { title: 'Topic 4', url: 'python/data-types/topic4.html' }
        ]
      }
    ]
    // Add more sections and their sub-sections as needed
  };

  // Clear the current sub-sections
  subSectionsList.innerHTML = '';

  // Iterate over the sub-sections for the selected section
  subSections[section].forEach(function(subSection) {
    // Create the sub-section element
    const subSectionElement = document.createElement('div');
    subSectionElement.classList.add('sub-section');

    // Create the sub-section title
    const subSectionTitle = document.createElement('h3');
    subSectionTitle.textContent = subSection.name;

    // Create the list of topics
    const topicList = document.createElement('ul');
    topicList.classList.add('topics-list');

    // Iterate over the topics in the sub-section
    subSection.topics.forEach(function(topic) {
      // Create the topic item
      const topicItem = document.createElement('li');

      // Create the topic link
      const topicLink = document.createElement('a');
      topicLink.textContent = topic.title;
      topicLink.href = topic.url;
      topicLink.addEventListener('click', function(event) {
        event.preventDefault();
        loadTopicContent(topic.url);
      });

      // Append the topic link to the topic item
      topicItem.appendChild(topicLink);

      // Append the topic item to the topic list
      topicList.appendChild(topicItem);
    });

    // Append the sub-section title to the sub-section element
    subSectionElement.appendChild(subSectionTitle);

    // Append the sub-section element to the sub-sections container
    subSectionsList.appendChild(subSectionElement);

    // Add event listener to the sub-section title
    subSectionTitle.addEventListener('click', function() {
      // Toggle the visibility of the topics
      topicList.classList.toggle('show');
    });

    // Append the topic list to the sub-section element
    subSectionElement.appendChild(topicList);
  });
}

// Function to load the content of a topic
function loadTopicContent(url) {
  // Create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Open the request
  xhr.open('GET', url, true);

  // Set the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Create a modal box element and content
      const modal = document.createElement('div');
      modal.classList.add('modal');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      // Create a close button for the modal
      const closeButton = document.createElement('span');
      closeButton.classList.add('close-button');
      closeButton.innerHTML = '&times;';

      // Append the close button to the modal content
      modalContent.appendChild(closeButton);

      // Create a container for the topic content
      const topicContainer = document.createElement('div');
      topicContainer.classList.add('topic-container');

      // Set the loaded HTML as the content of the topic container
      topicContainer.innerHTML = xhr.responseText;

      // Append the topic container to the modal content
      modalContent.appendChild(topicContainer);

      // Append the modal content to the modal
      modal.appendChild(modalContent);

      // Append the modal to the body
      document.body.appendChild(modal);

      // Add event listener to the close button
      closeButton.addEventListener('click', function() {
        // Remove the modal from the body
        document.body.removeChild(modal);
      });
    } else {
      // Create a modal box element and content for "Page Not Found"
      const modal = document.createElement('div');
      modal.classList.add('modal');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      const closeButton = document.createElement('span');
      closeButton.classList.add('close-button');
      closeButton.innerHTML = '&times;';

      const notFoundMessage = document.createElement('h2');
      notFoundMessage.textContent = 'Page Not Found';
      notFoundMessage.classList.add('not-found');
      topicContent.innerHTML = '';
      topicContent.appendChild(notFoundMessage);

      modalContent.appendChild(closeButton);
      modalContent.appendChild(notFoundMessage);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Add event listener to the close button
      closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
    }
  };

  // Send the request
  xhr.send();
}

