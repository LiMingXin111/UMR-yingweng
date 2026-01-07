// __YINGWENG_FRONTEND_APP_JS__
const CONFIG = window.__YINGWENG_CONFIG__ ?? {};
const API_BASE = String(CONFIG.apiBase ?? '').replace(/\/$/, '');
const APP_NAME = String(CONFIG.appName ?? 'Yingweng');

const STORAGE_THEME_KEY = 'yingweng.theme';

const appEl = document.getElementById('app');
if (!appEl) throw new Error('Missing #app');

const ICONS = {
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 11a4 4 0 1 0-8 0"/><path d="M20 21a8 8 0 0 0-16 0"/><path d="M17.5 3.5a3 3 0 1 1 0 6"/><path d="M22 14a6 6 0 0 0-3.5-4"/></svg>`,
  file: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.2-4.2"/></svg>`,
  qr: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M3 14h7v7H3z"/><path d="M14 14h3v3h-3z"/><path d="M17 17h4"/><path d="M17 21v-4"/><path d="M21 17v4"/></svg>`,
  gear: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.5-2-3.5-2.4.7a8 8 0 0 0-1.7-1L15 2h-6l-.4 2.7a8 8 0 0 0-1.7 1L4.5 5.9l-2 3.5 2 1.5a7.9 7.9 0 0 0 .1 2l-2 1.5 2 3.5 2.4-.7a8 8 0 0 0 1.7 1L9 22h6l.4-2.7a8 8 0 0 0 1.7-1l2.4.7 2-3.5z"/></svg>`,
  moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.6A8.5 8.5 0 0 1 11.4 3a7.2 7.2 0 1 0 9.6 9.6z"/></svg>`,
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.9 4.9l1.4 1.4"/><path d="M17.7 17.7l1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.9 19.1l1.4-1.4"/><path d="M17.7 6.3l1.4-1.4"/></svg>`,
  laptop: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v10H4z"/><path d="M2 19h20"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 16h10l1-16"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`,
  edit: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`,
  copy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 9h10v10H9z"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
};

function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(value) {
  const safe = esc(value);
  return safe ? safe.replace(/\n/g, '<br>') : '';
}

function formatDateTime(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return esc(value);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

function statusInfo(status) {
  if (status === 'COMPLETED') return { label: 'Completed', cls: 'success' };
  return { label: 'In progress', cls: 'info' };
}

function priorityInfo(level) {
  const n = Number(level);
  if (n === 1) return { label: 'Red • Critical', cls: 'danger' };
  if (n === 2) return { label: 'Yellow • Severe', cls: 'warning' };
  if (n === 3) return { label: 'Orange • Urgent', cls: 'warning' };
  if (n === 4) return { label: 'Blue • Non-urgent', cls: 'info' };
  if (n === 5) return { label: 'Green • Completed', cls: 'success' };
  return { label: 'Not set', cls: '' };
}

function normalizeTheme(theme) {
  const t = String(theme || '').toLowerCase();
  if (t === 'light' || t === 'dark' || t === 'system') return t;
  return 'system';
}

function readTheme() {
  return normalizeTheme(localStorage.getItem(STORAGE_THEME_KEY) || 'system');
}

function applyTheme(theme) {
  const t = normalizeTheme(theme);
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', t);
}

function buildUrl(path, query) {
  const p = String(path || '');
  const pathname = p.startsWith('/') ? p : `/${p}`;
  let url = `${API_BASE}${pathname}`;

  if (query && typeof query === 'object') {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      const s = String(v);
      if (!s) continue;
      qs.append(k, s);
    }
    const q = qs.toString();
    if (q) url += (url.includes('?') ? '&' : '?') + q;
  }

  return url;
}

async function request(path, options = {}) {
  const method = String(options.method || 'GET').toUpperCase();
  const headers = { ...(options.headers || {}) };
  let body;

  if (options.json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.json);
  } else if (options.form !== undefined) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    body = new URLSearchParams(options.form).toString();
  }

  let resp;
  try {
    resp = await fetch(buildUrl(path, options.query), {
      method,
      headers,
      body,
      credentials: 'include',
    });
  } catch (e) {
    return { success: false, message: e?.message || 'Network error' };
  }

  const text = await resp.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, message: text };
    }
  }

  if (!resp.ok) {
    if (data && typeof data === 'object') return data;
    return { success: false, message: resp.statusText || `HTTP ${resp.status}` };
  }

  return data;
}

async function requestFormData(path, formData, options = {}) {
  const method = String(options.method || 'POST').toUpperCase();

  let resp;
  try {
    resp = await fetch(buildUrl(path, options.query), {
      method,
      body: formData,
      credentials: 'include',
    });
  } catch (e) {
    return { success: false, message: e?.message || 'Network error' };
  }

  const text = await resp.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, message: text };
    }
  }

  if (!resp.ok) {
    if (data && typeof data === 'object') return data;
    return { success: false, message: resp.statusText || `HTTP ${resp.status}` };
  }

  return data;
}

const api = {
  login(uid, password) {
    return request('/auth/login', { method: 'POST', form: { uid, password } });
  },
  register(payload) {
    return request('/auth/register', { method: 'POST', form: payload });
  },
  current() {
    return request('/auth/current');
  },
  updateProfile(payload) {
    return request('/auth/update', { method: 'PUT', json: payload });
  },
  patientRecords(patientUid) {
    return request(`/records/patient/${encodeURIComponent(patientUid)}`);
  },
  recordDetail(recordId) {
    return request(`/records/detail/${encodeURIComponent(recordId)}`);
  },
  searchRecords(patientUid, keyword) {
    return request('/records/search', { query: { patientUid, keyword } });
  },
  createRecord(payload) {
    return request('/records/create', { method: 'POST', json: payload });
  },
  updateRecord(recordId, payload) {
    return request(`/records/update/${encodeURIComponent(recordId)}`, { method: 'PUT', json: payload });
  },
  deleteRecord(recordId) {
    return request(`/records/delete/${encodeURIComponent(recordId)}`, { method: 'DELETE' });
  },
  addMedicine(payload) {
    return request('/records/medicine/add', { method: 'POST', json: payload });
  },
  updateMedicine(medicineId, payload) {
    return request(`/records/medicine/update/${encodeURIComponent(medicineId)}`, { method: 'PUT', json: payload });
  },
  deleteMedicine(medicineId) {
    return request(`/records/medicine/delete/${encodeURIComponent(medicineId)}`, { method: 'DELETE' });
  },
  addTreatment(payload) {
    return request('/records/treatment/add', { method: 'POST', json: payload });
  },
  updateTreatment(treatmentId, payload) {
    return request(`/records/treatment/update/${encodeURIComponent(treatmentId)}`, { method: 'PUT', json: payload });
  },
  deleteTreatment(treatmentId) {
    return request(`/records/treatment/delete/${encodeURIComponent(treatmentId)}`, { method: 'DELETE' });
  },
  generateQr(uid) {
    return request('/qrcode/generate', { query: { uid } });
  },
  decodeQr(imageBlob) {
    const fd = new FormData();
    fd.append('image', imageBlob, 'qrcode.jpg');
    return requestFormData('/qrcode/decode', fd);
  },
};

const state = {
  initializing: true,
  user: null,
  authTab: 'login',
  authPrefillUid: '',
  page: 'dashboard',
  doctor: {
    patientUid: '',
    patient: null,
    records: [],
    keyword: '',
    loading: false,
  },
  patient: {
    patient: null,
    records: [],
    loading: false,
  },
  selectedRecordId: null,
  detail: null,
  detailLoading: false,
  theme: readTheme(),
  toast: null,
  modal: null,
};

