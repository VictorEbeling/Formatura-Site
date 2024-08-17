document.addEventListener('DOMContentLoaded', () => {

  // Unix timestamp (in seconds) to count down to
  var Date = 1723923000
  //1723923000

  // Set up FlipDown
  var flipdown = new FlipDown(Date)

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      document.getElementById("flipdown").style.display = "none";
      document.getElementById("endCountdownDiv").style.display = "block";
    });

})


