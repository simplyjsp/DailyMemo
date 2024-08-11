document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const downloadBtn = document.getElementById('downloadBtn');
    const wordGoalInput = document.getElementById('wordGoal');
    const celebration = document.getElementById('celebration');

    // Clear content on page load
    localStorage.removeItem('dailyMemoText');
    textInput.value = '';

    textInput.addEventListener('input', updateWordCount);
    downloadBtn.addEventListener('click', downloadText);
    wordGoalInput.addEventListener('input', checkWordGoal);

    function updateWordCount() {
        const text = textInput.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        wordCount.textContent = words;
        checkWordGoal();
    }

    function checkWordGoal() {
        const currentWords = parseInt(wordCount.textContent);
        const goalWords = parseInt(wordGoalInput.value);

        if (goalWords && currentWords >= goalWords) {
            celebration.innerHTML = '🎉 Congratulations! You\'ve reached your word count goal! 🎉';
        } else {
            celebration.innerHTML = '';
        }
    }

    function downloadText() {
        const text = textInput.value;
        const date = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        const fileName = `DailyMemo_${date.replace(/\//g, '-')}.txt`;

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

    // Optimized auto-save functionality
    let autoSaveTimeout;
    textInput.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            localStorage.setItem('dailyMemoText', textInput.value);
        }, 300); // Save after 300ms of inactivity for better responsiveness
    });
});
