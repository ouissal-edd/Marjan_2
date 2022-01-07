const express = require('express');
const app = express();

const router = require('./router/router');
const bodyParser = require('body-parser');



// static files
app.use(express.static('assets'));
app.use('/css', express.static(__dirname + 'assets/css'));
app.use('/js', express.static(__dirname + 'assets/js'));
app.use('/images', express.static(__dirname + 'assets/images'));

// Set views
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));


// to get views 
app.get('/pdg', function (req, res) {
    res.render('pdg/login');
});
app.get('/g_promos', function (req, res) {
    res.render('pdg/gestion_promos');
});
app.get('/g_account', function (req, res) {
    res.render('pdg/gestion_account');
});
app.get('/admin', function (req, res) {
    res.render('admin/dashAdmin');
});





// action
app.post('/loginPdg', router.loginPdg);
app.get('/pdgDash', router.getDataToPdg);
app.post('/addCenterAdmin', router.addAdminCentre);
app.post('/deletePromo/:id', router.deletePromotion);
app.post('/addCategorie', router.addCategorie);




app.listen(4000, () => console.log('started on port ', 4000));