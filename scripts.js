let allTools = {};

async function loadTools() {
  const res = await fetch('tools.json');
  allTools = await res.json();
  updateTable();
}

function updateTable() {
  const cat = document.getElementById('category-select').value;
  const search = document.getElementById('search-input').value.toLowerCase();
  const priceChecks = Array.from(document.querySelectorAll('.price-filter'))
    .filter(cb => cb.checked).map(cb => cb.value);

  document.getElementById('category-title').textContent = `${cat} Tools`;
  const tbody = document.querySelector('#tools-table tbody');
  tbody.innerHTML = '';

  allTools[cat].filter(tool => {
    // price filter
    const hasPrice = tool.pricing.split(',').some(p => priceChecks.includes(p.trim()));
    // search filter
    const matchesSearch = tool.name.toLowerCase().includes(search)
      || tool.description.toLowerCase().includes(search);
    return hasPrice && matchesSearch;
  }).forEach(tool => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${tool.logo}" alt="${tool.name} logo"></td>
      <td><a href="${tool.link}" target="_blank">${tool.name}</a></td>
      <td>${tool.description}</td>
      <td>${tool.pricing}</td>
    `;
    tbody.appendChild(row);
  });
}

// event listeners
document.getElementById('category-select').addEventListener('change', updateTable);
document.getElementById('search-input').addEventListener('input', updateTable);
document.querySelectorAll('.price-filter').forEach(cb => cb.addEventListener('change', updateTable));

// init
loadTools();