applyTheme(state.theme);

let toastTimer = null;
function toast(type, message, timeoutMs = 3200) {
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
  state.toast = { type: type || 'info', message: String(message || '') };
  render();
  if (timeoutMs > 0) {
    toastTimer = setTimeout(() => {
      state.toast = null;
      render();
    }, timeoutMs);
  }
}

let qrScanStream = null;
let qrScanTimer = null;
let qrDetector = null;
let qrScanCanvas = null;
let qrScanBusy = false;
let qrScanNoHit = 0;
let qrScanStartedAt = 0;

function supportsQrScan() {
  return !!navigator.mediaDevices?.getUserMedia;
}

function stopQrScan() {
  if (qrScanTimer) {
    clearTimeout(qrScanTimer);
    qrScanTimer = null;
  }
  if (qrScanStream) {
      for (const track of qrScanStream.getTracks()) track.stop();
    qrScanStream = null;
  }
  qrDetector = null;
  qrScanBusy = false;
  qrScanNoHit = 0;
  qrScanStartedAt = 0;
}

function extractUidFromQr(rawValue) {
  const raw = String(rawValue || '').trim();
  if (!raw) return '';
  const m = raw.match(/\b(DOC|PAT)\d{6}\b/i);
  return m ? m[0].toUpperCase() : raw;
}

async function captureQrFrame(video) {
  if (!(video instanceof HTMLVideoElement)) return null;
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return null;

  const width = Math.min(640, vw);
  const height = Math.max(1, Math.round((width / vw) * vh));

  if (!qrScanCanvas) qrScanCanvas = document.createElement('canvas');
  qrScanCanvas.width = width;
  qrScanCanvas.height = height;

  const ctx = qrScanCanvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0, width, height);

  return await new Promise((resolve) => {
    qrScanCanvas.toBlob((blob) => resolve(blob || null), 'image/jpeg', 0.85);
  });
}

async function openScanModal() {
  if (!isDoctor()) return;
  if (!supportsQrScan()) {
    toast('warning', 'QR scanning is not supported in this browser. Please enter the patient UID manually.');
    return;
  }
  state.modal = { type: 'scan', status: 'starting', error: '' };
  render();
  await startQrScan();
}

async function startQrScan() {
  stopQrScan();
  if (!state.modal || state.modal.type !== 'scan') return;
  if (!supportsQrScan()) {
    state.modal.status = 'error';
    state.modal.error = 'QR scanning is not supported in this browser.';
    render();
    return;
  }

  qrScanNoHit = 0;
  qrScanStartedAt = Date.now();

  qrDetector = null;
  if (typeof BarcodeDetector !== 'undefined') {
    try {
      qrDetector = new BarcodeDetector({ formats: ['qr_code'] });
    } catch {
      qrDetector = null;
    }
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices?.();
    if (Array.isArray(devices) && devices.length > 0 && !devices.some((d) => d?.kind === 'videoinput')) {
      state.modal.status = 'error';
      state.modal.error = 'No camera device found. Connect a webcam or enable your camera in system settings.';
      render();
      stopQrScan();
      return;
    }
  } catch {
    // Ignore enumerateDevices errors.
  }

  const describeCameraError = (err) => {
    const name = String(err?.name || '');
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return 'No camera device found. Connect a webcam or enable your camera in system settings.';
    }
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return 'Camera permission denied. Please allow camera access for this site in Chrome settings.';
    }
    if (name === 'NotReadableError' || name === 'TrackStartError') {
      return 'Camera is already in use by another app.';
    }
    return String(err?.message || 'Failed to access camera.');
  };

  try {
    qrScanStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    });
  } catch (e) {
    try {
      qrScanStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (e2) {
      state.modal.status = 'error';
      state.modal.error = describeCameraError(e2 || e);
      render();
      stopQrScan();
      return;
    }
  }

  if (!state.modal || state.modal.type !== 'scan') {
    stopQrScan();
    return;
  }

  state.modal.status = 'scanning';
  state.modal.error = '';
  state.modal.engine = qrDetector ? 'native' : 'zxing';
  render();

  requestAnimationFrame(() => {
    const video = document.getElementById('qr-video');
    if (video instanceof HTMLVideoElement) {
      video.srcObject = qrScanStream;
      video.play().catch(() => {});
    }
  });

  const tick = async () => {
    if (!state.modal || state.modal.type !== 'scan') return;

    const video = document.getElementById('qr-video');
    if (!(video instanceof HTMLVideoElement) || video.readyState < 2) {
      qrScanTimer = setTimeout(tick, 200);
      return;
    }

    const detector = qrDetector;
    if (detector) {
      try {
        const codes = await detector.detect(video);
        if (codes?.length) {
          const uid = extractUidFromQr(codes[0]?.rawValue);
          if (uid) {
            stopQrScan();
            state.modal = null;
            state.doctor.patientUid = uid;
            render();
            toast('success', `Scanned UID: ${uid}`);
            await loadPatientRecords(uid);
            return;
          }
        }

        qrScanNoHit += 1;
        if (qrScanNoHit >= 30 && Date.now() - qrScanStartedAt > 6000) {
          qrDetector = null;
          if (state.modal && state.modal.type === 'scan') {
            state.modal.engine = 'zxing';
            render();
          }
        }
      } catch {
        // Ignore scanning errors and keep trying.
      }

      qrScanTimer = setTimeout(tick, 250);
      return;
    }

    if (qrScanBusy) {
      qrScanTimer = setTimeout(tick, 350);
      return;
    }

    qrScanBusy = true;
    try {
      const frame = await captureQrFrame(video);
      if (!frame) {
        qrScanTimer = setTimeout(tick, 350);
        return;
      }

      const res = await api.decodeQr(frame);
      if (!state.modal || state.modal.type !== 'scan') return;

      if (!res?.success) {
        if (handleAuthLoss(res?.message)) {
          stopQrScan();
          return;
        }

        const msg = String(res?.message || '').trim();
        if (msg && !msg.toLowerCase().includes('no qr code')) {
          const display = msg.includes('<') ? 'QR decoder is unavailable on the server.' : msg;
          if (state.modal.error !== display) {
            state.modal.error = display;
            render();
          }
        }

        qrScanTimer = setTimeout(tick, 450);
        return;
      }

      const uid = extractUidFromQr(res?.text);
      if (uid) {
        stopQrScan();
        state.modal = null;
        state.doctor.patientUid = uid;
        render();
        toast('success', `Scanned UID: ${uid}`);
        await loadPatientRecords(uid);
        return;
      }
    } catch {
      // Ignore scanning errors and keep trying.
    } finally {
      qrScanBusy = false;
    }

    qrScanTimer = setTimeout(tick, 450);
  };

  tick();
}

function closeModal() {
  stopQrScan();
  state.modal = null;
  render();
}

function isDoctor() {
  return state.user?.role === 'DOCTOR';
}

function isPatient() {
  return state.user?.role === 'PATIENT';
}

function handleAuthLoss(message) {
  const msg = String(message || '').toLowerCase();
  if (msg.includes('login')) {
    state.user = null;
    state.page = 'dashboard';
    state.doctor = { patientUid: '', patient: null, records: [], keyword: '', loading: false };
    state.patient = { patient: null, records: [], loading: false };
    state.selectedRecordId = null;
    state.detail = null;
    state.detailLoading = false;
    state.modal = null;
    toast('warning', 'Session expired. Please sign in again.', 4500);
    return true;
  }
  return false;
}

