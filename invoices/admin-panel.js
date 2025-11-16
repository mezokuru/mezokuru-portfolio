// Mezokuru Business Management System
// localStorage-based data persistence

// Data storage keys
const STORAGE_KEYS = {
    clients: 'mezokuru_clients',
    projects: 'mezokuru_projects',
    invoices: 'mezokuru_invoices',
    settings: 'mezokuru_settings'
};

// Initialize data
let clients = [];
let projects = [];
let invoices = [];
let settings = {};

// Load data from localStorage
function loadData() {
    try {
        clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.clients)) || [];
        projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects)) || [];
        invoices = JSON.parse(localStorage.getItem(STORAGE_KEYS.invoices)) || [];
        settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings)) || getDefaultSettings();
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error loading data. Starting fresh.', 'error');
    }
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(clients));
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
        localStorage.setItem(STORAGE_KEYS.invoices, JSON.stringify(invoices));
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving data:', error);
        if (error.name === 'QuotaExceededError') {
            showNotification('Storage quota exceeded! Please export and clear old data.', 'error');
        }
    }
}

// Default settings
function getDefaultSettings() {
    return {
        businessName: 'Mezokuru',
        email: 'mezokuru@gmail.com',
        phone: '+27 65 666 7826',
        invoicePrefix: 'MZK',
        defaultSupportMonths: 6,
        defaultPaymentTerms: 14
    };
}

// Generate UUID
function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Generate next invoice number
function generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const prefix = `${settings.invoicePrefix || 'MZK'}-${year}-`;
    
    const existingNumbers = invoices
        .filter(inv => inv.invoiceNumber.startsWith(prefix))
        .map(inv => parseInt(inv.invoiceNumber.split('-').pop()))
        .filter(num => !isNaN(num));
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    return `${prefix}${String(nextNumber).padStart(3, '0')}`;
}

// Navigation
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(sectionName).classList.add('active');
    event.target.closest('.nav-item').classList.add('active');
    
    // Render appropriate section
    if (sectionName === 'dashboard') {
        renderDashboard();
    } else if (sectionName === 'clients') {
        renderClients();
    } else if (sectionName === 'projects') {
        renderProjects();
    } else if (sectionName === 'invoices') {
        renderInvoices();
    }
}

// Modal functions
function openModal(modalName) {
    const modal = document.getElementById(modalName + 'Modal');
    modal.classList.add('active');
    
    // Populate client dropdowns
    if (modalName === 'newProject' || modalName === 'newInvoice') {
        populateClientDropdown(modalName === 'newProject' ? 'projectClient' : 'invoiceClient');
    }
    
    // Set default values
    if (modalName === 'newInvoice') {
        document.getElementById('invoiceNumber').value = generateInvoiceNumber();
        document.getElementById('invoiceDate').valueAsDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (settings.defaultPaymentTerms || 14));
        document.getElementById('invoiceDueDate').valueAsDate = dueDate;
    }
    
    if (modalName === 'newProject') {
        document.getElementById('projectStart').valueAsDate = new Date();
        document.getElementById('projectSupport').value = settings.defaultSupportMonths || 6;
    }
}

function closeModal(modalName) {
    const modal = document.getElementById(modalName + 'Modal');
    modal.classList.remove('active');
    
    // Reset form
    const form = modal.querySelector('form');
    if (form) form.reset();
    
    // Clear hidden ID fields
    const idField = modal.querySelector('input[type="hidden"]');
    if (idField) idField.value = '';
}

// Populate client dropdown
function populateClientDropdown(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select Client</option>';
    
    clients
        .filter(c => c.active !== false)
        .sort((a, b) => a.business.localeCompare(b.business))
        .forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.business;
            select.appendChild(option);
        });
}

// Client CRUD
function saveClient(event) {
    event.preventDefault();
    
    const id = document.getElementById('clientId').value;
    const clientData = {
        id: id || generateId(),
        business: document.getElementById('clientBusiness').value,
        contact: document.getElementById('clientContact').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        address: document.getElementById('clientAddress').value,
        notes: document.getElementById('clientNotes').value,
        active: true,
        created: id ? clients.find(c => c.id === id).created : new Date().toISOString(),
        updated: new Date().toISOString()
    };
    
    if (id) {
        // Update existing
        const index = clients.findIndex(c => c.id === id);
        clients[index] = clientData;
        showNotification('Client updated successfully');
    } else {
        // Add new
        clients.push(clientData);
        showNotification('Client added successfully');
    }
    
    saveData();
    closeModal('newClient');
    renderClients();
}

