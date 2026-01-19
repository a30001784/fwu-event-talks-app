document.addEventListener('DOMContentLoaded', () => {
    const talks = [
      {
        title: 'The Future of Artificial Intelligence',
        speakers: ['Dr. Evelyn Reed'],
        categories: ['AI', 'Machine Learning'],
        description: 'A deep dive into the next generation of AI and its potential impact on society.'
      },
      {
        title: 'Modern Web Development with Web Components',
        speakers: ['John Doe', 'Jane Smith'],
        categories: ['Web', 'JavaScript'],
        description: 'Learn how to build framework-agnostic web components for modern web applications.'
      },
      {
        title: 'Scalable Cloud Architectures',
        speakers: ['Peter Jones'],
        categories: ['Cloud', 'DevOps'],
        description: 'An overview of best practices for designing and deploying scalable and resilient cloud infrastructure.'
      },
      {
        title: 'The Quantum Computing Revolution',
        speakers: ['Dr. Albert Crypto'],
        categories: ['Quantum', 'Computing'],
        description: 'An introduction to the mind-bending world of quantum computing and its potential applications.'
      },
      {
        title: 'Cybersecurity in a Post-Quantum World',
        speakers: ['Alice Secure', 'Bob Guard'],
        categories: ['Security', 'Cryptography'],
        description: 'Exploring the challenges and solutions for securing our data in the age of quantum computers.'
      },
      {
        title: 'Building Ethical AI',
        speakers: ['Dr. Susan Wright'],
        categories: ['AI', 'Ethics'],
        description: 'A discussion on the ethical considerations and frameworks for developing responsible AI systems.'
      }
    ];
  
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');
  
    function formatTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    function renderSchedule() {
      scheduleContainer.innerHTML = '';
      let currentTime = new Date();
      currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM
  
      talks.forEach((talk, i) => {
        const startTime = new Date(currentTime);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
  
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');
        scheduleItem.dataset.categories = talk.categories.join(',').toLowerCase();
        scheduleItem.innerHTML = `
          <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
          <h2>${talk.title}</h2>
          <div class="speakers">By: ${talk.speakers.join(', ')}</div>
          <p>${talk.description}</p>
          <div class="categories">
            ${talk.categories.map(cat => `<span class="category">${cat}</span>`).join('')}
          </div>
        `;
        scheduleContainer.appendChild(scheduleItem);
        
        currentTime = new Date(endTime.getTime());
  
        if (i + 1 === 3) {
          const lunchStartTime = new Date(currentTime);
          const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60 * 1000);
          const breakItem = document.createElement('div');
          breakItem.classList.add('schedule-item', 'break');
          breakItem.innerHTML = `<div class="time">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div><div>Lunch Break</div>`;
          scheduleContainer.appendChild(breakItem);
          currentTime = new Date(lunchEndTime.getTime());
        } else if (i < 5) {
          const breakStartTime = new Date(currentTime);
          const breakEndTime = new Date(breakStartTime.getTime() + 10 * 60 * 1000);
          const breakItem = document.createElement('div');
          breakItem.classList.add('schedule-item', 'break');
          breakItem.innerHTML = `<div class="time">${formatTime(breakStartTime)} - ${formatTime(breakEndTime)}</div><div>Break</div>`;
          scheduleContainer.appendChild(breakItem);
          currentTime = new Date(breakEndTime.getTime());
        }
      });
    }
  
    function filterSchedule(filter) {
      const talkItems = document.querySelectorAll('.schedule-item:not(.break)');
      let talksFound = false;
      talkItems.forEach(item => {
        const categories = item.dataset.categories;
        const shouldShow = !filter || categories.includes(filter.toLowerCase());
        item.style.display = shouldShow ? 'block' : 'none';
        if(shouldShow) talksFound = true;
      });
  
      let noResultsMessage = scheduleContainer.querySelector('.no-results');
      if (!talksFound && filter) {
          if (!noResultsMessage) {
              noResultsMessage = document.createElement('p');
              noResultsMessage.classList.add('no-results');
              noResultsMessage.textContent = 'No talks found for this category.';
              scheduleContainer.appendChild(noResultsMessage);
          }
      } else if (noResultsMessage) {
          noResultsMessage.remove();
      }
    }
  
    searchInput.addEventListener('input', (e) => {
      filterSchedule(e.target.value);
    });
  
    renderSchedule();
  });