async function syncCurrent() {
  const res = await api.current();
  if (res?.success) {
    state.user = res.user;
    return true;
  }
  state.user = null;
  return false;
}

async function loadSelfRecords() {
  if (!state.user?.uid) return;
  state.patient.loading = true;
  render();
  const res = await api.patientRecords(state.user.uid);
  state.patient.loading = false;

  if (!res?.success) {
    if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Failed to load records');
    render();
    return;
  }

  state.patient.patient = res.patient || null;
  state.patient.records = Array.isArray(res.records) ? res.records : [];
  render();
}

async function loadPatientRecords(uid, { preserveSelection } = {}) {
  const patientUid = String(uid || '').trim();
  if (!patientUid) return;

  state.doctor.loading = true;
  render();
  const res = await api.patientRecords(patientUid);
  state.doctor.loading = false;

  if (!res?.success) {
    if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Failed to load patient');
    render();
    return;
  }

  state.doctor.patientUid = patientUid;
  state.doctor.patient = res.patient || null;
  state.doctor.records = Array.isArray(res.records) ? res.records : [];

  const keep = preserveSelection ? state.selectedRecordId : null;
  if (!(keep && state.doctor.records.some((r) => String(r.id) === String(keep)))) {
    state.selectedRecordId = null;
    state.detail = null;
    state.detailLoading = false;
  }

  render();
}

async function loadDetail(recordId) {
  const id = String(recordId || '').trim();
  if (!id) return;

  state.selectedRecordId = id;
  state.detailLoading = true;
  state.detail = null;
  render();

  const res = await api.recordDetail(id);
  state.detailLoading = false;

  if (!res?.success) {
    if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Failed to load record detail');
    render();
    return;
  }

  state.detail = res;
  render();
}

function openRecordModal(record) {
  if (!isDoctor()) return;
  if (!state.doctor.patient) {
    toast('warning', 'Load a patient first');
    return;
  }

  const isEdit = !!record;
  state.modal = {
    type: 'record',
    mode: isEdit ? 'edit' : 'create',
    recordId: record?.id ? String(record.id) : '',
    diseaseName: record?.diseaseName || '',
    description: record?.description || '',
    priorityLevel: Number(record?.priorityLevel ?? 4),
    status: record?.status || 'IN_PROGRESS',
    remarks: record?.remarks || '',
  };
  render();
}

function openMedicineModal(medicine) {
  if (!isDoctor()) return;
  if (!state.detail?.record?.id) {
    toast('warning', 'Select a record first');
    return;
  }

  const isEdit = !!medicine;
  state.modal = {
    type: 'medicine',
    mode: isEdit ? 'edit' : 'add',
    recordId: String(state.detail.record.id),
    medicineId: isEdit && medicine?.id ? String(medicine.id) : '',
    medicineName: medicine?.medicineName || '',
    dosage: medicine?.dosage || '',
    frequency: medicine?.frequency || '',
    duration: medicine?.duration || '',
    remarks: medicine?.remarks || '',
  };
  render();
}

function openTreatmentModal(treatment) {
  if (!isDoctor()) return;
  if (!state.detail?.record?.id) {
    toast('warning', 'Select a record first');
    return;
  }

  const isEdit = !!treatment;
  state.modal = {
    type: 'treatment',
    mode: isEdit ? 'edit' : 'add',
    recordId: String(state.detail.record.id),
    treatmentId: isEdit && treatment?.id ? String(treatment.id) : '',
    treatmentName: treatment?.treatmentName || '',
    description: treatment?.description || '',
    remarks: treatment?.remarks || '',
  };
  render();
}

async function openQrModal(uid) {
  const v = String(uid || '').trim();
  if (!v) {
    toast('warning', 'Enter a UID');
    return;
  }

  state.modal = { type: 'qr', uid: v, loading: true, image: '' };
  render();

  const res = await api.generateQr(v);
  if (!res?.success) {
    state.modal = null;
    if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Failed to generate QR code');
    render();
    return;
  }

  if (state.modal && state.modal.type === 'qr') {
    state.modal.loading = false;
    state.modal.image = res.qrCode || '';
  }
  render();
}

function navItems() {
  if (!state.user) return [];

  const dashboardLabel = isDoctor() ? 'Patients' : 'Records';
  const dashboardIcon = isDoctor() ? ICONS.users : ICONS.file;

  return [
    { id: 'dashboard', label: dashboardLabel, icon: dashboardIcon },
    { id: 'qr', label: 'QR Code', icon: ICONS.qr },
    { id: 'profile', label: 'Profile', icon: ICONS.gear },
  ];
}

function pageMeta() {
  if (!state.user) {
    return { title: `Welcome to ${APP_NAME}`, sub: 'Sign in to continue.' };
  }

  if (state.page === 'profile') {
    return { title: 'Profile', sub: 'Manage your contact info.' };
  }

  if (state.page === 'qr') {
    return { title: 'QR Code', sub: 'Generate a QR code for any UID.' };
  }

  if (isDoctor()) {
    return { title: 'Patients & Records', sub: 'Search a patient by UID, then create and manage records.' };
  }

  return { title: 'My Medical Records', sub: 'Review your records, medicines, and treatments.' };
}

function renderToast() {
  if (!state.toast?.message) return '';
  const type = esc(state.toast.type);
  const message = esc(state.toast.message);
  return `
    <div class="toast ${type}">
      <div class="dot"></div>
      <div class="note" style="flex:1">${message}</div>
      <button class="btn small ghost" type="button" data-action="toast-close">Dismiss</button>
    </div>
  `;
}

function renderAuth() {
  const tabLogin = state.authTab !== 'register';
  const tabRegister = state.authTab === 'register';

  const loginForm = `
    <form data-form="login" class="stack" autocomplete="on">
      <div class="field">
        <span>UID</span>
        <input class="input" name="uid" autocomplete="username" placeholder="Enter UID" value="${esc(state.authPrefillUid)}" required />
      </div>
      <div class="field">
        <span>Password</span>
        <input class="input" name="password" type="password" autocomplete="current-password" placeholder="Enter password" required />
      </div>
      <button class="btn primary" type="submit">Sign in</button>
    </form>
  `;

  const registerForm = `
    <form data-form="register" class="stack" autocomplete="on">
      <div class="field">
        <span>Role</span>
        <select name="role" required>
          <option value="DOCTOR">Doctor</option>
          <option value="PATIENT">Patient</option>
        </select>
      </div>
      <div class="field">
        <span>Name</span>
        <input class="input" name="name" autocomplete="name" placeholder="Enter name" required />
      </div>
      <div class="field">
        <span>Password</span>
        <input class="input" name="password" type="password" autocomplete="new-password" placeholder="Create a password" required />
      </div>
      <div class="field">
        <span>Phone (optional)</span>
        <input class="input" name="phone" autocomplete="tel" placeholder="Phone" />
      </div>
      <div class="field">
        <span>Email (optional)</span>
        <input class="input" name="email" autocomplete="email" placeholder="Email" />
      </div>
      <button class="btn primary" type="submit">Create account</button>
    </form>
  `;

  const switcher = `
    <div class="row auth-switch">
      <span class="note">${tabLogin ? 'No account?' : 'Already have an account?'}</span>
      <button class="btn small ghost" type="button" data-action="auth-tab" data-tab="${tabLogin ? 'register' : 'login'}">
        ${tabLogin ? 'Create account' : 'Sign in'}
      </button>
    </div>
  `;

  const body = state.initializing
    ? `
      <div class="auth-wrap">
        <div class="card pad auth-min">
          <h1 class="umr-title">${esc(APP_NAME)}</h1>
          <div class="row" style="justify-content:center">
            <div class="spinner"></div>
            <div class="note">Checking session...</div>
          </div>
        </div>
      </div>
    `
    : `
      <div class="auth-wrap">
        <div class="card pad auth-min">
          <h1 class="umr-title">${esc(APP_NAME)}</h1>
          ${tabRegister ? registerForm : loginForm}
          ${switcher}
        </div>
      </div>
    `;

  return `${renderToast()}${body}${renderModal()}`;
}

