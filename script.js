document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const downloadBtn = document.getElementById('downloadBtn');

    textInput.addEventListener('input', updateWordCount);
    downloadBtn.addEventListener('click', downloadText);

    function updateWordCount() {
        const text = textInput.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        wordCount.textContent = words;
    }

    function downloadText() {
        const text = textInput.value;
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const fileName = `${date}_DailyMemo.txt`;

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Auto-save functionality
    let autoSaveTimeout;
    textInput.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            localStorage.setItem('dailyMemoText', textInput.value);
        }, 1000); // Save after 1 second of inactivity
    });

    // Load saved text on page load
    const savedText = localStorage.getItem('dailyMemoText');
    if (savedText) {
        textInput.value = savedText;
        updateWordCount();
    }
});
