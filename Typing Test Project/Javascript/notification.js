export function showNotification(message, type = "info", duration = 3000) {
    let container = document.getElementById("notification-container");

    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "fadeOut 0.3s ease forwards";
        setTimeout(() => notification.remove(), 300);
    }, duration);
}
