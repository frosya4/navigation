document.addEventListener('DOMContentLoaded', () => {
    // Initialize map — center on the middle of the new route
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false  // скрываем атрибуцию
    }).setView([53.904, 27.564], 14);

    // Add zoom control to bottom right
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Add light theme map tiles (CartoDB Positron is perfect for this)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // DOM Elements for sidebar
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const placeTitle = document.getElementById('place-title');
    const placeStep = document.getElementById('place-step');
    const placeObjIcon = document.querySelector('#place-image-placeholder i');
    const placeDescription = document.getElementById('place-description');
    const progressFill = document.getElementById('progress-bar-fill');
    const progressLabel = document.getElementById('progress-label');

    // Transport section
    const transportSection = document.getElementById('transport-section');
    const transportIcon = document.querySelector('#transport-icon i');
    const transportText = document.getElementById('transport-text');

    // Navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Title card & hints
    const titleOverlay = document.getElementById('title-overlay');
    const startBtn = document.getElementById('start-btn');
    const reverseBtn = document.getElementById('reverse-btn');
    const mapHint = document.getElementById('map-hint');

    // Scientists Modal Elements
    const scientistsAction = document.getElementById('scientists-action');
    const scientistsBtn = document.getElementById('scientists-btn');
    const scientistsModal = document.getElementById('scientists-modal');
    const closeModal = document.getElementById('close-modal');
    const scientistsGrid = document.getElementById('scientists-grid');

    // Wire up start button → open first location
    startBtn.addEventListener('click', () => {
        selectLocation(minskLocations[0].id);
    });

    let currentActivePlaceId = null;
    let markers = [];
    let staticRouteLine = null;
    let arrowDecorator = null;
    let isReversed = false;

    // Initialize the router once
    const router = L.Routing.osrmv1({
        serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
        profile: 'driving'
    });

    // Function to draw or redraw the route
    function drawRoute() {
        // Clear existing markers
        markers.forEach(m => map.removeLayer(m.marker));
        markers = [];

        let locationsToDraw = [...minskLocations];
        if (isReversed) {
            locationsToDraw.reverse();
        }

        // Create waypoints for the routing line
        const waypoints = locationsToDraw
            .map(loc => ({ latLng: L.latLng(loc.coords[0], loc.coords[1]) }));

        // Use ONLY the router engine to get coordinates
        router.route(waypoints, (err, routes) => {
            if (err || !routes || routes.length === 0) return;

            const coordinates = routes[0].coordinates;
            const pathCoords = coordinates.map(c => [c.lat, c.lng]);

            // Create a static polyline that won't refresh on move
            if (staticRouteLine) map.removeLayer(staticRouteLine);
            staticRouteLine = L.polyline(pathCoords, {
                color: '#a36e1e',
                opacity: 0.65,
                weight: 5,
                dashArray: '12, 8',
                interactive: false
            }).addTo(map);

            if (arrowDecorator) map.removeLayer(arrowDecorator);

            if (L.polylineDecorator) {
                arrowDecorator = L.polylineDecorator(staticRouteLine, {
                    patterns: [
                        {
                            offset: 25,
                            repeat: 80,
                            symbol: L.Symbol.arrowHead({
                                pixelSize: 12,
                                polygon: false,
                                pathOptions: { stroke: true, weight: 3, color: '#a36e1e', opacity: 0.85 }
                            })
                        }
                    ]
                }).addTo(map);
            }
        });

        // Add custom markers
        locationsToDraw.forEach((loc, index) => {
            const stepNum = index + 1;
            const iconHtml = `
                <div id="marker-${loc.id}" class="custom-marker">
                    <div class="marker-pin"></div>
                    <span>${stepNum}</span>
                </div>
            `;

            const customIcon = L.divIcon({
                html: iconHtml,
                className: '',
                iconSize: [30, 42],
                iconAnchor: [15, 32]
            });

            const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
            marker.on('click', () => selectLocation(loc.id));
            markers.push({ id: loc.id, marker: marker });
        });
    }

    // Initial draw
    drawRoute();

    // Wire up reverse button
    reverseBtn.addEventListener('click', () => {
        isReversed = !isReversed;
        // Close sidebar if open to prevent state confusion
        if (!sidebar.classList.contains('hidden')) {
            closeSidebar();
        }
        drawRoute();
    });

    // Location selection logic
    function selectLocation(id) {
        if (currentActivePlaceId === id && !sidebar.classList.contains('hidden')) {
            // If clicking the same marker and sidebar is open, close it
            closeSidebar();
            return;
        }

        const location = minskLocations.find(loc => loc.id === id);
        if (!location) return;

        currentActivePlaceId = id;

        let locationsList = [...minskLocations];
        if (isReversed) {
            locationsList.reverse();
        }
        const index = locationsList.findIndex(loc => loc.id === id);

        // Update markers styling
        markers.forEach(m => {
            const el = document.getElementById(`marker-${m.id}`);
            if (el) {
                if (m.id === id) {
                    el.classList.add('active-marker');
                } else {
                    el.classList.remove('active-marker');
                }
            }
        });

        // Update sidebar content
        placeStep.textContent = `${index + 1} / ${locationsList.length}`;
        placeTitle.textContent = location.title;
        placeDescription.textContent = location.description;

        // Handle Image
        const imageElement = document.getElementById('place-image');
        const placeholder = document.getElementById('place-image-placeholder');

        if (location.image) {
            imageElement.src = location.image;
            imageElement.style.display = 'block';
            placeholder.style.display = 'none';
        } else {
            imageElement.style.display = 'none';
            placeholder.style.display = 'flex';
            placeObjIcon.className = `fas ${location.icon}`;
        }

        // Update transport info
        if (location.transport) {
            transportSection.style.display = 'block';
            transportIcon.className = `fas ${location.transport.icon}`;
            // If reversed and at the very last step (originally first step), show as end of route
            if (isReversed && index === locationsList.length - 1) {
                transportIcon.className = 'fas fa-flag-checkered';
                transportText.textContent = 'Конец маршрута (начало проспекта)';
            } else if (isReversed && index < locationsList.length - 1) {
                // When reversed, the transport info should technically point to the previous item.
                // We fetch the transport info from the 'current' location going backwards.
                // E.g., if we are going from 2 -> 1, the instructions are technically the reverse of going 1 -> 2.
                // To keep things simple, we'll just say 'Пешком к следующей точке' or show the info of the NEXT step in the reversed array.
                let nextLoc = locationsList[index + 1];
                if (nextLoc && nextLoc.transport) {
                    transportIcon.className = `fas ${nextLoc.transport.icon}`;
                    // Simplistic reverse logic for text
                    transportText.textContent = `К точке «${nextLoc.title}»`;
                } else {
                    transportText.textContent = `К следующей точке`;
                }
            } else {
                transportText.textContent = location.transport.details;
            }

        } else {
            transportSection.style.display = 'none';
        }

        // Show/Hide personalities/scientists/athletes button
        const peopleData = location.scientists || location.personalities || location.athletes;
        if (peopleData && peopleData.length > 0) {
            scientistsAction.style.display = 'block';

            if (location.id === 15) {
                scientistsBtn.innerHTML = '<i class="fas fa-microscope"></i> Учёные Академии';
            } else if (location.id === 4) {
                scientistsBtn.innerHTML = '<i class="fas fa-running"></i> Знаменитые спортсмены';
            } else if (location.id === 3) {
                scientistsBtn.innerHTML = '<i class="fas fa-user-graduate"></i> Личности и студенты';
            } else {
                scientistsBtn.innerHTML = '<i class="fas fa-users"></i> Знаменитые личности';
            }
        } else {
            scientistsAction.style.display = 'none';
        }

        // Update navigation buttons
        // For extra points, we might want to disable next/prev or skip them
        // Let's keep them in the list so users can navigate to them
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === locationsList.length - 1;

        // Update progress bar
        const pct = ((index + 1) / locationsList.length) * 100;
        progressFill.style.width = `${pct}%`;
        progressLabel.textContent = `Остановка ${index + 1} из ${locationsList.length}`;

        // Open sidebar
        openSidebar();

        // Pan map smoothly to the marker
        // We calculate an offset to make sure the marker is centered in the VISIBLE part of the map (not covered by sidebar)
        const isMobile = window.innerWidth <= 768;

        let targetLat = location.coords[0];
        let targetLng = location.coords[1];

        if (isMobile) {
            // Mobile: Sidebar is at the bottom, move point slightly up to clear it
            targetLat -= 0.003;
        } else {
            // Desktop: Sidebar is on the right, move point slightly right to center it in the left 60% of screen
            // Reduced to 0.004 to keep it closer to the visual center.
            targetLng += 0.004;
        }

        map.flyTo([targetLat, targetLng], 16, {
            duration: 1.2,
            easeLinearity: 0.25
        });
    }

    // Sidebar controls
    function openSidebar() {
        sidebar.classList.remove('hidden');
        mapHint.classList.add('hidden');
        titleOverlay.classList.add('sidebar-open');
    }

    function closeSidebar() {
        sidebar.classList.add('hidden');
        mapHint.classList.remove('hidden');
        titleOverlay.classList.remove('sidebar-open');
        // Remove active class from markers
        markers.forEach(m => {
            const el = document.getElementById(`marker-${m.id}`);
            if (el) el.classList.remove('active-marker');
        });
        currentActivePlaceId = null;

        // Recenter map on route
        if (staticRouteLine) {
            map.flyToBounds(staticRouteLine.getBounds(), { padding: [50, 50], duration: 1 });
        }
    }

    closeBtn.addEventListener('click', closeSidebar);

    // Navigation buttons logic
    prevBtn.addEventListener('click', () => {
        let locationsList = [...minskLocations];
        if (isReversed) locationsList.reverse();
        const index = locationsList.findIndex(loc => loc.id === currentActivePlaceId);
        if (index > 0) {
            selectLocation(locationsList[index - 1].id);
        }
    });

    nextBtn.addEventListener('click', () => {
        let locationsList = [...minskLocations];
        if (isReversed) locationsList.reverse();
        const index = locationsList.findIndex(loc => loc.id === currentActivePlaceId);
        if (index < locationsList.length - 1) {
            selectLocation(locationsList[index + 1].id);
        }
    });

    // Close sidebar when clicking map directly
    map.on('click', () => {
        if (!sidebar.classList.contains('hidden')) {
            closeSidebar();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // If modal is open, only allow Escape to close it
        if (!scientistsModal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeScientistsModal();
            return;
        }

        let locationsList = [...minskLocations];
        if (isReversed) locationsList.reverse();

        let index = -1;
        if (currentActivePlaceId) {
            index = locationsList.findIndex(loc => loc.id === currentActivePlaceId);
        }

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (index < locationsList.length - 1) {
                selectLocation(locationsList[index + 1].id);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (index > 0) {
                selectLocation(locationsList[index - 1].id);
            } else if (index === -1) {
                // If nothing selected, Left/Up can open the last point or just start from first
                selectLocation(locationsList[0].id);
            }
        } else if (e.key === 'Escape') {
            if (!sidebar.classList.contains('hidden')) {
                closeSidebar();
            }
        } else if (e.key === ' ') {
            // Spacebar: Open scientists modal if on the 15th point (Academy of Sciences)
            // Original ID for Academy of Sciences is 15
            if (currentActivePlaceId === 15) {
                e.preventDefault(); // Prevent page scroll
                openScientistsModal();
            }
        }
    });

    // Init: Show first location automatically but delayed for dramatic effect
    setTimeout(() => {
        // Maybe don't open automatically, just let the user explore
        // Or open the first one briefly:
        // selectLocation(minskLocations[0].id);
    }, 1000);

    // ── Scientists Modal Logic ──────────────────────────────
    function openScientistsModal() {
        const location = minskLocations.find(loc => loc.id === currentActivePlaceId);
        if (!location) return;

        const peopleData = location.scientists || location.personalities || location.athletes;
        if (!peopleData) return;

        // Dynamic Modal Header
        const modalHeaderH2 = scientistsModal.querySelector('.modal-header h2');
        const modalHeaderP = scientistsModal.querySelector('.modal-header p');

        if (location.id === 15) {
            modalHeaderH2.textContent = 'Выдающиеся учёные';
            modalHeaderP.textContent = 'Деятели Национальной академии наук Беларуси';
        } else if (location.id === 4) {
            modalHeaderH2.textContent = 'Легендарные спортсмены';
            modalHeaderP.textContent = 'Гордость белорусского спорта';
        } else if (location.id === 3) {
            modalHeaderH2.textContent = 'Личности и студенты';
            modalHeaderP.textContent = 'Связь поколений БГЭУ';
        } else {
            modalHeaderH2.textContent = 'Знаменитые личности';
            modalHeaderP.textContent = 'Известные деятели Беларуси';
        }

        // Populate grid
        scientistsGrid.innerHTML = '';
        peopleData.forEach(s => {
            const card = document.createElement('div');
            card.className = 'scientist-card';
            card.innerHTML = `
                <div class="scientist-image-wrapper">
                    <img src="${s.image}" alt="${s.name}" referrerpolicy="no-referrer">
                </div>
                <div class="scientist-info">
                    <h3>${s.name}</h3>
                    <p class="scientist-specialty">${s.specialty}</p>
                    <p class="scientist-bio">${s.description}</p>
                </div>
            `;
            scientistsGrid.appendChild(card);
        });

        scientistsModal.classList.remove('hidden');
    }

    function closeScientistsModal() {
        scientistsModal.classList.add('hidden');
    }

    scientistsBtn.addEventListener('click', openScientistsModal);
    closeModal.addEventListener('click', closeScientistsModal);

    // Close modal on overlay click
    scientistsModal.addEventListener('click', (e) => {
        if (e.target === scientistsModal) {
            closeScientistsModal();
        }
    });
});
