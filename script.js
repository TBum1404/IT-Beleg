document.getElementById('datumButton').addEventListener('click', function() {
    var datum = new Date();
    document.getElementById('datumAnzeige').textContent = datum;
});
