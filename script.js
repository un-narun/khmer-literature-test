const items = [
    { 
        name: "ភាសាខ្មែរ", 
        description: "ភាសាខ្មែរគឺជាភាសាជាតិនៃប្រទេសកម្ពុជា។",
        latin: "khmaɛː",
        devanagari: "ख्मेर भाषा",
        ref: "K.303",
    },
    { 
        name: "សំស្ក្រឹត", 
        description: "ភាសាសំស្ក្រឹតគឺជាភាសាបុរាណរបស់ឥណ្ឌាដែលមានឥទ្ធិពលលើភាសាខ្មែរ។",
        latin: "Sanskrit",
        devanagari: "संस्कृतम्"
    },
    { 
        name: "មូត៌ិ", 
        description: "ភាសាសំស្ក្រឹតគឺជាភាសាបុរាណរបស់ឥណ្ឌាដែលមានឥទ្ធិពលលើភាសាខ្មែរ។",
        latin: "Sanskrit",
        devanagari: "संस्कृतम्"
    }
];

let currentFont = 'khmer-font1';
const listBox = document.getElementById('listBox');
const descriptionBox = document.getElementById('descriptionBox');

function populateList(filter = '') {
    listBox.innerHTML = '';
    const lowerFilter = filter.toLowerCase();

    const filteredItems = items.filter(item => {
        const searchStr = `${item.name} ${item.description} ${item.latin || ''} ${item.devanagari || ''}${item.ref || ''}`.toLowerCase();
        return searchStr.includes(lowerFilter);
    });
    
    filteredItems.forEach(item => {
        const div = document.createElement('div');
        div.className = `list-item ${currentFont}`;
        div.textContent = (currentFont === 'sanskrit-font' && item.devanagari) ? item.devanagari : item.name;
        
        div.onclick = () => {
            descriptionBox.innerHTML = `
                <h3>${item.name}</h3>
                <p class="latin-text"><em>${item.latin || ''}</em></p>
                <p class="sanskrit-font" style="font-size: 1.2em;">${item.devanagari || ''}</p>
                <hr>
                <p>${item.description}</p>
                <p class="ref"><em>${item.ref || ''}</em></p>
            `;
            document.querySelectorAll('.list-item').forEach(el => el.style.backgroundColor = '');
            div.style.backgroundColor = '#e0f7fa';
            
            if (window.innerWidth <= 768) {
                descriptionBox.scrollIntoView({ behavior: 'smooth' });
            }
        };
        listBox.appendChild(div);
    });
}

function changeFont(element, fontClass) {
    currentFont = fontClass;
    document.querySelectorAll('.font-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    
    const currentSearch = document.getElementById('searchInput').value;
    populateList(currentSearch);
}

function filterList() {
    const searchTerm = document.getElementById('searchInput').value;
    populateList(searchTerm);
}

// មុខងារសម្រាប់បើក/បិទ Navigation Dropdown លើ mobile
document.addEventListener('DOMContentLoaded', () => {
    populateList();

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }
});