function renderThemeSegment() {
  const t = state.theme;
  return `
    <div class="segmented" role="group" aria-label="Theme">
      <button type="button" class="${t === 'system' ? 'active' : ''}" data-action="theme" data-theme="system">${ICONS.laptop} System</button>
      <button type="button" class="${t === 'light' ? 'active' : ''}" data-action="theme" data-theme="light">${ICONS.sun} Light</button>
      <button type="button" class="${t === 'dark' ? 'active' : ''}" data-action="theme" data-theme="dark">${ICONS.moon} Dark</button>
    </div>
  `;
}

function renderDoctorDashboard() {
  const patient = state.doctor.patient;
  const records = state.doctor.records || [];

  const patientInfo = patient
    ? `
      <div class="card pad">
        <div class="section-head">
          <div class="section-title">Patient</div>
          <button class="btn small" type="button" data-action="copy" data-text="${esc(patient.uid)}">${ICONS.copy} Copy UID</button>
        </div>
        <div class="kv">
          <div class="k">Name</div><div class="v">${esc(patient.name || '-')}</div>
          <div class="k">UID</div><div class="v"><span class="code">${esc(patient.uid)}</span></div>
          <div class="k">Phone</div><div class="v">${esc(patient.phone || '-')}</div>
          <div class="k">Email</div><div class="v">${esc(patient.email || '-')}</div>
        </div>
      </div>
    `
    : `<div class="note">Enter a patient UID to view their records.</div>`;

  const list = records.length
    ? `
      <div class="list">
        ${records
          .map((r) => {
            const selected = String(r.id) === String(state.selectedRecordId);
            const st = statusInfo(r.status);
            const pr = priorityInfo(r.priorityLevel);
            return `
              <button class="list-item ${selected ? 'selected' : ''}" type="button" data-action="record-select" data-id="${esc(r.id)}">
                <div class="row" style="justify-content:space-between; gap:12px;">
                  <div>
                    <div class="item-title">${esc(r.diseaseName || 'Untitled')}</div>
                    <div class="item-sub">Created ${formatDateTime(r.createdTime)}</div>
                  </div>
                  <div class="badges">
                    <span class="badge ${esc(pr.cls)}">${esc(pr.label)}</span>
                    <span class="badge ${esc(st.cls)}">${esc(st.label)}</span>
                  </div>
                </div>
              </button>
            `;
          })
          .join('')}
      </div>
    `
    : `<div class="note">No records found.</div>`;

  const searchBar = patient
    ? `
      <form data-form="records-search" class="row wrap">
        <input class="input" name="keyword" placeholder="Search disease, description, remarks..." value="${esc(state.doctor.keyword)}" />
        <button class="btn" type="submit">${ICONS.search} Search</button>
        <button class="btn ghost" type="button" data-action="records-reset">Reset</button>
      </form>
    `
    : '';

  const left = `
    <div class="card pad">
      <div class="stack">
        <form data-form="patient-lookup" class="row wrap">
          <input class="input" name="patientUid" placeholder="Patient UID (e.g., PAT000123)" value="${esc(state.doctor.patientUid)}" />
          <button class="btn primary" type="submit">${ICONS.search} Load</button>
          <button class="btn" type="button" data-action="scan-open">${ICONS.qr} Scan QR</button>
        </form>

        ${state.doctor.loading ? `<div class="row"><div class="spinner"></div><div class="note">Loading...</div></div>` : ''}

        ${patientInfo}

        <div class="card pad">
          <div class="section-head">
            <div class="section-title">Records</div>
            <div class="badge">${records.length} total</div>
          </div>
          <div class="stack">
            ${searchBar}
            ${list}
          </div>
        </div>
      </div>
    </div>
  `;

  const detail = state.detail?.record;
  const medicines = Array.isArray(state.detail?.medicines) ? state.detail.medicines : [];
  const treatments = Array.isArray(state.detail?.treatments) ? state.detail.treatments : [];

  let right = `<div class="card pad"><div class="note">Select a record to view details.</div></div>`;
  if (!patient) right = `<div class="card pad"><div class="note">Load a patient to view record details.</div></div>`;
  if (state.detailLoading) {
    right = `<div class="card pad"><div class="row"><div class="spinner"></div><div class="note">Loading record...</div></div></div>`;
  } else if (detail) {
    const st = statusInfo(detail.status);
    const pr = priorityInfo(detail.priorityLevel);

    const medicineList = medicines.length
      ? medicines
          .map((m) => {
            const title = esc(m.medicineName || 'Medicine');
            const meta = [m.dosage, m.frequency, m.duration].filter(Boolean).map(esc).join(' • ');
            const remarks = m.remarks ? `<div class="item-sub">${nl2br(m.remarks)}</div>` : '';
            return `
              <div class="list-item" style="cursor:default;">
                <div class="row" style="justify-content:space-between; gap:12px; align-items:flex-start;">
                  <div>
                    <div class="item-title">${title}</div>
                    <div class="item-sub">${meta || '-'}</div>
                    ${remarks}
                  </div>
                  <div class="row" style="gap:8px; justify-content:flex-end;">
                    <button class="btn small" type="button" data-action="medicine-edit" data-id="${esc(m.id)}">${ICONS.edit} Edit</button>
                    <button class="btn small danger" type="button" data-action="medicine-delete" data-id="${esc(m.id)}">${ICONS.trash} Remove</button>
                  </div>
                </div>
              </div>
            `;
          })
          .join('')
      : `<div class="note">No medicines.</div>`;

    const treatmentList = treatments.length
      ? treatments
          .map((t) => {
            const title = esc(t.treatmentName || 'Treatment');
            const desc = t.description ? `<div class="item-sub">${nl2br(t.description)}</div>` : '';
            const remarks = t.remarks ? `<div class="item-sub">${nl2br(t.remarks)}</div>` : '';
            return `
              <div class="list-item" style="cursor:default;">
                <div class="row" style="justify-content:space-between; gap:12px; align-items:flex-start;">
                  <div>
                    <div class="item-title">${title}</div>
                    ${desc}
                    ${remarks}
                  </div>
                  <div class="row" style="gap:8px; justify-content:flex-end;">
                    <button class="btn small" type="button" data-action="treatment-edit" data-id="${esc(t.id)}">${ICONS.edit} Edit</button>
                    <button class="btn small danger" type="button" data-action="treatment-delete" data-id="${esc(t.id)}">${ICONS.trash} Remove</button>
                  </div>
                </div>
              </div>
            `;
          })
          .join('')
      : `<div class="note">No treatments.</div>`;

    right = `
      <div class="card pad">
        <div class="section-head">
          <div class="section-title">Record details</div>
          <div class="row">
            <button class="btn small" type="button" data-action="record-edit">${ICONS.edit} Edit</button>
            <button class="btn small danger" type="button" data-action="record-delete" data-id="${esc(detail.id)}">${ICONS.trash} Delete</button>
          </div>
        </div>

        <div class="badges" style="margin-bottom:10px;">
          <span class="badge ${esc(pr.cls)}">${esc(pr.label)}</span>
          <span class="badge ${esc(st.cls)}">${esc(st.label)}</span>
          <span class="badge">#${esc(detail.id)}</span>
        </div>

        <div class="kv">
          <div class="k">Disease</div><div class="v">${esc(detail.diseaseName)}</div>
          <div class="k">Description</div><div class="v">${detail.description ? nl2br(detail.description) : '-'}</div>
          <div class="k">Remarks</div><div class="v">${detail.remarks ? nl2br(detail.remarks) : '-'}</div>
          <div class="k">Created</div><div class="v">${formatDateTime(detail.createdTime)}</div>
          <div class="k">Updated</div><div class="v">${formatDateTime(detail.updatedTime)}</div>
        </div>

        <div class="hr"></div>

        <div class="section-head">
          <div class="section-title">Medicines</div>
          <button class="btn small" type="button" data-action="medicine-add">${ICONS.plus} Add</button>
        </div>
        <div class="list">${medicineList}</div>

        <div class="hr"></div>

        <div class="section-head">
          <div class="section-title">Treatments</div>
          <button class="btn small" type="button" data-action="treatment-add">${ICONS.plus} Add</button>
        </div>
        <div class="list">${treatmentList}</div>
      </div>
    `;
  }

  return `
    <div class="page-head">
      <div>
        <h2>Patients & Records</h2>
        <p>Search a patient by UID, then create and manage medical records.</p>
      </div>
      <div class="row wrap">
        <button class="btn" type="button" data-action="doctor-refresh" ${patient ? '' : 'disabled'}>Refresh</button>
        <button class="btn primary" type="button" data-action="record-new" ${patient ? '' : 'disabled'}>${ICONS.plus} New record</button>
      </div>
    </div>

    <div class="grid-split">
      ${left}
      ${right}
    </div>
  `;
}

