document.addEventListener('DOMContentLoaded', function() {
    const liveScoreDiv = document.getElementById('live-score');

    // Replace 'YOUR_API_KEY' with your actual CricAPI key
    const apiKey = 'b35d54fc-a9f9-44f0-93f8-09bd767fb184';
    const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                liveScoreDiv.innerHTML = '';

                // Filter only live matches
                const liveMatches = data.data.filter(match => match.matchStarted);

                if (liveMatches.length === 0) {
                    liveScoreDiv.innerHTML = '<p>No live matches currently available.</p>';
                } else {
                    liveMatches.forEach(match => {
                        const matchElement = document.createElement('div');
                        matchElement.classList.add('match');
                        matchElement.innerHTML = `
                            <h3>${match.name}</h3>
                            <p>${match.teams[0]} vs ${match.teams[1]}</p>
                            <p><strong>Score:</strong> ${match.score}</p>
                            <p><strong>Status:</strong> ${match.status}</p>
                        `;
                        liveScoreDiv.appendChild(matchElement);
                    });
                }
            } else {
                liveScoreDiv.innerHTML = '<p>No live matches currently available.</p>';
            }
        })
        .catch(error => {
            liveScoreDiv.innerHTML = `<p>Error fetching live scores. Please try again later.</p>`;
            console.error('Error fetching live scores:', error);
        });
});
