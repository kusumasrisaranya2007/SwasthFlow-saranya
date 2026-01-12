/* ================= 0. FIREBASE SETUP ================= */
// TODO: Replace with your actual Firebase Config from the Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let db;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
  console.log("Firebase initialized");
} catch (e) {
  console.error("Firebase init failed. Check config.", e);
}

// Offline detection
if (db) {
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    if (snap.val() === false) {
      UI.showToast("Offline mode active", "error");
    }
  });
}

/* ================= 0.1 TRANSLATIONS ================= */
const Translations = {
  en: {
    appTitle: "<span style='color:var(--primary-light)'>Swasth</span>Flow",
    patient: "Patient",
    hospital: "Hospital",
    reset: "Reset",
    healthAssistant: "🤖 Health Assistant",
    describeProblem: "Describe your problem...",
    speak: "🎤 Speak",
    check: "Check",
    patientDashboard: "Patient Dashboard",
    selectHospital: "-- Select Hospital --",
    viewStatus: "Select a hospital to view live status",
    loading: "Loading...",
    noPatients: "No patients in queue. Walk-ins available.",
    nowServing: "NOW SERVING",
    estWait: "Est. Wait",
    mins: "mins",
    now: "Now",
    hospitalAccess: "Hospital Access",
    loginPrompt: "Please login to manage your queue.",
    goToLogin: "Go to Login",
    waiting: "Waiting",
    servedToday: "Served Today",
    avgWait: "Avg Wait",
    generateToken: "Generate Token",
    patientName: "Patient Name",
    phoneOptional: "Phone Number (Optional)",
    healthIssue: "Health Issue",
    estTime: "Est. Time",
    walkin: "Walk-in",
    appointment: "Appointment",
    general: "General",
    cardiology: "Cardiology",
    orthopedics: "Orthopedics",
    pediatrics: "Pediatrics",
    emergency: "Emergency / Priority",
    searchPlaceholder: "Search Name or Token...",
    allDepts: "All Depts",
    serveNext: "▶ Serve Next",
    cancelLast: "❌ Cancel Last",
    csv: "📂 CSV",
    pdf: "📄 PDF",
    settings: "⚙️ Settings",
    logout: "🚪 Logout",
    recentHistory: "Recent History",
    noHistory: "No history yet.",
    queueEmpty: "Queue is empty.<br>Ready for new patients.",
    settingsTitle: "Settings",
    defaultTime: "Default Consultation Time (minutes)",
    saveChanges: "Save Changes",
    back: "Back",
    kioskMode: "Kiosk Mode",
    kioskDesc: "Open a read-only display for the waiting room.",
    allDepartments: "All Departments",
    openKiosk: "Open Kiosk Window",
    dataManagement: "Data Management",
    backupData: "⬇️ Backup Data",
    restoreData: "⬆️ Restore Data",
    complete: "✅ Complete",
    hold: "⏸ Hold",
    noShow: "🚫 No Show",
    restore: "Restore to Queue",
    print: "Print Token",
    liveQueueStatus: "Live Queue Status",
    youAreNext: "🔔 <strong>You are Next!</strong> Please arrive at the waiting area.",
    bookAppointment: "Book Appointment",
    selectDate: "Select Date",
    bookNow: "Book Now",
    apptBooked: "Appointment Booked!",
    repeatAnnouncement: "Repeat Announcement",
    waitTimeCalculator: "Wait Time Calculator",
    numPatientsWaiting: "No. of Patients Waiting",
    avgTimePerPatient: "Avg. Time per Patient (mins)",
    calculateWait: "Calculate Wait",
    estimatedWaitTime: "Estimated Wait Time",
    assistantDisclaimer: "This assistant provides triage guidance only. It is not medical advice.",
    assistantMinor: "Non-urgent, consult doctor when available.",
    assistantSerious: "Immediate doctor attention recommended.",
    assistantDefault: "Please consult a doctor.",
    paused: "Paused",
    invalidTransition: "Invalid state transition.",
    queuePaused: "Queue Paused",
    announcementTemplate: "Token number {token}, {name}, please proceed to consultation.",
    doctorUnavailable: "Doctor is currently unavailable / on break."
  },
  hi: {
    appTitle: "<span style='color:var(--primary-light)'>स्वास्थ</span>फ्लो",
    patient: "रोगी",
    hospital: "अस्पताल",
    reset: "रीसेट",
    healthAssistant: "🤖 स्वास्थ्य सहायक",
    describeProblem: "अपनी समस्या का वर्णन करें...",
    speak: "🎤 बोलें",
    check: "जांचें",
    patientDashboard: "रोगी डैशबोर्ड",
    selectHospital: "-- अस्पताल चुनें --",
    viewStatus: "लाइव स्थिति देखने के लिए अस्पताल चुनें",
    loading: "लोड हो रहा है...",
    noPatients: "कतार में कोई रोगी नहीं है। वॉक-इन उपलब्ध हैं।",
    nowServing: "अब सेवा में",
    estWait: "अनुमानित प्रतीक्षा",
    mins: "मिनट",
    now: "अभी",
    hospitalAccess: "अस्पताल प्रवेश",
    loginPrompt: "अपनी कतार का प्रबंधन करने के लिए कृपया लॉगिन करें।",
    goToLogin: "लॉगिन पर जाएं",
    waiting: "प्रतीक्षारत",
    servedToday: "आज सेवा की",
    avgWait: "औसत प्रतीक्षा",
    generateToken: "टोकन उत्पन्न करें",
    patientName: "रोगी का नाम",
    phoneOptional: "फोन नंबर (वैकल्पिक)",
    healthIssue: "स्वास्थ्य समस्या",
    estTime: "अनुमानित समय",
    walkin: "वॉक-इन",
    appointment: "नियुक्ति",
    general: "सामान्य",
    cardiology: "हृदय रोग",
    orthopedics: "हड्डी रोग",
    pediatrics: "बाल रोग",
    emergency: "आपातकालीन / प्राथमिकता",
    searchPlaceholder: "नाम या टोकन खोजें...",
    allDepts: "सभी विभाग",
    serveNext: "▶ अगला सेवा करें",
    cancelLast: "❌ अंतिम रद्द करें",
    csv: "📂 सीएसवी",
    pdf: "📄 पीडीएफ",
    settings: "⚙️ सेटिंग्स",
    logout: "🚪 लॉग आउट",
    recentHistory: "हाल का इतिहास",
    noHistory: "अभी कोई इतिहास नहीं।",
    queueEmpty: "कतार खाली है।<br>नए रोगियों के लिए तैयार।",
    settingsTitle: "सेटिंग्स",
    defaultTime: "डिफ़ॉल्ट परामर्श समय (मिनट)",
    saveChanges: "परिवर्तन सहेजें",
    back: "वापस",
    kioskMode: "कियोस्क मोड",
    kioskDesc: "प्रतीक्षा कक्ष के लिए केवल-पढ़ने योग्य डिस्प्ले खोलें।",
    allDepartments: "सभी विभाग",
    openKiosk: "कियोस्क विंडो खोलें",
    dataManagement: "डेटा प्रबंधन",
    backupData: "⬇️ बैकअप डेटा",
    restoreData: "⬆️ डेटा पुनर्स्थापित करें",
    complete: "✅ पूर्ण",
    hold: "⏸ होल्ड",
    noShow: "🚫 नो शो",
    restore: "कतार में बहाल करें",
    print: "टोकन प्रिंट करें",
    liveQueueStatus: "लाइव कतार स्थिति",
    youAreNext: "🔔 <strong>आप अगले हैं!</strong> कृपया प्रतीक्षा क्षेत्र में पहुंचें।",
    bookAppointment: "नियुक्ति बुक करें",
    selectDate: "तारीख चुनें",
    bookNow: "अभी बुक करें",
    apptBooked: "नियुक्ति बुक की गई!",
    repeatAnnouncement: "घोषणा दोहराएं",
    announcementTemplate: "टोकन नंबर {token}, {name}, कृपया परामर्श के लिए आगे बढ़ें।",
    doctorUnavailable: "डॉक्टर वर्तमान में अनुपलब्ध / ब्रेक पर हैं।"
  },
  te: {
    appTitle: "<span style='color:var(--primary-light)'>स्वास्थ</span>फ्लो",
    patient: "రోగి",
    hospital: "ఆసుపత్రి",
    reset: "రీసెట్",
    healthAssistant: "🤖 ఆరోగ్య సహాయకుడు",
    describeProblem: "మీ సమస్యను వివరించండి...",
    speak: "🎤 మాట్లాడండి",
    check: "తనిఖీ చేయండి",
    patientDashboard: "రోగి డ్యాష్‌బోర్డ్",
    selectHospital: "-- ఆసుపత్రిని ఎంచుకోండి --",
    viewStatus: "లైవ్ స్థితిని చూడటానికి ఆసుపత్రిని ఎంచుకోండి",
    loading: "లోడ్ అవుతోంది...",
    noPatients: "క్యూలో రోగులు లేరు. వాక్-ఇన్‌లు అందుబాటులో ఉన్నాయి.",
    nowServing: "ఇప్పుడు సేవ చేస్తున్నారు",
    estWait: "అంచనా నిరీక్షణ",
    mins: "నిమిషాలు",
    now: "ఇప్పుడు",
    hospitalAccess: "ఆసుపత్రి ప్రవేశం",
    loginPrompt: "దయచేసి మీ క్యూని నిర్వహించడానికి లాగిన్ చేయండి.",
    goToLogin: "లాగిన్‌కి వెళ్లండి",
    waiting: "వేచి ఉన్నారు",
    servedToday: "ఈ రోజు సేవ చేశారు",
    avgWait: "సగటు నిరీక్షణ",
    generateToken: "టోకెన్ రూపొందించండి",
    patientName: "రోగి పేరు",
    phoneOptional: "ఫోన్ నంబర్ (ఐచ్ఛికం)",
    healthIssue: "ఆరోగ్య సమస్య",
    estTime: "అంచనా సమయం",
    walkin: "వాక్-ఇన్",
    appointment: "అపాయింట్‌మెంట్",
    general: "జనరల్",
    cardiology: "కార్డియాలజీ",
    orthopedics: "ఆర్థోపెడిక్స్",
    pediatrics: "పీడియాట్రిక్స్",
    emergency: "అత్యవసర / ప్రాధాన్యత",
    searchPlaceholder: "పేరు లేదా టోకెన్ శోధించండి...",
    allDepts: "అన్ని విభాగాలు",
    serveNext: "▶ తదుపరి సేవ చేయండి",
    cancelLast: "❌ చివరిది రద్దు చేయండి",
    csv: "📂 CSV",
    pdf: "📄 PDF",
    settings: "⚙️ సెట్టింగ్‌లు",
    logout: "🚪 లాగ్ అవుట్",
    recentHistory: "ఇటీవలి చరిత్ర",
    noHistory: "ఇంకా చరిత్ర లేదు.",
    queueEmpty: "క్యూ ఖాళీగా ఉంది.<br>కొత్త రోగుల కోసం సిద్ధంగా ఉంది.",
    settingsTitle: "సెట్టింగ్‌లు",
    defaultTime: "డిఫాల్ట్ సంప్రదింపు సమయం (నిమిషాలు)",
    saveChanges: "మార్పులను సేవ్ చేయండి",
    back: "వెనుకకు",
    kioskMode: "కియోస్క్ మోడ్",
    kioskDesc: "వెయిటింగ్ రూమ్ కోసం రీడ్-ఓన్లీ డిస్‌ప్లే తెరవండి.",
    allDepartments: "అన్ని విభాగాలు",
    openKiosk: "కియోస్క్ విండో తెరవండి",
    dataManagement: "డేటా నిర్వహణ",
    backupData: "⬇️ బ్యాకప్ డేటా",
    restoreData: "⬆️ డేటాను పునరుద్ధరించండి",
    complete: "✅ పూర్తయింది",
    hold: "⏸ హోల్డ్",
    noShow: "🚫 రాలేదు",
    restore: "క్యూకి పునరుద్ధరించండి",
    print: "టోకెన్ ప్రింట్ చేయండి",
    liveQueueStatus: "లైవ్ క్యూ స్థితి",
    youAreNext: "🔔 <strong>మీరు తదుపరి!</strong> దయచేసి వెయిటింగ్ ఏరియాకు రండి.",
    bookAppointment: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    selectDate: "తేదీని ఎంచుకోండి",
    bookNow: "ఇప్పుడే బుక్ చేయండి",
    apptBooked: "అపాయింట్‌మెంట్ బుక్ చేయబడింది!",
    repeatAnnouncement: "ప్రకటనను పునరావృతం చేయండి",
    announcementTemplate: "టోకెన్ సంఖ్య {token}, {name}, దయచేసి సంప్రదింపుల కోసం వెళ్లండి.",
    doctorUnavailable: "డాక్టర్ ప్రస్తుతం అందుబాటులో లేరు / విరామంలో ఉన్నారు.",
    assistantMinor: "అత్యవసరం కాదు, అందుబాటులో ఉన్నప్పుడు వైద్యుడిని సంప్రదించండి.",
    assistantSerious: "తక్షణ వైద్యుని శ్రద్ధ సిఫార్సు చేయబడింది.",
    assistantDefault: "దయచేసి వైద్యుడిని సంప్రదించండి."
  }
};

