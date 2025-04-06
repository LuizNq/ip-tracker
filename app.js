let map = L.map('map').setView([0, 0], 2); // inicializa o mapa
    let marker = L.marker([0, 0]).addTo(map); // marcador inicial vazio
  
    // adiciona o mapa do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    // função para buscar e exibir a localização do IP
    function fetchIPDetails(ip) {
      fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_HP6QxoCiuRFjRphA577OLfYJqGnYy&ipAddress=${ip}`)
        .then(res => res.json())
        .then(location => {
          if (!location || !location.location) {
            alert("IP inválido ou não encontrado!");
            return;
          }
    
          document.querySelector('.ip-address').textContent = location.ip;
          document.querySelector('.location').textContent = `${location.location.city}, ${location.location.country}, ${location.location.postalCode}`;
          document.querySelector('.timezone').textContent = location.location.timezone;
          document.querySelector('.isp').textContent = location.isp;
    
          let lat = location.location.lat, lng = location.location.lng;
          map.setView([lat, lng], 12);
          marker.setLatLng([lat, lng]).bindPopup(`<b>${location.location.city}, ${location.location.country}</b>`).openPopup();
        })
        .catch(() => alert("Erro ao buscar informações do IP!"));
    }
    
  
    // obtém automaticamente o IP do usuário
    fetch('https://api.ipify.org/?format=json')
      .then(location => location.json())
      .then(data => fetchIPDetails(data.ip)) // chama a função com o IP detectado
      .catch(() => alert("Erro ao obter seu IP!"));
  
    // captura envio do formulário para buscar outro IP
    document.querySelector('.ip-form').addEventListener('submit', function(event) {
      event.preventDefault();
      let ip = document.querySelector('#ip').value;
      fetchIPDetails(ip);
    });
  