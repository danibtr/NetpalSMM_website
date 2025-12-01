// ====== ADMIN CONFIG ======
const ADMIN_EMAIL = 'netpalsuper7@gmail.com';
// غير الباسورد كما تحب:
const ADMIN_PASSWORD = 'NetPal2025!';

let githubToken = '';
const REPO_OWNER = 'danibtr';
const REPO_NAME = 'NetpalSMM_website';
const FILE_PATH = 'services.json';
const BRANCH = 'main'; // إذا عندك branch اسمه master غيرها لـ "master"

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginCard = document.getElementById('loginCard');
const adminPanel = document.getElementById('adminPanel');

const servicesTableBody = document.querySelector('#servicesTable tbody');
const serviceForm = document.getElementById('serviceForm');
const serviceIdInput = document.getElementById('serviceId');
const serviceNameInput = document.getElementById('serviceName');
const serviceCategoryInput = document.getElementById('serviceCategory');
const servicePriceInput = document.getElementById('servicePrice');
const serviceDescriptionInput = document.getElementById('serviceDescription');
const serviceActiveInput = document.getElementById('serviceActive');
const resetFormBtn = document.getElementById('resetFormBtn');
const saveStatus = document.getElementById('saveStatus');

let services = [];
let fileSha = null;

// ====== LOGIN HANDLER ======
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    saveStatus.textContent = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const tokenInput = document.getElementById('token').value.trim();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      loginError.textContent = 'Invalid email or password.';
      return;
    }

    if (!tokenInput) {
      loginError.textContent = 'GitHub token is required to save changes.';
      return;
    }

    githubToken = tokenInput;

    try {
      await loadServicesFromGitHub();
      loginCard.style.display = 'none';
      adminPanel.style.display = 'block';
    } catch (err) {
      console.error(err);
      loginError.textContent =
        'Failed to load services.json. Check repo name, branch, or token permissions.';
    }
  });
}

// ====== LOAD services.json FROM GITHUB ======
async function loadServicesFromGitHub() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub fetch error: ${res.status}`);
  }

  const data = await res.json();
  fileSha = data.sha;

  const content = atob(data.content.replace(/\n/g, ''));
  try {
    services = JSON.parse(content);
  } catch (err) {
    services = [];
  }

  renderServicesTable();
}

// ====== RENDER TABLE ======
function renderServicesTable() {
  servicesTableBody.innerHTML = '';

  if (!Array.isArray(services)) services = [];

  services.forEach((srv) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${srv.id || ''}</td>
      <td>${srv.name || ''}</td>
      <td>${srv.category || ''}</td>
      <td>${srv.price || ''}</td>
      <td>${srv.active ? '<span class="badge-status">Active</span>' : 'Inactive'}</td>
      <td>
        <button type="button" data-action="edit" data-id="${srv.id}">Edit</button>
        <button type="button" data-action="delete" data-id="${srv.id}">Delete</button>
      </td>
    `;

    servicesTableBody.appendChild(tr);
  });
}

// ====== TABLE ACTIONS ======
servicesTableBody.addEventListener('click', (e) => {
  const btn = e.target;
  const action = btn.getAttribute('data-action');
  const id = Number(btn.getAttribute('data-id'));

  if (!action || !id) return;

  if (action === 'edit') {
    const srv = services.find((s) => s.id === id);
    if (!srv) return;

    serviceIdInput.value = srv.id;
    serviceNameInput.value = srv.name || '';
    serviceCategoryInput.value = srv.category || '';
    servicePriceInput.value = srv.price || '';
    serviceDescriptionInput.value = srv.description || '';
    serviceActiveInput.checked = !!srv.active;
  }

  if (action === 'delete') {
    if (!confirm('Delete this service?')) return;
    services = services.filter((s) => s.id !== id);
    saveServicesToGitHub();
  }
});

// ====== SERVICE FORM ======
if (serviceForm) {
  serviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveStatus.textContent = '';

    const id = Number(serviceIdInput.value) || generateNextId();
    const name = serviceNameInput.value.trim();
    const category = serviceCategoryInput.value.trim();
    const price = servicePriceInput.value.trim();
    const description = serviceDescriptionInput.value.trim();
    const active = serviceActiveInput.checked;

    if (!name || !category || !price || !description) {
      saveStatus.style.color = '#ef4444';
      saveStatus.textContent = 'Please fill all fields.';
      return;
    }

    const existingIndex = services.findIndex((s) => s.id === id);
    const newObj = { id, name, category, price, description, active };

    if (existingIndex >= 0) {
      services[existingIndex] = newObj;
    } else {
      services.push(newObj);
    }

    saveServicesToGitHub();
  });

  resetFormBtn.addEventListener('click', () => {
    serviceForm.reset();
    serviceIdInput.value = '';
    saveStatus.textContent = '';
  });
}

function generateNextId() {
  if (!Array.isArray(services) || services.length === 0) return 1;
  const maxId = Math.max(...services.map((s) => s.id || 0));
  return maxId + 1;
}

// ====== SAVE TO GITHUB ======
async function saveServicesToGitHub() {
  if (!githubToken) {
    saveStatus.style.color = '#ef4444';
    saveStatus.textContent = 'No GitHub token set in this session.';
    return;
  }

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  const newContent = btoa(JSON.stringify(services, null, 2));

  const body = {
    message: 'Update services.json via NetPal SMM admin',
    content: newContent,
    sha: fileSha,
    branch: BRANCH,
  };

  saveStatus.style.color = 'var(--text-muted)';
  saveStatus.textContent = 'Saving...';

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${githubToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    saveStatus.style.color = '#ef4444';
    saveStatus.textContent = `Save failed: ${res.status}`;
    return;
  }

  const data = await res.json();
  fileSha = data.content.sha;
  renderServicesTable();

  saveStatus.style.color = '#16a34a';
  saveStatus.textContent = 'Services saved successfully ✅';
}
