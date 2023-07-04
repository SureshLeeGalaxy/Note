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
    Matrix: [
      {
        name: 'Basics',
        topics: [
          { title: 'Guass Elimination', url: 'matlab/Matrix/basics/topic1.html' },
          { title: 'Pivot', url: 'matlab/Matrix/basics/pivot_in_matrix.html' }
        ]
      },
      {
        name: 'Advanced',
        topics: [
          { title: 'Topic 3', url: 'matlab/advanced/Topic3.pdf' },
          { title: 'Topic 4', url: 'matlab/advanced/topic4.html' }
        ]
      }
    ],
    FourierSeries: [
      {
        name: 'Eulers Formula Approach 1',
        topics: [
          { title: 'General Code for any Function', url: 'matlab/Fourier Series/Eulers Fourier Function_1/General_Euler_Formula_code.html' },
          { title: 'Example 10.1', url: 'matlab/Fourier Series/Eulers Fourier Function_1/Example10_1.html' },
          { title: 'Example 10.2', url: 'matlab/Fourier Series/Eulers Fourier Function_1/Example10_2.html' },
          { title: 'Example 10.3', url: 'matlab/Fourier Series/Eulers Fourier Function_1/Example10_3.html' }
        ]
      },
      {
        name: 'Eulers Formula Approach 2',
        topics: [
          { title: 'General Code for any Function', url: 'matlab/Fourier Series/Eulers Fourier Function_2/General_Euler_Formula_approach_2.html' },
          { title: 'Example 10.1', url: 'matlab/Fourier Series/Eulers Fourier Function_2/Example10_1.html' },
          { title: 'Example 10.2', url: 'matlab/Fourier Series/Eulers Fourier Function_2/Example10_2.html' },
          { title: 'Example 10.3', url: 'matlab/Fourier Series/Eulers Fourier Function_2/Example10_3.html' }
        ]
      },
      {
        name: 'Advanced',
        topics: [
          { title: 'Topic 3', url: 'matlab/advanced/Topic3.pdf' },
          { title: 'Topic 4', url: 'matlab/advanced/topic4.html' }
        ]
      }
    ],
    FourierTransform: [
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

function loadTopicContent(url) {
  // Remove any existing modal boxes
  const existingModals = document.querySelectorAll('.modal');
  existingModals.forEach(function(modal) {
    modal.parentNode.removeChild(modal);
  });

  // Extract the file extension from the URL
  const fileExtension = url.split('.').pop().toLowerCase();

  // Create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Open the request
  xhr.open('GET', url, true);

  // Set the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      let modalContent;
      if (fileExtension === 'html') {
        // Create a modal box element and content for HTML
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modalContent = document.createElement('div');
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
      } else if (fileExtension === 'pdf') {
        // Create a modal box element and content for PDF
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Create an embed element for displaying the PDF
        const pdfEmbed = document.createElement('embed');
        pdfEmbed.src = url;
        pdfEmbed.type = 'application/pdf';
        pdfEmbed.width = '100%';
        pdfEmbed.height = '100%';

        // Append the PDF embed to the modal content
        modalContent.appendChild(pdfEmbed);

        // Append the modal content to the modal
        modal.appendChild(modalContent);

        // Append the modal to the body
        document.body.appendChild(modal);
      } else if (fileExtension === 'doc' || fileExtension === 'docx') {
        // Create a modal box element and content for Word documents
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Create an iframe for displaying the Word document
        const wordIframe = document.createElement('iframe');
        wordIframe.src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(url);
        wordIframe.width = '100%';
        wordIframe.height = '100%';

        // Append the Word iframe to the modal content
        modalContent.appendChild(wordIframe);

        // Append the modal content to the modal
        modal.appendChild(modalContent);

        // Append the modal to the body
        document.body.appendChild(modal);
      } else {
        // Unsupported file type, show error message
        const modal = document.createElement('div');
        modal.classList.add('modal1');

        modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';

        const unsupportedMessage = document.createElement('h2');
        unsupportedMessage.textContent = 'Unsupported File Type';
        unsupportedMessage.classList.add('not-found');

        modalContent.appendChild(closeButton);
        modalContent.appendChild(unsupportedMessage);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Add event listener to the close button
        closeButton.addEventListener('click', function() {
          document.body.removeChild(modal);
        });
      }
    } else {
      // Create a modal box element and content for "Page Not Found"
      const modal = document.createElement('div');
      modal.classList.add('modal1');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      const closeButton = document.createElement('span');
      closeButton.classList.add('close-button');
      closeButton.innerHTML = '&times;';

      const notFoundMessage = document.createElement('h2');
      notFoundMessage.textContent = 'Page Not Found';
      notFoundMessage.classList.add('not-found');

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
