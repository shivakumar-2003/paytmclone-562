document.getElementById('transactionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get form values
    const userId = document.getElementById('userId').value;
    const transactionAmount = parseFloat(document.getElementById('transactionAmount').value);
    const transactionType = document.getElementById('transactionType').value;
    const timestamp = document.getElementById('timestamp').value;
  
    // Validate form data
    if (!userId || isNaN(transactionAmount) || !transactionType || !timestamp) {
      displayResponseMessage('Please fill in all fields correctly.', 'error');
      return;
    }
  
    // Prepare the data to be sent to the backend
    const transactionData = {
      userId,
      transactionAmount,
      transactionType,
      timestamp: new Date(timestamp).toISOString(), // Ensure the timestamp is in ISO format
    };
  
    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        displayResponseMessage('Transaction recorded successfully!', 'success');
      } else {
        displayResponseMessage(data.error || 'Something went wrong. Please try again later.', 'error');
      }
    } catch (error) {
      displayResponseMessage('Error connecting to the server. Please try again later.', 'error');
    }
  });
  
  // Function to display response message
  function displayResponseMessage(message, type) {
    const responseMessageElement = document.getElementById('responseMessage');
    responseMessageElement.textContent = message;
    responseMessageElement.className = `response-message ${type}`;
  }