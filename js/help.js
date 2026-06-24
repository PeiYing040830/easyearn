// help page scripts
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('.open-floating-chat');
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const chatWindow = document.getElementById('chatbot-window');
      if (chatWindow) {
        chatWindow.classList.remove('hidden');
      }
    });
  }
});
