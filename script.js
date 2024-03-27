document.getElementById('datumButton').addEventListener('click', function() {
    var datum = new Date();
    document.getElementById('datumAnzeige').textContent = datum;
});
document.getElementById('nachrichtButton').addEventListener('click', function() {
    alert('Hallo, dies ist eine Nachricht!');
});
