// Simple data
const neighborhoods = [
    {name: "Downtown", rent: 2500, lifestyle: "urban", transport: "public"},
    {name: "Suburbs", rent: 1800, lifestyle: "suburban", transport: "car"},
    {name: "Campus Area", rent: 1200, lifestyle: "student", transport: "bike"},
    {name: "Business District", rent: 2200, lifestyle: "urban", transport: "public"}
];

// Simple matching
function getScore(user, neighborhood) {
    let score = 0;
    
    // Budget (50% weight)
    const budgetDiff = Math.abs(user.budget - neighborhood.rent);
    score += Math.max(0, 50 - budgetDiff/50);
    
    // Lifestyle (30% weight)
    if (user.lifestyle === neighborhood.lifestyle) score += 30;
    
    // Transport (20% weight)
    if (user.transport === neighborhood.transport) score += 20;
    
    return Math.round(score);
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
        budget: parseInt(document.getElementById('budget').value),
        lifestyle: document.getElementById('lifestyle').value,
        transport: document.getElementById('transport').value
    };

    // Calculate and sort matches
    const matches = neighborhoods.map(n => ({
        ...n,
        score: getScore(user, n)
    })).sort((a, b) => b.score - a.score);

    // Show results
    const list = document.getElementById('list');
    list.innerHTML = '';
    
    matches.forEach(match => {
        list.innerHTML += `
            <div class="result">
                <div class="score">${match.score}%</div>
                <h3>${match.name}</h3>
                <p>Rent: $${match.rent}/month</p>
                <p>Type: ${match.lifestyle}</p>
            </div>
        `;
    });
    
    document.getElementById('results').style.display = 'block';
});