function renderPatientDashboard() {
  const patient = state.patient.patient;
  const records = state.patient.records || [];

  const patientInfo = patient
    ? `
      <div class="card pad">
        <div class="section-head">
          <div class="section-title">Me</div>
          <button class="btn small" type="button" data-action="copy" data-text="${esc(patient.uid)}">${ICONS.copy} Copy UID</button>
        </div>
        <div class="kv">
          <div class="k">Name</div><div class="v">${esc(patient.name || '-')}</div>
          <div class="k">UID</div><div class="v"><span class="code">${esc(patient.uid)}</span></div>
          <div class="k">Phone</div><div class="v">${esc(patient.phone || '-')}</div>
          <div class="k">Email</div><div class="v">${esc(patient.email || '-')}</div>
        </div>
      </div>
    `
    : '';

  const list = records.length
    ? `
      <div class="list">
        ${records
          .map((r) => {
            const selected = String(r.id) === String(state.selectedRecordId);
            const st = statusInfo(r.status);
            const pr = priorityInfo(r.priorityLevel);
            return `
              <button class="list-item ${selected ? 'selected' : ''}" type="button" data-action="record-select" data-id="${esc(r.id)}">
                <div class="row" style="justify-content:space-between; gap:12px;">
                  <div>
                    <div class="item-title">${esc(r.diseaseName || 'Untitled')}</div>
                    <div class="item-sub">Created ${formatDateTime(r.createdTime)}</div>
                  </div>
                  <div class="badges">
                    <span class="badge ${esc(pr.cls)}">${esc(pr.label)}</span>
                    <span class="badge ${esc(st.cls)}">${esc(st.label)}</span>
                  </div>
                </div>
              </button>
            `;
          })
          .join('')}
      </div>
    `
    : `<div class="note">No records yet.</div>`;

  const left = `
    <div class="card pad">
      <div class="stack">
        ${state.patient.loading ? `<div class="row"><div class="spinner"></div><div class="note">Loading...</div></div>` : ''}
        ${patientInfo}
        <div class="card pad">
          <div class="section-head">
            <div class="section-title">Records</div>
            <div class="badge">${records.length} total</div>
          </div>
          ${list}
        </div>
      </div>
    </div>
  `;

  const detail = state.detail?.record;
  const medicines = Array.isArray(state.detail?.medicines) ? state.detail.medicines : [];
  const treatments = Array.isArray(state.detail?.treatments) ? state.detail.treatments : [];

  let right = `<div class="card pad"><div class="note">Select a record to view details.</div></div>`;
  if (state.detailLoading) {
    right = `<div class="card pad"><div class="row"><div class="spinner"></div><div class="note">Loading record...</div></div></div>`;
  } else if (detail) {
    const st = statusInfo(detail.status);
    const pr = priorityInfo(detail.priorityLevel);

    const medicineList = medicines.length
      ? medicines
          .map((m) => {
            const meta = [m.dosage, m.frequency, m.duration].filter(Boolean).map(esc).join(' • ');
            const remarks = m.remarks ? `<div class="item-sub">${nl2br(m.remarks)}</div>` : '';
            return `
              <div class="list-item" style="cursor:default;">
                <div class="item-title">${esc(m.medicineName || 'Medicine')}</div>
                <div class="item-sub">${meta || '-'}</div>
                ${remarks}
              </div>
            `;
          })
          .join('')
      : `<div class="note">No medicines.</div>`;

    const treatmentList = treatments.length
      ? treatments
          .map((t) => {
            const desc = t.description ? `<div class="item-sub">${nl2br(t.description)}</div>` : '';
            const remarks = t.remarks ? `<div class="item-sub">${nl2br(t.remarks)}</div>` : '';
            return `
              <div class="list-item" style="cursor:default;">
                <div class="item-title">${esc(t.treatmentName || 'Treatment')}</div>
                ${desc}
                ${remarks}
              </div>
            `;
          })
          .join('')
      : `<div class="note">No treatments.</div>`;

    right = `
      <div class="card pad">
        <div class="section-head">
          <div class="section-title">Record details</div>
        </div>

        <div class="badges" style="margin-bottom:10px;">
          <span class="badge ${esc(pr.cls)}">${esc(pr.label)}</span>
          <span class="badge ${esc(st.cls)}">${esc(st.label)}</span>
          <span class="badge">#${esc(detail.id)}</span>
        </div>

        <div class="kv">
          <div class="k">Disease</div><div class="v">${esc(detail.diseaseName)}</div>
          <div class="k">Description</div><div class="v">${detail.description ? nl2br(detail.description) : '-'}</div>
          <div class="k">Remarks</div><div class="v">${detail.remarks ? nl2br(detail.remarks) : '-'}</div>
          <div class="k">Created</div><div class="v">${formatDateTime(detail.createdTime)}</div>
          <div class="k">Updated</div><div class="v">${formatDateTime(detail.updatedTime)}</div>
        </div>

        <div class="hr"></div>

        <div class="section-head"><div class="section-title">Medicines</div></div>
        <div class="list">${medicineList}</div>

        <div class="hr"></div>

        <div class="section-head"><div class="section-title">Treatments</div></div>
        <div class="list">${treatmentList}</div>
      </div>
    `;
  }

  return `
    <div class="page-head">
      <div>
        <h2>My Medical Records</h2>
        <p>Review your records, medicines, and treatments.</p>
      </div>
      <div class="row wrap">
        <button class="btn" type="button" data-action="patient-refresh">Refresh</button>
        <button class="btn" type="button" data-action="qr-open" data-uid="${esc(state.user?.uid || '')}">${ICONS.qr} Show QR</button>
      </div>
    </div>

    <div class="grid-split">
      ${left}
      ${right}
    </div>
  `;
}

