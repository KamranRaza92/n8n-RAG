async function sendData() {
    const fileInput = document.getElementById('pdfFile');
    const questionInput = document.getElementById('question');
    const responseBox = document.getElementById('responseBox');
    const loadingUI = document.getElementById('loadingUI');
    const actualResponse = document.getElementById('actualResponse');
    const responseText = document.getElementById('responseText');
    const btnAction = document.getElementById('btnAction');

    if (!fileInput.files[0] || !questionInput.value) {
        alert("Please select a PDF and enter your question.");
        return;
    }

    // UI Loading State
    responseBox.classList.remove('hidden');
    loadingUI.classList.remove('hidden');
    actualResponse.classList.add('hidden');
    btnAction.disabled = true;
    btnAction.classList.add('opacity-50');

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('chatInput', questionInput.value);

    try {
        const response = await fetch('http://localhost:5678/webhook-test/03db3252-e339-47ac-86c3-0a991a1b254b', {
            method: 'POST',
            body: formData
        });
        const data = await response.text();

        loadingUI.classList.add('hidden');
        actualResponse.classList.remove('hidden');

        responseText.innerText = data || "No response received from AI.";

    } catch (error) {
        loadingUI.classList.add('hidden');
        actualResponse.classList.remove('hidden');
        responseText.innerText = "Error: " + error.message;
    } finally {
        btnAction.disabled = false;
        btnAction.classList.remove('opacity-50');
    }
}