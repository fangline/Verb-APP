document.addEventListener('DOMContentLoaded', () => {
    // 定義喇叭 SVG 模板
    const speakerIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

    // 定義管理與取消圖示
    const manageIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
    const cancelIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;

    const defaultVerbs = [
        { type: "A-A-A", mean: "切割", base: { us: ["cut", "/kʌt/"], uk: ["cut", "/kʌt/"] }, past: { us: ["cut", "/kʌt/"], uk: ["cut", "/kʌt/"] }, pp: { us: ["cut", "/kʌt/"], uk: ["cut", "/kʌt/"] } },
        { type: "A-A-A", mean: "放置", base: { us: ["put", "/pʊt/"], uk: ["put", "/pʊt/"] }, past: { us: ["put", "/pʊt/"], uk: ["put", "/pʊt/"] }, pp: { us: ["put", "/pʊt/"], uk: ["put", "/pʊt/"] } },
        { type: "A-A-A", mean: "花費", base: { us: ["cost", "/kɔst/"], uk: ["cost", "/kɒst/"] }, past: { us: ["cost", "/kɔst/"], uk: ["cost", "/kɒst/"] }, pp: { us: ["cost", "/kɔst/"], uk: ["cost", "/kɒst/"] } },
        { type: "A-A-A", mean: "受傷/疼痛", base: { us: ["hurt", "/hɜrt/"], uk: ["hurt", "/hɜːt/"] }, past: { us: ["hurt", "/hɜrt/"], uk: ["hurt", "/hɜːt/"] }, pp: { us: ["hurt", "/hɜrt/"], uk: ["hurt", "/hɜːt/"] } },
        { type: "A-A-A", mean: "打擊/點擊", base: { us: ["hit", "/hɪt/"], uk: ["hit", "/hɪt/"] }, past: { us: ["hit", "/hɪt/"], uk: ["hit", "/hɪt/"] }, pp: { us: ["hit", "/hɪt/"], uk: ["hit", "/hɪt/"] } },
        { type: "A-A-B", mean: "敲擊/打敗", base: { us: ["beat", "/bit/"], uk: ["beat", "/biːt/"] }, past: { us: ["beat", "/bit/"], uk: ["beat", "/biːt/"] }, pp: { us: ["beaten", "/ˈbitn/"], uk: ["beaten", "/ˈbiːtn/"] } },
        { type: "A-B-B", mean: "購買", base: { us: ["buy", "/baɪ/"], uk: ["buy", "/baɪ/"] }, past: { us: ["bought", "/bɔt/"], uk: ["bought", "/bɔːt/"] }, pp: { us: ["bought", "/bɔt/"], uk: ["bought", "/bɔːt/"] } },
        { type: "A-B-B", mean: "保持", base: { us: ["keep", "/kip/"], uk: ["keep", "/kiːp/"] }, past: { us: ["kept", "/kɛpt/"], uk: ["kept", "/kɛpt/"] }, pp: { us: ["kept", "/kɛpt/"], uk: ["kept", "/kɛpt/"] } },
        { type: "A-B-B", mean: "尋找", base: { us: ["find", "/faɪnd/"], uk: ["find", "/faɪnd/"] }, past: { us: ["found", "/faʊnd/"], uk: ["found", "/faʊnd/"] }, pp: { us: ["found", "/faʊnd/"], uk: ["found", "/faʊnd/"] } },
        { type: "A-B-B", mean: "告訴", base: { us: ["tell", "/tɛl/"], uk: ["tell", "/tɛl/"] }, past: { us: ["told", "/toʊld/"], uk: ["told", "/təʊld/"] }, pp: { us: ["told", "/toʊld/"], uk: ["told", "/təʊld/"] } },
        { type: "A-B-B", mean: "思考", base: { us: ["think", "/θɪŋk/"], uk: ["think", "/θɪŋk/"] }, past: { us: ["thought", "/θɔt/"], uk: ["thought", "/θɔːt/"] }, pp: { us: ["thought", "/θɔt/"], uk: ["thought", "/θɔːt/"] } },
        { type: "A-B-A", mean: "跑", base: { us: ["run", "/rʌn/"], uk: ["run", "/rʌn/"] }, past: { us: ["ran", "/ræn/"], uk: ["ran", "/ræn/"] }, pp: { us: ["run", "/rʌn/"], uk: ["run", "/rʌn/"] } },
        { type: "A-B-A", mean: "成為", base: { us: ["become", "/bɪˈkʌm/"], uk: ["become", "/bɪˈkʌm/"] }, past: { us: ["became", "/bɪˈkeɪm/"], uk: ["became", "/bɪˈkeɪm/"] }, pp: { us: ["become", "/bɪˈkʌm/"], uk: ["become", "/bɪˈkʌm/"] } },
        { type: "A-B-A", mean: "來", base: { us: ["come", "/kʌm/"], uk: ["come", "/kʌm/"] }, past: { us: ["came", "/keɪm/"], uk: ["came", "/keɪm/"] }, pp: { us: ["come", "/kʌm/"], uk: ["come", "/kʌm/"] } },
        { type: "A-B-C", mean: "去", base: { us: ["go", "/ɡoʊ/"], uk: ["go", "/ɡəʊ/"] }, past: { us: ["went", "/wɛnt/"], uk: ["went", "/wɛnt/"] }, pp: { us: ["gone", "/ɡɔːn/"], uk: ["gone", "/ɡɒn/"] } },
        { type: "A-B-C", mean: "吃", base: { us: ["eat", "/it/"], uk: ["eat", "/iːt/"] }, past: { us: ["ate", "/eɪt/"], uk: ["ate", "/et/"] }, pp: { us: ["eaten", "/ˈitn/"], uk: ["eaten", "/ˈiːtn/"] } },
        { type: "A-B-C", mean: "拿", base: { us: ["take", "/teɪk/"], uk: ["take", "/teɪk/"] }, past: { us: ["took", "/tʊk/"], uk: ["took", "/tʊk/"] }, pp: { us: ["taken", "/ˈteɪkən/"], uk: ["taken", "/ˈteɪkən/"] } },
        { type: "A-B-C", mean: "寫", base: { us: ["write", "/raɪt/"], uk: ["write", "/raɪt/"] }, past: { us: ["wrote", "/roʊt/"], uk: ["wrote", "/rəʊt/"] }, pp: { us: ["written", "/ˈrɪtn/"], uk: ["written", "/ˈrɪtn/"] } },
        { type: "A-B-C", mean: "打破", base: { us: ["break", "/breɪk/"], uk: ["break", "/breɪk/"] }, past: { us: ["broke", "/broʊk/"], uk: ["broke", "/brəʊk/"] }, pp: { us: ["broken", "/ˈbroʊkən/"], uk: ["broken", "/ˈbrəʊkən/"] } },
        { type: "A-B-C", mean: "開始", base: { us: ["begin", "/bɪˈɡɪn/"], uk: ["begin", "/bɪˈɡɪn/"] }, past: { us: ["began", "/bɪˈɡæn/"], uk: ["began", "/bɪˈɡæn/"] }, pp: { us: ["begun", "/bɪˈɡʌn/"], uk: ["begun", "/bɪˈɡʌn/"] } }
    ];

    let customVerbs = JSON.parse(localStorage.getItem('customVerbs')) || [];
    let hiddenDefaultIds = JSON.parse(localStorage.getItem('hiddenDefaultIds')) || [];
    let isDeleteMode = false;
    let currentLang = 'us';

    const tableBody = document.getElementById('verbTableBody');
    const btnToggleDelete = document.getElementById('btn-toggle-delete');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');
    const btnUs = document.getElementById('btn-us');
    const btnUk = document.getElementById('btn-uk');
    const btnMic = document.getElementById('btn-mic');
    const addBase = document.getElementById('add-base');
    const addMean = document.getElementById('add-mean');
    const addIpa = document.getElementById('add-ipa');
    const addType = document.getElementById('add-type');
    const btnConfirmAdd = document.getElementById('btn-confirm-add');

    let autoFillTimeout;
    let autoFetchedIpas = { past: { us: "", uk: "" } };

    const predictForms = (word) => {
        let past = word + "ed";
        if (word.endsWith('e')) { past = word + "d"; }
        else if (word.match(/[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/)) {
            const lastChar = word.slice(-1);
            if (!['y','w','x'].includes(lastChar)) { past = word + lastChar + "ed"; }
        } else if (word.endsWith('y') && !/[aeiou]y$/.test(word)) { past = word.slice(0, -1) + "ied"; }
        return { past };
    };

    const fetchIpaFromApi = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.ok) {
                const data = await response.json();
                const entry = data[0];
                let usIpa = "", ukIpa = "";
                if (entry.phonetics && entry.phonetics.length > 0) {
                    const usEntry = entry.phonetics.find(p => p.audio?.includes('-us') || p.sourceUrl?.includes('cambridge'));
                    const ukEntry = entry.phonetics.find(p => p.audio?.includes('-uk') || !p.audio);
                    usIpa = (usEntry?.text || entry.phonetic || "").replace(/\//g, '');
                    ukIpa = (ukEntry?.text || entry.phonetic || "").replace(/\//g, '');
                }
                return { us: usIpa, uk: ukIpa };
            }
        } catch (e) { console.log("IPA fetch failed"); }
        return { us: "", uk: "" };
    };

    const performAutoFill = async () => {
        const val = addBase.value.trim().toLowerCase();
        if (val.length < 2) return;
        const found = [...defaultVerbs, ...customVerbs].find(v => v.base.us[0].toLowerCase() === val || v.base.uk[0].toLowerCase() === val);
        if (found) {
            addMean.value = found.mean;
            addIpa.value = (found.base.us[1] || found.base.uk[1] || "").replace(/\//g, '');
            autoFetchedIpas.past = { us: (found.past.us[1] || "").replace(/\//g, ''), uk: (found.past.uk[1] || "").replace(/\//g, '') };
            addType.value = found.type;
            [addMean, addIpa, addType].forEach(el => { el.style.backgroundColor = '#e8f0fe'; setTimeout(() => el.style.backgroundColor = '', 500); });
            return;
        }
        clearTimeout(autoFillTimeout);
        autoFillTimeout = setTimeout(async () => {
            const { past } = predictForms(val);
            const [baseIpa, pastIpa] = await Promise.all([fetchIpaFromApi(val), fetchIpaFromApi(past)]);
            addIpa.value = baseIpa.us || baseIpa.uk || "";
            autoFetchedIpas.past = pastIpa;
            addType.value = "A-B-B";
            if (addIpa.value) { addIpa.style.backgroundColor = '#d1f2eb'; setTimeout(() => addIpa.style.backgroundColor = '', 800); }
            try {
                const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${val}&langpair=en|zh-TW`);
                if (transRes.ok) {
                    const data = await transRes.json();
                    const translation = data.responseData.translatedText;
                    if (translation && translation !== val) { addMean.value = translation; addMean.style.backgroundColor = '#d1f2eb'; setTimeout(() => addMean.style.backgroundColor = '', 800); }
                }
            } catch (e) { console.log("Translation failed"); }
        }, 800);
    };

    addBase.addEventListener('input', performAutoFill);

    const speak = (text, element) => {
        if (!('speechSynthesis' in window)) { alert("不支援語音合成"); return; }
        window.speechSynthesis.cancel();
        document.querySelectorAll('.speaking').forEach(el => el.classList.remove('speaking'));
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = currentLang === 'us' ? 'en-US' : 'en-GB';
        msg.rate = 0.85;
        if (element) { msg.onstart = () => element.classList.add('speaking'); msg.onend = () => element.classList.remove('speaking'); }
        window.speechSynthesis.speak(msg);
    };

    const renderTable = (filter = '') => {
        tableBody.innerHTML = '';
        const getIpaHtml = (ipa) => { if (typeof ipa !== 'string') return ''; const t = ipa.trim(); return (!t || t === "" || t === "/ /") ? '' : `<span class="ipa">${t}</span>`; };
        const query = filter.toLowerCase().trim();
        const allVerbs = [...defaultVerbs.filter(v => !hiddenDefaultIds.includes(v.base.us[0])), ...customVerbs];
        const groupOrder = ["A-A-A", "A-A-B", "A-B-B", "A-B-A", "A-B-C"];
        groupOrder.forEach(groupType => {
            const groupVerbs = allVerbs.filter(v => v.type === groupType && (!query || v.mean.includes(query) || v.base[currentLang][0].toLowerCase().includes(query)));
            if (groupVerbs.length === 0) return;
            groupVerbs.sort((a, b) => a.base[currentLang][0].localeCompare(b.base[currentLang][0]));
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `<td colspan="${isDeleteMode ? 6 : 5}" class="group-header">${groupType} 模式</td>`;
            tableBody.appendChild(headerRow);
            groupVerbs.forEach(v => {
                const data = { base: v.base[currentLang], past: v.past[currentLang], pp: v.pp[currentLang] };
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="checkbox-cell"><input type="checkbox" class="verb-checkbox" data-id="${v.id || v.base.us[0]}"></td>
                    <td class="word-cell" data-speak="${data.base[0]}">${data.base[0]}${getIpaHtml(data.base[1])}</td>
                    <td data-speak="${data.past[0]}">${data.past[0]}${getIpaHtml(data.past[1])}</td>
                    <td data-speak="${data.pp[0]}">${data.pp[0]}${getIpaHtml(data.pp[1])}</td>
                    <td class="meaning">${v.mean}</td>
                    <td><button class="btn-speak" data-speak="${data.base[0]}, ${data.past[0]}, ${data.pp[0]}" title="發音">${speakerIcon}</button></td>`;
                tableBody.appendChild(row);
            });
        });
    };

    btnConfirmAdd.addEventListener('click', () => {
        const base = addBase.value.trim(), mean = addMean.value.trim(), type = addType.value;
        const formatIpa = (v) => { v = v.trim(); if(!v) return ""; if(!v.startsWith('/')) v='/'+v; if(!v.endsWith('/')) v+='/'; return v; };
        const ipaVal = formatIpa(addIpa.value);
        if (!base || !mean) { alert("請填寫必填欄位"); return; }
        const { past: predPast } = predictForms(base);
        let past = (type === 'A-A-A' ? base : predPast), pp = (type === 'A-A-A' || type === 'A-B-A' ? base : predPast);
        const newVerb = {
            id: Date.now(), isCustom: true, type, mean,
            base: { us: [base, ipaVal], uk: [base, ipaVal] },
            past: { us: [past, (type === 'A-A-A' ? ipaVal : "")], uk: [past, (type === 'A-A-A' ? ipaVal : "")] },
            pp: { us: [pp, (type === 'A-A-A' || type === 'A-B-A' ? ipaVal : "")], uk: [pp, (type === 'A-A-A' || type === 'A-B-A' ? ipaVal : "")] }
        };
        customVerbs.push(newVerb); localStorage.setItem('customVerbs', JSON.stringify(customVerbs));
        renderTable(); addBase.value = ''; addMean.value = ''; addIpa.value = '';
        const note = document.getElementById('autofill-note');
        if (note) note.style.display = 'none';
    });

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (Recognition) {
        const rec = new Recognition();
        rec.onstart = () => btnMic.classList.add('recording'); rec.onend = () => btnMic.classList.remove('recording');
        rec.onresult = (e) => { addBase.value = e.results[0][0].transcript.replace('.', ''); performAutoFill(); };
        btnMic.addEventListener('click', () => { try { rec.start(); } catch(e) { rec.stop(); } });
    }

    btnUs.addEventListener('click', () => { currentLang = 'us'; btnUs.classList.add('active'); btnUk.classList.remove('active'); renderTable(); });
    btnUk.addEventListener('click', () => { currentLang = 'uk'; btnUk.classList.add('active'); btnUs.classList.remove('active'); renderTable(); });

    btnToggleDelete.addEventListener('click', () => {
        isDeleteMode = !isDeleteMode; btnToggleDelete.classList.toggle('active');
        btnToggleDelete.innerHTML = isDeleteMode ? cancelIcon : manageIcon;
        document.querySelector('table').classList.toggle('delete-mode', isDeleteMode);
        btnConfirmDelete.style.display = isDeleteMode ? 'flex' : 'none';
        btnConfirmDelete.innerHTML = `${manageIcon} (0)`; renderTable();
    });

    tableBody.addEventListener('change', (e) => { if (e.target.classList.contains('verb-checkbox')) btnConfirmDelete.innerHTML = `${manageIcon} (${document.querySelectorAll('.verb-checkbox:checked').length})`; });
    document.getElementById('select-all').addEventListener('change', (e) => {
        document.querySelectorAll('.verb-checkbox').forEach(cb => cb.checked = e.target.checked);
        btnConfirmDelete.innerHTML = `${manageIcon} (${document.querySelectorAll('.verb-checkbox:checked').length})`;
    });

    btnConfirmDelete.addEventListener('click', () => {
        const checked = document.querySelectorAll('.verb-checkbox:checked');
        const ids = Array.from(checked).map(cb => cb.getAttribute('data-id'));
        if (ids.length === 0) return;
        if (confirm(`確定刪除選中的 ${ids.length} 個單字？`)) {
            customVerbs = customVerbs.filter(v => !ids.includes(v.id?.toString()));
            ids.forEach(id => { if(defaultVerbs.some(dv => dv.base.us[0] === id)) hiddenDefaultIds.push(id); });
            localStorage.setItem('customVerbs', JSON.stringify(customVerbs));
            localStorage.setItem('hiddenDefaultIds', JSON.stringify(hiddenDefaultIds));
            isDeleteMode = false; 
            document.querySelector('table').classList.remove('delete-mode');
            btnToggleDelete.classList.remove('active');
            btnToggleDelete.innerHTML = manageIcon; btnConfirmDelete.style.display = 'none'; renderTable();
        }
    });

    tableBody.addEventListener('click', (e) => {
        const cl = e.target.closest('[data-speak]');
        if (cl) speak(cl.getAttribute('data-speak'), cl);
    });

    renderTable();
});