/* ================= 1. STORAGE MODULE ================= */
const Storage = {
  getHospitals: () => JSON.parse(localStorage.getItem("swasth_hospitals")) || {},
  saveHospitals: (data) => {
    localStorage.setItem("swasth_hospitals", JSON.stringify(data));
    if (db) db.ref('hospitals').set(data);
  },
  
  getQueues: () => JSON.parse(localStorage.getItem("swasth_queues")) || {},
  saveQueues: (data) => {
    localStorage.setItem("swasth_queues", JSON.stringify(data));
    if (db) db.ref('queues').set(data);
  },
  
  getCurrentPatient: (hospital) => JSON.parse(localStorage.getItem(`swasth_current_${hospital}`)),
  saveCurrentPatient: (hospital, data) => {
    localStorage.setItem(`swasth_current_${hospital}`, JSON.stringify(data));
    if (db) db.ref(`current_patients/${hospital}`).set(data);
  },

  getSession: () => localStorage.getItem("swasth_session"),
  setSession: (hospitalName) => localStorage.setItem("swasth_session", hospitalName),
  clearSession: () => localStorage.removeItem("swasth_session"),
  
  getTokenCount: () => Number(localStorage.getItem("swasth_tokenNo")) || 100,
  setTokenCount: (num) => {
    localStorage.setItem("swasth_tokenNo", num);
    if (db) db.ref('token_count').set(num);
  },

  incrementDeptTokenCount: (dept) => {
    const counts = JSON.parse(localStorage.getItem("swasth_dept_counts")) || {};
    if (!counts[dept]) counts[dept] = 0;
    counts[dept]++;
    localStorage.setItem("swasth_dept_counts", JSON.stringify(counts));
    if (db) db.ref('dept_counts').set(counts);
    return counts[dept];
  },
  
  getHistory: () => JSON.parse(localStorage.getItem("swasth_history")) || [],
  saveHistory: (data) => {
    localStorage.setItem("swasth_history", JSON.stringify(data));
    if (db) db.ref('history').set(data);
  },

  getServiceTimes: (hospital) => JSON.parse(localStorage.getItem(`swasth_times_${hospital}`)) || [],
  saveServiceTimes: (hospital, data) => {
    localStorage.setItem(`swasth_times_${hospital}`, JSON.stringify(data));
    if (db) db.ref(`service_times/${hospital}`).set(data);
  },

  getSettings: () => JSON.parse(localStorage.getItem("swasth_settings")) || { defaultTime: 15 },
  saveSettings: (data) => {
    localStorage.setItem("swasth_settings", JSON.stringify(data));
    if (db) db.ref('settings').set(data);
  },

  getTheme: () => localStorage.getItem("swasth_darkMode") === "true",
  setTheme: (isDark) => localStorage.setItem("swasth_darkMode", isDark),
  
  getLanguage: () => localStorage.getItem("swasth_lang") || "en",
  setLanguage: (lang) => localStorage.setItem("swasth_lang", lang),

  cleanupHistory: () => {
    // Only cleanup if confirmed or backup exists - for now, manual trigger or explicit confirm
    // Removing auto-cleanup on load to prevent data loss
  },

  reset: () => {
    localStorage.clear();
    location.reload();
  },

  getBackup: () => {
    return JSON.stringify(localStorage);
  },

  restoreBackup: (json) => {
    const data = JSON.parse(json);
    Object.keys(data).forEach(key => localStorage.setItem(key, data[key]));
    location.reload();
  },

  getAvailability: (hospital) => {
    const val = localStorage.getItem(`swasth_available_${hospital}`);
    return val === null ? true : val === "true";
  },
  setAvailability: (hospital, status) => {
    localStorage.setItem(`swasth_available_${hospital}`, status);
    if (db) db.ref(`availability/${hospital}`).set(status);
  }
};