function editClient(id) {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    
    document.getElementById('clientModalTitle').textContent = 'Edit Client';
    document.getElementById('clientId').value = client.id;
    document.getElementById('clientBusiness').value = client.business;
    document.getElementById('clientContact').value = client.contact;
    document.getElementById('clientEmail').value = client.email;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientAddress').value = client.address || '';
    document.getElementById('clientNotes').value = client.notes || '';
    
    openModal('newClient');
}

function deleteClient(id) {
    if (!confirm('Delete this client? This cannot be undone.')) return;
    
    // Check for dependencies
    const hasProjects = projects.some(p => p.clientId === id);
    const hasInvoices = invoices.some(i => i.clientId === id);
    
    if (hasProjects || hasInvoices) {
        if (!confirm('This client has projects or invoices. Delete anyway?')) return;
    }
    
    clients = clients.filter(c => c.id !== id);
    saveData();
    renderClients();
    showNotification('Client deleted');
}

// Project CRUD
function saveProject(event) {
    event.preventDefault();
    
    const id = document.getElementById('projectId').value;
    const startDate = new Date(document.getElementById('projectStart').value);
    const supportMonths = parseInt(document.getElementById('projectSupport').value);
    const supportEndDate = new Date(startDate);
    supportEndDate.setMonth(supportEndDate.getMonth() + supportMonths);
    
    const projectData = {
        id: id || generateId(),
        name: document.getElementById('projectName').value,
        clientId: document.getElementById('projectClient').value,
        status: document.getElementById('projectStatus').value,
        startDate: startDate.toISOString(),
        supportMonths: supportMonths,
        supportEndDate: supportEndDate.toISOString(),
        description: document.getElementById('projectDescription').value,
        created: id ? projects.find(p => p.id === id).created : new Date().toISOString(),
        updated: new Date().toISOString()
    };
    
    if (id) {
        const index = projects.findIndex(p => p.id === id);
        projects[index] = projectData;
        showNotification('Project updated successfully');
    } else {
        projects.push(projectData);
        showNotification('Project added successfully');
    }
    
    saveData();
    closeModal('newProject');
    renderProjects();
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectId').value = project.id;
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectClient').value = project.clientId;
    document.getElementById('projectStatus').value = project.status;
    document.getElementById('projectStart').value = project.startDate.split('T')[0];
    document.getElementById('projectSupport').value = project.supportMonths;
    document.getElementById('projectDescription').value = project.description || '';
    
    populateClientDropdown('projectClient');
    openModal('newProject');
}

function deleteProject(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    
    projects = projects.filter(p => p.id !== id);
    saveData();
    renderProjects();
    showNotification('Project deleted');
}

// Invoice CRUD
function saveInvoice(event) {
    event.preventDefault();
    
    const id = document.getElementById('invoiceId').value;
    const invoiceData = {
        id: id || generateId(),
        invoiceNumber: document.getElementById('invoiceNumber').value,
        clientId: document.getElementById('invoiceClient').value,
        amount: parseFloat(document.getElementById('invoiceAmount').value),
        date: document.getElementById('invoiceDate').value,
        dueDate: document.getElementById('invoiceDueDate').value,
        status: document.getElementById('invoiceStatus').value,
        description: document.getElementById('invoiceDescription').value,
        notes: document.getElementById('invoiceNotes').value,
        created: id ? invoices.find(i => i.id === id).created : new Date().toISOString(),
        updated: new Date().toISOString()
    };
    
    if (id) {
        const index = invoices.findIndex(i => i.id === id);
        invoices[index] = invoiceData;
        showNotification('Invoice updated successfully');
    } else {
        invoices.push(invoiceData);
        showNotification('Invoice created successfully');
    }
    
    saveData();
    closeModal('newInvoice');
    renderInvoices();
    renderDashboard();
}

