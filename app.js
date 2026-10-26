/**
 * THE FIRST 10 MINUTES — Calibrated Crisis Decision Intelligence Engine
 * Frontend Simulation, Optimal Stopping, Twin Test Benchmark, & Causal Foresight HUD
 * Connected to live FastAPI Bayesian Forward Filter Core with Offline Fallback
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIZER (Pure Web Audio API) ---
  let audioCtx = null;
  let audioEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.08) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playTickSound() {
    playTone(880, 0.04, 'triangle', 0.05);
  }

  function playAlertChime() {
    if (!audioEnabled || !audioCtx) return;
    playTone(520, 0.12, 'sine', 0.1);
    setTimeout(() => playTone(780, 0.25, 'sine', 0.12), 100);
  }

  function playAlarmKlaxon() {
    if (!audioEnabled || !audioCtx) return;
    playTone(340, 0.15, 'sawtooth', 0.15);
    setTimeout(() => playTone(450, 0.25, 'sawtooth', 0.18), 120);
  }

  function playButtonThud() {
    playTone(140, 0.18, 'sine', 0.25);
  }

  // --- OFFLINE FALLBACK DEMO DATA DEFINITIONS ---
  const FALLBACK_PREFIX_EVENTS = [
    {
      minute: 0,
      timestamp: '00:00',
      type: 'sensor',
      source: 'METEOROLOGICAL_RADAR',
      node: 'radar_station_sector4',
      text: 'Precipitation rate surges to 45mm/h across Sector 4 & Central Basin. Storm velocity: 34 km/h East.',
      badges: []
    },
    {
      minute: 1,
      timestamp: '00:01',
      type: 'sensor',
      source: 'HYDRO_STREAM_MONITOR',
      node: 'storm_culvert_s4_14',
      text: 'Hydraulic runoff volume rises. Storm culvert level at 68% threshold capacity (normal: 24%).',
      badges: []
    },
    {
      minute: 2,
      timestamp: '00:02',
      type: 'sensor',
      source: 'CIVIC_INFRA_SENSORS',
      node: 'river_embankment_piezo_09',
      text: 'Micro-vibration telemetry logged along River Embankment. Ambient road traffic velocity drops by 18%.',
      badges: []
    },
    {
      minute: 3,
      timestamp: '00:03',
      type: 'sensor',
      source: 'URBAN_DRAINAGE_TELEMETRY',
      node: 'drainage_culvert_48',
      text: 'Drainage sensors report differential pressure anomalies across Sector 4 sub-collectors. Flow velocity spikes.',
      badges: ['ANOMALY']
    },
    {
      minute: 4,
      timestamp: '00:04',
      type: 'dispatch',
      source: '911_PUBLIC_SAFETY_LOG',
      node: 'cad_dispatch_sector4',
      text: '14 emergency calls logged reporting curb overflow on low-lying avenues. Municipal bus line 404 initiates street detour.',
      badges: ['911 INTAKE']
    },
    {
      minute: 5,
      timestamp: '00:05',
      type: 'sensor',
      source: 'TRANSIT_CAMERA_AI',
      node: 'arterial_cam_river_blvd',
      text: 'Arterial traffic slows drastically along River Boulevard (-68% speed reduction; localized gridlock). Standing water detected on asphalt.',
      badges: []
    },
    {
      minute: 6,
      timestamp: '00:06',
      type: 'social',
      source: 'CITIZEN_SOCIAL_STREAM',
      node: 'geo_sentiment_cluster_s4',
      text: 'Citizen video uploads show storm drain regurgitation near River Plaza. Dispatch reports 3 stalled commuter cars.',
      badges: ['OUT-OF-ORDER']
    },
    {
      minute: 7,
      timestamp: '00:07',
      type: 'dispatch',
      source: 'EMERGENCY_DISPATCH_911',
      node: 'cad_queue_monitor',
      text: 'Emergency 911 queue load exceeds baseline (+240% call influx). 6 domestic basement inundation calls confirmed in Sector 4.',
      badges: ['HIGH LOAD']
    }
  ];

  const FALLBACK_ALPHA_POST = [
    {
      minute: 8,
      timestamp: '00:08',
      type: 'sensor',
      source: 'POWER_GRID_SCADA',
      node: 'substation_07_north',
      text: 'CRITICAL: Substation 07 electrical breaker trip telemetry disconnects! Ultrasonic water sensor at Levee 4 hits 94% critical margin.',
      badges: ['GRID TRIP', 'STRUCTURAL ALERT']
    },
    {
      minute: 9,
      timestamp: '00:09',
      type: 'hospital',
      source: 'REGIONAL_HOSPITAL_NETWORK',
      node: 'metro_general_trauma',
      text: 'Metro General & St. Jude Hospitals report unusual mass arrivals. Basement medical backup generators switch on due to brownout surge.',
      badges: ['HOSPITAL ALERT', 'POWER BROWNOUT']
    },
    {
      minute: 10,
      timestamp: '00:10',
      type: 'sensor',
      source: 'DISASTER_RECON_DRONE',
      node: 'uav_recon_river_basin',
      text: 'EMERGENCY: Levee 4 structural micro-fissure breached. Cascading inundation pouring into power grid transformer field. Sector blackout imminent.',
      badges: ['BREACH CONFIRMED', 'CASCADING CRISIS']
    }
  ];

  const FALLBACK_BETA_POST = [
    {
      minute: 8,
      timestamp: '00:08',
      type: 'sensor',
      source: 'TELECOM_INFRA_HEALTH',
      node: 'gw_telecom_trunk_north',
      text: 'COMMON-CAUSE OUTAGE: Municipal fiber conduit severed by construction backhoe 5 miles away. 80 sensors drop offline simultaneously. Physical drains intact.',
      badges: ['GATEWAY CUTOUT', 'NON-CRISIS']
    },
    {
      minute: 9,
      timestamp: '00:09',
      type: 'hospital',
      source: 'REGIONAL_HOSPITAL_NETWORK',
      node: 'health_dept_epidemiology',
      text: 'Hospital intake spike verified as seasonal norovirus / pediatric flu cluster from local school event, completely unrelated to storm rainfall.',
      badges: ['ISOLATED CLUSTER', 'VERIFIED BENIGN']
    },
    {
      minute: 10,
      timestamp: '00:10',
      type: 'sensor',
      source: 'HYDRO_STREAM_MONITOR',
      node: 'storm_culvert_s4_14',
      text: 'Storm runoff drains cleared. Culvert water levels receding to 42%. Arterial traffic resumes normal flow. No municipal damage occurred.',
      badges: ['RECOVERY', 'FALSE ALARM AVOIDED']
    }
  ];

  const FALLBACK_BELIEF_ALPHA = [
    { m: 0, p: [0.60, 0.15, 0.15, 0.10], action: 'WATCH', rat: 'Precipitation within baseline range. Expected background variance.' },
    { m: 1, p: [0.45, 0.18, 0.17, 0.20], action: 'WATCH', rat: 'Runoff rising normally. Twin prefix indistinguishable.' },
    { m: 2, p: [0.38, 0.20, 0.18, 0.24], action: 'WATCH', rat: 'Traffic slight deceleration. Cost of premature alarm exceeds risk.' },
    { m: 3, p: [0.30, 0.20, 0.19, 0.31], action: 'PREPARE', rat: 'Drainage anomalies detect differential pressure. Low-cost internal readiness.' },
    { m: 4, p: [0.25, 0.18, 0.19, 0.38], action: 'PREPARE', rat: 'Dispatch call frequency climbing. Retain agency standby.' },
    { m: 5, p: [0.22, 0.18, 0.18, 0.42], action: 'PREPARE', rat: 'Corridor stagnant. Twin prefix uncertainty high (entropy 1.95 bits).' },
    { m: 6, p: [0.22, 0.18, 0.18, 0.42], action: 'PREPARE', rat: 'Out-of-order packets buffered. Honest mixture ceiling enforced.' },
    { m: 7, p: [0.22, 0.18, 0.18, 0.42], action: 'PREPARE', rat: '911 queue saturation. Maintained prefix ceiling before physical divergence.' },
    { m: 8, p: [0.05, 0.08, 0.13, 0.74], action: 'ALERT', rat: 'Substation SCADA disconnect matches physical breach hypothesis! Fast commitment.' },
    { m: 9, p: [0.01, 0.03, 0.06, 0.90], action: 'ESCALATE', rat: 'Hospitals loss of primary grid confirms cascading domino failure. TRIGGER PUBLIC ESCALATE!' },
    { m: 10, p: [0.00, 0.01, 0.01, 0.98], action: 'ESCALATE', rat: 'Breach confirmed. Full emergency mitigation underway with +8 min lead time.' }
  ];

  const FALLBACK_BELIEF_BETA = [
    { m: 0, p: [0.60, 0.15, 0.15, 0.10], action: 'WATCH', rat: 'Precipitation within baseline range. Expected background variance.' },
    { m: 1, p: [0.45, 0.18, 0.17, 0.20], action: 'WATCH', rat: 'Runoff rising normally. Twin prefix indistinguishable.' },
    { m: 2, p: [0.38, 0.20, 0.18, 0.24], action: 'WATCH', rat: 'Traffic slight deceleration. Cost of premature alarm exceeds risk.' },
    { m: 3, p: [0.30, 0.20, 0.19, 0.31], action: 'PREPARE', rat: 'Drainage anomalies detect differential pressure. Low-cost internal readiness.' },
    { m: 4, p: [0.25, 0.18, 0.19, 0.38], action: 'PREPARE', rat: 'Dispatch call frequency climbing. Retain agency standby.' },
    { m: 5, p: [0.22, 0.18, 0.18, 0.42], action: 'PREPARE', rat: 'Corridor stagnant. Twin prefix uncertainty high (entropy 1.95 bits).' },
    { m: 6, p: [0.22, 0.18, 0.18, 0.42], action: 'PREPARE', rat: 'Out-of-order packets buffered. Honest mixture ceiling enforced.' },
    { m: 7, p: [0.22, 0.18, 0.18, 0.42], action: 'PREPARE', rat: '911 queue saturation. Maintained prefix ceiling before physical divergence.' },
    { m: 8, p: [0.55, 0.25, 0.09, 0.11], action: 'PREPARE', rat: 'Sensor cluster failure attributed to single fiber sever! Crisis probability collapses to 11%.' },
    { m: 9, p: [0.68, 0.20, 0.07, 0.05], action: 'WATCH', rat: 'Hospital surge identified as pediatric flu outbreak. H3 ruled out. False alarm prevented.' },
    { m: 10, p: [0.82, 0.12, 0.04, 0.02], action: 'WATCH', rat: 'Drainage levels normalizing. $2.5M municipal panic penalty avoided!' }
  ];

  function getFallbackForesightPredictions(minute, scenario) {
    if (minute <= 2) {
      return [
        { target: 'Culvert S4-B pressure differential exceeds 2.5σ', window: '00:03 &ndash; 00:04', conf: '88%' },
        { target: 'River Boulevard arterial velocity drop &gt; 50%', window: '00:04 &ndash; 00:06', conf: '74%' },
        { target: 'Sector 4 911 dispatch queue surge &gt; 200%', window: '00:06 &ndash; 00:08', conf: '62%' }
      ];
    } else if (minute <= 5) {
      return [
        { target: 'River Boulevard standstill & surface pooling', window: '00:05 &ndash; 00:06', conf: '94%' },
        { target: '911 intake calls spike with basement flood reports', window: '00:06 &ndash; 00:07', conf: '89%' },
        { target: 'Telemetry split between physical breach vs gateway cut', window: '00:07 &ndash; 00:08', conf: '81%' }
      ];
    } else if (minute <= 7) {
      if (scenario === 'alpha') {
        return [
          { target: 'Substation 07 transformer submersion / breaker trip', window: '00:08 &ndash; 00:09', conf: '84%' },
          { target: 'Medical emergency generator transfer (Metro General)', window: '00:09 &ndash; 00:10', conf: '78%' },
          { target: 'Levee 4 hydraulic structural failure', window: '00:10 &ndash; 00:12', conf: '72%' }
        ];
      } else {
        return [
          { target: 'Telecom gateway fiber cut acknowledgement', window: '00:08 &ndash; 00:09', conf: '85%' },
          { target: 'Hospital arrivals categorized as viral pediatric cluster', window: '00:09 &ndash; 00:10', conf: '82%' },
          { target: 'Culvert drainage normalization & traffic clearing', window: '00:10 &ndash; 00:13', conf: '76%' }
        ];
      }
    } else {
      if (scenario === 'alpha') {
        return [
          { target: 'Levee 4 breach expanding; flood wave transit', window: '00:10 &ndash; 00:15', conf: '99%' },
          { target: 'Sector 4 regional power grid blackout', window: '00:11 &ndash; 00:16', conf: '96%' },
          { target: 'Emergency water rescue boat deployment', window: '00:13 &ndash; 00:20', conf: '91%' }
        ];
      } else {
        return [
          { target: 'Telecom fiber splice truck on site', window: '00:11 &ndash; 00:15', conf: '95%' },
          { target: 'Surface street water clearance by city pumps', window: '00:12 &ndash; 00:18', conf: '98%' },
          { target: 'Normal transit corridor schedules restored', window: '00:15 &ndash; 00:25', conf: '99%' }
        ];
      }
    }
  }

  // --- STATE ---
  let currentMinute = 0;
  let currentScenario = 'alpha'; // 'alpha' (twin_cascade) or 'beta' (twin_benign)
  let isPlaying = false;
  let playInterval = null;
  let playSpeed = 1500; // ms per minute
  let activeFilter = 'all';
  let activeCapFormat = 'json';

  // Live timeline cache from API { minute: MinuteStatePayload }
  let liveTimelineCache = {};
  let isApiOnline = false;

  // Adversity toggles
  let flagGatewayDrop = false;
  let flagRumorMimic = false;
  let flagStreamJitter = false;
  let flagStructuredLie = false;

  // Duty officer interactive state
  let userEscalatedAtMinute = null;

  // DOM Elements
  const clockDisplay = document.getElementById('clockDisplay');
  const currentMinuteNum = document.getElementById('currentMinuteNum');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const playIcon = document.getElementById('playIcon');
  const playBtnText = document.getElementById('playBtnText');
  const btnPrevMin = document.getElementById('btnPrevMin');
  const btnNextMin = document.getElementById('btnNextMin');
  const btnResetSim = document.getElementById('btnResetSim');
  const btnScenarioAlpha = document.getElementById('btnScenarioAlpha');
  const btnScenarioBeta = document.getElementById('btnScenarioBeta');
  const timelineProgress = document.getElementById('timelineProgress');
  const scrubNodes = document.getElementById('scrubNodes');
  const streamEventList = document.getElementById('streamEventList');
  const streamEventCount = document.getElementById('streamEventCount');
  const soundToggle = document.getElementById('soundToggle');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.getElementById('audioLabel');

  // Status & Badges
  const systemStatusIndicator = document.getElementById('systemStatusIndicator');
  const systemStatusText = document.getElementById('systemStatusText');
  const offlineBadge = document.getElementById('offlineBadge');

  // Open-Meteo Weather
  const weatherStatus = document.getElementById('weatherStatus');
  const weatherRefreshBtn = document.getElementById('weatherRefreshBtn');
  const weatherTemperature = document.getElementById('weatherTemperature');
  const weatherDescription = document.getElementById('weatherDescription');
  const weatherRain = document.getElementById('weatherRain');
  const weatherWind = document.getElementById('weatherWind');
  const weatherWindDirection = document.getElementById('weatherWindDirection');
  const weatherPressure = document.getElementById('weatherPressure');
  const weatherForecastTime = document.getElementById('weatherForecastTime');

  const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
  const WEATHER_REFRESH_INTERVAL_MS = 15 * 60 * 1000;

  // Probability bars
  const probH0 = document.getElementById('probH0');
  const probH1 = document.getElementById('probH1');
  const probH2 = document.getElementById('probH2');
  const probH3 = document.getElementById('probH3');
  const barH0 = document.getElementById('barH0');
  const barH1 = document.getElementById('barH1');
  const barH2 = document.getElementById('barH2');
  const barH3 = document.getElementById('barH3');
  const entropyMetric = document.getElementById('entropyMetric');

  // Recommended Action
  const actionStateBadge = document.getElementById('actionStateBadge');
  const actionRationale = document.getElementById('actionRationale');
  const hysteresisStatus = document.getElementById('hysteresisStatus');
  const gaugeCryWolf = document.getElementById('gaugeCryWolf');
  const gaugeDamageAvoided = document.getElementById('gaugeDamageAvoided');
  const valCryWolf = document.getElementById('valCryWolf');
  const valDamage = document.getElementById('valDamage');

  // Foresight & Attribution
  const foresightList = document.getElementById('foresightList');
  const attributionContent = document.getElementById('attributionContent');
  const causalGraphCanvas = document.getElementById('causalGraphCanvas');

  // CAP Alert Panel
  const btnCapJson = document.getElementById('btnCapJson');
  const btnCapXml = document.getElementById('btnCapXml');
  const capStatusText = document.getElementById('capStatusText');
  const capPulseIndicator = document.getElementById('capPulseIndicator');
  const capCodeContent = document.getElementById('capCodeContent');

  // Duty officer
  const dutyOfficerButton = document.getElementById('dutyOfficerButton');
  const userDecisionText = document.getElementById('userDecisionText');
  const machinePolicyText = document.getElementById('machinePolicyText');
  const twinScoreText = document.getElementById('twinScoreText');
  const dutyOutcomeText = document.getElementById('dutyOutcomeText');

  // Filter tabs & speed buttons
  const filterTabs = document.querySelectorAll('.filter-tab');
  const speedBtns = document.querySelectorAll('.speed-btn');

  // Cost calculator sliders
  const inputFalseAlarm = document.getElementById('inputFalseAlarm');
  const inputDelayDamage = document.getElementById('inputDelayDamage');
  const inputPrepare = document.getElementById('inputPrepare');
  const inputPrior = document.getElementById('inputPrior');
  const valFalseAlarmCost = document.getElementById('valFalseAlarmCost');
  const valDelayDamageCost = document.getElementById('valDelayDamageCost');
  const valPrepareCost = document.getElementById('valPrepareCost');
  const valPriorProb = document.getElementById('valPriorProb');
  const threshPrepare = document.getElementById('threshPrepare');
  const threshAlert = document.getElementById('threshAlert');
  const threshEscalate = document.getElementById('threshEscalate');
  const calcDynamicInsight = document.getElementById('calcDynamicInsight');

  // Schema tabs
  const schemaBtns = document.querySelectorAll('.schema-btn');
  const schemaCodeContent = document.getElementById('schemaCodeContent');

  // Build Timeline Scrubber Nodes (00 to 10)
  function initScrubber() {
    scrubNodes.innerHTML = '';
    for (let i = 0; i <= 10; i++) {
      const node = document.createElement('div');
      node.className = `scrub-node ${i === 0 ? 'active' : ''}`;
      node.dataset.min = i;
      node.title = `Jump to Minute 00:${i < 10 ? '0' + i : i}`;

      const label = document.createElement('span');
      label.className = 'scrub-node-label';
      label.innerText = `00:${i < 10 ? '0' + i : i}`;

      node.appendChild(label);
      node.addEventListener('click', () => {
        initAudio();
        setMinute(i);
      });
      scrubNodes.appendChild(node);
    }
  }

  // Shannon entropy in bits: H(P) = - sum(p * log2(p))
  function calculateEntropy(probs) {
    let entropy = 0;
    probs.forEach(p => {
      if (p > 0.0001) {
        entropy -= p * Math.log2(p);
      }
    });
    return Math.max(0, entropy);
  }

  // --- BACKEND INTEGRATION HELPERS ---
  async function loadEpisodeFromApi(scenario = currentScenario) {
    if (!window.CrisisSenseAPI) return false;
    const scenarioKey = scenario === 'alpha' ? 'twin_cascade' : 'twin_benign';
    try {
      await window.CrisisSenseAPI.startEpisode(scenarioKey, 42, 1.0);
      const timelineData = await window.CrisisSenseAPI.getTimeline();
      if (timelineData && timelineData.timeline) {
        liveTimelineCache = timelineData.timeline;
        isApiOnline = true;
        updateConnectionBadge(true);
        return true;
      }
    } catch (e) {
      console.warn('Backend unavailable, using offline demo mode:', e);
      isApiOnline = false;
      updateConnectionBadge(false);
    }
    return false;
  }

  function updateConnectionBadge(online) {
    isApiOnline = online;
    if (offlineBadge) {
      offlineBadge.style.display = online ? 'none' : 'inline-block';
    }
    if (systemStatusText) {
      systemStatusText.innerText = online ? 'LIVE ENGINE' : 'OFFLINE DEMO';
    }
    if (systemStatusIndicator) {
      systemStatusIndicator.className = online ? 'status-indicator live' : 'status-indicator offline';
    }
  }

  // --- HUD UPDATE DISPATCHER ---
  async function updateSimulationHUD() {
    // Clock formatting
    const formattedMin = currentMinute < 10 ? `0${currentMinute}` : `${currentMinute}`;
    clockDisplay.innerText = `00:${formattedMin}`;
    currentMinuteNum.innerText = currentMinute;

    // Timeline scrubber nodes progress
    const pct = (currentMinute / 10) * 100;
    timelineProgress.style.width = `${pct}%`;

    const nodes = scrubNodes.querySelectorAll('.scrub-node');
    nodes.forEach(node => {
      const m = parseInt(node.dataset.min, 10);
      node.classList.remove('active', 'passed');
      if (m === currentMinute) {
        node.classList.add('active');
      } else if (m < currentMinute) {
        node.classList.add('passed');
      }
    });

    // Clear active spectrum step
    const steps = document.querySelectorAll('.spectrum-step');
    steps.forEach(st => st.classList.remove('active'));

    // Try to retrieve live data from backend cache
    const livePayload = isApiOnline ? (liveTimelineCache[currentMinute] || liveTimelineCache[String(currentMinute)]) : null;

    if (livePayload) {
      renderLivePayload(livePayload);
    } else {
      renderFallbackPayload();
    }
  }

  // Render using live Python engine MinuteStatePayload
  function renderLivePayload(payload) {
    const probs = payload.probabilities || { H0: 0.6, H1: 0.15, H2: 0.15, H3: 0.10 };
    const pNoise = Number(probs.H0 || 0);
    const pSensor = Number(probs.H1 || 0);
    const pIso = Number(probs.H2 || 0);
    const pCrisis = Number(probs.H3 || 0);

    // Probability Bars
    probH0.innerText = `${(pNoise * 100).toFixed(1)}%`;
    probH1.innerText = `${(pSensor * 100).toFixed(1)}%`;
    probH2.innerText = `${(pIso * 100).toFixed(1)}%`;
    probH3.innerText = `${(pCrisis * 100).toFixed(1)}%`;

    barH0.style.width = `${(pNoise * 100).toFixed(1)}%`;
    barH1.style.width = `${(pSensor * 100).toFixed(1)}%`;
    barH2.style.width = `${(pIso * 100).toFixed(1)}%`;
    barH3.style.width = `${(pCrisis * 100).toFixed(1)}%`;

    // Entropy calculation
    const h = calculateEntropy([pNoise, pSensor, pIso, pCrisis]);
    entropyMetric.innerHTML = `H(P) = <strong>${h.toFixed(2)} bits</strong> (${
      h > 1.6 ? 'High Uncertainty' : h > 0.8 ? 'Solidifying Evidence' : 'Decisive State'
    })`;

    // Action Policy
    const action = payload.recommended_action || 'WATCH';
    const rationale = payload.explanation_summary || 'Multi-source municipal telemetry processed.';

    actionStateBadge.className = `state-badge ${action.toLowerCase()}`;
    actionStateBadge.innerText = action;
    actionRationale.innerText = rationale;

    const targetSpectrum = document.querySelector(`.spectrum-step[data-action="${action}"]`);
    if (targetSpectrum) targetSpectrum.classList.add('active');

    // Hysteresis indicator status
    if (action === 'ESCALATE') {
      hysteresisStatus.innerText = 'LOCKED (MONOTONIC ESCALATION ACTIVE) — Simulated siren dispatch (exercise only)';
      hysteresisStatus.parentElement.style.color = '#ff6b6b';
    } else if (action === 'ALERT') {
      hysteresisStatus.innerText = 'ACTIVE GUARD — Dual-Threshold Schmitt Trigger Active (Anti-Flip-Flop)';
      hysteresisStatus.parentElement.style.color = '#f59e0b';
    } else {
      hysteresisStatus.innerText = 'NORMAL WATCH / STAGING BUFFER';
      hysteresisStatus.parentElement.style.color = '#06b6d4';
    }

    // Dynamic Shiryaev Crossing Threshold calculation
    const policyThresholdPill = document.getElementById('policyThresholdPill');
    const fatigue = payload.fatigue_level || 0.0;
    const lead = 1.0 + 0.15 * Math.max(0, currentMinute);
    const W = 1.0 + 2.0 * fatigue;
    const pAlertEsc = (19.0 * W) / (10.0 * lead + 19.0 * W);
    const pAlertEscPct = (pAlertEsc * 100).toFixed(1);

    if (policyThresholdPill) {
      if (action === 'ESCALATE') {
        policyThresholdPill.className = 'threshold-pill escalate-active';
        policyThresholdPill.innerHTML = `Active Gate: <strong>P(H₃) &ge; ${pAlertEscPct}%</strong> <span class="sub-thresh">(Lead-Time ×${lead.toFixed(2)}, Base: 65.5%, Hysteresis Locked)</span>`;
      } else if (action === 'ALERT') {
        const numAlert = 6.0 * W - 1.0;
        const denAlert = 25.0 * lead + 6.0 * W - 1.0;
        const pPrepAlert = denAlert > 0 ? numAlert / denAlert : 0.17;
        policyThresholdPill.className = 'threshold-pill';
        policyThresholdPill.innerHTML = `Gate: <strong>P(H₃) &ge; ${(pPrepAlert * 100).toFixed(1)}%</strong> <span class="sub-thresh">(Base 17.0%, ESC at ${pAlertEscPct}%)</span>`;
      } else if (action === 'PREPARE') {
        const pWatchPrep = 1.0 / (60.0 * lead + 1.0);
        policyThresholdPill.className = 'threshold-pill';
        policyThresholdPill.innerHTML = `Gate: <strong>P(H₃) &ge; ${(pWatchPrep * 100).toFixed(1)}%</strong> <span class="sub-thresh">(Escalate at ${pAlertEscPct}%)</span>`;
      } else {
        policyThresholdPill.className = 'threshold-pill';
        policyThresholdPill.innerHTML = `Baseline Threshold: <strong>P(H₃) &ge; 65.5%</strong> <span class="sub-thresh">(t=0 Static)</span>`;
      }
    }

    if (valThreshold) {
      valThreshold.innerText = `Adjusted Threshold: ${pAlertEscPct}% (Base: 65.5%, Lead-Time ×${lead.toFixed(2)})`;
    }

    // Tradeoff meters
    const damagePct = Math.round(pCrisis * 100);
    const cryWolfAvoidance = Math.max(5, Math.min(95, Math.round((1 - fatigue) * 100)));
    gaugeDamageAvoided.style.width = `${damagePct}%`;
    gaugeCryWolf.style.width = `${cryWolfAvoidance}%`;
    valDamage.innerText = `Lead Time Value: ${action === 'ESCALATE' ? '+8m Saved' : damagePct > 50 ? 'Critical' : 'Safe'}`;
    valCryWolf.innerText = `Cry-Wolf Risk: ${action === 'ESCALATE' ? 'Committed' : cryWolfAvoidance > 60 ? 'High Avoidance' : 'Low'}`;

    // Render Stream Events from live payload
    renderLiveEvents();

    // Render Foresight Forecasts from live payload
    renderLiveForesight(payload.forecasts || []);

    // Render Attribution Drawer
    renderLiveAttribution(payload);

    // Update Causal Canvas
    drawCausalGraph(payload);

    // Render CAP Alert
    renderCapAlert(payload.cap_alert);

    // Duty officer scoreboard sync
    machinePolicyText.innerText = action;
    evaluateDutyOfficerScore(action);
  }

  // Render using fallback offline trajectory
  function renderFallbackPayload() {
    const traj = currentScenario === 'alpha' ? FALLBACK_BELIEF_ALPHA : FALLBACK_BELIEF_BETA;
    const curBelief = traj[Math.min(currentMinute, traj.length - 1)];

    let pNoise = curBelief.p[0];
    let pSensor = curBelief.p[1];
    let pIso = curBelief.p[2];
    let pCrisis = curBelief.p[3];

    if (flagGatewayDrop && currentMinute >= 4) {
      pSensor = Math.min(0.95, pSensor + 0.22);
      pCrisis = Math.max(0.01, pCrisis - 0.12);
      const rem = 1 - (pSensor + pCrisis);
      pNoise = rem * 0.6;
      pIso = rem * 0.4;
    }
    if (flagRumorMimic && currentMinute >= 6) {
      pNoise = Math.min(0.65, pNoise + 0.15);
      pCrisis = Math.max(0.02, pCrisis - 0.08);
    }

    const sum = pNoise + pSensor + pIso + pCrisis;
    pNoise = pNoise / sum;
    pSensor = pSensor / sum;
    pIso = pIso / sum;
    pCrisis = pCrisis / sum;

    probH0.innerText = `${(pNoise * 100).toFixed(1)}%`;
    probH1.innerText = `${(pSensor * 100).toFixed(1)}%`;
    probH2.innerText = `${(pIso * 100).toFixed(1)}%`;
    probH3.innerText = `${(pCrisis * 100).toFixed(1)}%`;

    barH0.style.width = `${(pNoise * 100).toFixed(1)}%`;
    barH1.style.width = `${(pSensor * 100).toFixed(1)}%`;
    barH2.style.width = `${(pIso * 100).toFixed(1)}%`;
    barH3.style.width = `${(pCrisis * 100).toFixed(1)}%`;

    const h = calculateEntropy([pNoise, pSensor, pIso, pCrisis]);
    entropyMetric.innerHTML = `H(P) = <strong>${h.toFixed(2)} bits</strong> (${
      h > 1.6 ? 'High Uncertainty' : h > 0.8 ? 'Solidifying Evidence' : 'Decisive State'
    })`;

    let action = curBelief.action;
    let rationale = curBelief.rat;

    actionStateBadge.className = `state-badge ${action.toLowerCase()}`;
    actionStateBadge.innerText = action;
    actionRationale.innerText = rationale;

    const targetSpectrum = document.querySelector(`.spectrum-step[data-action="${action}"]`);
    if (targetSpectrum) targetSpectrum.classList.add('active');

    if (action === 'ESCALATE') {
      hysteresisStatus.innerText = 'LOCKED (MONOTONIC ESCALATION ACTIVE) — Simulated siren dispatch (exercise only)';
      hysteresisStatus.parentElement.style.color = '#ff6b6b';
    } else if (action === 'ALERT') {
      hysteresisStatus.innerText = 'ACTIVE GUARD — Dual-Threshold Schmitt Trigger Active';
      hysteresisStatus.parentElement.style.color = '#f59e0b';
    } else {
      hysteresisStatus.innerText = 'NORMAL WATCH / STAGING BUFFER';
      hysteresisStatus.parentElement.style.color = '#06b6d4';
    }

    const policyThresholdPill = document.getElementById('policyThresholdPill');
    const lead = 1.0 + 0.15 * Math.max(0, currentMinute);
    const pAlertEsc = 19.0 / (10.0 * lead + 19.0);
    const pAlertEscPct = (pAlertEsc * 100).toFixed(1);

    if (policyThresholdPill) {
      if (action === 'ESCALATE') {
        policyThresholdPill.className = 'threshold-pill escalate-active';
        policyThresholdPill.innerHTML = `Active Gate: <strong>P(H₃) &ge; ${pAlertEscPct}%</strong> <span class="sub-thresh">(Lead-Time ×${lead.toFixed(2)}, Base: 65.5%, Hysteresis Locked)</span>`;
      } else if (action === 'ALERT') {
        policyThresholdPill.className = 'threshold-pill';
        policyThresholdPill.innerHTML = `Gate: <strong>P(H₃) &ge; 17.0%</strong> <span class="sub-thresh">(Escalate at ${pAlertEscPct}%)</span>`;
      } else if (action === 'PREPARE') {
        policyThresholdPill.className = 'threshold-pill';
        policyThresholdPill.innerHTML = `Gate: <strong>P(H₃) &ge; 1.6%</strong> <span class="sub-thresh">(Escalate at ${pAlertEscPct}%)</span>`;
      } else {
        policyThresholdPill.className = 'threshold-pill';
        policyThresholdPill.innerHTML = `Baseline Threshold: <strong>P(H₃) &ge; 65.5%</strong> <span class="sub-thresh">(t=0 Static)</span>`;
      }
    }

    if (valThreshold) {
      valThreshold.innerText = `Adjusted Threshold: ${pAlertEscPct}% (Base: 65.5%, Lead-Time ×${lead.toFixed(2)})`;
    }

    const damagePct = Math.round(pCrisis * 100);
    const cryWolfPct = Math.max(5, 100 - damagePct);
    gaugeDamageAvoided.style.width = `${damagePct}%`;
    gaugeCryWolf.style.width = `${cryWolfPct}%`;
    valDamage.innerText = `Lead Time Value: ${action === 'ESCALATE' ? '+8m Saved' : damagePct > 50 ? 'Critical' : 'Safe'}`;
    valCryWolf.innerText = `Cry-Wolf Risk: ${action === 'ESCALATE' ? 'Committed' : cryWolfPct > 60 ? 'High Avoidance' : 'Low'}`;

    renderFallbackEvents();
    renderFallbackForesight();
    renderFallbackAttribution();
    drawCausalGraph(null);
    renderCapAlert(null);

    machinePolicyText.innerText = action;
    evaluateDutyOfficerScore(action);
  }

  // --- EVENT RENDERING ---
  function getEventTypeCategory(sourceType) {
    if (!sourceType) return 'sensor';
    const s = sourceType.toLowerCase();
    if (s.includes('dispatch') || s.includes('line') || s.includes('emergency')) return 'dispatch';
    if (s.includes('hospital')) return 'hospital';
    if (s.includes('citizen') || s.includes('social')) return 'social';
    return 'sensor';
  }

  function formatEventText(ev) {
    const k = ev.kind || '';
    const loc = ev.location ? `in ${ev.location.replace('_', ' ')}` : '';
    const val = typeof ev.value === 'number' ? ev.value.toFixed(2) : '';

    if (k === 'drain_anomaly') return `Hydraulic drainage runoff differential pressure anomaly (${val}) logged ${loc}.`;
    if (k === 'traffic_slow') return `Arterial arterial vehicle velocity deceleration (${val} congestion index) observed ${loc}.`;
    if (k === 'call_surge') return `Emergency dispatch incoming queue spike (${val} calls/min) registered ${loc}.`;
    if (k === 'dispatch_incident') return `Verified CAD incident dispatch: multi-unit emergency deployment dispatched ${loc}.`;
    if (k === 'hospital_arrivals') return `Hospital mass trauma arrival surge (${val} admission surge) verified ${loc}.`;
    if (k === 'citizen_report') return `Citizen surface inundation report logged ${loc} (telemetry anomaly score: ${val}).`;
    if (k === 'camera_flag') return `Optical transit camera vision model flagged surface pooling / hazard ${loc}.`;
    if (k === 'rain_gauge') return `Meteorological rain gauge confirmed intense precipitation (${val} mm/h) ${loc}.`;
    if (k === 'gateway_heartbeat') return `Gateway controller heartbeat signal disconnect recorded ${loc}.`;
    if (k === 'social_post') return `Social sentiment anomaly cluster detected ${loc}: viral flood post flagged.`;
    return `Telemetry event [${k}] observed ${loc} with intensity metric ${val}.`;
  }

  function renderLiveEvents() {
    let pool = [];
    for (let m = 0; m <= currentMinute; m++) {
      const p = liveTimelineCache[m] || liveTimelineCache[String(m)];
      if (p && p.events && p.events.length > 0) {
        p.events.forEach(ev => {
          const minVal = Math.floor(ev.event_time / 60);
          const secVal = ev.event_time % 60;
          const ts = `00:${minVal < 10 ? '0' + minVal : minVal}:${secVal < 10 ? '0' + secVal : secVal}`;
          const type = getEventTypeCategory(ev.source_type);
          const badges = [];

          if (ev.kind) badges.push(ev.kind.replace('_', ' ').toUpperCase());
          if (ev.retracts) badges.push('RETRACTION');
          if (ev.gateway_id) badges.push(ev.gateway_id.toUpperCase());

          pool.push({
            minute: minVal,
            timestamp: ts,
            type: type,
            source: (ev.source_type || 'TELEMETRY').replace('_', ' ').toUpperCase(),
            node: ev.source_id || 'sensor_node',
            text: formatEventText(ev),
            badges: badges
          });
        });
      }
    }

    if (pool.length === 0) {
      pool.push({
        minute: 0,
        timestamp: '00:00',
        type: 'sensor',
        source: 'CIVIC_MONITORING_GRID',
        node: 'metropolis_central_hub',
        text: 'Baseline municipal telemetry streaming. Normal flow across all 12 urban sectors.',
        badges: ['NORMAL']
      });
    }

    renderEventCards(pool);
  }

  function renderFallbackEvents() {
    let pool = [];
    for (let i = 0; i <= Math.min(currentMinute, 7); i++) {
      pool.push(FALLBACK_PREFIX_EVENTS[i]);
    }
    if (currentMinute >= 8) {
      const postPool = currentScenario === 'alpha' ? FALLBACK_ALPHA_POST : FALLBACK_BETA_POST;
      for (let j = 8; j <= currentMinute; j++) {
        const postEvt = postPool.find(e => e.minute === j);
        if (postEvt) pool.push(postEvt);
      }
    }
    if (flagGatewayDrop && currentMinute >= 4) {
      pool.push({
        minute: 4,
        timestamp: '00:04',
        type: 'sensor',
        source: 'GATEWAY_HEALTH_MONITOR',
        node: 'gw_telecom_north_rack',
        text: '[INJECTED ADVERSITY] Gateway GW-1 dropped 100 downstream sensors. Causal engine isolates common-cause power fault.',
        badges: ['CORRELATED FAIL', 'CUTOUT']
      });
    }
    if (flagRumorMimic && currentMinute >= 6) {
      pool.push({
        minute: 6,
        timestamp: '00:06',
        type: 'social',
        source: 'VIRAL_DISINFO_CRAWLER',
        node: 'social_bot_cluster_x',
        text: '[INJECTED ADVERSITY] Coordinated rumor wave claiming dam failure. Physical telemetry registers 0 barometric drop. Filtered.',
        badges: ['RUMOR WAVE', 'MIMIC FILTERED']
      });
    }
    renderEventCards(pool);
  }

  function renderEventCards(eventsList) {
    const filtered = eventsList.filter(evt => {
      if (activeFilter === 'all') return true;
      return evt.type === activeFilter;
    });

    streamEventCount.innerText = `${filtered.length} EVENTS INGESTED`;
    streamEventList.innerHTML = '';

    const reversed = [...filtered].reverse();
    reversed.forEach(evt => {
      const card = document.createElement('div');
      card.className = `stream-event-card type-${evt.type}`;

      let badgesHtml = '';
      if (evt.badges && evt.badges.length > 0) {
        evt.badges.forEach(b => {
          let bClass = 'tag-badge';
          if (b.includes('CUTOUT') || b.includes('CRISIS') || b.includes('ALERT') || b.includes('GRID')) bClass += ' badge-cutout';
          else if (b.includes('MIMIC') || b.includes('OUT-OF-ORDER') || b.includes('RETRACTION')) bClass += ' badge-delayed';
          else bClass += ' badge-mimic';
          badgesHtml += `<span class="${bClass}">${b}</span>`;
        });
      }

      card.innerHTML = `
        <div class="event-top-line">
          <span class="event-time">${evt.timestamp} &bull; ${evt.source}</span>
          <div class="event-badges">${badgesHtml}</div>
        </div>
        <div class="event-body">${evt.text}</div>
        <div class="event-node-id">&gt; Node: ${evt.node}</div>
      `;
      streamEventList.appendChild(card);
    });
  }

  // --- FORESIGHT RENDERING ---
  function renderLiveForesight(forecasts) {
    foresightList.innerHTML = '';
    if (!forecasts || forecasts.length === 0) {
      foresightList.innerHTML = `
        <div class="foresight-item">
          <span class="forecast-target">No imminent cascading escalation detected within 15-minute horizon</span>
          <span class="forecast-window">00:00 &ndash; 00:15 [Safe]</span>
        </div>
      `;
      return;
    }

    forecasts.forEach(f => {
      const row = document.createElement('div');
      row.className = 'foresight-item';
      const confStr = `${Math.round((f.probability || 0) * 100)}%`;
      const winStr = `00:${String(f.window_start_min).padStart(2, '0')} &ndash; 00:${String(f.window_end_min).padStart(2, '0')}`;
      row.innerHTML = `
        <span class="forecast-target">${f.description || f.event_kind} (${f.zone})</span>
        <span class="forecast-window">${winStr} [${confStr}]</span>
      `;
      foresightList.appendChild(row);
    });
  }

  function renderFallbackForesight() {
    const list = getFallbackForesightPredictions(currentMinute, currentScenario);
    foresightList.innerHTML = '';
    list.forEach(item => {
      const row = document.createElement('div');
      row.className = 'foresight-item';
      row.innerHTML = `
        <span class="forecast-target">${item.target}</span>
        <span class="forecast-window">${item.window} [${item.conf}]</span>
      `;
      foresightList.appendChild(row);
    });
  }

  // --- ATTRIBUTION RENDERING ---
  function renderLiveAttribution(payload) {
    let html = `
      <p class="attr-step"><span class="time-pill">00:${String(currentMinute).padStart(2, '0')}</span> <strong>Bayesian State:</strong> ${payload.explanation_summary || 'Normal telemetry.'}</p>
    `;

    if (payload.top_drivers && payload.top_drivers.length > 0) {
      html += `<p class="attr-step"><span class="time-pill">DRIVERS</span> `;
      payload.top_drivers.forEach(d => {
        let rawVal = null;
        if (d.llr !== undefined && d.llr !== null && d.llr !== 'undefined' && d.llr !== 'null') {
          rawVal = d.llr;
        } else if (d.weight !== undefined && d.weight !== null && d.weight !== 'undefined' && d.weight !== 'null') {
          rawVal = d.weight;
        } else if (d.value !== undefined && d.value !== null && d.value !== 'undefined' && d.value !== 'null') {
          rawVal = d.value;
        }

        let llrStr = 'n/a';
        if (rawVal !== null && rawVal !== undefined) {
          const num = Number(rawVal);
          if (!isNaN(num) && isFinite(num)) {
            llrStr = (num > 0 ? '+' : '') + num.toFixed(2);
          } else if (rawVal !== 'undefined' && rawVal !== 'null' && String(rawVal).trim() !== '') {
            llrStr = String(rawVal);
          }
        }
        const sourceLabel = d.source || d.factor || d.kind || 'dispatch_logs';
        html += `<span class="driver-tag"><strong>${sourceLabel}:</strong> LLR = ${llrStr}</span> `;
      });
      html += `</p>`;
    }

    if (payload.discounted_items && payload.discounted_items.length > 0) {
      html += `<p class="attr-step"><span class="time-pill">DISCOUNTED</span> `;
      payload.discounted_items.forEach(item => {
        html += `<span class="discount-tag">${item}</span> `;
      });
      html += `</p>`;
    }

    if (payload.what_would_change_mind) {
      html += `
        <p class="attr-current"><strong>Mind-Changer Trigger:</strong> ${payload.what_would_change_mind}</p>
      `;
    }

    attributionContent.innerHTML = html;
  }

  function renderFallbackAttribution() {
    let html = '';
    if (currentMinute === 0) {
      html = `<p class="attr-step"><span class="time-pill">00:00</span> Flat rainfall baseline across 12 sectors. Prior unshifted. Cost of early alert far exceeds value.</p>`;
    } else if (currentMinute <= 3) {
      html = `
        <p class="attr-step"><span class="time-pill">00:01</span> Runoff gradient matched seasonal storm prior (+14% flow).</p>
        <p class="attr-step"><span class="time-pill">00:03</span> Drainage anomalies isolated to culvert S4-B. <em>Changed policy to PREPARE</em> because prepositioning standby pumps costs only $40k while buying 5 mins of insurance.</p>
      `;
    } else if (currentMinute <= 7) {
      html = `
        <p class="attr-step"><span class="time-pill">00:05</span> Traffic velocity drop (-68%) along River Blvd confirmed surface pooling.</p>
        <p class="attr-step"><span class="time-pill">00:07</span> Emergency 911 influx spiked. <em>Changed policy to ALERT</em>. Maintained strict maximum entropy over Twin hypotheses: <strong>Refused to push public siren</strong> because identical symptoms could be routine heavy rain + localized flu.</p>
      `;
    } else {
      if (currentScenario === 'alpha') {
        html = `
          <p class="attr-step"><span class="time-pill">00:08</span> <strong>CRITICAL MIND SHIFT:</strong> Substation 07 SCADA breaker trip telemetry and Levee 4 ultrasonic level (>94%) violated the benign storm hypothesis. Causal DAG confirms structural cascade.</p>
          <p class="attr-step"><span class="time-pill">00:09</span> Hospital power backup switch-overs confirmed domino electrical propagation. <em>ESCALATED to full public alert with 8 min advance warning</em>.</p>
        `;
      } else {
        html = `
          <p class="attr-step"><span class="time-pill">00:08</span> <strong>CRITICAL MIND SHIFT:</strong> Spatial correlation check revealed 80 dropped sensors all route through Gateway Trunk North. Classified as <em>H₁ (ISP Fiber Cut)</em>, not physical flood!</p>
          <p class="attr-step"><span class="time-pill">00:09</span> Epidemiological trace cross-verified hospital surge as pediatric flu. <em>P(H₃) dropped to 4%</em>. Successfully prevented $2.5M municipal false alarm panic.</p>
        `;
      }
    }
    attributionContent.innerHTML = html;
  }

  // --- CAP v1.2 ALERT PANEL ---
  async function renderCapAlert(alertObj) {
    if (!capCodeContent) return;

    if (!alertObj && isApiOnline && window.CrisisSenseAPI) {
      try {
        const resp = await window.CrisisSenseAPI.getCapAlert(activeCapFormat);
        if (resp && (resp.content || resp.status)) {
          if (resp.content) {
            displayCapContent(resp.content, activeCapFormat);
            return;
          }
        }
      } catch (e) {
        // Fall through
      }
    }

    if (alertObj) {
      if (activeCapFormat === 'json') {
        displayCapContent(JSON.stringify(alertObj, null, 2), 'json');
      } else if (window.CrisisSenseAPI && isApiOnline) {
        try {
          const xml = await window.CrisisSenseAPI.getCapAlert('xml');
          displayCapContent(xml, 'xml');
        } catch (e) {
          displayCapContent(JSON.stringify(alertObj, null, 2), 'json');
        }
      }
    } else {
      capStatusText.innerText = `System in ${actionStateBadge.innerText} state — Alert dispatch staged (Exercise Only).`;
      capPulseIndicator.style.background = '#10b981';
      capPulseIndicator.style.boxShadow = '0 0 8px rgba(16, 185, 129, 0.6)';
      capCodeContent.innerText = `// Common Alerting Protocol (CAP v1.2) Digital Dispatch Feed\n// Standard: OASIS Standard CAP-V1.2 / WMO 2026\n// Mandatory Safety Rule: status="Exercise"\n// Current State: ${actionStateBadge.innerText} — Awaiting ESCALATE policy threshold crossing to dispatch digital sirens...`;
    }
  }

  function displayCapContent(content, format) {
    const isEscalated = actionStateBadge.innerText === 'ESCALATE';
    if (isEscalated) {
      capStatusText.innerText = 'CAP v1.2 DISPATCH ACTIVE — Standardized Digital Alert Broadcast (EXERCISE)';
      capPulseIndicator.style.background = '#ef4444';
      capPulseIndicator.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.8)';
    } else {
      capStatusText.innerText = `System in ${actionStateBadge.innerText} state — Staged Exercise Alert.`;
      capPulseIndicator.style.background = '#f59e0b';
      capPulseIndicator.style.boxShadow = '0 0 8px rgba(245, 158, 11, 0.6)';
    }

    if (typeof content === 'object') {
      capCodeContent.innerText = JSON.stringify(content, null, 2);
    } else {
      capCodeContent.innerText = content;
    }
  }

  // --- CANVAS CAUSAL GRAPH RENDERER ---
  function drawCausalGraph(livePayload) {
    if (!causalGraphCanvas) return;
    const ctx = causalGraphCanvas.getContext('2d');
    const w = causalGraphCanvas.width;
    const h = causalGraphCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const nuisances = livePayload ? (livePayload.nuisance_posteriors || {}) : {};
    const pH3 = livePayload ? (Number(livePayload.probabilities?.H3) || 0) : 0;
    const isCascade = currentScenario === 'alpha';

    const rainActive = currentMinute >= 0;
    const drainActive = currentMinute >= 3;
    const trafficActive = currentMinute >= 5;
    const gridActive = (pH3 > 0.50 || (isCascade && currentMinute >= 8));
    const telecomActive = ((nuisances.G1 > 0.5 || (!isCascade && currentMinute >= 8)));
    const leveeActive = (actionStateBadge.innerText === 'ESCALATE' || (isCascade && currentMinute >= 9));

    const nodes = [
      { id: 'rain', label: 'Heavy Rain', x: 45, y: 50, active: rainActive },
      { id: 'drain', label: 'Drainage Anomaly', x: 145, y: 35, active: drainActive },
      { id: 'traffic', label: 'Traffic Slow', x: 145, y: 110, active: trafficActive },
      { id: 'grid', label: 'Substation Trip', x: 250, y: 40, active: gridActive, alphaOnly: true },
      { id: 'telecom', label: 'Fiber Cut (H₁)', x: 250, y: 115, active: telecomActive, betaOnly: true },
      { id: 'levee', label: 'Cascade / Siren', x: 345, y: 75, active: leveeActive, alphaOnly: true }
    ];

    const edges = [
      { from: 'rain', to: 'drain', active: rainActive && drainActive },
      { from: 'rain', to: 'traffic', active: rainActive && trafficActive },
      { from: 'drain', to: 'grid', active: drainActive && gridActive, alphaOnly: true },
      { from: 'drain', to: 'telecom', active: drainActive && telecomActive, betaOnly: true },
      { from: 'traffic', to: 'grid', active: trafficActive && gridActive, alphaOnly: true },
      { from: 'grid', to: 'levee', active: gridActive && leveeActive, alphaOnly: true }
    ];

    edges.forEach(e => {
      if (e.alphaOnly && currentScenario !== 'alpha') return;
      if (e.betaOnly && currentScenario !== 'beta') return;

      const fromNode = nodes.find(n => n.id === e.from);
      const toNode = nodes.find(n => n.id === e.to);
      if (!fromNode || !toNode) return;

      const isFlowing = e.active;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = isFlowing
        ? (currentScenario === 'alpha' && toNode.y <= 75 ? '#dc2626' : '#2563eb')
        : '#cbd5e1';
      ctx.lineWidth = isFlowing ? 2.5 : 1.2;
      ctx.stroke();

      if (isFlowing) {
        const time = Date.now() / 400;
        const progress = (time % 2) / 2;
        const px = fromNode.x + (toNode.x - fromNode.x) * progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = currentScenario === 'alpha' && toNode.y <= 75 ? '#dc2626' : '#2563eb';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    nodes.forEach(n => {
      if (n.alphaOnly && currentScenario !== 'alpha') return;
      if (n.betaOnly && currentScenario !== 'beta') return;

      const isActive = n.active;

      ctx.beginPath();
      ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);

      if (isActive) {
        ctx.fillStyle = currentScenario === 'alpha' && n.id === 'levee' ? '#dc2626' : '#2563eb';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#f1f5f9';
        ctx.shadowBlur = 0;
      }

      ctx.fill();
      ctx.strokeStyle = isActive ? '#ffffff' : '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = '600 10.5px "Plus Jakarta Sans", -apple-system, sans-serif';
      ctx.fillStyle = isActive ? '#0f172a' : '#64748b';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + 20);
    });
  }

  // --- MINUTE NAVIGATION ---
  function setMinute(min) {
    currentMinute = Math.max(0, Math.min(10, min));
    playTickSound();
    updateSimulationHUD();
  }

  // --- PLAY / PAUSE CONTROLLER ---
  function togglePlay() {
    initAudio();
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (currentMinute >= 10) currentMinute = 0;
      playBtnText.innerText = 'PAUSE SIMULATION';
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      btnPlayPause.classList.add('playing');

      playInterval = setInterval(() => {
        if (currentMinute < 10) {
          setMinute(currentMinute + 1);
          if (currentMinute === 8) {
            playAlertChime();
          } else if (currentMinute === 9 && currentScenario === 'alpha') {
            playAlarmKlaxon();
          }
        } else {
          togglePlay();
        }
      }, playSpeed);
    } else {
      clearInterval(playInterval);
      playInterval = null;
      playBtnText.innerText = 'RESUME STREAM';
      playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      btnPlayPause.classList.remove('playing');
    }
  }

  // --- DUTY OFFICER EVALUATION GAME ---
  function evaluateDutyOfficerScore(activeMachinePolicy = 'WATCH') {
    if (userEscalatedAtMinute === null) {
      userDecisionText.innerText = 'MONITORING (WAITING)';
      twinScoreText.innerText = '--';
      dutyOutcomeText.innerText = currentMinute >= 10
        ? currentScenario === 'alpha' ? 'CRISIS MISSED (-1000 pts)' : 'PERFECT PATIENCE (+500 pts)'
        : 'IN PROGRESS...';
      return;
    }

    userDecisionText.innerText = `ESCALATED AT 00:0${userEscalatedAtMinute}`;

    if (currentScenario === 'beta') {
      twinScoreText.innerText = '-500 PTS (CRY-WOLF)';
      twinScoreText.style.color = '#ef4444';
      dutyOutcomeText.innerText = 'FAILED: Disrupted 8.4M citizens for a fiber cut + flu cluster!';
      dutyOutcomeText.style.color = '#ef4444';
    } else {
      if (userEscalatedAtMinute < 7) {
        twinScoreText.innerText = '-350 PTS (UNJUSTIFIED)';
        twinScoreText.style.color = '#f59e0b';
        dutyOutcomeText.innerText = 'Twin Test Penalty: Escalated before evidence diverged!';
        dutyOutcomeText.style.color = '#f59e0b';
      } else if (userEscalatedAtMinute === 8 || userEscalatedAtMinute === 9) {
        const lead = 10 - userEscalatedAtMinute;
        const score = 500 + lead * 200;
        twinScoreText.innerText = `+${score} PTS (OPTIMAL STOP)`;
        twinScoreText.style.color = '#10b981';
        dutyOutcomeText.innerText = `HEROIC SAVE: +${lead}m evacuation lead time!`;
        dutyOutcomeText.style.color = '#10b981';
      } else {
        twinScoreText.innerText = '+100 PTS (MARGINAL)';
        twinScoreText.style.color = '#cbd5e1';
        dutyOutcomeText.innerText = 'Confirmed breach, but only 0m evacuation lead time.';
        dutyOutcomeText.style.color = '#cbd5e1';
      }
    }
  }

  // Duty officer button press
  dutyOfficerButton.addEventListener('click', () => {
    initAudio();
    playButtonThud();
    userEscalatedAtMinute = currentMinute;
    playAlarmKlaxon();
    evaluateDutyOfficerScore(actionStateBadge.innerText);
    dutyOfficerButton.style.transform = 'scale(0.96)';
    setTimeout(() => {
      dutyOfficerButton.style.transform = '';
    }, 150);
  });

  // --- COST CALCULATOR (ILLUSTRATIVE MODEL) ---
  function recalculateCostThresholds() {
    const cFalseAlarm = parseFloat(inputFalseAlarm.value);
    const cDelayPerMin = parseFloat(inputDelayDamage.value);
    const cPrepare = parseFloat(inputPrepare.value);
    const priorPct = parseFloat(inputPrior.value) / 100;

    valFalseAlarmCost.innerText = `$${(cFalseAlarm / 1000000).toFixed(2)}M`;
    valDelayDamageCost.innerText = `$${(cDelayPerMin / 1000000).toFixed(2)}M / min`;
    valPrepareCost.innerText = `$${(cPrepare / 1000).toFixed(0)}k`;
    valPriorProb.innerText = `${(priorPct * 100).toFixed(1)}%`;

    let pPrep = Math.min(0.25, Math.max(0.05, (cPrepare * 3.5) / cDelayPerMin));
    let pEsc = Math.min(0.95, Math.max(0.45, cFalseAlarm / (cFalseAlarm + cDelayPerMin * 2.8)));
    let pAlert = (pPrep + pEsc) / 2;

    threshPrepare.innerText = `P(H₃) ≥ ${(pPrep * 100).toFixed(1)}%`;
    threshAlert.innerText = `P(H₃) ≥ ${(pAlert * 100).toFixed(1)}%`;
    threshEscalate.innerText = `P(H₃) ≥ ${(pEsc * 100).toFixed(1)}%`;

    calcDynamicInsight.innerHTML = `
      With Cry-Wolf false alarm penalty at <strong>$${(cFalseAlarm / 1000000).toFixed(1)}M</strong> and delay damage at <strong>$${(cDelayPerMin / 1000000).toFixed(1)}M/min</strong>, the optimal stopping frontier demands staying calm through high entropy. Prepare triggers at <strong>${(pPrep * 100).toFixed(0)}%</strong>, but Escalate firmly waits until <strong>${(pEsc * 100).toFixed(0)}%</strong> certainty to protect public trust.
    `;
  }

  // --- OPEN-METEO WEATHER PANEL ---
  function getWeatherDescription(code) {
    const descriptions = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
      55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown conditions';
  }

  function getCompassDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % directions.length];
  }

  // --- WORLDWIDE & INDIA CRITICAL METROPOLITAN REGISTRY ---
  const METROPOLITAN_REGIONS = {
    // 🇩🇪 Germany — Berlin (Primary Baseline)
    berlin_mitte: {
      name: 'Berlin — Mitte / Central',
      shortName: 'BERLIN — MITTE',
      lat: '52.5200',
      lon: '13.4050',
      timezone: 'Europe/Berlin',
      pop: '385K POP (8.4M METRO)',
      subLocations: [
        { id: 'spree_basin', name: 'River Spree Basin & Alexanderplatz', sensor: 'Hydro Gauge (drain_main_basin)', tier: 'Tier-1 Urban Flood Drainage' },
        { id: 'scada_07', name: 'SCADA Substation 07 Switchyard', sensor: 'Breaker Telemetry (substation_scada_7)', tier: 'High-Voltage 110kV Grid' },
        { id: 'charite_er', name: 'Charité Campus Mitte ER Intake', sensor: 'Emergency Admissions (memorial_er)', tier: 'Level-1 Trauma & Critical Care' },
        { id: 'unter_den_linden', name: 'Unter den Linden / B2 Corridor', sensor: 'Arterial Radar (traffic_arterial_1)', tier: 'Primary Evacuation Route' }
      ]
    },
    berlin_spandau: {
      name: 'Berlin — Spandau / West',
      shortName: 'BERLIN — SPANDAU',
      lat: '52.5344',
      lon: '13.1975',
      timezone: 'Europe/Berlin',
      pop: '245K POP',
      subLocations: [
        { id: 'havel_sluice', name: 'Havel River Sluice Gate 4', sensor: 'Ultrasonic Level Sensor (drain_spandau)', tier: 'Weir & Sluice Gate Control' },
        { id: 'spandau_scada', name: 'Spandau SCADA Switchyard West', sensor: 'Telemetry Intertie (scada_west_12)', tier: 'Primary Power Distribution' },
        { id: 'vivantes_spandau', name: 'Vivantes Klinikum Spandau ER', sensor: 'Medical Intake Rate (er_spandau)', tier: 'Regional Emergency Care' },
        { id: 'heerstrasse', name: 'Heerstraße Arterial (B2/B5)', sensor: 'Optical Speed Sensor (traffic_west_2)', tier: 'Western Evacuation Arterial' }
      ]
    },
    berlin_kreuzberg: {
      name: 'Berlin — Friedrichshain-Kreuzberg',
      shortName: 'BERLIN — KREUZBERG',
      lat: '52.4986',
      lon: '13.4034',
      timezone: 'Europe/Berlin',
      pop: '290K POP',
      subLocations: [
        { id: 'landwehr_canal', name: 'Landwehr Canal Regulating Gates', sensor: 'Pumping Station Flow (culvert_s4b)', tier: 'Urban Runoff Relief Channel' },
        { id: 'urban_hospital', name: 'Klinikum Am Urban Trauma ER', sensor: 'Inpatient Surge Monitor (er_urban)', tier: 'Regional Emergency Medical' },
        { id: 'scada_kreuzberg', name: 'SCADA Intertie Kreuzberg East', sensor: 'Current Transformer (scada_grid_e)', tier: 'District Sub-Grid 6' },
        { id: 'oberbaum_corridor', name: 'Oberbaumbrücke Traffic Ingestion', sensor: 'Traffic Cam (cam_junction_4)', tier: 'River Crossing Key Route' }
      ]
    },
    berlin_charlottenburg: {
      name: 'Berlin — Charlottenburg-Wilmersdorf',
      shortName: 'BERLIN — CHARLOTTENBURG',
      lat: '52.5160',
      lon: '13.3040',
      timezone: 'Europe/Berlin',
      pop: '343K POP',
      subLocations: [
        { id: 'charlottenburg_lock', name: 'Charlottenburg Lock & Canal Gates', sensor: 'Pressure Transducer (drain_basin_west)', tier: 'Canal Level Regulation' },
        { id: 'drk_westend', name: 'DRK Kliniken Westend Emergency', sensor: 'Triage Queue Telemetry (er_drk)', tier: 'Acute Care & Burn Unit' },
        { id: 'scada_westend', name: 'SCADA Substation 03 Westend', sensor: 'Breaker Status (scada_sub_3)', tier: 'Municipal Grid Feeder' },
        { id: 'bismarck_arterial', name: 'Bismarckstraße Trunk Corridor', sensor: 'Magnetic Loop Ingestion (traffic_bism)', tier: 'Primary West Trunk Road' }
      ]
    },
    berlin_tempelhof: {
      name: 'Berlin — Tempelhof-Schöneberg',
      shortName: 'BERLIN — TEMPELHOF',
      lat: '52.4820',
      lon: '13.3850',
      timezone: 'Europe/Berlin',
      pop: '350K POP',
      subLocations: [
        { id: 'teltow_basin', name: 'Teltow Canal Retention Basin', sensor: 'Flow Gradient Sensor (drain_teltow)', tier: 'Southern Stormwater Retention' },
        { id: 'scada_tempelhof', name: 'SCADA Tempelhof Hub', sensor: 'SCADA Remote Terminal Unit (scada_t_hub)', tier: 'Sub-Transmission Intertie' },
        { id: 'st_joseph_er', name: 'St. Joseph Hospital Pediatric ER', sensor: 'Infection Outbreak Sensor (hosp_cluster)', tier: 'Pediatric & General Trauma' },
        { id: 'tempelhofer_damm', name: 'Tempelhofer Damm Arterial (B96)', sensor: 'Radar Doppler Tracker (traffic_b96)', tier: 'South Corridor Evacuation' }
      ]
    },
    berlin_pankow: {
      name: 'Berlin — Pankow / North',
      shortName: 'BERLIN — PANKOW',
      lat: '52.5689',
      lon: '13.4026',
      timezone: 'Europe/Berlin',
      pop: '410K POP',
      subLocations: [
        { id: 'panke_culvert', name: 'Panke River Floodplain & Culvert', sensor: 'Water Depth Sonar (drain_panke)', tier: 'Northern River Flood Defenses' },
        { id: 'gateway_trunk_n', name: 'Gateway Trunk North (Cellular & Fiber)', sensor: 'ISP Trunk Gateway (gw_1)', tier: 'Core Sensor Backhaul Trunk' },
        { id: 'helios_buch', name: 'Helios Klinikum Berlin-Buch', sensor: 'Campus ER Stream (hosp_helios)', tier: 'Northern Special Care Clinic' },
        { id: 'prenzlauer_allee', name: 'Prenzlauer Promenade Arterial', sensor: 'Loop Vehicle Counter (traffic_prenz)', tier: 'North Corridor Access' }
      ]
    },
    berlin_neukoelln: {
      name: 'Berlin — Neukölln / South',
      shortName: 'BERLIN — NEUKÖLLN',
      lat: '52.4811',
      lon: '13.4353',
      timezone: 'Europe/Berlin',
      pop: '330K POP',
      subLocations: [
        { id: 'schifffahrtskanal', name: 'Neuköllner Schifffahrtskanal Basin', sensor: 'Storm Outflow Sensor (drain_neuk)', tier: 'Municipal Overflow Channel' },
        { id: 'vivantes_neukoelln', name: 'Vivantes Klinikum Neukölln Trauma', sensor: 'Emergency Capacity Feed (er_neuk)', tier: 'Maximal Care Trauma Hub' },
        { id: 'karl_marx_str', name: 'Karl-Marx-Straße Commercial Arterial', sensor: 'Traffic Ingestion Cam (cam_junction_7)', tier: 'Dense Urban Emergency Route' },
        { id: 'scada_ring_south', name: 'SCADA South Ring Feeder', sensor: 'Telemetry Remote Unit (scada_south_ring)', tier: 'District Power Distribution' }
      ]
    },

    // 🇮🇳 India — Priority Metropolises
    india_nagpur: {
      name: 'Nagpur — Zero Mile / Central Hub',
      shortName: 'INDIA — NAGPUR',
      lat: '21.1458',
      lon: '79.0882',
      timezone: 'Asia/Kolkata',
      pop: '2.8M POP',
      subLocations: [
        { id: 'ambazari_basin', name: 'Ambazari Lake & Nag River Basin', sensor: 'Hydro Spillway Sonar (drain_ambazari)', tier: 'Tier-1 Urban Flood Catchment' },
        { id: 'mihan_scada', name: 'MIHAN SEZ SCADA Power Hub', sensor: '132kV Transformer Feed (scada_mihan_4)', tier: 'Industrial Infrastructure Grid' },
        { id: 'aiims_gmch_er', name: 'AIIMS Nagpur & GMCH Trauma ER', sensor: 'Emergency Triage Rate (er_gmch_trauma)', tier: 'Central India Apex Trauma' },
        { id: 'wardha_road', name: 'Wardha Road Arterial Corridor (NH 44)', sensor: 'Radar Doppler Loop (traffic_wardha_rd)', tier: 'National Highway Primary Lifeline' }
      ]
    },
    india_mumbai: {
      name: 'Mumbai — MMR Coastal Region',
      shortName: 'INDIA — MUMBAI',
      lat: '19.0760',
      lon: '72.8777',
      timezone: 'Asia/Kolkata',
      pop: '21.3M POP',
      subLocations: [
        { id: 'mithi_bkc', name: 'Mithi River & BKC Retention Basin', sensor: 'Tidal Flap Gate Sensor (drain_mithi_bkc)', tier: 'High-Tide Surge Barrier' },
        { id: 'dharavi_pump', name: 'Dharavi Heavy Pumping Station & SCADA', sensor: 'Pumping Velocity Monitor (scada_dharavi_pump)', tier: 'Critical Stormwater Pumping' },
        { id: 'kem_sion_er', name: 'KEM Hospital & Sion Trauma ER Intake', sensor: 'Emergency Influx Stream (er_kem_sion)', tier: 'Level-1 Disaster Medical Center' },
        { id: 'weh_arterial', name: 'Western Express Highway (WEH) Bandra', sensor: 'Optical Density Cam (traffic_weh_bandra)', tier: 'North-South Metropolitan Lifeline' }
      ]
    },
    india_delhi: {
      name: 'New Delhi — National Capital Region (NCR)',
      shortName: 'INDIA — NEW DELHI',
      lat: '28.6139',
      lon: '77.2090',
      timezone: 'Asia/Kolkata',
      pop: '33.0M POP',
      subLocations: [
        { id: 'yamuna_ito', name: 'Yamuna River Floodplain & ITO Barrage', sensor: 'Barrage Gate Inundation Sensor (drain_yamuna_ito)', tier: 'Inter-State River Floodway' },
        { id: 'badarpur_scada', name: 'Badarpur & Maharani Bagh Grid SCADA', sensor: '220kV Ring Bus Monitor (scada_delhi_ring)', tier: 'National Capital Grid Intertie' },
        { id: 'aiims_delhi_er', name: 'AIIMS Delhi Apex Trauma Center', sensor: 'Mass Casualty Intake Tracker (er_aiims_trauma)', tier: 'National Apex Medical Facility' },
        { id: 'ring_road_delhi', name: 'Ring Road & Barapullah Elevated Arterial', sensor: 'Magnetic Ingestion Loop (traffic_ring_road)', tier: 'Core Urban Transit Arterial' }
      ]
    },
    india_bengaluru: {
      name: 'Bengaluru — Tech & Lake Cascade Corridor',
      shortName: 'INDIA — BENGALURU',
      lat: '12.9716',
      lon: '77.5946',
      timezone: 'Asia/Kolkata',
      pop: '13.6M POP',
      subLocations: [
        { id: 'bellandur_basin', name: 'Bellandur & Varthur Lake Drainage Basin', sensor: 'Cascading Sluice Level (drain_bellandur)', tier: 'Interconnected Urban Lake Chain' },
        { id: 'ecity_scada', name: 'Electronic City & Whitefield Substation', sensor: 'SCADA Ring Monitor (scada_ecity_sub)', tier: 'High-Tech Industrial Power Grid' },
        { id: 'victoria_hosp_er', name: 'Victoria Hospital & Bowring Emergency ER', sensor: 'Acute Trauma Intake (er_victoria_hosp)', tier: 'Regional Government Trauma Hub' },
        { id: 'orr_silkboard', name: 'Outer Ring Road (ORR) Silk Board Arterial', sensor: 'Velocity Cam Array (traffic_orr_silk)', tier: 'Primary Tech Economic Lifeline' }
      ]
    },
    india_chennai: {
      name: 'Chennai — Coastal Estuary Region',
      shortName: 'INDIA — CHENNAI',
      lat: '13.0827',
      lon: '80.2707',
      timezone: 'Asia/Kolkata',
      pop: '11.5M POP',
      subLocations: [
        { id: 'adyar_cooum', name: 'Adyar & Cooum River Estuary Basin', sensor: 'Tidal Inundation Monitor (drain_adyar_estuary)', tier: 'Coastal Monsoon Floodway' },
        { id: 'taramani_scada', name: 'Taramani Coastal Substation SCADA Grid', sensor: 'Transformer Intertie (scada_taramani)', tier: 'Coastal Power Distribution' },
        { id: 'rggh_chennai_er', name: 'Rajiv Gandhi Govt General Hospital ER', sensor: 'Disaster Influx Telemetry (er_rggh_chennai)', tier: 'Regional Emergency Medical Hub' },
        { id: 'omr_expressway', name: 'Old Mahabalipuram Road (OMR) IT Expressway', sensor: 'Loop Speed Detector (traffic_omr_express)', tier: 'Coastal Evacuation Corridor' }
      ]
    },
    india_hyderabad: {
      name: 'Hyderabad — Deccan Cyber Corridor',
      shortName: 'INDIA — HYDERABAD',
      lat: '17.3850',
      lon: '78.4867',
      timezone: 'Asia/Kolkata',
      pop: '10.8M POP',
      subLocations: [
        { id: 'musi_hussainsagar', name: 'Musi River Channel & Hussain Sagar Sluice', sensor: 'Flood Basin Sonar (drain_musi_hussain)', tier: 'Urban Watershed Drainage' },
        { id: 'hitec_scada', name: 'HITEC City Cyber SCADA Hub', sensor: 'Switchgear Telemetry (scada_hitec_hub)', tier: 'Industrial Sub-Transmission Ring' },
        { id: 'osmania_nims_er', name: 'Osmania General Hospital & NIMS ER', sensor: 'Inpatient Emergency Stream (er_osmania_nims)', tier: 'Deccan Regional Apex Care' },
        { id: 'orr_hyderabad', name: 'Nehru Outer Ring Road (ORR) Junction', sensor: 'Expressway Traffic Radar (traffic_hyderabad_orr)', tier: 'Orbital Disaster Transit Ring' }
      ]
    },
    india_kolkata: {
      name: 'Kolkata — Hooghly Delta Region',
      shortName: 'INDIA — KOLKATA',
      lat: '22.5726',
      lon: '88.3639',
      timezone: 'Asia/Kolkata',
      pop: '15.1M POP',
      subLocations: [
        { id: 'hooghly_lock', name: 'Hooghly River Lock Gates & Canal Basin', sensor: 'Tidal Crest Barrier (drain_hooghly_lock)', tier: 'Estuarine Flood Defense' },
        { id: 'saltlake_scada', name: 'Bidhannagar Salt Lake SCADA Substation', sensor: 'Feeder Bus Monitor (scada_saltlake)', tier: 'East Sector Municipal Grid' },
        { id: 'sskm_trauma_er', name: 'SSKM Hospital & IPGMER Trauma Center', sensor: 'Critical Triage Admissions (er_sskm_trauma)', tier: 'State Referral Trauma Apex' },
        { id: 'em_bypass', name: 'Eastern Metropolitan (EM) Bypass Corridor', sensor: 'Traffic Velocity Radar (traffic_em_bypass)', tier: 'Eastern Arterial Route' }
      ]
    },
    india_pune: {
      name: 'Pune — Mula-Mutha Metropolitan Area',
      shortName: 'INDIA — PUNE',
      lat: '18.5204',
      lon: '73.8567',
      timezone: 'Asia/Kolkata',
      pop: '7.2M POP',
      subLocations: [
        { id: 'mula_mutha_dam', name: 'Khadakwasla Dam Outflow & Mula-Mutha Basin', sensor: 'Weir Discharge Sensor (drain_mula_mutha)', tier: 'Reservoir Floodgate Channel' },
        { id: 'hinjawadi_scada', name: 'Hinjawadi Infotech Park SCADA Hub', sensor: '110kV Line Telemetry (scada_hinjawadi)', tier: 'Tech Park Dedicated Substation' },
        { id: 'sassoon_er', name: 'Sassoon General Hospital Emergency ER', sensor: 'Trauma Queue Telemetry (er_sassoon_pune)', tier: 'Government Emergency Hospital' },
        { id: 'wakad_express', name: 'Pune-Mumbai Expressway Wakad Interchange', sensor: 'Doppler Loop Tracker (traffic_wakad_express)', tier: 'Inter-City Disaster Arterial' }
      ]
    },

    // 🌍 Worldwide Global Crisis Metropolises
    world_london: {
      name: 'London — Greater London, UK',
      shortName: 'UK — LONDON',
      lat: '51.5074',
      lon: '-0.1278',
      timezone: 'Europe/London',
      pop: '9.0M POP',
      subLocations: [
        { id: 'thames_barrier', name: 'Thames Barrier & Isle of Dogs Basin', sensor: 'Tidal Surge Sonar (drain_thames_barrier)', tier: 'Maritime Tidal Surge Defense' },
        { id: 'london_scada', name: 'National Grid City of London Intertie', sensor: 'SCADA Remote Bus (scada_london_grid)', tier: 'Core Financial Sub-Transmission' },
        { id: 'st_thomas_er', name: "St Thomas' & Royal London Hospital ER", sensor: 'Emergency Influx Stream (er_st_thomas)', tier: 'Level-1 Metropolitan Trauma' },
        { id: 'a40_westway', name: 'A40 Westway & Blackwall Tunnel Corridor', sensor: 'Loop Speed Detector (traffic_a40_westway)', tier: 'Key Radial Evacuation Route' }
      ]
    },
    world_newyork: {
      name: 'New York — NYC Metro, USA',
      shortName: 'USA — NEW YORK',
      lat: '40.7128',
      lon: '-74.0060',
      timezone: 'America/New_York',
      pop: '8.8M POP',
      subLocations: [
        { id: 'nyc_battery', name: 'East River Storm Surge & Battery Sluice', sensor: 'NOAA Tide Gauge (drain_nyc_battery)', tier: 'Low-Lying Coastal Barrier' },
        { id: 'coned_east', name: 'ConEd East River 138kV Substation', sensor: 'SCADA Substation Breaker (scada_coned_east)', tier: 'Manhattan Core Power Distribution' },
        { id: 'bellevue_er', name: 'Bellevue Hospital Apex Trauma Center', sensor: 'Disaster Influx Stream (er_bellevue_nyc)', tier: 'Flagship Level-1 Trauma' },
        { id: 'fdr_highway', name: 'FDR Drive & West Side Highway Corridor', sensor: 'Doppler Radar Array (traffic_fdr_drive)', tier: 'Peripheral Waterfront Arterial' }
      ]
    },
    world_tokyo: {
      name: 'Tokyo — Greater Tokyo Area, Japan',
      shortName: 'JAPAN — TOKYO',
      lat: '35.6762',
      lon: '139.6503',
      timezone: 'Asia/Tokyo',
      pop: '14.1M POP (38M METRO)',
      subLocations: [
        { id: 'tokyo_gcans', name: 'G-Cans Underground Discharge Channel', sensor: 'Super-Silo Hydro Sonar (drain_tokyo_gcans)', tier: 'Subterranean Flood Reservoir' },
        { id: 'tepco_shinjuku', name: 'TEPCO Shinjuku SCADA Central', sensor: 'Seismic Intertie Bus (scada_tepco_shinjuku)', tier: 'Seismic-Hardened Grid Hub' },
        { id: 'tokyo_univ_er', name: 'Tokyo University Hospital Emergency ER', sensor: 'Acute Triage Tracker (er_tokyo_univ)', tier: 'National Disaster Medical Center' },
        { id: 'shuto_c1', name: 'Shuto Expressway C1 Inner Circular Route', sensor: 'Optical Speed Cam (traffic_shuto_c1)', tier: 'Core Transit Viaduct' }
      ]
    },
    world_paris: {
      name: 'Paris — Île-de-France, France',
      shortName: 'FRANCE — PARIS',
      lat: '48.8566',
      lon: '2.3522',
      timezone: 'Europe/Paris',
      pop: '11.0M METRO',
      subLocations: [
        { id: 'seine_austerlitz', name: 'Seine River Flood Gates & Austerlitz Basin', sensor: 'River Level Gauge (drain_seine_austerlitz)', tier: 'Regulated River Channel' },
        { id: 'rte_paris', name: 'RTE Paris SCADA Sub-Transmission Hub', sensor: 'HV Feeder Bus (scada_rte_paris)', tier: 'Metropolitan Power Ring' },
        { id: 'pitie_er', name: 'Pitié-Salpêtrière Hospital Emergency ER', sensor: 'Critical Admissions (er_pitie_salpetriere)', tier: 'Level-1 Trauma Center' },
        { id: 'peripherique', name: 'Boulevard Périphérique Ring Corridor', sensor: 'Traffic Velocity Loop (traffic_peripherique)', tier: 'Urban Orbital Highway' }
      ]
    },
    world_singapore: {
      name: 'Singapore — Marina & Islandwide',
      shortName: 'SINGAPORE',
      lat: '1.3521',
      lon: '103.8198',
      timezone: 'Asia/Singapore',
      pop: '5.9M POP',
      subLocations: [
        { id: 'marina_barrage', name: 'Marina Barrage & Stamford Detention Basin', sensor: 'Tidal Crest Sensor (drain_marina_barrage)', tier: 'Storm Water Silo & Tidal Gate' },
        { id: 'sp_grid', name: 'SP Group PowerGrid SCADA Center', sensor: '400kV Cable Monitor (scada_sp_grid)', tier: 'Fully Underground Power Grid' },
        { id: 'sgh_singapore', name: 'Singapore General Hospital (SGH) Trauma', sensor: 'Emergency Intake (er_sgh_singapore)', tier: 'Primary Acute Referral Center' },
        { id: 'pie_express', name: 'Pan Island Expressway (PIE) Corridor', sensor: 'EMAS Traffic Radar (traffic_pie_expressway)', tier: 'East-West Trunk Arterial' }
      ]
    },
    world_dubai: {
      name: 'Dubai — Central & Coastal, UAE',
      shortName: 'UAE — DUBAI',
      lat: '25.2048',
      lon: '55.2708',
      timezone: 'Asia/Dubai',
      pop: '3.6M POP',
      subLocations: [
        { id: 'dubai_deep', name: 'Dubai Deep Tunnel Stormwater System', sensor: 'Subsurface Flow Sonar (drain_dubai_deep)', tier: 'Gravity Drainage Silo' },
        { id: 'dewa_central', name: 'DEWA SCADA Power & Desalination Hub', sensor: 'Telemetry Monitor (scada_dewa_central)', tier: 'Power & Water Interlink' },
        { id: 'rashid_hosp', name: 'Rashid Hospital Trauma & Emergency Center', sensor: 'Level-1 ER Telemetry (er_rashid_hospital)', tier: 'Regional Disaster ER' },
        { id: 'sheikh_zayed', name: 'Sheikh Zayed Road (E11) Arterial Corridor', sensor: 'Smart Radar Grid (traffic_sheikh_zayed)', tier: 'Primary Transit Axis' }
      ]
    },
    world_sydney: {
      name: 'Sydney — Hawkesbury & Harbor, Australia',
      shortName: 'AUSTRALIA — SYDNEY',
      lat: '-33.8688',
      lon: '151.2093',
      timezone: 'Australia/Sydney',
      pop: '5.3M POP',
      subLocations: [
        { id: 'hawkesbury_basin', name: 'Hawkesbury-Nepean River Flood Basin', sensor: 'Hydro Inundation Gauge (drain_hawkesbury)', tier: 'Critical River Floodplain' },
        { id: 'ausgrid_syd', name: 'Ausgrid Sydney SCADA Substation', sensor: 'HV Transmission Link (scada_ausgrid_syd)', tier: 'Coastal Power Distribution' },
        { id: 'rpa_sydney', name: 'Royal Prince Alfred Hospital ER Trauma', sensor: 'Emergency Admissions (er_rpa_sydney)', tier: 'Major Referral Center' },
        { id: 'm4_motorway', name: 'M4 Western Motorway Corridor', sensor: 'Vehicle Speed Loop (traffic_m4_motorway)', tier: 'Key Western Evacuation Arterial' }
      ]
    }
  };

    const selectLocation = document.getElementById('selectLocation');
  const selectSubLocation = document.getElementById('selectSubLocation');
  const activeSubLocName = document.getElementById('activeSubLocName');
  const activeSensorNode = document.getElementById('activeSensorNode');
  const activeInfraTier = document.getElementById('activeInfraTier');

  function populateSubLocations(locKey, selectedSubId = null) {
    if (!selectSubLocation) return;
    const region = METROPOLITAN_REGIONS[locKey] || METROPOLITAN_REGIONS.berlin_mitte;
    selectSubLocation.innerHTML = '';
    region.subLocations.forEach((sub, idx) => {
      const opt = document.createElement('option');
      opt.value = sub.id;
      opt.textContent = sub.name;
      if (selectedSubId ? sub.id === selectedSubId : idx === 0) {
        opt.selected = true;
      }
      selectSubLocation.appendChild(opt);
    });
    updateSectorSensorStrip(locKey, selectSubLocation.value);
  }

  function updateSectorSensorStrip(locKey, subId) {
    const region = METROPOLITAN_REGIONS[locKey] || METROPOLITAN_REGIONS.berlin_mitte;
    const sub = region.subLocations.find(s => s.id === subId) || region.subLocations[0];
    if (activeSubLocName) activeSubLocName.textContent = sub.name;
    if (activeSensorNode) activeSensorNode.textContent = sub.sensor;
    if (activeInfraTier) activeInfraTier.textContent = sub.tier;

    // Update Metropolis ticker in top nav
    const metropolisVal = document.querySelector('.nav-telemetry .telemetry-item .value');
    if (metropolisVal) {
      metropolisVal.textContent = `${region.shortName} (${region.pop})`;
    }

    // Update Weather title with coordinates and sector
    const weatherTitle = document.getElementById('weatherTitle');
    if (weatherTitle) {
      weatherTitle.innerHTML = `${region.name} <span>(${region.lat}&deg; N, ${region.lon}&deg; E)</span>`;
    }
  }

  function renderWeatherForecast(data) {
    const hourly = data.hourly;
    if (!hourly || !Array.isArray(hourly.time) || !Array.isArray(hourly.temperature_2m)) {
      throw new Error('Weather provider returned an unexpected forecast format.');
    }

    const sampleCount = hourly.time.length;
    if (sampleCount === 0) return;

    const now = Date.now() / 1000;
    let forecastIndex = 0;
    for (let index = 0; index < sampleCount; index++) {
      const timestamp = Number(hourly.time[index]);
      if (Number.isFinite(timestamp) && timestamp <= now) forecastIndex = index;
      if (Number.isFinite(timestamp) && timestamp >= now) {
        forecastIndex = index;
        break;
      }
    }

    const temperature = Number(hourly.temperature_2m[forecastIndex]);
    const rain = Array.isArray(hourly.rain) ? Number(hourly.rain[forecastIndex]) : 0.0;
    const windSpeed = Array.isArray(hourly.wind_speed_120m) 
      ? Number(hourly.wind_speed_120m[forecastIndex]) 
      : (Array.isArray(hourly.wind_speed_10m) ? Number(hourly.wind_speed_10m[forecastIndex]) : 12.0);
    const pressure = Array.isArray(hourly.pressure_msl) ? Number(hourly.pressure_msl[forecastIndex]) : 1013;
    const weatherCode = Array.isArray(hourly.weather_code) ? Number(hourly.weather_code[forecastIndex]) : 0;
    const windDirection = Array.isArray(hourly.wind_direction_10m) ? Number(hourly.wind_direction_10m[forecastIndex]) : 0;
    const forecastTimestamp = Number(hourly.time[forecastIndex]);

    const locKey = selectLocation?.value || 'berlin_mitte';
    const region = METROPOLITAN_REGIONS[locKey] || METROPOLITAN_REGIONS.berlin_mitte;

    weatherTemperature.textContent = `${temperature.toFixed(1)} °C`;
    weatherDescription.textContent = getWeatherDescription(weatherCode);
    weatherRain.textContent = `${rain.toFixed(1)} mm`;
    weatherWind.textContent = `${windSpeed.toFixed(1)} km/h`;
    weatherWindDirection.textContent = `${getCompassDirection(windDirection)} (${Math.round(windDirection)}° at 10 m)`;
    weatherPressure.textContent = `${pressure.toFixed(0)} hPa`;
    weatherForecastTime.textContent = `Forecast for ${new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: region.timezone
    }).format(new Date(forecastTimestamp * 1000))}`;
  }

  async function loadWeatherForecast() {
    if (weatherRefreshBtn.disabled) return;
    const locKey = selectLocation?.value || 'berlin_mitte';
    const region = METROPOLITAN_REGIONS[locKey] || METROPOLITAN_REGIONS.berlin_mitte;

    const params = new URLSearchParams({
      latitude: region.lat,
      longitude: region.lon,
      hourly: 'temperature_2m,rain,wind_speed_120m,pressure_msl,weather_code,wind_direction_10m',
      timezone: region.timezone,
      timeformat: 'unixtime',
      forecast_days: '3'
    });

    weatherRefreshBtn.disabled = true;
    weatherStatus.textContent = 'Loading forecast…';
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(`${WEATHER_API_URL}?${params}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`Weather service returned HTTP ${response.status}.`);
      const data = await response.json();
      renderWeatherForecast(data);
      weatherStatus.textContent = `Updated ${new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date())}`;
    } catch (error) {
      const detail = error.name === 'AbortError' ? 'The request timed out.' : error.message || 'Check connection.';
      weatherStatus.textContent = `Forecast unavailable: ${detail}`;
    } finally {
      window.clearTimeout(timeoutId);
      weatherRefreshBtn.disabled = false;
    }
  }

  // --- SCHEMA TABS ---
  const SCHEMAS = {
    ingest: `{
  "$schema": "https://crisissense.ai/schemas/v1/event-stream.json",
  "event_id": "evt_9948271_sector4",
  "timestamp": "2026-10-25T20:07:14.281Z",
  "elapsed_seconds": 434,
  "source_type": "HYDRO_TELEMETRY",
  "reliability_weight": 0.88,
  "is_retraction": false,
  "data": {
    "node_id": "drainage_culvert_48",
    "pressure_kpa": 420.5,
    "flow_rate_lps": 1840.2,
    "anomaly_sigma": 3.82
  },
  "provenance": {
    "gateway_id": "gw_hydro_north",
    "mesh_hops": 2,
    "received_order": 149
  }
}`,
    belief: `{
  "cycle_minute": 8,
  "system_state": {
    "H0_noise": 0.05,
    "H1_sensor_failure": 0.08,
    "H2_isolated_incident": 0.13,
    "H3_cascading_crisis": 0.74
  },
  "shannon_entropy_bits": 1.28,
  "twin_prefix_locked": false,
  "recommended_policy": {
    "action": "ESCALATE",
    "action_cost_expected": 24000,
    "hysteresis_gate": "ARMED",
    "lead_time_avoided_est_minutes": 8.5
  },
  "explainability_vector": [
    { "factor": "substation_breaker_trip", "weight": +0.48 },
    { "factor": "culvert_flow_saturation", "weight": +0.22 },
    { "factor": "single_gateway_artifact", "weight": -0.09 }
  ]
}`,
    foresight: `{
  "causal_graph_id": "dag_metropolis_flood_grid_v3",
  "horizon_events": [
    {
      "step": 1,
      "event": "SUBSTATION_07_INUNDATION",
      "expected_minute_window": [8, 9],
      "calibrated_prob": 0.84,
      "causal_path": ["HEAVY_RAIN", "CULVERT_OVERFLOW"]
    },
    {
      "step": 2,
      "event": "HOSPITAL_GRID_BROWNOUT",
      "expected_minute_window": [9, 10],
      "calibrated_prob": 0.78,
      "causal_path": ["SUBSTATION_07_INUNDATION"]
    },
    {
      "step": 3,
      "event": "LEVEE_4_FISSURE_BREACH",
      "expected_minute_window": [10, 12],
      "calibrated_prob": 0.72,
      "causal_path": ["CULVERT_OVERFLOW", "GROUND_SATURATION"]
    }
  ]
}`
  };

  function initSchemaTabs() {
    schemaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        schemaBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.schema;
        schemaCodeContent.innerText = SCHEMAS[key];
        initAudio();
        playTickSound();
      });
    });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    btnPlayPause.addEventListener('click', togglePlay);

    btnPrevMin.addEventListener('click', () => {
      initAudio();
      if (currentMinute > 0) setMinute(currentMinute - 1);
    });

    btnNextMin.addEventListener('click', () => {
      initAudio();
      if (currentMinute < 10) setMinute(currentMinute + 1);
    });

    btnResetSim.addEventListener('click', async () => {
      initAudio();
      if (isPlaying) togglePlay();
      userEscalatedAtMinute = null;
      await loadEpisodeFromApi(currentScenario);
      setMinute(0);
    });

    speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playSpeed = parseInt(btn.dataset.speed, 10);
        if (isPlaying) {
          clearInterval(playInterval);
          playInterval = setInterval(() => {
            if (currentMinute < 10) setMinute(currentMinute + 1);
            else togglePlay();
          }, playSpeed);
        }
      });
    });

    btnScenarioAlpha.addEventListener('click', async () => {
      initAudio();
      btnScenarioAlpha.classList.add('active');
      btnScenarioBeta.classList.remove('active');
      currentScenario = 'alpha';
      userEscalatedAtMinute = null;
      await loadEpisodeFromApi('alpha');
      setMinute(0);
    });

    btnScenarioBeta.addEventListener('click', async () => {
      initAudio();
      btnScenarioBeta.classList.add('active');
      btnScenarioAlpha.classList.remove('active');
      currentScenario = 'beta';
      userEscalatedAtMinute = null;
      await loadEpisodeFromApi('beta');
      setMinute(0);
    });

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeFilter = tab.dataset.filter;
        if (isApiOnline && (liveTimelineCache[currentMinute] || liveTimelineCache[String(currentMinute)])) {
          renderLiveEvents();
        } else {
          renderFallbackEvents();
        }
        playTickSound();
      });
    });

    // CAP Format switchers
    if (btnCapJson && btnCapXml) {
      btnCapJson.addEventListener('click', () => {
        btnCapJson.classList.add('active');
        btnCapXml.classList.remove('active');
        activeCapFormat = 'json';
        renderCapAlert(null);
      });
      btnCapXml.addEventListener('click', () => {
        btnCapXml.classList.add('active');
        btnCapJson.classList.remove('active');
        activeCapFormat = 'xml';
        renderCapAlert(null);
      });
    }

    // Adversity Toggles -> /inject
    const toggleGw = document.getElementById('toggleGatewayDrop');
    if (toggleGw) {
      toggleGw.addEventListener('change', async (e) => {
        flagGatewayDrop = e.target.checked;
        initAudio();
        playTickSound();
        if (isApiOnline && window.CrisisSenseAPI) {
          await window.CrisisSenseAPI.injectAdversity('cutout', 'gw_1');
          const tl = await window.CrisisSenseAPI.getTimeline();
          if (tl && tl.timeline) liveTimelineCache = tl.timeline;
        }
        updateSimulationHUD();
      });
    }

    const toggleRumor = document.getElementById('toggleRumorMimic');
    if (toggleRumor) {
      toggleRumor.addEventListener('change', async (e) => {
        flagRumorMimic = e.target.checked;
        initAudio();
        playTickSound();
        if (isApiOnline && window.CrisisSenseAPI) {
          await window.CrisisSenseAPI.injectAdversity('rumor');
          const tl = await window.CrisisSenseAPI.getTimeline();
          if (tl && tl.timeline) liveTimelineCache = tl.timeline;
        }
        updateSimulationHUD();
      });
    }

    const toggleJitter = document.getElementById('toggleStreamJitter');
    if (toggleJitter) {
      toggleJitter.addEventListener('change', async (e) => {
        flagStreamJitter = e.target.checked;
        initAudio();
        playTickSound();
        if (isApiOnline && window.CrisisSenseAPI) {
          await window.CrisisSenseAPI.injectAdversity('jitter');
          const tl = await window.CrisisSenseAPI.getTimeline();
          if (tl && tl.timeline) liveTimelineCache = tl.timeline;
        }
        updateSimulationHUD();
      });
    }

    const toggleLie = document.getElementById('toggleStructuredLie');
    if (toggleLie) {
      toggleLie.addEventListener('change', async (e) => {
        flagStructuredLie = e.target.checked;
        initAudio();
        playTickSound();
        if (isApiOnline && window.CrisisSenseAPI) {
          await window.CrisisSenseAPI.injectAdversity('lie');
          const tl = await window.CrisisSenseAPI.getTimeline();
          if (tl && tl.timeline) liveTimelineCache = tl.timeline;
        }
        updateSimulationHUD();
      });
    }

    // Sound toggle
    soundToggle.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        soundToggle.classList.remove('muted');
        audioLabel.innerText = 'AUDIO ON';
        playTickSound();
      } else {
        soundToggle.classList.add('muted');
        audioLabel.innerText = 'MUTED';
      }
    });

    // Cost sliders
    [inputFalseAlarm, inputDelayDamage, inputPrepare, inputPrior].forEach(sl => {
      if (sl) sl.addEventListener('input', recalculateCostThresholds);
    });

    // Canvas animation ticker
    setInterval(() => {
      drawCausalGraph(liveTimelineCache[currentMinute] || liveTimelineCache[String(currentMinute)] || null);
    }, 100);
  }

  // --- INITIALIZATION ---
  async function init() {
    initScrubber();
    setupEventListeners();
    initSchemaTabs();
    recalculateCostThresholds();

    // Check API connection and load episode
    if (window.CrisisSenseAPI) {
      window.CrisisSenseAPI.onConnectionChange(updateConnectionBadge);
      const online = await window.CrisisSenseAPI.checkHealth();
      if (online) {
        await loadEpisodeFromApi(currentScenario);
      } else {
        updateConnectionBadge(false);
      }
    } else {
      updateConnectionBadge(false);
    }

    updateSimulationHUD();

    // Setup Berlin Location & Sub-Location selectors
    const storedLoc = localStorage.getItem('crisissense_selected_location') || 'berlin_mitte';
    const storedSub = localStorage.getItem('crisissense_selected_sublocation');
    if (selectLocation) {
      selectLocation.value = storedLoc;
      populateSubLocations(storedLoc, storedSub);

      selectLocation.addEventListener('change', () => {
        const newLoc = selectLocation.value;
        localStorage.setItem('crisissense_selected_location', newLoc);
        populateSubLocations(newLoc);
        localStorage.setItem('crisissense_selected_sublocation', selectSubLocation.value);
        loadWeatherForecast();
      });
    }

    if (selectSubLocation) {
      selectSubLocation.addEventListener('change', () => {
        localStorage.setItem('crisissense_selected_sublocation', selectSubLocation.value);
        updateSectorSensorStrip(selectLocation.value, selectSubLocation.value);
      });
    }

    // Load Open-Meteo Weather independently
    loadWeatherForecast();
    window.setInterval(loadWeatherForecast, WEATHER_REFRESH_INTERVAL_MS);
    weatherRefreshBtn.addEventListener('click', loadWeatherForecast);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

