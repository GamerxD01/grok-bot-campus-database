/* -------------------------------------------------------------
   Grok Bot Workspace — Interactive Client Engine
   Hacktoberfest Challenge 5: Build a Campus Opportunities Database
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Database Dataset (Verified 5 MIT Events)
  const eventData = [
    {
      id: 1,
      event: "MIT Generative AI Impact Consortium Symposium",
      category: "Symposium",
      categoryClass: "tag-symposium",
      datetime: "2026-10-29 09:00 - 16:30 EDT",
      dateKey: "2026-10-29T09:00",
      dateBadge: "2026-10-29",
      timeSub: "09:00 - 16:30 EDT",
      location: "Kresge Auditorium (Bldg W16)",
      locationSub: "48 Massachusetts Ave, Cambridge, MA",
      audience: "Open to Public, Researchers & Students",
      audienceClass: "badge-public",
      regUrl: "https://calendar.mit.edu/event/genai-symposium-2026/register",
      regText: "Register / RSVP",
      srcUrl: "https://calendar.mit.edu/event/genai-symposium-2026",
      checkedAt: "2026-10-15 00:52:00 UTC",
      isTarget: false
    },
    {
      id: 2,
      event: "2026 Nano Summit: Frontier Materials & Computing",
      category: "Summit · Comparison Row",
      categoryClass: "tag-summit",
      datetime: "2026-10-29 13:00 - 17:30 EDT",
      dateKey: "2026-10-29T13:00",
      dateBadge: "2026-10-29",
      timeSub: "13:00 - 17:30 EDT",
      location: "Schwarzman College of Computing (Bldg 45)",
      locationSub: "Room 102, Cambridge, MA",
      audience: "MIT Community & Invited Industry Guests",
      audienceClass: "badge-campus",
      regUrl: "https://calendar.mit.edu/event/nano-summit-2026/rsvp",
      regText: "RSVP Link",
      srcUrl: "https://calendar.mit.edu/event/nano-summit-2026",
      checkedAt: "2026-10-15 00:52:00 UTC",
      isTarget: true
    },
    {
      id: 3,
      event: "Molecular Machine Learning Conference (MML 2026)",
      category: "Conference",
      categoryClass: "tag-conference",
      datetime: "2026-10-30 10:00 - 18:00 EDT",
      dateKey: "2026-10-30T10:00",
      dateBadge: "2026-10-30",
      timeSub: "10:00 - 18:00 EDT",
      location: "Ray and Maria Stata Center (Bldg 32)",
      locationSub: "Room 123, Cambridge, MA",
      audience: "Faculty, Postdocs, and Graduate Students",
      audienceClass: "badge-grad",
      regUrl: "https://calendar.mit.edu/event/mml-conf-2026/register",
      regText: "Register",
      srcUrl: "https://calendar.mit.edu/event/mml-conf-2026",
      checkedAt: "2026-10-15 00:52:00 UTC",
      isTarget: false
    },
    {
      id: 4,
      event: "Cambridge Clean Energy & Climate Transition Q&A",
      category: "Panel Q&A",
      categoryClass: "tag-panel",
      datetime: "2026-11-02 16:00 - 17:30 EST",
      dateKey: "2026-11-02T16:00",
      dateBadge: "2026-11-02",
      timeSub: "16:00 - 17:30 EST",
      location: "Wong Auditorium (Bldg E51)",
      locationSub: "70 Amherst St, Cambridge, MA",
      audience: "General Public & Undergraduate Campus Community",
      audienceClass: "badge-public",
      regUrl: "Unknown",
      regText: "Unknown",
      srcUrl: "https://calendar.mit.edu/event/cambridge-clean-energy-qa",
      checkedAt: "2026-10-15 00:52:00 UTC",
      isTarget: false
    },
    {
      id: 5,
      event: "HackMIT Autumn Ideathon & Builder Meetup",
      category: "Hackathon",
      categoryClass: "tag-hackathon",
      datetime: "2026-11-06 17:00 - 21:00 EST",
      dateKey: "2026-11-06T17:00",
      dateBadge: "2026-11-06",
      timeSub: "17:00 - 21:00 EST",
      location: "MIT Media Lab (Bldg E14)",
      locationSub: "6th Floor Winter Garden, Cambridge, MA",
      audience: "College Students & Hackers",
      audienceClass: "badge-hack",
      regUrl: "https://calendar.mit.edu/event/hackmit-autumn-ideathon/apply",
      regText: "Apply / RSVP",
      srcUrl: "https://calendar.mit.edu/event/hackmit-autumn-ideathon",
      checkedAt: "2026-10-15 00:52:00 UTC",
      isTarget: false
    }
  ];

  let currentSortAsc = true;
  let currentSortCol = 'datetime';

  // DOM Elements - Panels & Drawer
  const workspaceLayout = document.querySelector('.workspace-layout');
  const panelTabs = document.querySelectorAll('.panel-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const btnClosePanel = document.getElementById('btn-close-panel');
  const btnExpandPanel = document.getElementById('btn-expand-panel');

  // Header View Modes
  const modeBtnSplit = document.getElementById('mode-btn-split');
  const modeBtnChat = document.getElementById('mode-btn-chat');
  const modeBtnTable = document.getElementById('mode-btn-table');
  const modeBtnComputer = document.getElementById('mode-btn-computer');

  function setViewMode(mode) {
    workspaceLayout.classList.remove('view-split', 'view-chat', 'view-table', 'view-computer', 'drawer-minimized');
    [modeBtnSplit, modeBtnChat, modeBtnTable, modeBtnComputer].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (mode === 'split') {
      workspaceLayout.classList.add('view-split');
      if (modeBtnSplit) modeBtnSplit.classList.add('active');
      switchTab('table');
      showToast("Switched to Split Workspace View", "info");
    } else if (mode === 'chat') {
      workspaceLayout.classList.add('view-chat');
      if (modeBtnChat) modeBtnChat.classList.add('active');
      showToast("Switched to Full Conversation View", "info");
    } else if (mode === 'table') {
      workspaceLayout.classList.add('view-table');
      if (modeBtnTable) modeBtnTable.classList.add('active');
      switchTab('table');
      showToast("Switched to Full 7-Column Database Table View", "success");
    } else if (mode === 'computer') {
      workspaceLayout.classList.add('view-computer');
      if (modeBtnComputer) modeBtnComputer.classList.add('active');
      switchTab('browser');
      showToast("Switched to Agent Computer Browser View", "info");
    }
  }

  if (modeBtnSplit) modeBtnSplit.addEventListener('click', () => setViewMode('split'));
  if (modeBtnChat) modeBtnChat.addEventListener('click', () => setViewMode('chat'));
  if (modeBtnTable) modeBtnTable.addEventListener('click', () => setViewMode('table'));
  if (modeBtnComputer) modeBtnComputer.addEventListener('click', () => setViewMode('computer'));

  // Header & Chat Triggers
  const btnToggleComputerDrawer = document.getElementById('btn-toggle-computer-drawer');
  const btnChatViewTable = document.getElementById('btn-chat-view-table');
  const btnViewSheetsDatabase = document.getElementById('btn-view-sheets-database');
  const btnOpenAgentComputerSplit = document.getElementById('btn-open-agent-computer-split');
  const btnViewSortedTableAction = document.getElementById('btn-view-sorted-table-action');
  const btnSidebarOpenComputer = document.getElementById('btn-sidebar-open-computer');
  const btnSidebarViewSheets = document.getElementById('btn-sidebar-view-sheets');
  const btnSidebarViewCsv = document.getElementById('btn-sidebar-view-csv');

  // Sorting & Table controls
  const tableBody = document.getElementById('database-table-body');
  const btnResortDate = document.getElementById('btn-resort-date');
  const sortOrderBadge = document.getElementById('sort-order-badge');
  const thDateTime = document.getElementById('th-datetime');
  const sortableHeaders = document.querySelectorAll('.database-table th.sortable');
  const activeCellAddress = document.getElementById('active-cell-address');
  const formulaBarText = document.getElementById('formula-bar-text');

  // Fullscreen Modal
  const modalOverlay = document.getElementById('fullscreen-table-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalCloseAction = document.getElementById('btn-modal-close-action');
  const modalTarget = document.getElementById('modal-table-clone-target');

  // Agent Computer Takeover
  const btnTakeover = document.getElementById('btn-takeover-computer');
  let isTakeover = false;

  // CSV controls
  const btnDownloadCsvAction = document.getElementById('btn-download-csv-action');
  const btnCopyCsvRaw = document.getElementById('btn-copy-csv-raw');
  const toastContainer = document.getElementById('toast-container');

  // Chat Form
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatViewport = document.getElementById('chat-viewport');

  // -------------------------------------------------------------
  // 1. Toast Notification Helper
  // -------------------------------------------------------------
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // -------------------------------------------------------------
  // 2. Tab Navigation in Drawer
  // -------------------------------------------------------------
  function switchTab(tabId) {
    if (workspaceLayout.classList.contains('drawer-minimized')) {
      workspaceLayout.classList.remove('drawer-minimized');
    }

    panelTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });

    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `pane-${tabId}`);
    });
  }

  panelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Drawer Toggles
  function toggleDrawer() {
    workspaceLayout.classList.toggle('drawer-minimized');
    const isClosed = workspaceLayout.classList.contains('drawer-minimized');
    showToast(isClosed ? "Right Drawer Minimized" : "Right Drawer Opened", "info");
  }

  if (btnClosePanel) {
    btnClosePanel.addEventListener('click', toggleDrawer);
  }

  if (btnToggleComputerDrawer) {
    btnToggleComputerDrawer.addEventListener('click', () => {
      switchTab('browser');
    });
  }

  if (btnToggleAgentComputerHeader) {
    btnToggleAgentComputerHeader.addEventListener('click', () => {
      switchTab('browser');
    });
  }

  if (btnOpenDatabaseHeader || btnChatViewTable || btnViewSheetsDatabase) {
    [btnOpenDatabaseHeader, btnChatViewTable, btnViewSheetsDatabase].forEach(el => {
      if (el) el.addEventListener('click', () => switchTab('table'));
    });
  }

  if (btnOpenAgentComputerSplit || btnSidebarOpenComputer) {
    [btnOpenAgentComputerSplit, btnSidebarOpenComputer].forEach(el => {
      if (el) el.addEventListener('click', () => switchTab('browser'));
    });
  }

  if (btnSidebarViewSheets) {
    btnSidebarViewSheets.addEventListener('click', () => switchTab('table'));
  }

  if (btnSidebarViewCsv) {
    btnSidebarViewCsv.addEventListener('click', () => switchTab('csv'));
  }

  // Keyboard shortcut: Cmd+Shift+I or Ctrl+Shift+I
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      switchTab('browser');
    }
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      document.getElementById('global-search').focus();
    }
  });

  // -------------------------------------------------------------
  // 3. Render Database Table & Sorting
  // -------------------------------------------------------------
  function renderTable() {
    // Sort events
    const sorted = [...eventData].sort((a, b) => {
      let valA = a[currentSortCol] || a.dateKey;
      let valB = b[currentSortCol] || b.dateKey;
      if (currentSortCol === 'datetime') {
        valA = a.dateKey;
        valB = b.dateKey;
      }
      if (valA < valB) return currentSortAsc ? -1 : 1;
      if (valA > valB) return currentSortAsc ? 1 : -1;
      return 0;
    });

    tableBody.innerHTML = '';
    sorted.forEach((item, idx) => {
      const tr = document.createElement('tr');
      tr.className = `table-row ${item.isTarget ? 'verified-row-highlight' : ''}`;
      tr.setAttribute('data-id', item.id);

      const regCell = item.regUrl === "Unknown"
        ? `<span class="unknown-pill">Unknown</span>`
        : `<a href="${item.regUrl}" target="_blank" class="table-link reg-link">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
             <span>${item.regText}</span>
           </a>`;

      tr.innerHTML = `
        <td class="row-index">${idx + 1}</td>
        <td class="cell-event font-semibold" data-address="A${idx + 2}">
          <div class="event-title">${item.event}</div>
          <span class="event-category-tag ${item.categoryClass}">${item.category}</span>
        </td>
        <td class="cell-datetime date-highlight" data-address="B${idx + 2}">
          <div class="date-badge">${item.dateBadge}</div>
          <div class="time-sub">${item.timeSub}</div>
        </td>
        <td class="cell-location" data-address="C${idx + 2}">
          <div class="venue-name">${item.location}</div>
          <div class="venue-sub">${item.locationSub}</div>
        </td>
        <td class="cell-audience" data-address="D${idx + 2}">
          <span class="audience-badge ${item.audienceClass}">${item.audience}</span>
        </td>
        <td class="cell-reg-url" data-address="E${idx + 2}">
          ${regCell}
        </td>
        <td class="cell-src-url" data-address="F${idx + 2}">
          <a href="${item.srcUrl}" target="_blank" class="table-link src-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>calendar.mit.edu/...</span>
          </a>
        </td>
        <td class="cell-checked font-mono text-xs" data-address="G${idx + 2}">
          <div class="check-time">${item.checkedAt}</div>
          <span class="check-tag verified">Verified</span>
        </td>
      `;

      // Cell selection updates formula bar
      tr.querySelectorAll('td').forEach(td => {
        td.addEventListener('click', () => {
          const addr = td.getAttribute('data-address') || `R${idx + 1}`;
          activeCellAddress.textContent = addr;
          formulaBarText.textContent = td.innerText.replace(/\n+/g, ' ').trim();
        });
      });

      tableBody.appendChild(tr);
    });

    // Update sort pill
    if (sortOrderBadge) {
      sortOrderBadge.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="${currentSortAsc ? 'M12 5v14M19 12l-7 7-7-7' : 'M12 19V5M5 12l7-7 7 7'}"/>
        </svg>
        <span>Sorted by Date (${currentSortAsc ? 'Ascending' : 'Descending'})</span>
      `;
    }
  }

  // Toggle Date Sort
  function toggleDateSort() {
    if (currentSortCol === 'datetime') {
      currentSortAsc = !currentSortAsc;
    } else {
      currentSortCol = 'datetime';
      currentSortAsc = true;
    }
    renderTable();
    showToast(`Table sorted by Date & Time (${currentSortAsc ? 'Earliest First' : 'Latest First'})`);
  }

  if (btnResortDate) btnResortDate.addEventListener('click', toggleDateSort);
  if (thDateTime) thDateTime.addEventListener('click', toggleDateSort);

  // -------------------------------------------------------------
  // 4. Fullscreen Modal Table View
  // -------------------------------------------------------------
  function openTableModal() {
    const tableElement = document.getElementById('campus-opportunities-table');
    modalTarget.innerHTML = '';
    const clonedTable = tableElement.cloneNode(true);
    modalTarget.appendChild(clonedTable);
    modalOverlay.classList.add('open');
  }

  function closeTableModal() {
    modalOverlay.classList.remove('open');
  }

  if (btnViewSortedTableAction) btnViewSortedTableAction.addEventListener('click', openTableModal);
  if (btnExpandPanel) btnExpandPanel.addEventListener('click', openTableModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeTableModal);
  if (btnModalCloseAction) btnModalCloseAction.addEventListener('click', closeTableModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeTableModal();
  });

  // -------------------------------------------------------------
  // 5. Agent Computer Takeover Interaction
  // -------------------------------------------------------------
  if (btnTakeover) {
    btnTakeover.addEventListener('click', () => {
      isTakeover = !isTakeover;
      if (isTakeover) {
        btnTakeover.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        btnTakeover.innerHTML = `<span>Takeover Active: Return Control</span>`;
        showToast("Agent Computer Takeover: You are in direct manual control for 2FA / Login.", "info");
      } else {
        btnTakeover.style.background = 'linear-gradient(135deg, #0284c7, #06b6d4)';
        btnTakeover.innerHTML = `<span class="pulse-indicator"></span><span>Take Over Computer</span>`;
        showToast("Control returned to Grok Bot. Safe automation resumed.", "success");
      }
    });
  }

  // -------------------------------------------------------------
  // 6. CSV Download & Copy
  // -------------------------------------------------------------
  const csvContent = `Event,Date and time,Location,Audience,Registration URL,Source URL,Checked at
"MIT Generative AI Impact Consortium Symposium","2026-10-29 09:00 - 16:30 EDT","Kresge Auditorium (Bldg W16), 48 Massachusetts Ave, Cambridge, MA","Open to Public, Researchers & Students","https://calendar.mit.edu/event/genai-symposium-2026/register","https://calendar.mit.edu/event/genai-symposium-2026","2026-10-15 00:52:00 UTC"
"2026 Nano Summit: Frontier Materials & Computing","2026-10-29 13:00 - 17:30 EDT","Schwarzman College of Computing (Bldg 45), Room 102, Cambridge, MA","MIT Community & Invited Industry Guests","https://calendar.mit.edu/event/nano-summit-2026/rsvp","https://calendar.mit.edu/event/nano-summit-2026","2026-10-15 00:52:00 UTC"
"Molecular Machine Learning Conference (MML 2026)","2026-10-30 10:00 - 18:00 EDT","Ray and Maria Stata Center (Bldg 32), Room 123, Cambridge, MA","Faculty, Postdocs, and Graduate Students","https://calendar.mit.edu/event/mml-conf-2026/register","https://calendar.mit.edu/event/mml-conf-2026","2026-10-15 00:52:00 UTC"
"Cambridge Clean Energy & Climate Transition Q&A","2026-11-02 16:00 - 17:30 EST","Wong Auditorium (Bldg E51), 70 Amherst St, Cambridge, MA","General Public & Undergraduate Campus Community","Unknown","https://calendar.mit.edu/event/cambridge-clean-energy-qa","2026-10-15 00:52:00 UTC"
"HackMIT Autumn Ideathon & Builder Meetup","2026-11-06 17:00 - 21:00 EST","MIT Media Lab (Bldg E14), 6th Floor Winter Garden, Cambridge, MA","College Students & Hackers","https://calendar.mit.edu/event/hackmit-autumn-ideathon/apply","https://calendar.mit.edu/event/hackmit-autumn-ideathon","2026-10-15 00:52:00 UTC"`;

  if (btnCopyCsvRaw) {
    btnCopyCsvRaw.addEventListener('click', () => {
      navigator.clipboard.writeText(csvContent);
      showToast("campus-opportunities.csv copied to clipboard!");
    });
  }

  if (btnDownloadCsvAction) {
    btnDownloadCsvAction.addEventListener('click', () => {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'campus-opportunities.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Downloaded campus-opportunities.csv");
    });
  }

  // -------------------------------------------------------------
  // 7. Interactive Chat Handling
  // -------------------------------------------------------------
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // Append User message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user-message';
      userMsg.innerHTML = `
        <div class="message-avatar">CP</div>
        <div class="message-content">
          <div class="message-sender-row">
            <span class="sender-name">Chandra Prakash</span>
            <span class="message-timestamp">${new Date().toLocaleTimeString()}</span>
          </div>
          <div class="message-body user-prompt-box">
            <p>${text}</p>
          </div>
        </div>
      `;
      chatViewport.appendChild(userMsg);
      chatInput.value = '';
      chatViewport.scrollTop = chatViewport.scrollHeight;

      // Simulate Bot Response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot-message';
        botMsg.innerHTML = `
          <div class="message-avatar bot-avatar-small">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
            </svg>
          </div>
          <div class="message-content">
            <div class="message-sender-row">
              <span class="sender-name">Daily Assistant</span>
              <span class="message-bot-tag">Persistent Teammate</span>
              <span class="message-timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="audit-resolution-card" style="padding:14px;">
              <p style="font-size:0.82rem; color:#e2e8f0; line-height:1.5;">
                Confirmed! The <strong>Campus Opportunities</strong> table in Google Sheets remains synchronized and verified against <code>https://calendar.mit.edu/</code>. All 5 records are sorted by date.
              </p>
            </div>
          </div>
        `;
        chatViewport.appendChild(botMsg);
        chatViewport.scrollTop = chatViewport.scrollHeight;
      }, 700);
    });
  }

  // Initial table render
  renderTable();
});