function editInvoice(id) {
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) return;
    
    document.getElementById('invoiceModalTitle').textContent = 'Edit Invoice';
    document.getElementById('invoiceId').value = invoice.id;
    document.getElementById('invoiceNumber').value = invoice.invoiceNumber;
    document.getElementById('invoiceClient').value = invoice.clientId;
    document.getElementById('invoiceAmount').value = invoice.amount;
    document.getElementById('invoiceDate').value = invoice.date;
    document.getElementById('invoiceDueDate').value = invoice.dueDate;
    document.getElementById('invoiceStatus').value = invoice.status;
    document.getElementById('invoiceDescription').value = invoice.description;
    document.getElementById('invoiceNotes').value = invoice.notes || '';
    
    populateClientDropdown('invoiceClient');
    openModal('newInvoice');
}

function deleteInvoice(id) {
    if (!confirm('Delete this invoice? This cannot be undone.')) return;
    
    invoices = invoices.filter(i => i.id !== id);
    saveData();
    renderInvoices();
    renderDashboard();
    showNotification('Invoice deleted');
}

function markInvoiceAs(id, status) {
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) return;
    
    invoice.status = status;
    if (status === 'paid') {
        invoice.paidDate = new Date().toISOString();
    }
    invoice.updated = new Date().toISOString();
    
    saveData();
    renderInvoices();
    renderDashboard();
    showNotification(`Invoice marked as ${status}`);
}

// Render functions
function renderDashboard() {
    // Calculate stats
    const currentYear = new Date().getFullYear();
    const yearInvoices = invoices.filter(inv => new Date(inv.date).getFullYear() === currentYear);
    
    const totalRevenue = yearInvoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0);
    
    const paidCount = yearInvoices.filter(inv => inv.status === 'paid').length;
    const pendingCount = yearInvoices.filter(inv => inv.status === 'sent').length;
    
    const overdueCount = yearInvoices.filter(inv => {
        if (inv.status === 'paid') return false;
        return new Date(inv.dueDate) < new Date();
    }).length;
    
    // Update stats
    document.getElementById('totalRevenue').textContent = `R ${totalRevenue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    document.getElementById('paidCount').textContent = paidCount;
    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('overdueCount').textContent = overdueCount;
    
    // Render recent invoices
    const recentInvoices = [...invoices]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    renderInvoiceTable('recentInvoicesTable', recentInvoices);
}

function renderClients(searchTerm = '') {
    const filtered = clients.filter(client => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return client.business.toLowerCase().includes(search) ||
               client.contact.toLowerCase().includes(search) ||
               client.email.toLowerCase().includes(search);
    });
    
    const container = document.getElementById('clientsTable');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No clients found</h3>
                <p>${searchTerm ? 'Try a different search term' : 'Add your first client to get started'}</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Projects</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(client => {
                    const clientProjects = projects.filter(p => p.clientId === client.id).length;
                    return `
                        <tr>
                            <td><strong>${client.business}</strong></td>
                            <td>${client.contact}</td>
                            <td>${client.email}</td>
                            <td>${client.phone}</td>
                            <td>${clientProjects}</td>
                            <td class="action-buttons">
                                <button class="btn btn-secondary btn-small" onclick="editClient('${client.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-small" onclick="deleteClient('${client.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

