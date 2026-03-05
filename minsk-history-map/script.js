document.addEventListener('DOMContentLoaded', () => {
    // Initialize map
    // We set the center roughly in the middle of our route
    const map = L.map('map', {
        zoomControl: false // Move zoom control
    }).setView([53.902, 27.559], 14);

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

    // Transport section
    const transportSection = document.getElementById('transport-section');
    const transportIcon = document.querySelector('#transport-icon i');
    const transportText = document.getElementById('transport-text');

    // Navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentActivePlaceId = null;
    let markers = [];

    // Draw route line
    const routeCoords = minskLocations.map(loc => loc.coords);
    const routeLine = L.polyline(routeCoords, {
        color: '#d4af37', // Gold accent color
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10', // Dashed line for walking/transit feel
        lineJoin: 'round'
    }).addTo(map);

    // Add markers
    minskLocations.forEach((loc, index) => {
        // Create custom HTML icon
        const stepNum = index + 1;
        const iconHtml = `
            <div id="marker-${loc.id}" class="custom-marker">
                <div class="marker-pin"></div>
                <span>${stepNum}</span>
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: '', // Removes default leaflet icon class
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);

        // Add click event
        marker.on('click', () => {
            selectLocation(loc.id);
        });

        markers.push({ id: loc.id, marker: marker });
    });

    // Fit map bounds to show the whole route initially
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

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
        const index = minskLocations.findIndex(loc => loc.id === id);

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
        placeStep.textContent = `${index + 1} / ${minskLocations.length}`;
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
            transportText.textContent = location.transport.details;
        } else {
            transportSection.style.display = 'none';
        }

        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === minskLocations.length - 1;

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
            // 380px sidebar on ~1200px screen is ~30%. We want point at ~35% from left.
            targetLng += 0.006;
        }

        map.flyTo([targetLat, targetLng], 16, {
            duration: 1.2,
            easeLinearity: 0.25
        });
    }

    // Sidebar controls
    function openSidebar() {
        sidebar.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('hidden');
        // Remove active class from markers
        markers.forEach(m => {
            const el = document.getElementById(`marker-${m.id}`);
            if (el) el.classList.remove('active-marker');
        });
        currentActivePlaceId = null;

        // Recenter map on route
        map.flyToBounds(routeLine.getBounds(), { padding: [50, 50], duration: 1 });
    }

    closeBtn.addEventListener('click', closeSidebar);

    // Navigation buttons logic
    prevBtn.addEventListener('click', () => {
        const index = minskLocations.findIndex(loc => loc.id === currentActivePlaceId);
        if (index > 0) {
            selectLocation(minskLocations[index - 1].id);
        }
    });

    nextBtn.addEventListener('click', () => {
        const index = minskLocations.findIndex(loc => loc.id === currentActivePlaceId);
        if (index < minskLocations.length - 1) {
            selectLocation(minskLocations[index + 1].id);
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
        if (sidebar.classList.contains('hidden') || !currentActivePlaceId) return;

        const index = minskLocations.findIndex(loc => loc.id === currentActivePlaceId);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (index < minskLocations.length - 1) {
                selectLocation(minskLocations[index + 1].id);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (index > 0) {
                selectLocation(minskLocations[index - 1].id);
            }
        } else if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    // Init: Show first location automatically but delayed for dramatic effect
    setTimeout(() => {
        // Maybe don't open automatically, just let the user explore
        // Or open the first one briefly:
        // selectLocation(minskLocations[0].id);
    }, 1000);
});