function renderProfile() {
  const u = state.user;
  if (!u) return '';

  return `
    <div class="page-head">
      <div>
        <h2>Profile</h2>
        <p>Update your contact information. UID, role and password cannot be edited here.</p>
      </div>
    </div>

    <div class="grid-split">
      <div class="card pad">
        <div class="section-head"><div class="section-title">Account</div></div>
        <div class="kv">
          <div class="k">UID</div><div class="v"><span class="code">${esc(u.uid)}</span></div>
          <div class="k">Role</div><div class="v">${esc(u.role)}</div>
          <div class="k">Created</div><div class="v">${formatDateTime(u.createdTime)}</div>
        </div>
      </div>

      <div class="card pad">
        <div class="section-head"><div class="section-title">Contact</div></div>
        <form data-form="profile-update" class="stack">
          <div class="field">
            <span>Name</span>
            <input class="input" name="name" value="${esc(u.name || '')}" placeholder="Name" />
          </div>
          <div class="field">
            <span>Phone</span>
            <input class="input" name="phone" value="${esc(u.phone || '')}" placeholder="Phone" />
          </div>
          <div class="field">
            <span>Email</span>
            <input class="input" name="email" value="${esc(u.email || '')}" placeholder="Email" />
          </div>
          <div class="row" style="justify-content:flex-end;">
            <button class="btn primary" type="submit">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderQr() {
  const defaultUid = state.user?.uid || '';
  return `
    <div class="page-head">
      <div>
        <h2>QR Code</h2>
        <p>Generate a QR code for a UID (for quick sharing and scanning).</p>
      </div>
    </div>

    <div class="card pad">
      <form data-form="qr-generate" class="row wrap">
        <input class="input" name="uid" placeholder="UID" value="${esc(defaultUid)}" />
        <button class="btn primary" type="submit">${ICONS.qr} Generate</button>
      </form>
      <div class="note" style="margin-top:10px;">You can also copy your UID from the Profile page.</div>
    </div>
  `;
}

function renderModal() {
  const m = state.modal;
  if (!m) return '';

  let title = 'Dialog';
  let sub = '';
  let body = '';

  if (m.type === 'record') {
    title = m.mode === 'edit' ? 'Edit record' : 'New record';
    sub = state.doctor.patient ? `Patient: ${state.doctor.patient.uid}` : '';

    body = `
      <form data-form="record-save" class="stack">
        <input type="hidden" name="recordId" value="${esc(m.recordId)}" />
        <div class="field">
          <span>Disease name</span>
          <input class="input" name="diseaseName" value="${esc(m.diseaseName)}" required />
        </div>
        <div class="field">
          <span>Description</span>
          <textarea name="description" placeholder="Symptoms, diagnosis notes...">${esc(m.description)}</textarea>
        </div>
        <div class="row wrap">
          <div class="field" style="flex:1; min-width:180px;">
            <span>Priority</span>
            <select name="priorityLevel">
              <option value="1" ${m.priorityLevel === 1 ? 'selected' : ''}>Red • Critical</option>
              <option value="2" ${m.priorityLevel === 2 ? 'selected' : ''}>Yellow • Severe</option>
              <option value="3" ${m.priorityLevel === 3 ? 'selected' : ''}>Orange • Urgent</option>
              <option value="4" ${m.priorityLevel === 4 ? 'selected' : ''}>Blue • Non-urgent</option>
              <option value="5" ${m.priorityLevel === 5 ? 'selected' : ''}>Green • Completed</option>
            </select>
          </div>
          <div class="field" style="flex:1; min-width:180px;">
            <span>Status</span>
            <select name="status">
              <option value="IN_PROGRESS" ${m.status === 'IN_PROGRESS' ? 'selected' : ''}>In progress</option>
              <option value="COMPLETED" ${m.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
            </select>
          </div>
        </div>
        <div class="field">
          <span>Remarks</span>
          <textarea name="remarks" placeholder="Additional remarks...">${esc(m.remarks)}</textarea>
        </div>
        <div class="modal-footer">
          <button class="btn" type="button" data-action="modal-close">Cancel</button>
          <button class="btn primary" type="submit">Save</button>
        </div>
      </form>
    `;
  }

  if (m.type === 'medicine') {
    const isEdit = m.mode === 'edit';
    title = isEdit ? 'Edit medicine' : 'Add medicine';
    sub = `Record #${esc(m.recordId)}`;

    body = `
      <form data-form="medicine-save" class="stack">
        <input type="hidden" name="recordId" value="${esc(m.recordId)}" />
        ${isEdit ? `<input type="hidden" name="medicineId" value="${esc(m.medicineId)}" />` : ''}
        <div class="field"><span>Medicine name</span><input class="input" name="medicineName" value="${esc(m.medicineName)}" required /></div>
        <div class="row wrap">
          <div class="field" style="flex:1; min-width:180px;"><span>Dosage</span><input class="input" name="dosage" placeholder="e.g., 10mg" value="${esc(m.dosage)}" /></div>
          <div class="field" style="flex:1; min-width:180px;"><span>Frequency</span><input class="input" name="frequency" placeholder="e.g., twice daily" value="${esc(m.frequency)}" /></div>
        </div>
        <div class="field"><span>Duration</span><input class="input" name="duration" placeholder="e.g., 7 days" value="${esc(m.duration)}" /></div>
        <div class="field"><span>Remarks</span><textarea name="remarks" placeholder="Notes...">${esc(m.remarks)}</textarea></div>
        <div class="modal-footer">
          <button class="btn" type="button" data-action="modal-close">Cancel</button>
          <button class="btn primary" type="submit">${isEdit ? 'Save' : 'Add'}</button>
        </div>
      </form>
    `;
  }

  if (m.type === 'treatment') {
    const isEdit = m.mode === 'edit';
    title = isEdit ? 'Edit treatment' : 'Add treatment';
    sub = `Record #${esc(m.recordId)}`;

    body = `
      <form data-form="treatment-save" class="stack">
        <input type="hidden" name="recordId" value="${esc(m.recordId)}" />
        ${isEdit ? `<input type="hidden" name="treatmentId" value="${esc(m.treatmentId)}" />` : ''}
        <div class="field"><span>Treatment name</span><input class="input" name="treatmentName" value="${esc(m.treatmentName)}" required /></div>
        <div class="field"><span>Description</span><textarea name="description" placeholder="What was performed...">${esc(m.description)}</textarea></div>
        <div class="field"><span>Remarks</span><textarea name="remarks" placeholder="Notes...">${esc(m.remarks)}</textarea></div>
        <div class="modal-footer">
          <button class="btn" type="button" data-action="modal-close">Cancel</button>
          <button class="btn primary" type="submit">${isEdit ? 'Save' : 'Add'}</button>
        </div>
      </form>
    `;
  }

  if (m.type === 'scan') {
    title = 'Scan patient QR code';
    sub = 'Allow camera access and point it at the patient QR code.';

    if (!supportsQrScan()) {
      body = `
        <div class="stack">
          <div class="note">QR scanning is not available in this browser. Please type the patient UID manually.</div>
          <div class="modal-footer">
            <button class="btn primary" type="button" data-action="modal-close">Close</button>
          </div>
        </div>
      `;
    } else {
      const err = m.error ? `<div class="note" style="color:var(--danger);">${esc(m.error)}</div>` : '';
      const engineNote = m.engine
        ? `<div class="note">Decoder: ${m.engine === 'zxing' ? 'ZXing (server)' : 'Browser BarcodeDetector'}</div>`
        : '';
      body = `
        <div class="stack">
          <div class="note">Tip: the QR code usually contains a UID like <span class="code">PAT000123</span>.</div>
          ${engineNote}
          ${err}
          <video id="qr-video" autoplay playsinline muted style="width:100%;max-width:520px;border-radius:18px;border:1px solid var(--border);background:var(--surface-solid);"></video>
          <div class="modal-footer">
            <button class="btn" type="button" data-action="scan-restart">Restart</button>
            <button class="btn primary" type="button" data-action="modal-close">Close</button>
          </div>
        </div>
      `;
    }
  }

  if (m.type === 'qr') {
    title = 'QR code';
    sub = `UID: ${esc(m.uid)}`;

    const content = m.loading
      ? `<div class="row"><div class="spinner"></div><div class="note">Generating...</div></div>`
      : m.image
        ? `
          <div class="stack">
            <img alt="QR code" src="${esc(m.image)}" style="width:300px;height:300px;border-radius:18px;border:1px solid var(--border);background:var(--surface-solid);" />
            <div class="row wrap" style="justify-content:flex-end;">
              <button class="btn" type="button" data-action="copy" data-text="${esc(m.uid)}">${ICONS.copy} Copy UID</button>
              <button class="btn primary" type="button" data-action="modal-close">Done</button>
            </div>
          </div>
        `
        : `<div class="note">No QR code available.</div>`;

    body = `<div class="stack">${content}</div>`;
  }

  return `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">${esc(title)}</h3>
            <div class="modal-sub">${esc(sub)}</div>
          </div>
          <button class="btn small ghost" type="button" data-action="modal-close">Close</button>
        </div>
        <div class="modal-body">${body}</div>
      </div>
    </div>
  `;
}