function renderProjects(searchTerm = '') {
    const filtered = projects.filter(project => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        const client = clients.find(c => c.id === project.clientId);
        return project.name.toLowerCase().includes(search) ||
               (client && client.business.toLowerCase().includes(search));
    });
    
    const container = document.getElementById('projectsTable');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-project-diagram"></i>
                <h3>No projects found</h3>
                <p>${searchTerm ? 'Try a different search term' : 'Add your first project to get started'}</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>Support Until</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(project => {
                    const client = clients.find(c => c.id === project.clientId);
                    const supportEnd = new Date(project.supportEndDate);
                    const daysRemaining = Math.ceil((supportEnd - new Date()) / (1000 * 60 * 60 * 24));
                    
                    return `
                        <tr>
                            <td><strong>${project.name}</strong></td>
                            <td>${client ? client.business : 'Unknown'}</td>
                            <td><span class="status-badge status-${project.status}">${project.status.toUpperCase()}</span></td>
                            <td>${new Date(project.startDate).toLocaleDateString()}</td>
                            <td>
                                ${new Date(project.supportEndDate).toLocaleDateString()}
                                ${daysRemaining > 0 && daysRemaining < 30 ? `<br><small style="color:#e74c3c">${daysRemaining} days left</small>` : ''}
                            </td>
                            <td class="action-buttons">
                                <button class="btn btn-secondary btn-small" onclick="editProject('${project.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-small" onclick="deleteProject('${project.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

function renderInvoices(searchTerm = '') {
    const filtered = invoices.filter(invoice => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        const client = clients.find(c => c.id === invoice.clientId);
        return invoice.invoiceNumber.toLowerCase().includes(search) ||
               (client && client.business.toLowerCase().includes(search));
    });
    
    renderInvoiceTable('invoicesTable', filtered);
}

function renderInvoiceTable(containerId, invoiceList) {
    const container = document.getElementById(containerId);
    
    if (invoiceList.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice"></i>
                <h3>No invoices found</h3>
                <p>Create your first invoice to get started</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th>Invoice #</th>
                    <th>Client</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceList.map(invoice => {
                    const client = clients.find(c => c.id === invoice.clientId);
                    const isOverdue = invoice.status !== 'paid' && new Date(invoice.dueDate) < new Date();
                    const actualStatus = isOverdue ? 'overdue' : invoice.status;
                    
                    return `
                        <tr ${isOverdue ? 'style="background:#ffe6e6"' : ''}>
                            <td><strong>${invoice.invoiceNumber}</strong></td>
                            <td>${client ? client.business : 'Unknown'}</td>
                            <td>R ${invoice.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td>
                            <td>${new Date(invoice.date).toLocaleDateString()}</td>
                            <td>${new Date(invoice.dueDate).toLocaleDateString()}</td>
                            <td><span class="status-badge status-${actualStatus}">${actualStatus.toUpperCase()}</span></td>
                            <td class="action-buttons">
                                ${invoice.status !== 'paid' ? `
                                    <button class="btn btn-success btn-small" onclick="markInvoiceAs('${invoice.id}', 'paid')" title="Mark as Paid">
                                        <i class="fas fa-check"></i>
                                    </button>
                                ` : ''}
                                <button class="btn btn-secondary btn-small" onclick="editInvoice('${invoice.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-small" onclick="deleteInvoice('${invoice.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// Search functions
function searchClients() {
    const searchTerm = document.getElementById('clientSearch').value;
    renderClients(searchTerm);
}

function searchProjects() {
    const searchTerm = document.getElementById('projectSearch').value;
    renderProjects(searchTerm);
}

function searchInvoices() {
    const searchTerm = document.getElementById('invoiceSearch').value;
    renderInvoices(searchTerm);
}

// Export/Import
function exportData() {
    const data = {
        clients,
        projects,
        invoices,
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mezokuru-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!confirm('Import data? This will merge with existing data.')) return;
            
            // Merge data
            if (data.clients) clients = [...clients, ...data.clients];
            if (data.projects) projects = [...projects, ...data.projects];
            if (data.invoices) invoices = [...invoices, ...data.invoices];
            if (data.settings) settings = { ...settings, ...data.settings };
            
            // Remove duplicates by ID
            clients = Array.from(new Map(clients.map(c => [c.id, c])).values());
            projects = Array.from(new Map(projects.map(p => [p.id, p])).values());
            invoices = Array.from(new Map(invoices.map(i => [i.id, i])).values());
            
            saveData();
            renderDashboard();
            showNotification('Data imported successfully');
        } catch (error) {
            console.error('Import error:', error);
            showNotification('Error importing data. Check file format.', 'error');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

function clearAllData() {
    if (!confirm('Clear ALL data? This cannot be undone!')) return;
    if (!confirm('Are you absolutely sure? All clients, projects, and invoices will be deleted.')) return;
    
    clients = [];
    projects = [];
    invoices = [];
    
    saveData();
    renderDashboard();
    renderClients();
    renderProjects();
    renderInvoices();
    
    showNotification('All data cleared');
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderDashboard();
    
    // Set default date for today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    document.getElementById('projectStart').value = today;
});
