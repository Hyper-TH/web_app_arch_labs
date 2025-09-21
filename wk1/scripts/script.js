document.addEventListener("DOMContentLoaded", () => {
  const ticketsContainer = document.getElementById("tickets");
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
    .then((response) => response.json())
    .then((data) => {
      let html = `<h2 class="color-white">Recent Helpdesk Tickets</h2>`;
      html += '<div class="ticket-grid">';
      data.forEach((ticket) => {
        html += `
            <div class="ticket-card">
                <div class="ticket-header">
                    <span class="ticket-id">#${ticket.id}</span>
                    <span class="ticket-status ${ticket.completed ? "resolved" : "open"}">
                    ${ticket.completed ? "Resolved" : "Open"}
                    </span>
                </div>
                <div class="ticket-body">
                    <h3>${ticket.title}</h3>
                    <div class="ticket-user">Assigned to: User ${ticket.userId}</div>
                </div>
            </div>
            `;
      });
      html += "</div>";
      ticketsContainer.innerHTML = html;
    })
    .catch((error) => {
      ticketsContainer.innerHTML = "<p>Error loading tickets.</p>";
      console.error(error);
    });
});