function renderShell() {
  const items = navItems();
  const meta = pageMeta();

  const sidebar = `
    <aside class="sidebar">
      <div class="brand">
        <div class="logo"></div>
        <div>
          <h1>${esc(APP_NAME)}</h1>
          <p>${esc(state.user?.name || '')} ${state.user?.name ? '·' : ''} ${esc(state.user?.uid || '')}</p>
        </div>
      </div>

      <nav class="nav">
        ${items
          .map(
            (it) => `
            <button class="nav-item ${state.page === it.id ? 'active' : ''}" type="button" data-action="nav" data-page="${esc(it.id)}">
              ${it.icon}<span>${esc(it.label)}</span>
            </button>
          `,
          )
          .join('')}
      </nav>
    </aside>
  `;

  const topbar = `
    <header class="topbar">
      <div class="topbar-left">
        <p class="topbar-title">${esc(meta.title)}</p>
        <p class="topbar-sub">${esc(meta.sub)}</p>
      </div>
      <div class="topbar-actions">
        ${renderThemeSegment()}
        <button class="btn small" type="button" data-action="logout">${ICONS.logout} Sign out</button>
      </div>
    </header>
  `;

  let main = '';
  if (state.page === 'profile') main = renderProfile();
  else if (state.page === 'qr') main = renderQr();
  else if (isDoctor()) main = renderDoctorDashboard();
  else main = renderPatientDashboard();

  return `
    ${renderToast()}
    <div class="shell">
      ${sidebar}
      ${topbar}
      <main class="main">
        <div class="container">
          ${main}
        </div>
      </main>
    </div>
    ${renderModal()}
  `;
}

function render() {
  appEl.innerHTML = state.user ? renderShell() : renderAuth();
}

async function copyToClipboard(text) {
  const v = String(text || '');
  if (!v) return;
  try {
    await navigator.clipboard.writeText(v);
    toast('success', 'Copied');
  } catch {
    toast('warning', 'Copy failed');
  }
}

async function onSubmit(form) {
  const kind = form.getAttribute('data-form');
  const fd = new FormData(form);

  if (kind === 'login') {
    const uid = String(fd.get('uid') || '').trim();
    const password = String(fd.get('password') || '');
    if (!uid || !password) {
      toast('warning', 'Enter UID and password');
      return;
    }

    const res = await api.login(uid, password);
    if (!res?.success) {
      toast('error', res?.message || 'Invalid UID or password');
      return;
    }

    await syncCurrent();
    state.initializing = false;

    if (!state.user) {
      toast('error', 'Login succeeded but session could not be loaded');
      render();
      return;
    }

    if (isDoctor()) {
      history.replaceState({}, '', '/doctor');
    } else {
      history.replaceState({}, '', '/patient');
      await loadSelfRecords();
    }

    state.page = 'dashboard';
    toast('success', 'Signed in');
    render();
    return;
  }

  if (kind === 'register') {
    const role = String(fd.get('role') || 'PATIENT');
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');

    if (!name || !password) {
      toast('warning', 'Enter name and password');
      return;
    }

    const payload = { password, role, name };
    if (phone) payload.phone = phone;
    if (email) payload.email = email;

    const res = await api.register(payload);
    if (!res?.success) {
      toast('error', res?.message || 'Registration failed');
      return;
    }

    const newUid = res.uid || '';
    state.authTab = 'login';
    state.authPrefillUid = String(newUid);
    toast('success', newUid ? `Account created: ${newUid}` : 'Account created');
    render();
    return;
  }

  if (kind === 'patient-lookup') {
    const patientUid = String(fd.get('patientUid') || '').trim();
    if (!patientUid) {
      toast('warning', 'Enter a patient UID');
      return;
    }
    state.doctor.keyword = '';
    await loadPatientRecords(patientUid);
    return;
  }

  if (kind === 'records-search') {
    const keyword = String(fd.get('keyword') || '').trim();
    if (!state.doctor.patientUid) {
      toast('warning', 'Load a patient first');
      return;
    }
    if (!keyword) {
      toast('warning', 'Enter a keyword');
      return;
    }

    state.doctor.keyword = keyword;
    render();

    const res = await api.searchRecords(state.doctor.patientUid, keyword);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Search failed');
      render();
      return;
    }

    state.doctor.records = Array.isArray(res.records) ? res.records : [];
    render();
    return;
  }

  if (kind === 'record-save') {
    if (!isDoctor() || !state.doctor.patient?.id) return;

    const recordId = String(fd.get('recordId') || '').trim();
    const diseaseName = String(fd.get('diseaseName') || '').trim();
    const description = String(fd.get('description') || '');
    const remarks = String(fd.get('remarks') || '');
    const priorityLevel = Number(fd.get('priorityLevel') || 4);
    const status = String(fd.get('status') || 'IN_PROGRESS');

    if (!diseaseName) {
      toast('warning', 'Disease name is required');
      return;
    }

    const payload = {
      patientId: Number(state.doctor.patient.id),
      diseaseName,
      description,
      priorityLevel,
      status,
      remarks,
    };

    const res = recordId ? await api.updateRecord(recordId, payload) : await api.createRecord(payload);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Save failed');
      render();
      return;
    }

    const savedId = res.record?.id ? String(res.record.id) : recordId;
    closeModal();
    toast('success', 'Saved');

    await loadPatientRecords(state.doctor.patientUid, { preserveSelection: true });
    if (savedId) await loadDetail(savedId);
    return;
  }

  if (kind === 'medicine-save') {
    if (!isDoctor()) return;

    const recordId = String(fd.get('recordId') || '').trim();
    const medicineId = String(fd.get('medicineId') || '').trim();
    const medicineName = String(fd.get('medicineName') || '').trim();
    if (!recordId || !medicineName) {
      toast('warning', 'Medicine name is required');
      return;
    }

    const payload = {
      recordId: Number(recordId),
      medicineName,
      dosage: String(fd.get('dosage') || ''),
      frequency: String(fd.get('frequency') || ''),
      duration: String(fd.get('duration') || ''),
      remarks: String(fd.get('remarks') || ''),
    };

    const isEdit = !!medicineId;
    const res = isEdit ? await api.updateMedicine(medicineId, payload) : await api.addMedicine(payload);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || (isEdit ? 'Failed to update medicine' : 'Failed to add medicine'));
      render();
      return;
    }

    closeModal();
    toast('success', isEdit ? 'Medicine updated' : 'Medicine added');
    await loadDetail(recordId);
    return;
  }

  if (kind === 'treatment-save') {
    if (!isDoctor()) return;

    const recordId = String(fd.get('recordId') || '').trim();
    const treatmentId = String(fd.get('treatmentId') || '').trim();
    const treatmentName = String(fd.get('treatmentName') || '').trim();
    if (!recordId || !treatmentName) {
      toast('warning', 'Treatment name is required');
      return;
    }

    const payload = {
      recordId: Number(recordId),
      treatmentName,
      description: String(fd.get('description') || ''),
      remarks: String(fd.get('remarks') || ''),
    };

    const isEdit = !!treatmentId;
    const res = isEdit ? await api.updateTreatment(treatmentId, payload) : await api.addTreatment(payload);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || (isEdit ? 'Failed to update treatment' : 'Failed to add treatment'));
      render();
      return;
    }

    closeModal();
    toast('success', isEdit ? 'Treatment updated' : 'Treatment added');
    await loadDetail(recordId);
    return;
  }

  if (kind === 'profile-update') {
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const email = String(fd.get('email') || '').trim();

    const payload = { name, phone, email };
    const res = await api.updateProfile(payload);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Update failed');
      render();
      return;
    }

    if (res.user) state.user = res.user;
    toast('success', res?.message || 'Profile updated');
    render();
    return;
  }

  if (kind === 'qr-generate') {
    const uid = String(fd.get('uid') || '').trim();
    await openQrModal(uid);
  }
}