/* ================= 2. DATA MODELS (Strict Structures) ================= */
const Models = {
  createHospital: (name, password) => ({
    id: Date.now().toString(),
    name: name,
    password: password, // In real app, hash this
    createdAt: new Date().toISOString()
  }),

  createPatient: (tokenNo, name, issue, time, priority, type, department, phone, date) => ({
    id: Date.now().toString(),
    token: (department ? department.charAt(0).toUpperCase() : 'G') + "-" + tokenNo,
    name: name,
    issue: issue,
    estTime: Number(time) || 15,
    priority: priority, // boolean
    type: type, // 'walkin' | 'appointment'
    department: department || 'General',
    phone: phone || '',
    date: date || new Date().toISOString().split('T')[0],
    status: 'waiting',
    joinedAt: new Date().toISOString()
  })
};

/* ================= 3. QUEUE MANAGER ================= */
const QueueManager = {
  STATES: {
    WAITING: "waiting",
    SERVING: "serving",
    COMPLETED: "completed",
    HOLD: "hold",
    NO_SHOW: "no-show",
    CANCELLED: "cancelled"
  },

  addPatient: (hospitalName, patientData) => {
    const queues = Storage.getQueues();
    if (!queues[hospitalName]) queues[hospitalName] = [];
    
    // Priority Logic: Appointments/Emergency go to top, Walk-ins to bottom
    if (patientData.priority) {
      queues[hospitalName].unshift(patientData);
    } else {
      queues[hospitalName].push(patientData);
    }
    
    Storage.saveQueues(queues);
  },

  // --- STATE MACHINE LOGIC ---
  
  startServing: (hospitalName) => {
    const queues = Storage.getQueues();
    if (!queues[hospitalName] || queues[hospitalName].length === 0) return null;
    
    // Move from Queue -> Current Patient
    const patient = queues[hospitalName].shift();
    patient.status = QueueManager.STATES.SERVING;
    patient.startedAt = Date.now();
    
    Storage.saveQueues(queues);
    Storage.saveCurrentPatient(hospitalName, patient);
    return patient;
  },

  completeServing: (hospitalName, remarks) => {
    const patient = Storage.getCurrentPatient(hospitalName);
    if (!patient) return null;
    if (patient.status !== QueueManager.STATES.SERVING) {
        UI.showToast(UI.t('invalidTransition'), "error");
        return null;
    }

    // 1. Update Stats (Rolling Average)
    const duration = (Date.now() - patient.startedAt) / 60000; // in minutes
    const times = Storage.getServiceTimes(hospitalName);
    times.push(duration);
    if (times.length > 10) times.shift(); // Keep last 10
    Storage.saveServiceTimes(hospitalName, times);

    // 2. Move to History
    const history = Storage.getHistory();
    patient.status = "served";
    patient.remarks = remarks || "No remarks";
    patient.servedAt = new Date().toISOString();
    history.unshift(patient);
    Storage.saveHistory(history);
    
    // 3. Clear Current
    Storage.saveCurrentPatient(hospitalName, null);

    // 4. Update Analytics Counter
    const stats = Storage.getStats();
    if (!stats[hospitalName]) stats[hospitalName] = Models.initStats();
    stats[hospitalName].servedToday++;
    stats[hospitalName].totalWaitTime += Math.round(duration);
    Storage.saveStats(stats);
    
    return patient;
  },

  holdPatient: (hospitalName) => {
    const patient = Storage.getCurrentPatient(hospitalName);
    if (!patient) return null;

    patient.status = 'hold';
    const queues = Storage.getQueues();
    if (!queues[hospitalName]) queues[hospitalName] = [];
    
    // Add back to top of queue (or index 1 if priority logic needed)
    queues[hospitalName].unshift(patient);
    
    Storage.saveQueues(queues);
    Storage.saveCurrentPatient(hospitalName, null);
    return patient;
  },

  markNoShow: (hospitalName) => {
    const patient = Storage.getCurrentPatient(hospitalName);
    if (!patient) return null;
    if (patient.status !== QueueManager.STATES.SERVING) {
        UI.showToast(UI.t('invalidTransition'), "error");
        return null;
    }

    const history = Storage.getHistory();
    patient.status = QueueManager.STATES.NO_SHOW;
    history.unshift(patient);
    Storage.saveHistory(history);
    Storage.saveCurrentPatient(hospitalName, null);
    return patient;
  },

  cancelLast: (hospitalName) => {
    const queues = Storage.getQueues();
    if (!queues[hospitalName] || queues[hospitalName].length === 0) return null;
    
    const patient = queues[hospitalName].pop();
    patient.status = QueueManager.STATES.CANCELLED;
    
    const history = Storage.getHistory();
    history.unshift(patient);
    Storage.saveHistory(history);
    
    Storage.saveQueues(queues);
    return patient;
  },

  restorePatient: (hospitalName, token) => {
    const history = Storage.getHistory();
    const index = history.findIndex(p => p.token === token);
    if (index === -1) return null;

    const patient = history.splice(index, 1)[0];
    patient.status = QueueManager.STATES.WAITING;
    Storage.saveHistory(history);
    QueueManager.addPatient(hospitalName, patient);
    return patient;
  },

  getQueue: (hospitalName) => {
    const queues = Storage.getQueues();
    return queues[hospitalName] || [];
  },

  getAverageWaitTime: (hospitalName) => {
    const times = Storage.getServiceTimes(hospitalName);
    if (times.length === 0) return Storage.getSettings().defaultTime;
    return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  },

  getAnalytics: (hospitalName) => {
      const history = Storage.getHistory();
      const today = new Date().toISOString().split('T')[0];
      const todaysPatients = history.filter(p => p.servedAt && p.servedAt.startsWith(today));
      
      const servedToday = todaysPatients.filter(p => p.status === QueueManager.STATES.COMPLETED).length;
      const times = Storage.getServiceTimes(hospitalName);
      const avgWait = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

      return {
          servedToday,
          avgWait
      };
  }
};

