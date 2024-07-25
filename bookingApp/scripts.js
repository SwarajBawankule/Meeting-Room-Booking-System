let bookings = [];

document.getElementById('bookRoomButton').addEventListener('click', function() {
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const meetingTitle = document.getElementById('meetingTitle').value;

    if (date && startTime && endTime && meetingTitle) {
        const booking = {
            room: room,
            date: date,
            startTime: startTime,
            endTime: endTime,
            meetingTitle: meetingTitle
        };

        bookings.push(booking);

        const tableBody = document.getElementById('bookingsTable').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        cell1.textContent = meetingTitle;
        cell2.textContent = date;
        cell3.textContent = startTime;
        cell4.textContent = endTime;
        cell5.innerHTML = '<button class="btn btn-danger btn-sm delete-booking">Delete</button> <button class="btn btn-primary btn-sm edit-booking">Edit</button>';

        // Add event listener to delete booking button
        cell5.querySelector('.delete-booking').addEventListener('click', function() {
            const index = Array.prototype.indexOf.call(bookings, booking);
            if (index !== -1) {
                bookings.splice(index, 1);
            }
            newRow.remove();
        });

        // Add event listener to edit booking button
        // Add event listener to edit booking button
cell5.querySelector('.edit-booking').addEventListener('click', function() {
    const index = Array.prototype.indexOf.call(bookings, booking);
    if (index !== -1) {
        document.getElementById('room').value = booking.room;
        document.getElementById('date').value = booking.date;
        document.getElementById('startTime').value = booking.startTime;
        document.getElementById('endTime').value = booking.endTime;
        document.getElementById('meetingTitle').value = booking.meetingTitle;

        // Create update button
        const updateButton = document.createElement('button');
        updateButton.className = 'btn btn-warning btn-sm float-right ml-2';
        updateButton.textContent = 'Update';
        updateButton.onclick = function() {
            updateBooking(index, booking);
        };

        // Add update button to the cell
        cell5.appendChild(updateButton);
    }
});

// Update booking function
function updateBooking(index, booking) {
    booking.room = document.getElementById('room').value;
    booking.date = document.getElementById('date').value;
    booking.startTime = document.getElementById('startTime').value;
    booking.endTime = document.getElementById('endTime').value;
    booking.meetingTitle = document.getElementById('meetingTitle').value;

    // Update the table row
    cell1.textContent = booking.meetingTitle;
    cell2.textContent = booking.date;
    cell3.textContent = booking.startTime;
    cell4.textContent = booking.endTime;
}

        // Show booking confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'alert alert-success';
        confirmationMessage.textContent = `Your booking for "${meetingTitle}" on ${date} from ${startTime} to ${endTime} has been confirmed!`;
        document.getElementById('bookingConfirmation').innerHTML = '';
        document.getElementById('bookingConfirmation').appendChild(confirmationMessage);

        // Update available rooms
        const roomsList = document.getElementById('roomsList').children;
        for (let i = 0; i < roomsList.length; i++) {
            if (roomsList[i].getAttribute('data-room') === room) {
                let capacity = parseInt(roomsList[i].getAttribute('data-capacity'));
                capacity -= 1; // Decrease capacity by 1
                if (capacity > 0) {
                    roomsList[i].setAttribute('data-capacity', capacity);
                    roomsList[i].textContent = `${room} (Capacity: ${capacity})`;
                } else {
                    roomsList[i].remove(); // Remove the room if capacity is 0
                }
                break;
            }
        }
    } else {
        alert('Please fill in all fields.');
    }
});