async function onAction(el) {
  const action = el.getAttribute('data-action');

  if (action === 'toast-close') {
    state.toast = null;
    render();
    return;
  }

  if (action === 'auth-tab') {
    state.authTab = el.getAttribute('data-tab') || 'login';
    render();
    return;
  }

  if (action === 'theme') {
    const theme = normalizeTheme(el.getAttribute('data-theme'));
    state.theme = theme;
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    applyTheme(theme);
    render();
    return;
  }

  if (action === 'nav') {
    state.page = el.getAttribute('data-page') || 'dashboard';
    render();
    return;
  }

  if (action === 'logout') {
    window.location.assign('/auth/logout');
    return;
  }

  if (action === 'copy') {
    await copyToClipboard(el.getAttribute('data-text') || '');
    return;
  }

  if (action === 'records-reset') {
    if (!state.doctor.patientUid) return;
    state.doctor.keyword = '';
    await loadPatientRecords(state.doctor.patientUid);
    return;
  }

  if (action === 'doctor-refresh') {
    if (!state.doctor.patientUid) return;
    await loadPatientRecords(state.doctor.patientUid, { preserveSelection: true });
    if (state.selectedRecordId) await loadDetail(state.selectedRecordId);
    return;
  }

  if (action === 'scan-open') {
    await openScanModal();
    return;
  }

  if (action === 'scan-restart') {
    await startQrScan();
    return;
  }

  if (action === 'patient-refresh') {
    await loadSelfRecords();
    if (state.selectedRecordId) await loadDetail(state.selectedRecordId);
    return;
  }

  if (action === 'record-select') {
    await loadDetail(el.getAttribute('data-id'));
    return;
  }

  if (action === 'record-new') {
    openRecordModal(null);
    return;
  }

  if (action === 'record-edit') {
    openRecordModal(state.detail?.record || null);
    return;
  }

  if (action === 'record-delete') {
    const id = String(el.getAttribute('data-id') || '').trim();
    if (!id) return;
    if (!confirm('Delete this record? This cannot be undone.')) return;

    const res = await api.deleteRecord(id);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Delete failed');
      render();
      return;
    }

    toast('success', 'Deleted');
    await loadPatientRecords(state.doctor.patientUid);
    return;
  }

  if (action === 'medicine-add') {
    openMedicineModal();
    return;
  }

  if (action === 'medicine-edit') {
    const id = String(el.getAttribute('data-id') || '').trim();
    const medicines = Array.isArray(state.detail?.medicines) ? state.detail.medicines : [];
    const medicine = medicines.find((m) => String(m.id) === id);
    if (!medicine) {
      toast('warning', 'Medicine not found');
      return;
    }
    openMedicineModal(medicine);
    return;
  }

  if (action === 'medicine-delete') {
    const id = String(el.getAttribute('data-id') || '').trim();
    if (!id) return;
    if (!confirm('Remove this medicine?')) return;

    const res = await api.deleteMedicine(id);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Remove failed');
      render();
      return;
    }

    toast('success', 'Removed');
    if (state.detail?.record?.id) await loadDetail(String(state.detail.record.id));
    return;
  }

  if (action === 'treatment-add') {
    openTreatmentModal();
    return;
  }

  if (action === 'treatment-edit') {
    const id = String(el.getAttribute('data-id') || '').trim();
    const treatments = Array.isArray(state.detail?.treatments) ? state.detail.treatments : [];
    const treatment = treatments.find((t) => String(t.id) === id);
    if (!treatment) {
      toast('warning', 'Treatment not found');
      return;
    }
    openTreatmentModal(treatment);
    return;
  }

  if (action === 'treatment-delete') {
    const id = String(el.getAttribute('data-id') || '').trim();
    if (!id) return;
    if (!confirm('Remove this treatment?')) return;

    const res = await api.deleteTreatment(id);
    if (!res?.success) {
      if (!handleAuthLoss(res?.message)) toast('error', res?.message || 'Remove failed');
      render();
      return;
    }

    toast('success', 'Removed');
    if (state.detail?.record?.id) await loadDetail(String(state.detail.record.id));
    return;
  }

  if (action === 'qr-open') {
    await openQrModal(el.getAttribute('data-uid') || '');
    return;
  }

  if (action === 'modal-close') {
    closeModal();
  }
}

function attachEvents() {
  appEl.addEventListener('click', async (e) => {
    const backdrop = e.target instanceof Element && e.target.classList.contains('modal-backdrop');
    if (backdrop) {
      closeModal();
      return;
    }

    const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
    if (!el) return;
    await onAction(el);
  });

  appEl.addEventListener('submit', async (e) => {
    const form =
      e.target instanceof HTMLFormElement ? e.target : e.target instanceof Element ? e.target.closest('form[data-form]') : null;
    if (!form) return;
    e.preventDefault();
    await onSubmit(form);
  });
}

async function init() {
  attachEvents();
  render();

  await syncCurrent();
  state.initializing = false;

  if (state.user) {
    if (isDoctor()) {
      history.replaceState({}, '', '/doctor');
    } else {
      history.replaceState({}, '', '/patient');
      await loadSelfRecords();
    }
  }

  render();
}

init();