/* ================= 4. UI CONTROLLER ================= */
const UI = {
  elements: {
    main: document.getElementById("main"),
    roleSelect: document.getElementById("roleSelect"),
    darkModeBtn: document.getElementById("darkModeBtn"),
    issueInput: document.getElementById("issueInput"),
    assistantResult: document.getElementById("assistantResult")
  },
  
  refreshInterval: null,
  lastServedToken: null,
  currentView: null,
  lastAnnouncementText: null,

  t: (key) => {
    const lang = Storage.getLanguage();
    return (Translations[lang] && Translations[lang][key]) || key;
  },

  init: () => {
    // Theme Init
    if (Storage.getTheme()) {
      document.body.classList.add("dark-mode");
      if(UI.elements.darkModeBtn) UI.elements.darkModeBtn.innerText = "☀️";
    }

    // Initialize Firebase Listeners (Real-time Sync)
    if (db) {
      db.ref().on('value', (snapshot) => {
        const val = snapshot.val();
        if (val) {
          if (val.hospitals) localStorage.setItem("swasth_hospitals", JSON.stringify(val.hospitals));
          if (val.queues) localStorage.setItem("swasth_queues", JSON.stringify(val.queues));
          if (val.history) localStorage.setItem("swasth_history", JSON.stringify(val.history));
          if (val.token_count) localStorage.setItem("swasth_tokenNo", val.token_count);
          if (val.settings) localStorage.setItem("swasth_settings", JSON.stringify(val.settings));
          
          if (val.current_patients) {
            Object.keys(val.current_patients).forEach(h => {
              localStorage.setItem(`swasth_current_${h}`, JSON.stringify(val.current_patients[h]));
            });
          }
          if (val.service_times) {
            Object.keys(val.service_times).forEach(h => {
              localStorage.setItem(`swasth_times_${h}`, JSON.stringify(val.service_times[h]));
            });
          }
          UI.render(); // Re-render UI with new data
        }
      });
    }

    // Auto-archive old history
    Storage.cleanupHistory();

    // Set Language Dropdown & Static Text
    const langSelect = document.getElementById("langSelect");
    if (langSelect) langSelect.value = Storage.getLanguage();
    UI.updateStaticText();

    // Event Listeners
    if (UI.elements.roleSelect) {
      UI.elements.roleSelect.addEventListener("change", UI.render);
    }

    // Listen for storage changes to sync across tabs (Local Mode)
    window.addEventListener('storage', () => {
      UI.render();
    });

    const urlParams = new URLSearchParams(window.location.search);
    const kioskHospital = urlParams.get('kiosk');

    // Auto-login check
    const session = Storage.getSession();
    if (session && !kioskHospital) {
      // Session Lock: Force hospital view if logged in
      if (UI.elements.roleSelect) {
        UI.elements.roleSelect.value = "hospital";
      }
    }

    if (kioskHospital) {
      if (UI.elements.roleSelect) {
        UI.elements.roleSelect.value = "patient";
        UI.elements.roleSelect.style.display = "none";
        // Hide Reset button (next sibling)
        if (UI.elements.roleSelect.nextElementSibling) UI.elements.roleSelect.nextElementSibling.style.display = "none";
      }
    }
    
    UI.render();
  },

  updateStaticText: () => {
    const t = UI.t;
    // Update static HTML elements
    const title = document.querySelector(".top h2");
    if (title) title.innerHTML = t("appTitle");
    
    const assistantTitle = document.querySelector(".assistant h3");
    if (assistantTitle) assistantTitle.innerText = t("healthAssistant");
    
    const issueInput = document.getElementById("issueInput");
    if (issueInput) issueInput.placeholder = t("describeProblem");
    
    const micBtn = document.getElementById("micBtn");
    if (micBtn) micBtn.innerText = t("speak");
    
    const checkBtn = document.querySelector(".assistant button:not(#micBtn)");
    if (checkBtn) checkBtn.innerText = t("check");

    const resetBtn = document.querySelector(".top button:last-child"); // Assuming Reset is last
    if (resetBtn && resetBtn.innerText.includes("Reset")) resetBtn.innerText = t("reset");
    
    // Add disclaimer
    const assistantDiv = document.querySelector(".assistant");
    let disclaimer = document.getElementById("assistantDisclaimer");
    if (!disclaimer) {
        disclaimer = document.createElement("small");
        disclaimer.id = "assistantDisclaimer";
        disclaimer.style.display = "block";
        disclaimer.style.marginTop = "10px";
        disclaimer.style.color = "#666";
        disclaimer.style.fontSize = "0.7rem";
        assistantDiv.appendChild(disclaimer);
    }
    disclaimer.innerText = t("assistantDisclaimer");
  },

  render: () => {
    const role = UI.elements.roleSelect ? UI.elements.roleSelect.value : "guest";
    const main = UI.elements.main;

    const performRender = () => {
      if (UI.refreshInterval) clearInterval(UI.refreshInterval);

      const assistantPanel = document.querySelector('.assistant');
      if (assistantPanel) {
        const urlParams = new URLSearchParams(window.location.search);
        const isKiosk = urlParams.get('kiosk');
        assistantPanel.style.display = (role === 'patient' && !isKiosk) ? 'block' : 'none';
      }

      if (role === "patient") UI.renderPatient();
      else UI.renderHospital();
    };

    if (UI.currentView && UI.currentView !== role) {
      main.classList.add('view-fade');
      setTimeout(() => { performRender(); main.classList.remove('view-fade'); }, 250);
    } else {
      performRender();
    }
    UI.currentView = role;
  },

  showToast: (msg, type = 'info') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${msg}</span> <button onclick="this.parentElement.remove()" style="background:none; border:none; color:inherit; cursor:pointer;">✕</button>`;
    container.appendChild(toast);
    
    setTimeout(() => toast.remove(), 4000);
  },

  flashScreen: () => {
    document.body.classList.add('flash-active');
    setTimeout(() => {
      document.body.classList.remove('flash-active');
    }, 3000);
  },

  // --- PATIENT VIEW ---
  renderPatient: () => {
    const hospitals = Storage.getHospitals();
    const names = Object.keys(hospitals);
    
    const urlParams = new URLSearchParams(window.location.search);
    const kioskHospital = urlParams.get('kiosk');
    const kioskDept = urlParams.get('dept');

    if (kioskHospital) {
      const displayTitle = kioskDept ? `${kioskHospital} <br><small style="font-size:1rem; opacity:0.8;">${kioskDept}</small>` : kioskHospital;
      UI.elements.main.innerHTML = `
        <div class="panel" style="text-align:center; border-top: 5px solid var(--accent); position: relative;">
          <button class="btn-icon" onclick="window.location.href='index.html'" style="position: absolute; left: 10px; top: 10px;" title="Exit Kiosk">✕</button>
          <button class="btn-icon" onclick="Actions.toggleFullScreen()" style="position: absolute; right: 10px; top: 10px;" title="Full Screen">⛶</button>
          <h2 style="margin:0; color:var(--primary); font-size: 2rem;">${displayTitle}</h2>
          <div id="kioskClock" style="font-size: 1.2rem; font-weight: bold; color: #555; margin-top: 5px;"></div>
          <p style="margin:0; opacity:0.7;">${UI.t('liveQueueStatus')}</p>
          <input type="hidden" id="patientHospital" value="${kioskHospital}">
          <input type="hidden" id="patientDept" value="${kioskDept || ''}">
        </div>
        <div class="panel queue-panel" style="height: calc(100vh - 220px);">
          <div id="queueView" class="queue-list">
            <p style="text-align:center; color:#888; margin-top:20px;">${UI.t('loading')}</p>
          </div>
        </div>
      `;
      UI.updatePatientQueue();
      UI.refreshInterval = setInterval(UI.updatePatientQueue, 5000);

      // Kiosk Clock
      const updateClock = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
        const clockEl = document.getElementById('kioskClock');
        if(clockEl) clockEl.innerHTML = `${dateString} • ${timeString}`;
      };
      updateClock();
      setInterval(updateClock, 1000);

      // Auto-scroll Logic for Kiosk
      const scrollContainer = document.querySelector('.queue-panel');
      let scrollDirection = 1;
      
      setInterval(() => {
        if (!scrollContainer) return;
        if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) return;

        scrollContainer.scrollTop += scrollDirection;

        // Reverse direction at ends
        if (scrollDirection === 1 && (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight)) scrollDirection = -1;
        else if (scrollDirection === -1 && scrollContainer.scrollTop <= 0) scrollDirection = 1;
      }, 50);

      return;
    }

    // Preserve Input State
    const state = {
      hospital: document.getElementById("patientHospital")?.value,
      dept: document.getElementById("patientDeptFilter")?.value,
      bookingVisible: document.getElementById("patientBookingSection")?.style.display === "block",
      bkName: document.getElementById("bkName")?.value,
      bkPhone: document.getElementById("bkPhone")?.value,
      bkIssue: document.getElementById("bkIssue")?.value,
      bkDate: document.getElementById("bkDate")?.value
    };

    UI.elements.main.innerHTML = `
      <div class="panel">
        <h3>${UI.t('patientDashboard')}</h3>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <select id="patientHospital" onchange="UI.updatePatientQueue()" style="flex:2; min-width:200px;">
            <option value="">${UI.t('selectHospital')}</option>
            ${names.map(h => `<option value="${h}">${h}</option>`).join("")}
          </select>
          <select id="patientDeptFilter" onchange="UI.updatePatientQueue()" style="flex:1; min-width:150px;">
            <option value="">${UI.t('allDepts')}</option>
            <option value="General">${UI.t('general')}</option>
            <option value="Cardiology">${UI.t('cardiology')}</option>
            <option value="Orthopedics">${UI.t('orthopedics')}</option>
            <option value="Pediatrics">${UI.t('pediatrics')}</option>
          </select>
        </div>
        <div id="availabilityBanner"></div>
        <div class="error-msg" id="patientMsg"></div>
        
        <!-- Booking Section -->
        <button id="showBookingBtn" class="secondary" style="margin-top:10px;" onclick="UI.toggleBookingForm()">${UI.t('bookAppointment')}</button>
        <button id="notifyBtn" class="secondary" onclick="UI.enableNotifications()" style="margin-top:5px; display:none;">🔔 Enable Notifications</button>
        <button id="repeatBtn" class="secondary" onclick="UI.repeatAnnouncement()" style="margin-top:5px; display:none;">🔊 ${UI.t('repeatAnnouncement')}</button>
        
        <div id="patientBookingSection" style="display:none; margin-top:15px; border-top:1px solid #eee; padding-top:15px;">
            <h4>${UI.t('bookAppointment')}</h4>
            <input id="bkName" placeholder="${UI.t('patientName')}">
            <input id="bkPhone" placeholder="${UI.t('phoneOptional')}">
            <input id="bkIssue" placeholder="${UI.t('healthIssue')}">
            <input id="bkDate" type="date">
            <button onclick="Actions.patientBook()">${UI.t('bookNow')}</button>
        </div>
      </div>
      <div class="panel queue-panel">
        <div id="queueView" class="queue-list">
          <p style="text-align:center; color:#888; margin-top:20px;">${UI.t('viewStatus')}</p>
        </div>
      </div>
    `;
    
    // Restore Input State or Default to Session
    const session = Storage.getSession();
    const targetHospital = state.hospital || session;

    if (targetHospital) {
      const hSelect = document.getElementById("patientHospital");
      if (hSelect) {
        hSelect.value = targetHospital;
        if (hSelect.value) UI.updatePatientQueue();
      }
    }
    if (state.dept) document.getElementById("patientDeptFilter").value = state.dept;
    if (state.bookingVisible) UI.toggleBookingForm();
    if (state.bkName) document.getElementById("bkName").value = state.bkName;
    if (state.bkPhone) document.getElementById("bkPhone").value = state.bkPhone;
    if (state.bkIssue) document.getElementById("bkIssue").value = state.bkIssue;
    if (state.bkDate) document.getElementById("bkDate").value = state.bkDate;

    if (Notification.permission === 'default') {
      setTimeout(() => {
        const btn = document.getElementById('notifyBtn');
        if(btn) btn.style.display = 'block';
      }, 100);
    }

    // Live Refresh every 5 seconds
    UI.refreshInterval = setInterval(UI.updatePatientQueue, 5000);
  },

  toggleBookingForm: () => {
    const form = document.getElementById("patientBookingSection");
    const btn = document.getElementById("showBookingBtn");
    if (form.style.display === "none") { form.style.display = "block"; btn.style.display = "none"; }
    else { form.style.display = "none"; btn.style.display = "block"; }
  },

  enableNotifications: () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          UI.showToast("Notifications enabled!", "success");
          const btn = document.getElementById('notifyBtn');
          if(btn) btn.style.display = 'none';
        }
      });
    }
  },

  repeatAnnouncement: () => {
    if (UI.lastAnnouncementText) {
      Assistant.speak(UI.lastAnnouncementText);
    }
  },

  updatePatientQueue: () => {
    const select = document.getElementById("patientHospital");
    const view = document.getElementById("queueView");
    if (!select || !view || !select.value) return;

    // Check Availability
    const isAvailable = Storage.getAvailability(select.value);
    const banner = document.getElementById("availabilityBanner");
    if (banner) {
      banner.innerHTML = isAvailable ? "" : `<div class="patient-alert" style="background:#ffebee; color:#c62828; border-color:#ef9a9a; margin-top:10px;">⚠️ ${UI.t('doctorUnavailable')}</div>`;
    }

    const current = Storage.getCurrentPatient(select.value);
    const repeatBtn = document.getElementById('repeatBtn');
    
    if (current) {
      UI.lastAnnouncementText = `Token number ${current.token}, ${current.name}, please proceed.`;
      if (repeatBtn) repeatBtn.style.display = 'block';
    } else {
      if (repeatBtn) repeatBtn.style.display = 'none';
    }

    if (current && current.token !== UI.lastServedToken) {
      UI.lastServedToken = current.token;
      
      // Audio Announcement (Text-to-Speech)
      const speechText = `Token number ${current.token}, ${current.name}, please proceed.`;
      Assistant.speak(speechText);
      UI.flashScreen();

      if (Notification.permission === "granted") {
        new Notification("SwasthFlow", {
          body: `Token ${current.token} (${current.name}) - It's your turn!`,
          icon: "swasth_logo.png"
        });
        if (typeof Assistant !== 'undefined' && Assistant.playBeep) {
          Assistant.playBeep(600);
          setTimeout(() => Assistant.playBeep(800), 300);
        }
      } else {
        UI.showToast(`Token ${current.token} is now being served!`, "info");
      }
    }

    const q = QueueManager.getQueue(select.value);
    const deptFilter = document.getElementById("patientDeptFilter")?.value;
    const filteredQ = deptFilter ? q.filter(p => (p.department || 'General') === deptFilter) : q;
    
    let cumulativeTime = 0;

    view.innerHTML = filteredQ.length === 0
      ? `<p style='text-align:center; margin-top:20px;'>${UI.t('noPatients')}</p>`
      : filteredQ.map((p, i) => {
          const waitTime = cumulativeTime;
          // Clamp wait time to minimum 5 mins if calculated is <= 0
          const est = p.estTime > 0 ? p.estTime : 5;
          cumulativeTime += est;
          
          const isNext = i === 0;
          const badgeClass = p.type === 'appointment' ? 'badge-appt' : 'badge-walkin';
          
          // Color Code Wait Time
          let timeColor = '#666';
          if (waitTime > 60) timeColor = '#e74c3c'; // Red > 1hr
          else if (waitTime > 30) timeColor = '#e67e22'; // Orange > 30m

          // Privacy: Mask Name
          const maskedName = p.name ? p.name.split(' ').map(n => n[0] + '***').join(' ') : 'Guest';

          return `
          <div class="queue-item" style="${p.priority ? 'border-left: 4px solid #ef4444' : ''}">
            <div class="token-badge">${p.token}</div>
            <div class="patient-info">
              <strong>${maskedName}</strong> 
              <span class="badge ${badgeClass}">${p.type}</span>
              <span class="badge badge-dept">${p.department || 'General'}</span>
              ${p.priority ? '🚨' : ''}
              <small style="color:${timeColor}; font-weight:bold;">🕒 ${UI.t('estWait')}: ${isNext ? UI.t('now') : waitTime + " " + UI.t('mins')}</small>
            </div>
            ${isNext ? `<span style='color:#e74c3c; font-weight:bold;'>${UI.t('nowServing')}</span>` : ""}
          </div>
        `}).join("");
  },

  // --- HOSPITAL VIEW ---
  renderHospital: () => {
    const session = Storage.getSession();
    if (!session) {
      UI.elements.main.innerHTML = `
        <div class="panel" style="text-align:center;">
          <h3>${UI.t('hospitalAccess')}</h3>
          <p>${UI.t('loginPrompt')}</p>
          <button onclick="window.location.href='login.html'">${UI.t('goToLogin')}</button>
        </div>
      `;
      return;
    }

    // Preserve Input State
    const inputIds = ["pname", "pphone", "pissue", "ptime", "pdate", "ptype", "pdept", "ppriority", "searchQueue", "filterDept"];
    const state = {};
    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) state[id] = (el.type === 'checkbox') ? el.checked : el.value;
    });

    const analytics = QueueManager.getAnalytics(session);
    const q = QueueManager.getQueue(session);
    const current = Storage.getCurrentPatient(session);
    const settings = Storage.getSettings();
    const history = Storage.getHistory().filter(p => p.token.startsWith("T-")); // Simple filter
    const isAvailable = Storage.getAvailability(session);
    
    UI.elements.main.innerHTML = `
      <!-- Analytics Dashboard -->
      <div class="analytics-grid" style="margin: 0 0 20px 0;">
        <div class="stat-card" onclick="Actions.toggleAvailability()" style="cursor:pointer; border-bottom: 4px solid ${isAvailable ? '#10b981' : '#ef4444'};" title="Click to Toggle">
          <div class="stat-val">${isAvailable ? '🟢' : '🔴'}</div>
          <small style="color:var(--text-light)">${isAvailable ? 'Available' : 'Away'}</small>
        </div>
        <div class="stat-card">
          <div class="stat-val">${q.length}</div>
          <small style="color:var(--text-light)">${UI.t('waiting')}</small>
        </div>
        <div class="stat-card">
          <div class="stat-val">${analytics.servedToday}</div>
          <small style="color:var(--text-light)">${UI.t('servedToday')}</small>
        </div>
        <div class="stat-card">
          <div class="stat-val">${analytics.avgWait}m</div>
          <small style="color:var(--text-light)">${UI.t('avgWait')}</small>
        </div>
      </div>

      <!-- Current Patient Card -->
      ${current ? `
        <div class="current-patient-card">
          <h3 style="margin-top:0; color:var(--primary); font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">${UI.t('nowServing')}</h3>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h1 style="margin:5px 0; font-size:2.5rem; color:var(--text-color);">${current.token}</h1>
              <div style="font-size:1.1rem;"><strong>${current.name}</strong> <span style="color:var(--text-light)">• ${current.issue}</span></div>
            </div>
            <div style="display:flex; gap:5px; flex-direction:column;">
              <button onclick="Actions.announce('${current.token}', '${(current.name || '').replace(/'/g, "\\'")}')" style="background:var(--primary);">📢 Call</button>
              <button onclick="Actions.complete()" style="background:#10b981;">${UI.t('complete')}</button>
              <button onclick="Actions.hold()" style="background:#64748b;">${UI.t('hold')}</button>
              <button onclick="Actions.noShow()" style="background:#ef4444;">${UI.t('noShow')}</button>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="panel">
        <h3>${UI.t('generateToken')}</h3>
        <input id="pname" placeholder="${UI.t('patientName')}">
        <span class="error-msg" id="err-name"></span>
        
        <input id="pphone" placeholder="${UI.t('phoneOptional')}">
        
        <input id="pissue" placeholder="${UI.t('healthIssue')}">
        <span class="error-msg" id="err-issue"></span>
        
        <div style="display:flex; gap:10px;">
          <input id="ptime" type="number" placeholder="${UI.t('estTime')} (${settings.defaultTime} ${UI.t('mins')})">
          <input id="pdate" type="date" title="${UI.t('selectDate')}">
          <select id="ptype">
            <option value="walkin">${UI.t('walkin')}</option>
            <option value="appointment">${UI.t('appointment')}</option>
          </select>
          <select id="pdept">
            <option value="General">${UI.t('general')}</option>
            <option value="Cardiology">${UI.t('cardiology')}</option>
            <option value="Orthopedics">${UI.t('orthopedics')}</option>
            <option value="Pediatrics">${UI.t('pediatrics')}</option>
          </select>
        </div>
        
        <div style="margin:10px 0; display:flex; align-items:center; gap:5px;">
          <input type="checkbox" id="ppriority" style="width:auto; margin:0;">
          <label for="ppriority"><strong>${UI.t('emergency')}</strong></label>
        </div>
        
        <button onclick="Actions.generateToken()">${UI.t('generateToken')}</button>
      </div>

      <div class="panel queue-panel">
        <div style="display:flex; gap:10px; margin-bottom:10px;">
          <input id="searchQueue" placeholder="${UI.t('searchPlaceholder')}" onkeyup="Actions.filterQueue()" style="flex:2;">
          <select id="filterDept" onchange="Actions.filterQueue()" style="flex:1;">
            <option value="">${UI.t('allDepts')}</option>
            <option value="General">${UI.t('general')}</option>
            <option value="Cardiology">${UI.t('cardiology')}</option>
            <option value="Orthopedics">${UI.t('orthopedics')}</option>
            <option value="Pediatrics">${UI.t('pediatrics')}</option>
          </select>
        </div>
        <div class="queue-list" id="hospitalQueueList">
          ${UI.generateQueueHTML(q)}
        </div>

        <div class="btn-group">
          <button onclick="Actions.serve()" ${current ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>${UI.t('serveNext')}</button>
          <button class="secondary" onclick="Actions.cancel()">${UI.t('cancelLast')}</button>
          <button class="secondary" style="background:#e0f7fa; color:#006064;" onclick="Actions.exportCSV()">${UI.t('csv')}</button>
          <button class="secondary" style="background:#e8eaf6; color:#3f51b5;" onclick="Actions.exportPDF()">${UI.t('pdf')}</button>
          <button class="secondary" style="background:#f3e5f5; color:#7b1fa2;" onclick="UI.renderSettings()">${UI.t('settings')}</button>
          <button class="secondary" style="background:#ffebee; color:#c62828;" onclick="Actions.logout()">${UI.t('logout')}</button>
        </div>
      </div>

      <!-- Recent History -->
      <div class="panel">
        <h3>${UI.t('recentHistory')}</h3>
        <div class="queue-list" style="max-height: 150px;">
          ${history.slice(0, 5).map(p => `
            <div class="queue-item" style="opacity:0.8;">
              <div class="token-badge" style="background:#7f8c8d;">${p.token}</div>
              <div class="patient-info">
                <strong>${p.name}</strong>
                <span class="badge badge-${p.status}">${p.status}</span>
                <div style="font-size:0.8rem; color:#666;">${p.remarks || ''}</div>
              </div>
              ${(p.status === 'cancelled' || p.status === 'noshow') ? `<button class="btn-icon" onclick="Actions.restore('${p.token}')" title="${UI.t('restore')}">↩️</button>` : ''}
            </div>
          `).join("")}
          ${history.length === 0 ? `<small>${UI.t('noHistory')}</small>` : ''}
        </div>
      </div>
    `;

    // Restore Input State
    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && state[id] !== undefined) {
        if (el.type === 'checkbox') el.checked = state[id];
        else el.value = state[id];
      }
    });

    // Re-apply filter if needed
    if (state.searchQueue || state.filterDept) Actions.filterQueue();
  },

  generateQueueHTML: (list) => {
    if (list.length === 0) return `<div class='empty-state'>${UI.t('queueEmpty')}</div>`;
    
    return list.map(p => `
      <div class="queue-item" style="${p.priority ? 'border-left: 4px solid #ef4444' : ''}">
        <div class="token-badge">${p.token}</div>
        <div class="patient-info">
          <strong>${p.name}</strong> 
          <span class="badge ${p.type === 'appointment' ? 'badge-appt' : 'badge-walkin'}">${p.type}</span>
          <span class="badge badge-dept">${p.department || 'General'}</span>
          ${p.status === 'hold' ? `<span class="badge badge-hold">${UI.t('hold')}</span>` : ''}
          ${p.priority ? '🚨' : ''}
          <small>${p.issue} • ${new Date(p.date).toLocaleDateString('en-IN')} (${p.estTime} ${UI.t('mins')})</small>
        </div>
        <button class="btn-icon" title="${UI.t('print')}" onclick="Actions.printToken('${p.token}', '${p.name}', '${p.issue}')">🖨️</button>
      </div>
    `).join("");
  },

  renderSettings: () => {
    const settings = Storage.getSettings();
    UI.elements.main.innerHTML = `
      <div class="panel">
        <h3>${UI.t('settingsTitle')}</h3>
        <label>${UI.t('defaultTime')}</label>
        <input id="set-time" type="number" value="${settings.defaultTime}">
        <div style="margin-top:10px; display:flex; gap:10px;">
          <button onclick="Actions.saveSettings()">${UI.t('saveChanges')}</button>
          <button class="secondary" onclick="UI.renderHospital()">${UI.t('back')}</button>
        </div>
        <div style="margin-top:20px; border-top:1px solid #eee; padding-top:10px;">
          <label>${UI.t('kioskMode')}</label>
          <p style="font-size:0.8rem; color:#666;">${UI.t('kioskDesc')}</p>
          <select id="kioskDeptSelect" style="margin-bottom:10px;">
            <option value="">${UI.t('allDepartments')}</option>
            <option value="General">${UI.t('general')}</option>
            <option value="Cardiology">${UI.t('cardiology')}</option>
            <option value="Orthopedics">${UI.t('orthopedics')}</option>
            <option value="Pediatrics">${UI.t('pediatrics')}</option>
          </select>
          <button class="secondary" onclick="Actions.openKiosk()">${UI.t('openKiosk')}</button>
        </div>
        <div style="margin-top:20px; border-top:1px solid #eee; padding-top:10px;">
          <label>${UI.t('dataManagement')}</label>
          <div style="display:flex; gap:10px; margin-top:5px;">
            <button class="secondary" onclick="Actions.backupData()">${UI.t('backupData')}</button>
            <button class="secondary" onclick="document.getElementById('restoreFile').click()">${UI.t('restoreData')}</button>
            <input type="file" id="restoreFile" style="display:none" onchange="Actions.restoreData(this)">
          </div>
        </div>
      </div>
    `;
  }
};

/* ================= 5. ACTIONS (Business Logic) ================= */
const Actions = {
  // --- AUTH ---
  signup: () => {
    const name = document.getElementById("hname").value.trim();
    const pass = document.getElementById("hpass").value.trim();
    
    if (!name || !pass) return UI.showToast("Please fill all fields", "error");
    
    const hospitals = Storage.getHospitals();
    if (hospitals[name]) return UI.showToast("Hospital already exists!", "error");

    hospitals[name] = Models.createHospital(name, pass);
    Storage.saveHospitals(hospitals);
    
    UI.showToast("Account created successfully!", "success");
    window.location.href = "login.html";
  },

  login: () => {
    const name = document.getElementById("hname").value.trim();
    const pass = document.getElementById("hpass").value.trim();
    
    const hospitals = Storage.getHospitals();
    if (hospitals[name] && hospitals[name].password === pass) {
      Storage.setSession(name);
      window.location.href = "index.html";
    } else {
      UI.showToast("Invalid credentials", "error");
    }
  },

  logout: () => {
    if(UI.elements.roleSelect) UI.elements.roleSelect.disabled = false;
    Storage.clearSession();
    UI.render();
  },

  sendSMS: (phone, message) => {
    // In a real application, this would call an external SMS API endpoint
    console.log(`[SMS] To: ${phone} | Message: ${message}`);
    UI.showToast(`📨 SMS sent to ${phone}`, "success");
  },

  // --- QUEUE ---
  generateToken: () => {
    const nameInput = document.getElementById("pname");
    const phoneInput = document.getElementById("pphone");
    const issueInput = document.getElementById("pissue");
    const timeInput = document.getElementById("ptime");
    const dateInput = document.getElementById("pdate");
    const priorityInput = document.getElementById("ppriority");
    const typeInput = document.getElementById("ptype");
    const deptInput = document.getElementById("pdept");
    const settings = Storage.getSettings();

    // Validation
    document.getElementById("err-name").innerText = "";
    document.getElementById("err-issue").innerText = "";
    
    if (!nameInput.value.trim()) {
      UI.showToast("Patient name is required", "error");
      return;
    }
    if (!issueInput.value.trim()) {
      UI.showToast("Health issue is required", "error");
      return;
    }

    const session = Storage.getSession();
    const dept = deptInput.value || "General";
    const tokenCount = Storage.incrementDeptTokenCount(dept);

    const patient = Models.createPatient(
      tokenCount,
      nameInput.value,
      issueInput.value,
      timeInput.value || settings.defaultTime,
      priorityInput.checked,
      typeInput.value,
      deptInput.value,
      dept,
      phoneInput.value,
      dateInput.value
    );

    QueueManager.addPatient(session, patient);
    
    // Simulate SMS Sending
    if (phoneInput.value) {
      Actions.sendSMS(phoneInput.value, `Token ${patient.token} generated. Est wait: ${patient.estTime} mins.`);
    }
    
    UI.showToast("Token Generated!", "success");

    // Clear form fields
    nameInput.value = "";
    phoneInput.value = "";
    issueInput.value = "";
    timeInput.value = "";
    dateInput.value = "";
    priorityInput.checked = false;
    typeInput.value = "walkin";
    deptInput.value = "General";
    
    UI.renderHospital();
  },

  patientBook: () => {
    const hospitalSelect = document.getElementById("patientHospital");
    const hospitalName = hospitalSelect.value;
    
    if (!hospitalName) return UI.showToast("Please select a hospital first", "error");

    const name = document.getElementById("bkName").value.trim();
    const phone = document.getElementById("bkPhone").value.trim();
    const issue = document.getElementById("bkIssue").value.trim();
    const date = document.getElementById("bkDate").value;

    if (!name || !issue || !date) return UI.showToast("Please fill all fields", "error");

    const dept = "General";
    const tokenCount = Storage.incrementDeptTokenCount(dept);

    const patient = Models.createPatient(
      tokenCount,
      name,
      issue,
      15, // Default time
      false, // Priority
      "appointment",
      "General",
      dept,
      phone,
      date
    );

    QueueManager.addPatient(hospitalName, patient);
    UI.showToast(UI.t('apptBooked'), "success");
    UI.toggleBookingForm();
    UI.updatePatientQueue();
  },

  serve: () => {
    const session = Storage.getSession();
    const result = QueueManager.startServing(session);
    if (!result) UI.showToast("Queue is empty", "error"); 
    else {
      UI.renderHospital();
      Actions.announce(result.token, result.name);

      // Notify next patient in line
      const q = QueueManager.getQueue(session);
      if (q.length > 0) {
        const next = q[0];
        if (next.phone) Actions.sendSMS(next.phone, `Hi ${next.name}, you are next in line (Token ${next.token}). Please be ready.`);
      }
    }
  },

  announce: (token, name) => {
    let text = UI.t('announcementTemplate');
    text = text.replace('{token}', token).replace('{name}', name);
    
    // Store for repeat button
    UI.lastAnnouncementText = text;
    Assistant.speak(text);
    UI.flashScreen();
  },

  complete: () => {
    const session = Storage.getSession();
    const remarks = prompt("Doctor's Notes / Diagnosis:");
    if (remarks === null) return;
    
    QueueManager.completeServing(session, remarks);
    QueueManager.completeServing(session, "");
    UI.showToast("Patient Served", "success");
    UI.renderHospital();
  },

  hold: () => {
    const session = Storage.getSession();
    QueueManager.holdPatient(session);
    UI.showToast("Patient put on Hold", "info");
    UI.renderHospital();
  },

  noShow: () => {
    const session = Storage.getSession();
    if(!confirm("Mark patient as No-Show?")) return;
    QueueManager.markNoShow(session);
    UI.showToast("Marked as No-Show", "info");
    UI.renderHospital();
  },

  cancel: () => {
    const session = Storage.getSession();
    if (!confirm("Cancel last patient?")) return;
    
    const result = QueueManager.cancelLast(session);
    if (!result) UI.showToast("Queue is empty", "error");
    else {
      UI.showToast("Patient Cancelled", "info");
      UI.renderHospital();
    }
  },

  restore: (token) => {
    const session = Storage.getSession();
    const result = QueueManager.restorePatient(session, token);
    if (result) {
      UI.showToast(`Token ${token} restored to queue`, "success");
      UI.renderHospital();
    }
  },

  filterQueue: () => {
    const term = document.getElementById("searchQueue").value.toLowerCase();
    const deptFilter = document.getElementById("filterDept").value;
    const session = Storage.getSession();
    const q = QueueManager.getQueue(session);
    
    const filtered = q.filter(p => {
      const matchesTerm = p.name.toLowerCase().includes(term) || p.token.toLowerCase().includes(term);
      const matchesDept = deptFilter === "" || (p.department || 'General') === deptFilter;
      return matchesTerm && matchesDept;
    });
    
    document.getElementById("hospitalQueueList").innerHTML = UI.generateQueueHTML(filtered);
  },

  exportCSV: () => {
    const session = Storage.getSession();
    const q = QueueManager.getQueue(session);
    if (q.length === 0) return UI.showToast("No data to export", "error");

    const headers = ["Token", "Name", "Phone", "Issue", "Type", "Department", "Priority", "Est Time"];
    const rows = q.map(p => [
      p.token,
      `"${p.name}"`,
      `"${p.phone || ''}"`,
      `"${p.issue}"`,
      p.type,
      p.department || 'General',
      p.priority ? "Yes" : "No",
      p.estTime
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${session}_queue.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportPDF: () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const history = Storage.getHistory().filter(p => p.token && p.token.startsWith("T-"));
    if (history.length === 0) return UI.showToast("No history to export", "error");

    const session = Storage.getSession();
    
    // Header
    doc.setFontSize(18);
    doc.text(`${session} - Patient History`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    // Table Data
    const tableColumn = ["Token", "Name", "Issue", "Status", "Date", "Remarks"];
    const tableRows = history.map(p => [
      p.token,
      p.name,
      p.issue,
      p.status.toUpperCase(),
      new Date(p.servedAt || p.joinedAt).toLocaleDateString(),
      p.remarks || '-'
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 35 });
    doc.save(`${session}_history.pdf`);
  },

  saveSettings: () => {
    const time = document.getElementById("set-time").value;
    if (!time || time <= 0) return UI.showToast("Please enter a valid time", "error");
    Storage.saveSettings({ defaultTime: Number(time) });
    UI.showToast("Settings saved", "success");
    UI.renderHospital();
  },

  openKiosk: () => {
    const session = Storage.getSession();
    if (!session) return;
    
    const dept = document.getElementById("kioskDeptSelect") ? document.getElementById("kioskDeptSelect").value : '';
    let url = `index.html?kiosk=${encodeURIComponent(session)}`;
    if (dept) url += `&dept=${encodeURIComponent(dept)}`;
    window.open(url, '_blank');
  },

  toggleFullScreen: () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.log(e));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  printToken: (token, name, issue) => {
    // Generate QR Code pointing to the current URL (Patient View)
    // Note: For this to work on mobile, the app must be hosted on a public URL or local network IP.
    const trackingUrl = `${window.location.href.split('?')[0]}?kiosk=${encodeURIComponent(Storage.getSession())}`;
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(trackingUrl)}`;

    const win = window.open('', '', 'width=400,height=600');
    win.document.write(`
      <html>
        <body style="font-family: 'Courier New', monospace; text-align: center; padding: 20px; border: 2px dashed #333; margin: 20px;">
          <h2 style="margin:0;">SwasthFlow Hospital</h2>
          <p>Queue Token</p>
          <h1 style="font-size: 3rem; margin: 10px 0;">${token}</h1>
          <p><strong>Patient:</strong> ${name}</p>
          <p><strong>Issue:</strong> ${issue}</p>
          <div style="margin: 20px 0;">
            <img src="${qrSrc}" alt="Scan to Track" width="120" height="120"/>
            <p style="font-size: 0.8rem; margin-top: 5px;">Scan to track live status</p>
          </div>
          <p style="margin-top:20px; font-size:0.8rem;">${new Date().toLocaleString('en-IN')}</p>
          <script>
            window.onload = function() { setTimeout(function() { window.print(); window.close(); }, 500); }
          </script>
        </body>
      </html>
    `);
  },

  backupData: () => {
    const data = Storage.getBackup();
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `swasthflow_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    UI.showToast("Backup downloaded", "success");
  },

  restoreData: (input) => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        Storage.restoreBackup(e.target.result);
        UI.showToast("Data restored successfully", "success");
      } catch (err) {
        UI.showToast("Invalid backup file", "error");
      }
    };
    reader.readAsText(file);
  },

  toggleAvailability: () => {
    const session = Storage.getSession();
    const current = Storage.getAvailability(session);
    Storage.setAvailability(session, !current);
    UI.renderHospital();
    UI.showToast(current ? "Status set to Away" : "Status set to Available", current ? "info" : "success");
  }
};

/* ================= 6. HEALTH ASSISTANT ================= */
const Assistant = {
  checkHealth: () => {
    const input = UI.elements.issueInput;
    const result = UI.elements.assistantResult;
    if (!input || !result) return;

    const text = input.value.toLowerCase();
    let speechText = "";
    let precautions = "";

    // Department Analysis
    let deptKey = "general";
    if (["heart", "chest", "pulse", "bp", "pressure"].some(x => text.includes(x))) deptKey = "cardiology";
    else if (["bone", "fracture", "joint", "knee", "back", "spine"].some(x => text.includes(x))) deptKey = "orthopedics";
    else if (["child", "baby", "infant", "kid"].some(x => text.includes(x))) deptKey = "pediatrics";

    if (["cold","fever","cough","headache"].some(x => text.includes(x))) {
      result.innerHTML = `🩺 <strong>${UI.t('assistantMinor')}</strong>`;
      speechText = UI.t('assistantMinor');
      precautions = "<ul style='text-align:left; margin-top:10px; font-size:0.85rem; padding-left:20px;'><li>Stay hydrated and rest.</li><li>Monitor your temperature.</li><li>Wear a mask if coughing.</li></ul>";
      speechText += " Stay hydrated and rest. Monitor your temperature. Wear a mask if coughing.";
    } else if (["chest","breathing","heart","bleeding"].some(x => text.includes(x))) {
      result.innerHTML = `🚨 <strong>${UI.t('assistantSerious')}</strong>`;
      speechText = UI.t('assistantSerious');
      precautions = "<ul style='text-align:left; margin-top:10px; font-size:0.85rem; padding-left:20px; color:#c62828;'><li><strong>Call Emergency immediately.</strong></li><li>Do not drive yourself.</li><li>Sit down and stay calm.</li></ul>";
      speechText += " Call Emergency immediately. Do not drive yourself. Sit down and stay calm.";
    } else {
      result.innerHTML = UI.t('assistantDefault');
      speechText = UI.t('assistantDefault');
      precautions = "<div style='margin-top:10px; font-size:0.85rem;'>Please describe your symptoms clearly to the doctor.</div>";
      speechText += " Please describe your symptoms clearly to the doctor.";
    }

    const deptName = UI.t(deptKey) || deptKey;
    result.innerHTML += `<div style='margin-top:8px; font-weight:600; color:var(--primary);'>🏥 Suggested Dept: ${deptName}</div>`;
    speechText += ` I suggest visiting the ${deptName} department.`;

    result.innerHTML += precautions;
    Assistant.speak(speechText);
  },

  speak: (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice language based on App Language
    const langMap = { 'en': 'en-US', 'hi': 'hi-IN', 'te': 'te-IN' };
    utterance.lang = langMap[Storage.getLanguage()] || 'en-US';
    
    window.speechSynthesis.speak(utterance);
  },

  startListening: () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported");

    const btn = document.getElementById("micBtn");
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      if (btn) btn.classList.add("listening");
      Assistant.playBeep(800);
    };

    recognition.onend = () => {
      if (btn) btn.classList.remove("listening");
      Assistant.playBeep(400);
    };

    recognition.onresult = (event) => {
      UI.elements.issueInput.value = event.results[0][0].transcript;
      Assistant.checkHealth();
    };
    recognition.start();
  },

  playBeep: (freq) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.start();
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
  }
};

/* ================= 7. GLOBAL EXPORTS & INIT ================= */
window.onload = UI.init;

// Expose functions to HTML
window.toggleDarkMode = () => {
  const isDark = document.body.classList.toggle("dark-mode");
  Storage.setTheme(isDark);
  document.getElementById("darkModeBtn").innerText = isDark ? "☀️" : "🌙";
};

window.resetApp = Storage.reset;
window.checkHealth = Assistant.checkHealth;
window.startListening = Assistant.startListening;

window.changeLanguage = () => {
  const lang = document.getElementById("langSelect").value;
  Storage.setLanguage(lang);
  UI.updateStaticText();
  UI.render();
};

// Auth & Actions
window.signup = Actions.signup;
window.login = Actions.login;
window.goToLogin = () => window.location.href = "login.html";
window.goToSignup = () => window.location.href = "signup.html";
window.Actions = Actions;
window.UI = UI;
window.Assistant = Assistant;