const generateRequestID = () => {
   const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
   const random = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
   return `Data_${timestamp}${random}`;
 };

 
 module.exports = generateRequestID