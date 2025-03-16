document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");
    const closeSidebar = document.getElementById("closeSidebar");

    // Toggle sidebar
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    // Close sidebar
    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

    // Load applications on page load
    loadApplications();
    filterApplications(); // Ensure that filter is applied on page load
});

// Load applications from JSON (or backend)
function loadApplications() {
    fetch('applications.json')
        .then(response => response.json())
        .then(data => {
            displayApplications(data); // Display applications after data is fetched
        })
        .catch(error => {
            console.error('Error loading applications:', error);
        });
}

function displayApplications(applications) {
    const applicationsList = document.getElementById('applicationsList');
    applicationsList.innerHTML = ''; // Clear any previous applications

    applications.forEach(app => {
        const appCard = document.createElement('div');
        appCard.classList.add('application-card');

        let progress = 0;
        let progressStages = [];
        
        switch (app.status.toLowerCase()) {
            case 'selected':
                progress = 100;
                progressStages = [
                    { label: 'Applied', icon: 'fa-file-alt' },
                    { label: 'CV/Resume Submitted', icon: 'fa-file-upload' },
                    { label: 'In Process', icon: 'fa-spinner' },
                    { label: 'Interview Call', icon: 'fa-phone-alt' },
                    { label: 'Selected', icon: 'fa-check-circle' }
                ];
                break;
            case 'interview-call':
                progress = 80;
                progressStages = [
                    { label: 'Applied', icon: 'fa-file-alt' },
                    { label: 'CV/Resume Submitted', icon: 'fa-file-upload' },
                    { label: 'In Process', icon: 'fa-spinner' },
                    { label: 'Interview Call', icon: 'fa-phone-alt' },
                    { label: 'Selected', icon: 'fa-check-circle' }
                ];
                break;
            case 'in-process':
                progress = 50;
                progressStages = [
                    { label: 'Applied', icon: 'fa-file-alt' },
                    { label: 'CV/Resume Submitted', icon: 'fa-file-upload' },
                    { label: 'In Process', icon: 'fa-spinner' },
                    { label: 'Interview Call', icon: 'fa-phone-alt' },
                    { label: 'Selected', icon: 'fa-check-circle' }
                ];
                break;
            case 'rejected':
                progress = 80;
                progressStages = [
                    { label: 'Applied', icon: 'fa-file-alt' },
                    { label: 'CV/Resume Submitted', icon: 'fa-file-upload' },
                    { label: 'In Process', icon: 'fa-spinner' },
                    { label: 'Interview Call', icon: 'fa-phone-alt' },
                    { label: 'Rejected', icon: 'fa-times-circle' }
                ];
                break;
            case 'cv_submitted':
                progress = 30;
                progressStages = [
                    { label: 'Applied', icon: 'fa-file-alt' },
                    { label: 'CV/Resume Submitted', icon: 'fa-file-upload' },
                    { label: 'In Process', icon: 'fa-spinner' },
                    { label: 'Interview Call', icon: 'fa-phone-alt' },
                    { label: 'Selected', icon: 'fa-check-circle' }
                ];
                break;
            default:
                progress = 25;
                progressStages = [
                    { label: 'Applied', icon: 'fa-file-alt' }
                ];
        }

        appCard.innerHTML = `
            <h3>${app.company}</h3>
            <p>Position: ${app.position}</p>
            <p>Status: <span class="status ${app.status.toLowerCase()}">${app.status}</span></p>
            <p>Applied on: ${new Date(app.dateApplied).toLocaleDateString()}</p>
            <p><strong>Stipend:</strong> ${app.stipend}</p>

            <!-- Progress Bar -->
            <div class="progress-container">
                <div class="progress-bar" style="width: ${progress}%; background-color: ${app.status.toLowerCase() === 'rejected' ? 'red' : 'green'};"></div>
            </div>
            <p class="progress-label">${progress}% Completed</p>

            <!-- Progress Stages -->
            <div class="progress-stages">
                ${progressStages.map(stage => `
                    <div class="progress-stage">
                        <i class="fas ${stage.icon}"></i>
                        <p>${stage.label}</p>
                    </div>
                `).join('')}
            </div>
        `;

        applicationsList.appendChild(appCard);
    });
}

// Filter applications based on status
function filterApplications() {
    const statusFilter = document.getElementById('statusFilter').value;

    // Fetch applications data
    fetch('applications.json')
        .then(response => response.json())
        .then(data => {
            let filteredApplications = data;

            // Filter based on selected status
            if (statusFilter !== 'all') {
                filteredApplications = data.filter(app => app.status.toLowerCase() === statusFilter);
            }

            displayApplications(filteredApplications); // Update the display
        })
        .catch(error => {
            console.error('Error filtering applications:', error);
        });
}

// Sidebar toggle function (if needed)
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}
